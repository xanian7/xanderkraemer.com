<template class="wrapper">
  <Menubar :model="items" class="nav-menu"/>
  <div class="container">
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import Drawer from 'primevue/drawer';
import { PrimeIcons } from '@primevue/core/api';
import Button from 'primevue/button'
import Menubar from 'primevue/menubar';
import Image from 'primevue/image';
import Divider from 'primevue/divider';
import MegaMenu from 'primevue/megamenu';


export default {
  components: {
    Drawer,
    Button,
    Menubar,
    Image,
    Divider,
    MegaMenu, 
    PrimeIcons
  },
  data() {
      return {
          items: [
              { label: 'Home', icon: PrimeIcons.HOME, 
                command: () => this.$router.push('/')
              },
              { label: 'About', icon: PrimeIcons.INFO_CIRCLE, 
                command: () => this.$router.push('/about')
              },
          ],
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

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  padding-right: 0;
}

.header {
  padding-right: 0;
}

.container {
  position: absolute;
  left: 50%;
  top: 6rem;
  transform: translateX(-50%);
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
}

.socials {
  position: fixed;
  bottom: 0;
  left: 0;
}

.divider {
  height: 100%;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.layout {
  display: flex;
}

.right-side {
  right: 0;
  padding: 1rem;
}

.left-side {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.nav-menu {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem;
  margin-top: 0.1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  width: 100%;
  z-index: 999;
}

.main-content {
  margin-left: 25%;
  padding: 1rem;
  flex: 1;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    background-color: var(--p-content-background);
    width: 100%;
    height: 100%;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

</style>
