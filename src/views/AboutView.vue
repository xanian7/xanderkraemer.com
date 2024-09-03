<template>
    <transition name="fade" appear>
        <Panel class="main-container">
            <Tabs value="0" class="tabs">
                <TabList>
                    <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>
                </TabList>
                <TabPanels class="tabs">
                    <TabPanel v-for="tab in tabs" :key="tab.content" :value="tab.value">
                        <p class="m-0 panel">{{ tab.content }}</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Panel>
    </transition>
</template>

<script>
import { PrimeIcons } from '@primevue/core/api';

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Image from 'primevue/image';
import Panel from 'primevue/panel';


export default {
  components: {
    Tabs,
    TabList,
    TabPanel,
    Tab, 
    TabPanels,
    PrimeIcons,
    Image,
    Panel,
  },
  data() {
      return {
          tabs: [
              { title: 'About Me', content: 'My name is Xander Kraemer. I\'m from Cincinnati. I am currently employed at Great American Insurance as an intern under Bonds. I have worked there since May of 2022 and have been involved in many of the Bonds frontend applications.', value: '0' },
              { title: 'Projects', content: 'I have experimented with creating multiple different video games. When I started creating video games I started by making a Mario-like 2D platformer based around a pixel art of a slime I had created to learn animation. Soon I moved onto 3D applications by creating a sandbox game that I was able to experiment with 3D movement and also controller support using Unity.', value: '1' },
              { title: 'Experience', content: 'Vue/Vuetify/PrimeVue', value: '2' },
              { title: 'Education', content: 'I go to OSU', value: '3' },
              { title: 'This Site', content: 'Built using Vue 3 + PrimeVue', value: '4' }
          ]
      };
  }
};
</script>

<style scoped>

.main-container {
    min-width: 100%;
    min-height: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0; 
}

.image {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.panel {
    min-height: 25rem;
    min-width: 100%;
}

.tabs {
    min-width: 100%;
}


</style>
