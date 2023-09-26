<template>
  <LeagueSelect />
  
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import  LeagueSelect  from './components/LeagueSelect.vue';

export default defineComponent({
  components: {
    LeagueSelect
  },
});
</script>

<style> 
body {
  background-color: #03A9F4;
}
.weather-icon {
  width: 150px;
  height: 150px;
}
</style>

