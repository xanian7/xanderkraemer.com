<script>
import { RouterLink, RouterView } from 'vue-router';
import Drawer from 'primevue/drawer';
import { PrimeIcons } from '@primevue/core/api';
import Button from 'primevue/button'
import Menubar from 'primevue/menubar';

export default {
  components: {
    Drawer,
    Button,
    Menubar,
  },
  data() {
      return {
          items: [
              { lable: 'Home', icon: PrimeIcons.HOME, 
                command: () => this.$router.push('/')
              },
              { lable: 'Home', icon: PrimeIcons.INFO_CIRCLE, 
                command: () => this.$router.push('/about')
              },
          ]
      };
  }
};
</script>

<template>
  <header>
    <div class="wrapper">
      <Menubar :model="items" class="nav-menu"/>
      <!-- <nav class="left-side">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.layout {
  display: flex;
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
