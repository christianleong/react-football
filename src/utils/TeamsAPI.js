import axios from "axios";

const ApiKey = import.meta.env.VITE_SOME_KEY_API_FOOTBALL_KEY;

// axios fetch to get team id
async function showTeamStats(searchInput) {
  try {
    const result1 = await axios.get(
      `https://v3.football.api-sports.io/teams?search=${searchInput}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": ApiKey,
        },
      }
    );

    let selectedTeamId = result1.data.response[0].team.id;
    // axios fetch to get team stats
    const result2 = await axios.get(
      `https://v3.football.api-sports.io/teams/statistics?league=39&team=${selectedTeamId}&season=2023`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": ApiKey,
        },
      }
    );
    // console.log(result2.data.response);

    function getArrOfLineups(arr) {
      let lineups = [];
      return (lineups = arr.map((lineup) => ({
        lineupFormation: lineup.formation,
        lineupTotal: lineup.played,
      })));
    }

    let teamStats = result2.data.response;

    let newData = {
      teamId: teamStats.team.id,
      playedHome: teamStats.fixtures.played.home,
      playedAway: teamStats.fixtures.played.away,
      playedAll: teamStats.fixtures.played.total,
      winsHome: teamStats.fixtures.wins.home,
      winsAway: teamStats.fixtures.wins.away,
      winsAll: teamStats.fixtures.wins.total,
      drawsHome: teamStats.fixtures.draws.home,
      drawsAway: teamStats.fixtures.draws.away,
      drawsAll: teamStats.fixtures.draws.total,
      losesHome: teamStats.fixtures.loses.home,
      losesAway: teamStats.fixtures.loses.away,
      losesAll: teamStats.fixtures.loses.total,
      goalsForHome: teamStats.goals.for.total.home,
      goalsForAway: teamStats.goals.for.total.away,
      goalsForAll: teamStats.goals.for.total.total,
      goalsAgainstHome: teamStats.goals.against.total.home,
      goalsAgainstAway: teamStats.goals.against.total.away,
      goalsAgainstAll: teamStats.goals.against.total.total,
      teamLineups: getArrOfLineups(teamStats.lineups),
    };

    console.log(newData);
    return newData; // Optionally return data if needed for further processing

  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Optionally rethrow the error or handle it gracefully
  }
}

async function showh2hStats(homeId, awayId) {
  try {
    const result3 = await axios.get(
      `https://v3.football.api-sports.io/fixtures/headtohead?h2h=${homeId}-${awayId}&last=5`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": ApiKey,
        },
      }
    );

    const h2hStats = result3.data.response;
    let newData = h2hStats.map(stat => ({
      unixTimestamp: stat.fixture.timestamp,
      homeGoals: stat.goals.home,
      awayGoals: stat.goals.away,
      homeTeamName: stat.teams.home.name,
      awayTeamName: stat.teams.away.name,
    }))
    console.log(newData);
    return newData
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Optionally rethrow the error or handle it gracefully
  }
}



const TeamsAPI = {
  showTeamStats,
  showh2hStats
};

export default TeamsAPI;
