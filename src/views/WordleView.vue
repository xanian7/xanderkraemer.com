<template>
  <div class="wordle-container">
    <div v-for="(row, rowIndex) in grid"
      :key="rowIndex"
      class="row"
      :id="'row-' + rowIndex"
      >
      <div v-for="(letter, colIndex) in row"
        :key="colIndex"
        class="letter-box"
        :id="'col-' + rowIndex + '-' + colIndex"
      >
        <div class="letter-box-inner">
          <div class="letter-box-front">
            <input
              v-if="rowIndex === currentRow"
              v-model="grid[rowIndex][colIndex]"
              maxlength="1"
              @input="moveToNextLetter(colIndex)"
              @blur="keepFocus()"
              class="letter-input"
            />
            <span v-else class="letter-box-front">{{ letter }}</span>
          </div>
          <div class="letter-box-back"
          :class="getLetterClass(letter.toUpperCase(), rowIndex, colIndex)"
          >
            {{ letter }}
          </div>
        </div>
      </div>
    </div>

    <div class="keyboard">
      <div v-for="(row, rowIndex) in keyboardRows" :key="rowIndex" class="row">
        <button v-for="(key, colIndex) in row" :key="colIndex" @click="simulateKeyPress(key)" :class="getKeyClass(key)">
          {{ key }}
        </button>

      </div>
    </div>
  </div>

  <div v-if="showDialog" class="popup-overlay">
    <div class="popup-content">
      <h1>{{ getDialogHeader() }}</h1>
      <p>The word was: {{ theWord }}</p>
      <button @click="resetGame()" class="close-button">Play Again</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, onBeforeMount, reactive } from 'vue'

export default {
  setup() {
    onBeforeMount(async () => {
      await readFileToList();
      selectTheWord();
    });

    onMounted(() => {
      const row = getCurrentRow()
      row[currentCol.value].focus();

      document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter'){
          submitGuess();
        } else if (event.key === 'Backspace' && currentCol.value > 0) {
          const row = getCurrentRow();

          if (row[currentCol.value].value === "") {
            
            currentCol.value--;
            row[currentCol.value].focus();
            removeLetter.value = true;
          }
        } else if (event.key !== 'Backspace') {
          removeLetter.value = false;
        }
      });
    });

    const keepFocus = () => {
      const inputs = getCurrentRow();
      inputs[currentCol.value].focus;
    }
    
    const grid = ref([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""]
    ]);

    const keyboardRows = ref([
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
    ]);

    const theWord = ref("");
    const currentRow = ref(0);
    const currentCol = ref(0);
    const guesses = ref([]);
    const enterGuess = ref(false);
    const removeLetter = ref(false);
    const showDialog = ref(false);
    const allWords = ref([]);
    const win = ref(false);
    const alreadyGuessed = reactive([]);
    const theWordCopy = ref("");
    const allLetters = reactive([]);

    const resetGame = () => {
      for (let row = 0; row < currentRow.value; row++) {
        for (let col = 0; col < 5; col++) {
          const element = getLetterBoxById(col, row);
          element.classList.remove('flip');
          element.style.transform = 'rotateY(0deg)'
        }
      }

      showDialog.value = false;
      guesses.value = [];
      currentCol.value = 0;
      currentRow.value = 0;
      grid.value = [
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""]
      ];
      theWordCopy.value = "";
      theWord.value = "";
      enterGuess.value = false;
      removeLetter.value = false;
      win.value = false;
      alreadyGuessed.length = 0;
      allLetters.length = 0;

      setTimeout(() => {
        selectTheWord(); 
      }, 200);

      nextTick(() => {
        const inputs = document.querySelectorAll('.letter-input');
        inputs[currentCol.value].focus();
      });
    }

    const simulateKeyPress = (key) => {

      if (key === 'Backspace' || key === 'Enter') {
        const event = new KeyboardEvent('keydown', {
          key: key,
          bubbles: true,
          cancelable: true,
        });

        document.dispatchEvent(event);
        if (key === 'Backspace') {
          grid.value[currentRow.value][currentCol.value] = "";
        }
      } else {
        removeLetter.value = false;
        if (grid.value[currentRow.value][currentCol.value] === "") {
          grid.value[currentRow.value][currentCol.value] = key;
          moveToNextLetter(currentCol.value)
        }
      }
    }

    const getKeyClass = (key) => {
      let keyClass = "";
      if (alreadyGuessed.length > 0) {
        for (let i = 0; i < alreadyGuessed.length; i++){
          for (let ii = 0; ii < alreadyGuessed[i].length; ii++){
            if (alreadyGuessed[i][ii].letter === key) {
              keyClass = alreadyGuessed[i][ii].class;
            }
          }
        }
      }
      return keyClass
    }


    const getLetterClass = (letter, rowIndex, colIndex) => {
      const guess = guesses.value[rowIndex];
      const correctLetter = theWord.value[colIndex];

      if (guess) {
        if (guess.length === 5) {

          if (!alreadyGuessed[rowIndex]) {
            alreadyGuessed[rowIndex] = [];
          }
          
          if (alreadyGuessed[rowIndex][colIndex]) {
            return alreadyGuessed[rowIndex][colIndex].class;
          }

          if (alreadyGuessed[rowIndex][colIndex]) {
            return alreadyGuessed[rowIndex][colIndex].class;
          }

          let letterClass = ""
          if (letter === correctLetter){
            theWordCopy.value = removeLetterAtIndex(theWordCopy.value, colIndex);
            for (let i = 0; i < allLetters.length; i++) {
              if (allLetters[i].letter === letter) {
                if (allLetters[i].count > 0) {
                  allLetters[i].count--;
                  break;
                }
              }
            }
            letterClass = "correct";
          } else if (theWordCopy.value.includes(letter)){
            for (let i = 0; i < allLetters.length; i++) {
              if (allLetters[i].letter === letter) {
                  for (let ii = 0; ii < guess.length; ii++) {
                    if (theWord.value[ii] === guess[ii] && guess[ii] === letter) {
                      allLetters[i].count--;
                    }
                  }
                
                if (allLetters[i].count > 0) {
                  letterClass = "misplaced";
                  allLetters[i].count--;
                  break;
                } else {
                  letterClass = "incorrect";
                  break;
                }
              }
            }
          } else {
            letterClass = "incorrect";
          }

          alreadyGuessed[rowIndex][colIndex] = {letter: letter, class: letterClass}

          return letterClass
        }
      }
      return "";
    };

    const moveToNextLetter = (colIndex) => {
      const inputs = getCurrentRow();
      if (colIndex < inputs.length - 1 && removeLetter.value === false){
        inputs[colIndex + 1].focus();
        currentCol.value = colIndex + 1;
      }
    }

    const submitGuess = () => {
      const currentGuess = grid.value[currentRow.value].join("");
      const wordInList = checkIfWordInList(currentGuess);
      if (currentGuess.length === 5 && wordInList) {
        for (let i = 0; i < 5; i++) {
          const element = getLetterBoxById(i, currentRow.value);
          setTimeout(() => {
            element.classList.add('flip');
          }, i * 500);
        }

        if (checkForWin(currentGuess.toUpperCase())){
          win.value = true;
          setTimeout(() => {
            showDialog.value = true;
          }, 2500)
        }
        
        guesses.value.push(currentGuess.toUpperCase());
        currentRow.value++;
        currentCol.value = 0;
        enterGuess.value = true;
        theWordCopy.value = theWord.value;
        if (currentRow.value < 6){
          focusNextRow();
        } else {
          showDialog.value = true;
        }
        getAllLetters();
      } else if (wordInList === false) {
        const element = getRowById(currentRow.value);
        element.classList.add('shake');
        setTimeout(() => {
          element.classList.remove('shake');
        }, 200)
      }
    }

    const focusNextRow = () => {
      nextTick(() => {
        if (enterGuess.value) {
          const inputs = getCurrentRow();
          inputs[currentCol.value].focus();
          enterGuess.value = false;
        }
      });
    }

    const checkForWin = (guess) => {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] != theWord.value[i]){
          return false;
        }
      }
      return true;
    }

    const checkIfWordInList = (guess) => {
      return allWords.value.includes(guess.toLowerCase());
    }

    const getCurrentRow = () => {
      return document.querySelectorAll('.letter-input');
    }

    const readFileToList = async () => {
      const response = await fetch('../wordlesolutions.txt');
      if (response.ok) {
        allWords.value = (await response.text()).split('\r\n');
      }
    }

    const selectTheWord = () => {
      const random = Math.floor(Math.random() * allWords.value.length);
      theWord.value = allWords.value[random].toUpperCase();
      theWordCopy.value = theWord.value;
      console.log(theWord.value)

      getAllLetters();
    }

    const getAllLetters = () => {
      allLetters.length = 0; 
      for (let i = 0; i < theWord.value.length; i++){
        let letterExists = false;

        for (let ii = 0; ii < allLetters.length; ii++) {
          if (allLetters[ii].letter === theWord.value[i]) {
            allLetters[ii].count++; 
            letterExists = true;
            break;
          }
        }

        if (!letterExists) {
          allLetters.push({ letter: theWord.value[i], count: 1 });
        }
      }
    }

    const getDialogHeader = () => {
      if (win.value){
        return "You Win!";
      } else {
        return "You Lose.";
      }
    }

    const removeLetterAtIndex = (str, index) => {
      if (index < 0 || index >= str.length) {
        return str;
      }

      return str.slice(0, index) + str.slice(index + 1);
    }

    const getLetterBoxById = (colIndex, rowIndex) => {
      return document.getElementById('col-' + rowIndex + '-' + colIndex);
    }

    const getRowById = (rowIndex) => {
      return document.getElementById('row-' + rowIndex);
    }

    return {
      grid,
      theWord,
      currentRow,
      guesses,
      enterGuess,
      showDialog,
      allWords,
      win,
      alreadyGuessed,
      allLetters,
      keyboardRows,
      getLetterClass,
      moveToNextLetter,
      submitGuess,
      focusNextRow,
      checkForWin,
      resetGame,
      getCurrentRow,
      readFileToList,
      selectTheWord,
      getDialogHeader,
      removeLetterAtIndex,
      getAllLetters,
      simulateKeyPress,
      keepFocus,
      getKeyClass,
      checkIfWordInList,
      getLetterBoxById,
      getRowById,
    }
  }
}
</script>

<style scoped>
.wordle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 1rem;
}

.letter-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  width: 4rem;
  border: 2px solid #d3d3d3;
  perspective: 1000px;
}

.letter-input {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  outline: none;
}

.letter-box-inner {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  font-size: 2rem;
  font-weight: bold; 
  text-transform: uppercase;
}

.flip .letter-box-inner {
  transform: rotateY(180deg);
}

.letter-box-front, .letter-box-back {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  font-weight: bold;
}

.letter-box-back {
  transform: rotateY(180deg);
}

.correct {
  background-color: #6aaa64;
  color: white;
  border-color: #6aaa64;
  text-transform: uppercase;
  font-weight: bold;
}

.misplaced {
  background-color: #c9b458;
  color: white;
  border-color: #c9b458;
  text-transform: uppercase;
  font-weight: bold;
}

.incorrect {
  background-color: #787c7e;
  color: white;
  border-color: #787c7e;
  text-transform: uppercase;
  font-weight: bold;
}

.keyboard {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.row {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
}

button {
  min-width: 40px;
  min-height: 50px;
  font-size: 1.2rem;
  background-color: #eee;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #ccc;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-content {
  background: white;
  padding: 40px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

p {
  margin-bottom: 20px;
}

.close-button {
  background-color: #6aaa64;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.close-button:hover {
  background-color: #45a049;
}

.shake {
  animation: shake 0.5s;
}

@keyframes shake {
  0% {transform: translate(2px, 0px);}
  10% {transform: translate(-2px, 0px);}
  20% {transform: translate(2px, 0px);}
  30% {transform: translate(-2px, 0px);}
  40% {transform: translate(2px, 0px);}
  50% {transform: translate(-2px, 0px);}
  60% {transform: translate(2px, 0px);}
  70% {transform: translate(-2px, 0px);}
  80% {transform: translate(2px, 0px);}
  90% {transform: translate(-2px, 0px);}
  100% {transform: translate(2px, 0px);}
}
</style>
