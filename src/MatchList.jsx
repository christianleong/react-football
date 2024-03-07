import { useEffect, useState } from 'react'
import FixturesAPI from './utils/FixturesAPI'
import NavBar from './NavBar'
import './MatchList.css'
import ScrollListener from './ScrollListener'
import { BeatLoader } from 'react-spinners'
import { convertUnixToTimeDayMonth } from '/src/utils/UnixConverter.js';

export default function MatchList() {

  const [nextFixtures, setNextFixtures] = useState([])
  const [lastFixtures, setLastFixtures] = useState([])
  const [numOfFixtures, setNumOfFixtures] = useState(15)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    FixturesAPI.showNextMatchesByLeague(numOfFixtures)
      .then(setNextFixtures)
      .then(() => setIsLoading(false));
    FixturesAPI.showLastMatchesByLeague(numOfFixtures)
      .then(setLastFixtures)
      .then(() => setIsLoading(false));
  }, [numOfFixtures])
  
  return (
    <div className="bg-white">
      <NavBar />

      <div>
        
        <div style={{ marginTop: "120px", marginBottom: "70px" }}>

            <div className='wrapper'>

              <section className='upcoming-matches-section'>
                <table>
                  
                  {isLoading 
                  ? <caption></caption> 
                  : <caption>Upcoming matches</caption>}

                  <tbody>
                    {nextFixtures.map((fixture, idx) => 
                    <>
                      <tr>
                        <td className='time-td' rowSpan={2}>{convertUnixToTimeDayMonth(fixture.timestamp)}</td>
                        <td className='logo-td-home'><img src={fixture.homeTeamLogo} alt="" /></td>
                        <td className='team-name-td-home'>{fixture.homeTeam}</td>
                        <td className='score-td-home'>-</td>
                      </tr>
                      <tr>
                        <td className='logo-td-away'><img src={fixture.awayTeamLogo} alt="" /></td>
                        <td className='team-name-td-away'>{fixture.awayTeam}</td>
                        <td className='score-td-away'>-</td>
                      </tr>
                    </>
                    )}
                  </tbody>

                </table>
              </section>

              <section className='recent-matches-section'>
                <table>
                  
                  {isLoading 
                  ? <caption></caption> 
                  : <caption>Recent matches</caption>}

                  <tbody>
                    {lastFixtures.map((fixture, idx) => 
                    <>
                      <tr >
                        <td className='time-td' rowSpan={2}>{convertUnixToTimeDayMonth(fixture.timestamp)}</td>
                        <td className='logo-td-home'><img src={fixture.homeTeamLogo} alt="" /></td>
                        <td className='team-name-td-home'>{fixture.homeTeam}</td>
                        {fixture.homeGoals === null 
                        ? <td className='score-td-home'>{fixture.matchStatus}</td>
                        : <td className='score-td-home'>{fixture.homeGoals}</td>}
                      </tr>
                      <tr>
                        <td className='logo-td-away'><img src={fixture.awayTeamLogo} alt="" /></td>
                        <td className='team-name-td-away'>{fixture.awayTeam}</td>
                        {fixture.homeGoals === null 
                        ? <td className='score-td-away'>{fixture.matchStatus}</td>
                        : <td className='score-td-away'>{fixture.awayGoals}</td>}
                      </tr>
                    </>
                    )}
                  </tbody>

                </table>
              </section>
            </div>

            <ScrollListener setNumOfFixtures={setNumOfFixtures}/>
            {isLoading ? <div className="loading-spinner"><BeatLoader /></div> : <div></div> }

            
        </div>

      </div>
      
    </div>
  )
}
