<template>
  <div v-for="item in ranks" :key="item.id" class="numbers">
    <div class="id">
      {{ item.id }} :
    </div>
    <div class="right">
      <InputNumber v-model="item.number" inputId="integeronly" fluid style="width: 3rem"/>
    </div>
  </div>
  <div>
    <Button @click="GetRandomNumber()"></Button>
    <InputNumber v-model="random" disabled/>
  </div>
</template>

<script>
import { PrimeIcons } from '@primevue/core/api';
import Image from 'primevue/image';
import Divider from 'primevue/divider';
import MegaMenu from 'primevue/megamenu';
import Fieldset from 'primevue/fieldset';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';

export default {
  components: {
    Image,
    Divider,
    PrimeIcons,
    MegaMenu,
    Fieldset,
    Button,
    InputNumber,
  },
  data() {
      return {
        show: false,
        ranks: [
          {id: 1, number: null},
          {id: 2, number: null},
          {id: 3, number: null},
          {id: 4, number: null},
          {id: 5, number: null},
          {id: 6, number: null},
          {id: 7, number: null},
          {id: 8, number: null},
          {id: 9, number: null},
          {id: 10, number: null},
          {id: 11, number: null},
          {id: 12, number: null},
          {id: 13, number: null},
          {id: 14, number: null},
          {id: 15, number: null},
          {id: 16, number: null},
          {id: 17, number: null},
          {id: 18, number: null},
          {id: 19, number: null},
          {id: 20, number: null},
        ],
        random: null,
        temp: null,
        i: null,
      };
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 0);
  },
  methods: {
    GetRandomNumber() {
      this.temp = Math.floor(Math.random() * 1000) + 1;
      this.i = 0;
      this.random = this.i;
      while (this.random != this.temp){
        this.i++;
      }
      this.random = this.temp;
    },
  }
};
</script>

<style scoped>
@media (min-width: 1024px) {
  
}

.numbers {
  display: flex;
  align-items: right;
  flex-direction: row;
  min-width: 20rem;
}

.right {
  display: flex;
  justify-content: flex-end;
}

.id {
  padding-right: 1rem;
}

.wrapper {
  padding-bottom: 1rem;
}

</style>