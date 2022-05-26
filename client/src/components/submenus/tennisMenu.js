import { Link} from "react-router-dom";

export const TennisMenu = () => {
    return(
        <div className="footballMenu" style={{backgroundColor:"rgb(185, 250, 8)"}}>
            <nav>
            <ul  className="nav  justify-content-center">
                <li className="nav-item dropdown">
                    <Link className="nav-link link" to="/tennis/romeopen">BNL d'Italia</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/tennis/montecarloopen">Monte-Carlo Masters</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/tennis/madridopen">Madrid Open</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/tennis/paribasopen">Paribas Open</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/tennis/shanghaimasters">Shanghai Masters</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/tennis/westernsouthendOpen">Western & Southern Open</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/tennis/indianwellsopen">National Bank Open</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/tennis/miamiopen">Miami Open</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/tennis/parismasters"> Paris Masters</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/tennis/tour">ATP Tour</Link>
                </li>
          </ul>
          </nav>
        </div>
    )
}