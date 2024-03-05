import { useEffect, useState } from 'react'
import NavBar from './NavBar'
import FixturesAPI from './utils/FixturesAPI'
import './MatchList.css'

export default function MatchList() {

  const [nextFixtures, setNextFixtures] = useState([])
  const [lastFixtures, setLastFixtures] = useState([])

  useEffect(() => {
    FixturesAPI.showNext15MatchesByLeague()
      .then(setNextFixtures)
    FixturesAPI.showLast15MatchesByLeague()
      .then(setLastFixtures)
  },[])

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
                        <td className='time-td' rowSpan={2}>{fixture.timestamp}</td>
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
                        <td className='time-td' rowSpan={2}>{fixture.timestamp}</td>
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
 
            </div>
        </div>

      </div>
      
    </div>
  )
}



  // function getCurrentTime() {
  //   new Date().getTime()/1000;
  //   console.log(moment.utc())
  //   console.log(moment())
  // }

  // getCurrentTime()

  {/* <caption className='league-name'>{fixture.countryLeague} {fixture.league}</caption> */}