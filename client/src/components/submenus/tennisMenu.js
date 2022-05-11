import { Link} from "react-router-dom";

export const TennisMenu = () => {
    return(
        <div className="footballMenu" style={{backgroundColor:"rgb(185, 250, 8)"}}>
            <nav>
            <ul  className="nav  justify-content-center">
                <li className="nav-item dropdown">
                    <Link className="nav-link link" to="/tennis/australianOpen">Australian Open</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/tennis/USopen">Us Open</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/tennis/wimbledon">Wimbledon</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/tennis/rolandGarros">Roland Garros</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/tennis/tour">ATP Tour</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/tennis/ranking">ATP Ranking</Link>
                </li>   
          </ul>
          </nav>
        </div>
    )
}