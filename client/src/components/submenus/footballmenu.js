import React from 'react'
import { Link} from "react-router-dom";

export const FootballMenu = () => {
    return(
        <div className="footballMenu">
            <nav>
            <ul  className="nav  justify-content-center">
                <li className="nav-item dropdown">
                    <Link className="nav-link link" to="/football/premierleague">Premier League</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/football/laliga">La Liga</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/football/bundesliga">Bundesliga</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/football/serieA">Serie A</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/football/ligue1">Ligue 1 </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/football/other">Other Leagues</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/football/bet">Betting</Link>
                </li>
          </ul>
          </nav>
        </div>
    )
}
