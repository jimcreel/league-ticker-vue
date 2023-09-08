import { supabase } from "@/lib/supabaseClient"
import { useLeagueStore } from "@/store"
import { League } from "../models/league.model"
import { LeagueTeam } from "../models/leagueteam.model"
import { Team } from "../models/team.model"



export async function getLeagues(): Promise<League[]> {
  try {
    const leagueStore = useLeagueStore()
    const { data } = await supabase
      .from('league_lu')
      .select('*') as { data: League[] }; // Use type assertion

    // Handle the case where data might be null
    if (data === null) {
      throw new Error('Data is null.'); // You can handle this error as needed
    }

    leagueStore.setInitialState(data);
    return data;
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

export async function createTeam(req:Team) {
    const { data, error } = await supabase
    .from('teams')
    .insert(req)
    if (error) {
        console.log(error)
    }
    return data
}

export async function createLeagueTeam(req: LeagueTeam){
    const {data, error} = await supabase
    .from('league_team')
    .insert(req)
    if (error) {
        console.log(error)
    }
    return data
}

