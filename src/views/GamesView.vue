<template>
  <Transition name="bounce">
    <div v-if="show">
        <Fieldset legend="Sandbox">
            <div class="image-container">
                <img src="/sandbox.png" class="image"/>
            </div>
            <div class="button-container">
                <Button label="Play" icon="pi pi-play" @click="this.$router.push('/games/sandbox')"></Button>
            </div>
        </Fieldset>
    </div>
  </Transition>
</template>

<script>
import { PrimeIcons } from '@primevue/core/api';
import Image from 'primevue/image';
import Divider from 'primevue/divider';
import MegaMenu from 'primevue/megamenu';
import Fieldset from 'primevue/fieldset';
import Button from 'primevue/button';

export default {
  components: {
    Image,
    Divider,
    PrimeIcons,
    MegaMenu,
    Fieldset,
    Button,
  },
  data() {
      return {
        show: false,
      };
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 0);
  },
};
</script>

<style scoped>
@media (min-width: 1024px) {
  .image {
    max-width: 30rem;
    max-height: 30rem;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0; 
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
    max-width: 20rem;
    max-height: 20rem;
}

.button-container {
    padding-top: 1rem;
}

.panel {
  align-items: center;
  text-align: center;
}

.wrapper {
  padding-bottom: 1rem;
}

.divider {
  width: 100%;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>