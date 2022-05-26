import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Basketball from "./pages/main/basketball";
import Football from "./pages/main/football";
import Formula1 from "./pages/main/formula1";
import Motogp from "./pages/main/motogp";
import Tennis from "./pages/main/tennis";
import PremierLeague from "./pages/premierLeague";
import SerieA from "./pages/serieA";
import Index from "./pages/main/index";
import {Header} from './components/Header';
import LaLiga from "./pages/laliga";
import Bundesliga from "./pages/bundesliga";
import Profile from "./components/profile";
import TennisPlayer from "./components/tennisPlayer";
import Formula1driver from "./components/formula1driver";
import Player from "./components/player";
import Ligue1 from "./pages/ligue1";




function App() {
  React.useEffect(() => { document.body.style.backgroundColor = '#EFEFEE'}, [])
  return (
    <Router>
    <div className="App">
        <Header></Header>
    </div>

<Routes>
    <Route exact path="/football" element={<Football/>}/>
    <Route exact path="/football/player/profile/:id" element={<Player/>}/>
    <Route exact path="/football/premierleague" element={<PremierLeague/>}/>
    <Route exact path="/football/:league/:id"  element={<Profile/>} />
    <Route exact path="/football/laliga" element={<LaLiga/>}/>
    <Route exact path="/football/bundesliga" element={<Bundesliga/>}/>
    <Route exact path="/football/serieA" element={<SerieA/>}/>
    <Route exact path="/football/ligue1" element={<Ligue1/>}/>
    <Route exact path="/basketball" element={<Basketball/>}/>
    <Route exact path="/tennis" element={<Tennis/>}/>
    <Route exact path="/tennis/profile/:id" element={<TennisPlayer/>}/>
    <Route exact path="/formula1" element={<Formula1/>}/>
    <Route exact path="/formula1/profile/:id" element={<Formula1driver/>}/>
    <Route exact path="/formula1/team/:id" element={<Formula1/>}/>
    <Route exact path="/motogp" element={<Motogp/>}/>
    <Route exact path="/"  element={<Index/>} />
</Routes>
</Router>
  );
}

export default App;
