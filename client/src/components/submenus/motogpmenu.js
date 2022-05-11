import { Link} from "react-router-dom";

export const MotogpMenu = () => {
    return(
        <div className="footballMenu" style={{backgroundColor:"rgb(12, 7, 248)"}}>
            <nav>
            <ul  className="nav  justify-content-center">
                <li className="nav-item dropdown">
                    <Link className="nav-link link" style={{color:"rgb(255, 255, 255)"}} to="/motogp/drivers">Drivers</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" style={{color:"rgb(255, 255, 255)"}} to="/motogp/teams">Teams</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" style={{color:"rgb(255, 255, 255)"}} to="/motogp/races">Races</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" style={{color:"rgb(255, 255, 255)"}} to="/motogp/standings">Standings</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" style={{color:"rgb(255, 255, 255)"}} to="/motogp/seasons">Seasons</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" style={{color:"rgb(255, 255, 255)"}} to="/motogp/news">News</Link>
                </li>
          </ul>
          </nav>
        </div>
    )
}