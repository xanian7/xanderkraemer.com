<template>
  <div class="main-container">
      <Tabs value="0">
          <TabList>
              <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>
          </TabList>
          <TabPanels>
              <TabPanel v-for="tab in tabs" :key="tab.content" :value="tab.value">
                  <p class="m-0">{{ tab.content }}</p>
              </TabPanel>
          </TabPanels>
      </Tabs>
  </div>
</template>

<script>
import { PrimeIcons } from '@primevue/core/api';

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';


export default {
  components: {
    Tabs,
    TabList,
    TabPanel,
    Tab, 
    TabPanels,
    PrimeIcons,
  },
  data() {
      return {
          tabs: [
              { title: 'About Me', content: 'My name is Xander Kraemer. I\'m from Cincinnati. I am currently employed at Great American Insurance as an intern under Bonds. I have worked there since May of 2022 and have been involved in many of the Bonds frontend applications.', value: '0' },
              { title: 'Projects', content: 'I have experimented with creating multiple different video games. When I started creating video games I started by making a Mario-like 2D platformer based around a pixel art of a slime I had created to learn animation. Soon I moved onto 3D applications by creating a sandbox game that I was able to experiment with 3D movement and also controller support using Unity.', value: '1' },
              { title: 'Tab 3', content: 'Tab 3 Content', value: '2' }
          ]
      };
  }
};
</script>

<style scoped>
:root {
    --p-primary-color: #007bff; /* Change this to your desired primary color */
}



</style>
