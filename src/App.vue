<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <div v-for="league in leagues" :key="league.id">
      <p>{{ league.name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import { getLeagues } from './api/api';
import { League } from './models/league.model';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    const leagues = ref<League[]>([]);

    onMounted(async () => {
      try {
        const data = await getLeagues();
        leagues.value = data; // Update the leagues data
      } catch (error) {
        console.error('Error fetching leagues:', error);
      }
    });

    return {
      leagues,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
