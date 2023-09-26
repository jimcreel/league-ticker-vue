import { defineStore } from 'pinia';
import { League } from '@/models/league.model';
import { supabase } from '@/lib/supabaseClient';
import { Team } from '@/models/team.model';

export const useLeagueStore = defineStore({
  id: 'league',
  state: () => ({
    leagues: [] as League[],
    selectedLeague: {} as League,
    isDataLoaded: false,
    teams: [] as Team[],
    lastTeamId: 0,
  }),
  getters: {
    getLeagues: (state) => state.leagues,
    getSelectedLeague: (state) => state.selectedLeague,
    getTeams: (state) => state.teams,
  },
  actions: {
    setInitialState(leagues: League[]) {
      this.leagues = leagues;
      this.teams = [];
    },
    async fetchLeagues() {
      try {
        const { data } = await supabase
          .from('league_lu')
          .select('*');

        if (data === null) {
          throw new Error('Data is null.');
        }

        this.setInitialState(data);
      } catch (error) {
        console.error('Error fetching leagues:', error);
        throw error;
      }
    },
    
    async setSelectedLeague(id: number) {
      console.log('setSelectedLeague', id);
      const league = this.leagues.find((league) => league.id == id);
      if (league === undefined) {
        throw new Error('League not found.');
      }
      else {
        this.selectedLeague = league;
      }
      
    },
    async fetchLeagueTeams(id: number) {
      const teamIdList: number[] = []
      try {
        const { data, error } = await supabase
          .from('league_team')
          .select('*')
          .eq('league_id', id)
          .select('team_id')
        
        // Check if data is not null and is an array
        if (data !== null && Array.isArray(data)) {
          data.forEach((element) => {
            // Check if element and element.team_id are defined
            if (element && element.team_id !== null) {
              teamIdList.push(element.team_id)
            }
          })
        }
    
        const { data: teams, error: teamsError } = await supabase
          .from('teams')
          .select('*')
          .in('id', teamIdList)
        
        if (teams !== null) {
          this.teams = teams
        }
      } catch (error) {
        console.error('Error fetching league teams:', error);
        throw error;
      }
    }
    
    
}});
