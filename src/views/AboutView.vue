<template>
    <div class="wrapper">
        <div class="experience-panel">
            <Transition name="slide-fade">
                <div v-if="show" >
                    <Fieldset legend="Work">
                        <div>
                            <div class="experience">
                                <div class="experience-image">
                                    <img src="/greatamerican.png" alt="Great American"/>
                                </div>
                                <Divider layout="vertical" class="divider"><b></b></Divider>
                                <div>
                                    <Fieldset class="experience-field" legend="Great American Insurance Group">
                                        <p>May 2022 - Present</p>
                                        <p>Intern</p>
                                    </Fieldset>
                                </div>
                            </div>
                            <div class="experience">
                                <div class="experience-image">
                                    <img src="/sportys.png" alt="Sporty's"/>
                                </div>
                                <Divider layout="vertical" class="divider"><b></b></Divider>
                                <div>
                                    <Fieldset class="experience-field" legend="Sporty's Pilot Shop">
                                        <p>November 2019 - August 2021</p>
                                        <p>Shipping and Receiving</p>
                                    </Fieldset>
                                </div>
                            </div>
                        </div>
                    </Fieldset>
                </div> 
            </Transition>
            <Divider layout="horizontal" class="divider"><b></b></Divider>
            <Transition name="slide-fade">
                <div v-if="show">
                    <Fieldset legend="School">
                        <div class="experience">
                            <div class="experience-image">
                                <img src="/ohiostate.png" alt="Ohio State"/>
                            </div>
                            <Divider layout="vertical" class="divider"><b></b></Divider>
                            <div>
                                <Fieldset class="experience-field" legend="Ohio State University">
                                    <p>August 2021 - May 2025</p>
                                    <p>Information Systems</p>
                                </Fieldset>
                            </div>
                        </div>
                    </Fieldset>
                </div>
            </Transition>
        </div>
        <Transition name="slide-fade">
            <div v-if="show" class="about-me-section">
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
            </div>
        </Transition>
    </div>
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
import Avatar from 'primevue/avatar';
import Divider from 'primevue/divider';
import Fieldset from 'primevue/fieldset';

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
    Avatar,
    Divider,
    Fieldset,
  },
  data() {
      return {
          tabs: [
              { title: 'About Me', content: 'My name is Xander Kraemer. I\'m from Cincinnati. I am currently employed at Great American Insurance as an intern under Bonds.', value: '0' },
              { title: 'Projects', content: 'I have experimented with creating multiple different video games. When I started creating video games I started by making a Mario-like 2D platformer based around a pixel art of a slime I had created to learn animation. Soon I moved onto 3D applications by creating a sandbox game that I was able to experiment with 3D movement and also controller support using Unity.', value: '1' },
              { title: 'Experience', content: 'Vue/Vuetify/PrimeVue', value: '2' },
              { title: 'Education', content: 'I go to OSU', value: '3' },
              { title: 'This Site', content: 'Built using Vue 3 + PrimeVue', value: '4' }
          ],
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

.header {
    text-align: center;
    font-size: 30px;
}

.experience-panel {
    padding-right: 1rem;
}

.experience-field {
    min-width: 20rem;
}

.experience {
    display: flex;
    justify-content: left;
    align-items: left;
}

.experience-image {
    padding-top: 1rem;
}

.about-me-section {
    padding-top: 1rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0; 
}

.wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
}

@media (min-width: 1024px) {
    .wrapper {
        flex-direction: row;
    }
}

img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    object-fit: cover;
}

.panel {
   min-height: 20rem;
}

.slide-fade-enter-active {
  transition: all 0.6s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}


</style>
