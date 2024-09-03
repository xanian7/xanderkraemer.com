
<template>
  <div>
    <div class="wrapper">
      <Fieldset legend="xanderkraemer.com" :toggleable="true">
        <h1 class="panel">Xander Kraemer</h1>
      </Fieldset>
    </div>
    <div>
      <Image src="./IMG_5347.jpeg" alt="Image" width="250" class="image"></Image>
    </div>
    <div class="divider">
      <Divider layout="horizontal" class="divider"><b></b></Divider>
    </div>
    <div class="socials">
      <MegaMenu :model="social" class="custom-megamenu"></MegaMenu>
    </div>
  </div>
</template>

<script>
import { PrimeIcons } from '@primevue/core/api';
import Image from 'primevue/image';
import Divider from 'primevue/divider';
import MegaMenu from 'primevue/megamenu';
import Fieldset from 'primevue/fieldset';


export default {
  components: {
    Image,
    Divider,
    PrimeIcons,
    MegaMenu,
    Fieldset,
  },
  data() {
      return {
        social: [
            {label: "Instagram", icon: PrimeIcons.INSTAGRAM,
              command: () => window.open('https://www.instagram.com/xanian7/', '_blank')
            },
            {label: "LinkedIn", icon: PrimeIcons.LINKEDIN,
            command: () => window.open('https://www.linkedin.com/in/xander-kraemer-99b60b2a7/', '_blank')
            },
            {label: "GitHub", icon: PrimeIcons.GITHUB,
            command: () => window.open('https://github.com/xanian7', '_blank')
            },
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

.image {
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
