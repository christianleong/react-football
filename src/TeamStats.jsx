import { useEffect, useState } from 'react'
import NavBar from './NavBar'
import './TeamStats.css'
import TeamsAPI from './utils/TeamsAPI'
import { convertUnixToDayMonthYear } from '/src/utils/UnixConverter.js';
import teamsDropdown from './teamsDropdown'

export default function TeamStats() {

  const [searchInput1, setSearchInput1] = useState("")
  const [teamStats1, setTeamStats1] = useState([])
  const [searchInput2, setSearchInput2] = useState("")
  const [teamStats2, setTeamStats2] = useState([])
  const [h2hStats, setH2HStats] = useState([])

  function handleClick1(e) {
    e.preventDefault()
    console.log('clicking');
    TeamsAPI.showTeamStats(searchInput1)
      .then(setTeamStats1)
  }

  function handleClick2(e) {
    e.preventDefault()
    console.log('clicking');
    TeamsAPI.showTeamStats(searchInput2)
      .then(setTeamStats2)
  }

  function handleChange1(e) {
    setSearchInput1(e.target.value)
  }

  function handleChange2(e) {
    setSearchInput2(e.target.value)
  }

  useEffect(() => {
    if (teamStats1 && teamStats2) {
      TeamsAPI.showh2hStats(teamStats1.teamId, teamStats2.teamId)
        .then(setH2HStats)
    }
  }, [teamStats1, teamStats2]);

  return (
    <div className="bg-white">
      <NavBar />

      <div style={{marginTop: "200px"}}>

        <div className='stats-wrapper'>
          <h3>Team Statistics</h3>
          <div className='form-wrapper'>
            {/* 1st select field */}
            <section className="search-section">
              <form onSubmit={handleClick1} action="">
                <label htmlFor="">Select a team</label>
                <select onChange={handleChange1}>
                  {teamsDropdown.map((team, idx) =>
                    <option key={idx} value={team.name}>{team.name}</option>
                  )}
                </select>
                <button>submit</button>
              </form>
            </section>

            {/* 2nd select field */}
            <section className="search-section">
              <form onSubmit={handleClick2} action="">
                <label htmlFor="">Select a team</label>
                <select onChange={handleChange2}>
                  {teamsDropdown.map((team, idx) =>
                    <option key={idx} value={team.name}>{team.name}</option>
                  )}
                </select>
                <button>submit</button>
              </form>
            </section>
          </div>

          <div className='table-wrapper'>
            {/* Table 1 */}
            <table className='stats-table'>
              <thead>
                <tr>
                  <th></th>
                  <th colSpan={3}>{searchInput1}</th>
                  {teamStats2 && <th colSpan={3}>{searchInput2}</th>}
                </tr>
              </thead>
              <thead>
                <tr>
                  <th></th>
                  <th>HOME</th>
                  <th>AWAY</th>
                  <th>ALL</th>
                  {teamStats2 && (
                    <>
                      <th>HOME</th>
                      <th>AWAY</th>
                      <th>ALL</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Games played</th>
                  <td>{teamStats1.playedHome}</td>
                  <td>{teamStats1.playedAway}</td>
                  <td>{teamStats1.playedAll}</td>
                  {teamStats2 && (
                    <>
                      <td>{teamStats2.playedHome}</td>
                      <td>{teamStats2.playedAway}</td>
                      <td>{teamStats2.playedAll}</td>
                    </>
                  )}
                </tr>
                <tr>
                  <th>Wins</th>
                  <td>{teamStats1.winsHome}</td>
                  <td>{teamStats1.winsAway}</td>
                  <td>{teamStats1.winsAll}</td>
                  {teamStats2 && (
                    <>
                      <td>{teamStats2.winsHome}</td>
                      <td>{teamStats2.winsAway}</td>
                      <td>{teamStats2.winsAll}</td>
                    </>
                  )}
                </tr>
                <tr>
                  <th>Draws</th>
                  <td>{teamStats1.drawsHome}</td>
                  <td>{teamStats1.drawsAway}</td>
                  <td>{teamStats1.drawsAll}</td>
                  {teamStats2 && (
                    <>
                      <td>{teamStats2.drawsHome}</td>
                      <td>{teamStats2.drawsAway}</td>
                      <td>{teamStats2.drawsAll}</td>
                    </>
                  )}
                </tr>
                <tr>
                  <th>Loss</th>
                  <td>{teamStats1.losesHome}</td>
                  <td>{teamStats1.losesAway}</td>
                  <td>{teamStats1.losesAll}</td>
                  {teamStats2 && (
                    <>
                      <td>{teamStats2.losesHome}</td>
                      <td>{teamStats2.losesAway}</td>
                      <td>{teamStats2.losesAll}</td>
                    </>
                  )}
                </tr>
                <tr>
                  <th>Goals For</th>
                  <td>{teamStats1.goalsForHome}</td>
                  <td>{teamStats1.goalsForAway}</td>
                  <td>{teamStats1.goalsForAll}</td>
                  {teamStats2 && (
                    <>
                      <td>{teamStats2.goalsForHome}</td>
                      <td>{teamStats2.goalsForAway}</td>
                      <td>{teamStats2.goalsForAll}</td>
                    </>
                  )}
                </tr>
                <tr>
                  <th>Goals Against</th>
                  <td>{teamStats1.goalsAgainstHome}</td>
                  <td>{teamStats1.goalsAgainstAway}</td>
                  <td>{teamStats1.goalsAgainstAll}</td>
                  {teamStats2 && (
                    <>
                      <td>{teamStats2.goalsAgainstHome}</td>
                      <td>{teamStats2.goalsAgainstAway}</td>
                      <td>{teamStats2.goalsAgainstAll}</td>
                    </>
                  )}
                </tr>
              </tbody>
            </table>
          </div>

          <div className='h2h-wrapper'>
            <h3>Past Head-to-Head Results</h3>
            <div className='h2h-table'>
              {h2hStats.map((stat, idx) => 
                <div key={idx}>
                  <header>
                    <h2>{convertUnixToDayMonthYear(stat.unixTimestamp)}</h2>
                  </header>
                  <section className='h2h-details'>
                    <div className='h2h-cols1'>{stat.homeTeamName}</div>
                    <div className='h2h-cols2'>{stat.homeGoals}-{stat.awayGoals}</div>
                    <div className='h2h-cols3'>{stat.awayTeamName}</div>
                  </section>
                </div>
                )}
            </div>
          </div>

        </div>

      </div>
      
    </div>
  )
}


          // <tbody>
          //   <tr>
          //     <th>Games played</th>
          //     <td>{teamStats1.playedHome}</td>
          //     <td>{teamStats1.playedAway}</td>
          //     <td>{teamStats1.playedAll}</td>
          //   </tr>
          //   <tr>
          //     <th>Wins</th>
          //     <td>{teamStats1.winsHome}</td>
          //     <td>{teamStats1.winsAway}</td>
          //     <td>{teamStats1.winsAll}</td>
          //   </tr>
          //   <tr>
          //     <th>Draws</th>
          //     <td>{teamStats1.drawsHome}</td>
          //     <td>{teamStats1.drawsAway}</td>
          //     <td>{teamStats1.drawsAll}</td>
          //   </tr>
          //   <tr>
          //     <th>Loss</th>
          //     <td>{teamStats1.losesHome}</td>
          //     <td>{teamStats1.losesAway}</td>
          //     <td>{teamStats1.losesAll}</td>
          //   </tr>
          //   <tr>
          //     <th>Goals For</th>
          //     <td>{teamStats1.goalsForHome}</td>
          //     <td>{teamStats1.goalsForAway}</td>
          //     <td>{teamStats1.goalsForAll}</td>
          //   </tr>
          //   <tr>
          //     <th>Goals Against</th>
          //     <td>{teamStats1.goalsAgainstHome}</td>
          //     <td>{teamStats1.goalsAgainstAway}</td>
          //     <td>{teamStats1.goalsAgainstAll}</td>
          //   </tr>
          // </tbody>