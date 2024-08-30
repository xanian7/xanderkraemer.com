
<template>
  <Menu :model="items">
  </Menu>
</template>

<script>
import { PrimeIcons } from '@primevue/core/api';
import Menu from 'primevue/menu';

export default {
  components: {
    Menu,
    PrimeIcons,
  },
  data() {
      return {
          items: [
              {
                  label: 'File',
                  items: [
                      { label: 'New', icon: PrimeIcons.PLUS },
                      { label: 'Open', icon: PrimeIcons.DOWNLOAD }
                  ]
              }
          ]
      };
  }
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
