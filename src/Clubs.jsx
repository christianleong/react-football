import NavBar from "./NavBar"
import './Clubs.css'
import teamsData from "./teamsData"

export default function Clubs() {

    return (
        <div className="bg-white"> 
            <NavBar />

            <div className="relative isolate px-6 pt-123 lg:px-40">

                <div className="cards-wrapper mx-auto py-32 sm:py-48 lg:py-56">
                    
                    {teamsData.map(team => 
                        <div className="card">
                            <img src={team.logo} alt="" />
                            <h2>{team.name}</h2>
                        </div>
                    )}

                </div>

            </div>
            
        </div>
    )
}


