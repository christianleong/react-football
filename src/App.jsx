import './App.css'
import Clubs from './Clubs'
import TeamStats from './TeamStats'
import Hero from './Hero'
import MatchList from './MatchList'
import Standings from './Standings'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Hero/>}></Route>
        <Route path="/matches" element={<MatchList/>}></Route>
        <Route path="/teamstats" element={<TeamStats/>}></Route>
        <Route path="/standings" element={<Standings />}></Route>
        <Route path="/clubs" element={<Clubs />}></Route>
      </Routes>
    </>
  )
}

export default App