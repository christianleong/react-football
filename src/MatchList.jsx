import { useEffect, useState } from 'react'
import FixturesAPI from './utils/FixturesAPI'
import NavBar from './NavBar'
import moment from 'moment'
import './MatchList.css'

export default function MatchList() {

  const [nextFixtures, setNextFixtures] = useState([])
  const [lastFixtures, setLastFixtures] = useState([])
  const [numOfFixtures, setNumOfFixtures] = useState(15)

  useEffect(() => {
    FixturesAPI.showNextMatchesByLeague(numOfFixtures)
      .then(setNextFixtures)
    FixturesAPI.showLastMatchesByLeague(numOfFixtures)
      .then(setLastFixtures)
  }, [numOfFixtures])

  function convertUnixToTime(unixtimestamp) {
    return(moment(unixtimestamp*1000).format('hh:mm A ddd MMM Do'))
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Increment numOfFixtures by 5
    setNumOfFixtures(prevNumOfFixtures => prevNumOfFixtures + 5);
  }
  

  return (
    <div className="bg-white">
      <NavBar />

      <div className="relative isolate px-6 pt-14 lg:px-8">
        
        <div className="mx-auto py-32 sm:py-48 lg:py-56">

            <div className='wrapper'>

              <section className='upcoming-matches-section'>
                <table>
                  
                  <caption>
                    Upcoming matches
                  </caption>

                  <tbody>
                    {nextFixtures.map((fixture, idx) => 
                    <>
                      <tr>
                        <td className='time-td' rowSpan={2}>{convertUnixToTime(fixture.timestamp)}</td>
                        <td className='logo-td'><img src={fixture.homeTeamLogo} alt="" /></td>
                        <td className='team-name-td'>{fixture.homeTeam}</td>
                        <td className='score-td'>-</td>
                      </tr>
                      <tr>
                        <td className='logo-td'><img src={fixture.awayTeamLogo} alt="" /></td>
                        <td className='team-name-td'>{fixture.awayTeam}</td>
                        <td className='score-td'>-</td>
                      </tr>
                    </>
                    )}
                  </tbody>

                </table>
              </section>

              <section className='recent-matches-section'>
                <table>
                  
                  <caption>
                    Recent matches
                  </caption>

                  <tbody>
                    {lastFixtures.map((fixture, idx) => 
                    <>
                      <tr >
                        <td className='time-td' rowSpan={2}>{convertUnixToTime(fixture.timestamp)}</td>
                        <td className='logo-td'><img src={fixture.homeTeamLogo} alt="" /></td>
                        <td className='team-name-td'>{fixture.homeTeam}</td>
                        <td className='score-td'>{fixture.homeGoals}</td>
                      </tr>
                      <tr>
                        <td className='logo-td'><img src={fixture.awayTeamLogo} alt="" /></td>
                        <td className='team-name-td'>{fixture.awayTeam}</td>
                        <td className='score-td'>{fixture.awayGoals}</td>
                      </tr>
                    </>
                    )}
                  </tbody>

                </table>
              </section>
 
            </div>
            <form onSubmit={handleSubmit} action="">
              <button>Load 5 more</button>
            </form>
        </div>

      </div>
      
    </div>
  )
}
