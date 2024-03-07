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

                    <table className='standings-table'>

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
                        {standings.map((standing, idx) =>
                            <tr key={idx}>
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
                        <div className='footer-wrapper'>
                            <h2>Glossary</h2>
                            <div className='glossary-wrapper'>
                                <div className='glossary-1'>
                                    <h4>MP = Matches Played</h4>
                                    <h4>W = Wins</h4>
                                    <h4>D = Draws</h4>
                                    <h4>L = Loses</h4>
                                </div>
                                <div className='glossary-2'>
                                    <h4>GF = Goals For</h4>
                                    <h4>GA = Goals Against</h4>
                                    <h4>GD = Goals Difference</h4>
                                    <h4>Pts = Points</h4>
                                </div>
                            </div>
                        </div>
                        }


                </div>
            <ScrollListener />
            {isLoading ? <div className="loading-spinner"><BeatLoader /></div> : <div></div> }
            </div>
            
        </div>
    )
}