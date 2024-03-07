import { useEffect, useState } from 'react'
import NavBar from './NavBar'
import StandingsAPI from './utils/StandingsAPI'
import './Standings.css'
import { MinusCircleIcon } from '@heroicons/react/24/solid'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { XCircleIcon } from '@heroicons/react/24/solid'
import { BeatLoader } from "react-spinners";
import ScrollListener from './ScrollListener'

export default function Standings() {

    const [standings, setStandings] = useState([])
    const [leagueData, setLeagueData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        StandingsAPI.showStandingsByLeague()
            .then(setStandings)
            .then(() => setIsLoading(false));
        StandingsAPI.showStandingsLeagueDetails()
            .then(setLeagueData)
    }, [])

    function getIcon (str) {
        switch (str) {
            case 'W':
                return <CheckCircleIcon className='h-6 w-6 text-green-500' />
            case 'D':
                return <MinusCircleIcon className='h-6 w-6 text-gray-500' />
            case 'L':
                return <XCircleIcon className='h-6 w-6 text-red-500' />
            default:
                return null
        }
    }
    function renderLast5Icons(last5) {
        return (
            <div className='flex'>
                {last5.split('').map((result, index) => (
                    <span key={index}>{getIcon(result)}</span>
                ))}
            </div>
        )
    }

    return (
        <div className="bg-white"> 
            <NavBar />

            <div style={{ marginTop:"120px" }}>

                <div className='standings-wrapper'>

                    <table>

                        {isLoading 
                        ? <thead></thead>
                        :
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
                        </thead>}
                        
                        <tbody>
                        {standings.map(standing =>
                            <tr>
                                <th className='standing-teams'>{standing.teamRank} <img src={standing.teamLogo} alt="" /> {standing.teamName}</th>
                                <td>{standing.teamMP}</td>
                                <td>{standing.teamWins}</td>
                                <td>{standing.teamDraws}</td>
                                <td>{standing.teamLosses}</td>
                                <td>{standing.teamGF}</td>
                                <td>{standing.teamGA}</td>
                                <td>{standing.teamGD}</td>
                                <td>{standing.teamPts}</td>
                                <td>{renderLast5Icons(standing.teamLast5)}</td>
                            </tr>
                        )}
                        </tbody>

                    </table>

                        {isLoading 
                        ? <div></div>
                        :
                        <div>
                            <h2>Glossary</h2>
                            <div className='glossary-wrapper'>
                                <div>
                                    <h3>MP = Matches Played</h3>
                                    <h3>W = Wins</h3>
                                    <h3>D = Draws</h3>
                                    <h3>L = Loses</h3>
                                </div>
                                <div>
                                    <h3>GF = Goals For</h3>
                                    <h3>GA = Goals Against</h3>
                                    <h3>GD = Goals Difference</h3>
                                    <h3>Pts = Points</h3>
                                </div>
                            </div>
                        </div>
                        }


                </div>
            <ScrollListener />
            </div>
            
        </div>
    )
}