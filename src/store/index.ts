import { defineStore } from 'pinia';
import { League } from '@/models/league.model';

export const useLeagueStore = defineStore({
  id: 'root',
  state: () => ({
    leagues: [] as League[],
    isDataLoaded: false, // Add a flag to track data loading
    error: null,
  }),
  getters: {
    getLeagues: (state) => state.leagues,
  },
  actions: {
    setInitialState(leagues: League[]) {
      this.leagues = leagues;
      this.isDataLoaded = true; // Set the flag to indicate data has been loaded
    },
  },
});
