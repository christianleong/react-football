import axios from "axios";

const ApiKey = import.meta.env.VITE_SOME_KEY_API_FOOTBALL_KEY;

// axios fetch to get next 15 matches and return an array of data.
async function showNextMatchesByLeague(input) {
  try {
    const num = input;    
    const res = await axios.get(
      `https://v3.football.api-sports.io/fixtures?league=39&next=${num}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": ApiKey,
        },
      }
    );
    const data = res.data;
    let matchesData = data.response;
    let newData = matchesData.map((match) => ({
      timestamp: match.fixture.timestamp,
      homeGoals: match.goals.home,
      awayGoals: match.goals.away,
      countryLeague: match.league.country,
      league: match.league.name,
      homeTeam: match.teams.home.name,
      awayTeam: match.teams.away.name,
      homeTeamLogo: match.teams.home.logo,
      awayTeamLogo: match.teams.away.logo,
    }));

    console.log(newData);
    return newData; // Optionally return data if needed for further processing
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Optionally rethrow the error or handle it gracefully
  }
}

// axios fetch to get last 15 matches and return an array of data.
async function showLastMatchesByLeague(input) {
  try {
    const num = input
    const res = await axios.get(
      `https://v3.football.api-sports.io/fixtures?league=39&last=${num}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": ApiKey,
        },
      }
    );
    const data = res.data;
    let matchesData = data.response;
    let newData = matchesData.map((match) => ({
      timestamp: match.fixture.timestamp,
      homeGoals: match.goals.home,
      awayGoals: match.goals.away,
      countryLeague: match.league.country,
      league: match.league.name,
      homeTeam: match.teams.home.name,
      awayTeam: match.teams.away.name,
      homeTeamLogo: match.teams.home.logo,
      awayTeamLogo: match.teams.away.logo,
    }));
    console.log(newData);
    return newData; // Optionally return data if needed for further processing
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Optionally rethrow the error or handle it gracefully
  }
}


const FixturesAPI = {
  showNextMatchesByLeague,
  showLastMatchesByLeague,
};

export default FixturesAPI;
