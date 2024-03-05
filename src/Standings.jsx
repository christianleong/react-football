import { useEffect, useState } from 'react'
import NavBar from './NavBar'
import StandingsAPI from './utils/StandingsAPI'
import './Standings.css'

export default function Standings() {

    const [standings, setStandings] = useState([])
    const [leagueData, setLeagueData] = useState([])

    useEffect(() => {
        // StandingsAPI.showStandingsByLeague()
        //     .then(setStandings)
        // StandingsAPI.showStandingsLeagueDetails()
        //     .then(setLeagueData)
    }, [])


    return (
        <div className="bg-white"> 
            <NavBar />

            <div className="relative isolate px-6 pt-14 lg:px-8">

                <div className='standings-wrapper'>

                    <table>
                        <thead>
                            <th>Club</th>
                            <th>MP</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                            <th>Pts</th>
                            <th>Last 5</th>
                        </thead>
                        
                        {standings.map(standing =>
                            <tbody>
                                <th className='standing-teams'>{standing.teamRank} <img src={standing.teamLogo} alt="" /> {standing.teamName}</th>
                                <td>{standing.teamMP}</td>
                                <td>{standing.teamWins}</td>
                                <td>{standing.teamDraws}</td>
                                <td>{standing.teamLosses}</td>
                                <td>{standing.teamGF}</td>
                                <td>{standing.teamGA}</td>
                                <td>{standing.teamGD}</td>
                                <td>{standing.teamPts}</td>
                                <td>{standing.teamLast5}</td>
                            </tbody>
                        )}
                    </table>

                </div>

            </div>
            
        </div>
    )
}