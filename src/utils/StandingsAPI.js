import axios from "axios";

const ApiKey = import.meta.env.VITE_SOME_KEY_API_FOOTBALL_KEY;

// axios fetch to get all teams' rankings and return an array of data.
async function showStandingsByLeague() {
  try {
    const res = await axios.get(
      "https://v3.football.api-sports.io/standings?league=39&season=2023",
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": ApiKey,
        },
      }
    );
    const data = res.data;
    let standingsData = data.response[0];

    let standingsTeamsData = standingsData.league.standings[0];
    let newData = standingsTeamsData.map((eachTeam) => ({
      teamRank: eachTeam.rank,
      teamId: eachTeam.team.id,
      teamName: eachTeam.team.name,
      teamLogo: eachTeam.team.logo,
      teamPts: eachTeam.points,
      teamGD: eachTeam.goalsDiff,
      teamLast5: eachTeam.form,
      teamMP: eachTeam.all.played,
      teamWins: eachTeam.all.win,
      teamDraws: eachTeam.all.draw,
      teamLosses: eachTeam.all.lose,
      teamGF: eachTeam.all.goals.for,
      teamGA: eachTeam.all.goals.against,
    }));

    console.log(newData);
    return newData; // Optionally return data if needed for further processing
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Optionally rethrow the error or handle it gracefully
  }
}

// axios to fetch current league data and store it as an object
async function showStandingsLeagueDetails() {
  try {
    const res = await axios.get(
      "https://v3.football.api-sports.io/standings?league=39&season=2023",
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": ApiKey,
        },
      }
    );
    const data = res.data;
    let standingsData = data.response[0];

    let standingsLeagueData = {
      leagueId: standingsData.league.id,
      leagueName: standingsData.league.name,
      leagueSeason: standingsData.league.season,
      leagueLogo: standingsData.league.logo
    };
    
    console.log(standingsLeagueData);
    return standingsLeagueData; // Optionally return data if needed for further processing
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Optionally rethrow the error or handle it gracefully
  }
}


const StandingsAPI = {
  showStandingsByLeague,
  showStandingsLeagueDetails,
};

export default StandingsAPI;
