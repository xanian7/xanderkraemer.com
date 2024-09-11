<template>
    <div class="wrapper">
        <div class="experience-panel">
            <Transition name="slide-fade">
                <div v-if="show" >
                    <Fieldset legend="Work">
                        <div>
                            <div class="experience">
                                <div class="experience-image">
                                    <img class="image" src="/greatamerican.png" alt="Great American"/>
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
                                    <img class="image" src="/sportys.png" alt="Sporty's"/>
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
                                <img class="image" src="/ohiostate.png" alt="Ohio State"/>
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
                <Panel>
                    <Tabs value="0">
                        <TabList>
                            <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>
                        </TabList>
                        <TabPanels>
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
              { title: 'Projects', content: '', value: '0' },
              { title: 'Experience', content: 'I have been in development for 5 years. In that time I have gotten experience in: Vue, Vuetify, Primevue, React, Java, C#, SQL, etc.', value: '1' },
              { title: 'This Site', content: 'This site was built using Vite, Vue 3, and PrimeVue. It is hosted through GitHub Pages.', value: '2' }
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

.experience-field {
    min-width: 10rem;
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
        display: flex;
        align-items: center;
        flex-direction: row;
    }

    .experience-field {
        min-width: 20rem;
    }

    .image {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    object-fit: cover;
    }

    .experience-panel {
    padding-right: 1rem;
    }

    .about-me-section {
        padding-top: 1rem;
        max-width: 30rem;
    }
}

.tablist {
    padding: 0px;
}

.image {
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
