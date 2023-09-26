import { supabase } from "@/lib/supabaseClient"
import { useLeagueStore } from "@/store"
import { League } from "../models/league.model"
import { LeagueTeam } from "../models/leagueteam.model"
import { Team } from "../models/team.model"



export async function getLeagues(leagues: ReturnType<typeof useLeagueStore>): Promise<void> {
  try {
    
    const { data } = await supabase
      .from('league_lu')
      .select('*') // Use type assertion

    // Handle the case where data might be null
    if (data === null) {
      throw new Error('Data is null.'); // You can handle this error as needed
    }
    console.log('api getLeagues', data)
    leagues.setInitialState(data);
  } catch (error) {
    console.error('Error fetching leagues:', error);
    throw error; // You can handle the error further or rethrow it if needed
  }
}





export async function getLeagueTeam(id: number) {
    const { data, error } = await supabase
    .from('league_team_lu')
    .select('*')
    .eq('league_id', id)
    if (error) {
        console.log(error)
    }
    return data
}


export async function getTeams() {
    const { data, error } = await supabase
    .from('teams')
    .select('*')
    return data
}

export async function getTeam(id: number) {
    const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('id', id)
    return data
}

export async function createLeague(req:League) {
    
    console.log('createLeague api',req)
    const { data, error } = await supabase
    .from('league_lu')
    .insert(req)
    if (error) {
        console.log(error)
    }
    return data
}

export async function createTeam(req: Team, league: number): Promise<Team | undefined> {
  try {
      console.log('createTeam api', req);
      await supabase
          .from('teams')
          .insert(req)
          .select('*')
          .then((data) => {
              console.log('createTeam', data);
              if (data.data) {
                  const leagueTeam: LeagueTeam = {
                      league_id: league,
                      team_id: data.data[0].id,
                  };
                  createLeagueTeam(leagueTeam);
                  return data.data[0];
              }
          });
      
      return undefined;
  } catch (error) {
      console.error('Error creating team:', error);
      return undefined;
  }
}



export async function createLeagueTeam(req: LeagueTeam){
    console.log('createLeagueTeam api',req)
    const {data, error} = await supabase
    .from('league_team')
    .insert(req)
    .select('*')

    if (error) {
        console.log(error)
    }
    console.log('createLeagueTeam', data)
    return data
}

