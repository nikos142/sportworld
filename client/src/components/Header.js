import React from 'react'
import { Link} from "react-router-dom";

export const Header = () => {
    
    return(
        <div className="header">
            <nav>
            <Link to="/" 
            style={{float:"left", color:"black", textDecoration:"none",fontSize:"20pt", paddingLeft:"10px" , paddingTop:"3px"}}>
                Uni-Sport</Link>
            <ul  className="nav ">
                <li class="nav-item">
                    <Link className="nav-link link" to="/football">Football</Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link link" to="/basketball">Basketball</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/tennis">Tennis</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/formula1">Formula 1 </Link>
                </li>
               </ul>
               </nav>
        </div>
    )
}

