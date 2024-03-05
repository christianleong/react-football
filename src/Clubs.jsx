import { useState } from "react"
import NavBar from "./NavBar"

export default function Clubs() {
    
    // const [clubs, setClubs] = useState[{name: "Manchester United", logo: "https://media.api-sports.io/football/teams/33.png" }]

    return (
        <div className="bg-white"> 
            <NavBar />

            <div className="relative isolate px-6 pt-14 lg:px-8">

                <div className="mx-auto py-32 sm:py-48 lg:py-56">
                    
                   {/* <div className="club-cards-wrapper">
                    <ul className="club-list">
                        <li className="club-card-wrapper">
                            <a href="">
                                <div className="club-card-badge">
                                    <div className="club-card-info">
                                        <h2>Arsenal</h2>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                   </div> */}

                </div>

            </div>
            
        </div>
    )
}