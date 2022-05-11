import React from 'react'
import { Link} from "react-router-dom";

export const BasketballMenu = () => {
    return(
        <div className="footballMenu" style={{backgroundColor:"#e15909"}}>
            <nav>
            <ul  className="nav  justify-content-center">
                <li className="nav-item dropdown">
                    <Link className="nav-link link" to="/basketball/nba">NBA</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/basketball/euroleague">Euroleague</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/basketball/euroCup">EuroCup</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/basketball/ACB">ACB</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/basketball/BBL">BBL</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/basketball/LNB">LNB </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/basketball/other">Other Leagues</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/basketball/bet">Betting</Link>
                </li>
          </ul>
          </nav>
        </div>
    )
}