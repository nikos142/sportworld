import { Link} from "react-router-dom";

export const Formula1Menu = () => {
    return(
        <div className="footballMenu" style={{backgroundColor:"#fa0303"}}>
            <nav>
            <ul  className="nav  justify-content-center">
                <li className="nav-item dropdown">
                    <Link className="nav-link link" to="/formula1/drivers">Drivers</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/formula1/constructors">Constructors</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/formula1/races">Races</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/formula1/standings">Standings</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/formula1/seasons">Seasons</Link>
                </li>    
          </ul>
          </nav>
        </div>
    )
}