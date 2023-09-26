<template>
  <v-card class = "mx-auto" max-width="500">
    <v-card-title class="text-center">
      <h1>League Select</h1>
    </v-card-title>
    <v-select 
      :items="leagues"
      :label="'Select League'"
      :value="selectedLeague? selectedLeague.name : ''"
      @update:model-value="handleLeagueChange($event)"
      item-title="name"
      item-value="id"
    ></v-select>

    <v-card-title class="text-center">
      <h1 v-if = "teams.length > 0">Teams</h1>
      <h3 v-else>Please select a league or add teams</h3>

    </v-card-title>
    <v-list
      v-if = "teams"
      >
      <v-list-item
        v-for="team in teams"
        :key="team.id?.toString()"

      >
        <v-list-item-content>
          <v-list-item-title>{{ team.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
<!-- add at team to the league -->
    <v-form>
      
      <v-text-field
        v-model="teamFullName"
        :value = "teamFullName"
        label="Team Name"
        required
      ></v-text-field>
      <v-select
        v-model="teamSeason"
        :items="seasons"
        label="Season"
        :value = "teamSeason"
        required
      ></v-select>
      <v-text-field
        v-model="teamAbbreviation"
        label="Team Abbreviation"
        required
      ></v-text-field>
      <v-text-field
        v-model="teamName"
        label="Team Mascot"
        required
      ></v-text-field>
      <v-text-field
        v-model="teamShortName"
        label="Team Short Name"
        required
      >
      </v-text-field>

      <v-btn
        @click="handleAddTeam"
        color="primary"
        type="submit"
        
      >Add Team</v-btn>

  </v-form>

    
  </v-card>
</template>


<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue';
import { getLeagues, createTeam} from '../api/api';
import { useLeagueStore } from '../store';
import { Team } from '../models/team.model'








export default defineComponent({
  name: 'LeagueSelect',
  
  setup() {
    const leagueStore = useLeagueStore();
    const leagues = computed(() => leagueStore.getLeagues);
    const teams = computed(() => leagueStore.getTeams);
    const teamFullName = ref('');
    const teamSeason = ref(2023);
    const teamName = ref('');
    const teamShortName= ref('');
    const teamAbbreviation= ref('');

    const selectedLeague = computed(() => leagueStore.getSelectedLeague);
    const fetchLeagueTeams = (leagueId: number) => leagueStore.fetchLeagueTeams(leagueId);
    const setSelectedLeague = (leagueId: number) => leagueStore.setSelectedLeague(leagueId);
    const seasons = [2023, 2024, 2025, 2026, 2027]

    function handleLeagueChange(selectedItem: any) {
      console.log('selected item: ', selectedItem);
      setSelectedLeague(selectedItem);
      fetchLeagueTeams(selectedItem); 
    }

    async function handleAddTeam(){
      const newTeam: Team = {
        name: teamFullName.value,
        season: teamSeason.value,
        abbreviation: teamAbbreviation.value,
        teamName: teamName.value,
        shortName: teamShortName.value,
      }
      const selectedLeagueID = selectedLeague.value.id
      
      await createTeam(newTeam, selectedLeagueID)
    }
  

    // Call the fetchLeagues function on component mount
    onMounted(async () => {
      try {
        await getLeagues(leagueStore); // Pass the store instance to the function
        console.log(leagues.value); // Now leagues should contain the updated data
      } catch (error) {
        console.error('Error in onMounted:', error);
        
      }
    });

    return {
      leagues,
      selectedLeague,
      handleLeagueChange,
      setSelectedLeague,
      teams,
      teamFullName,
      seasons,
      teamSeason,
      teamName,
      teamShortName,
      handleAddTeam,
      teamAbbreviation,
    };
  },
});
</script>

