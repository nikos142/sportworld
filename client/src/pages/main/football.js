import React  from 'react'
import { Bottom } from '../../components/bottom'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom';



export default function Football(){

return(<>
<div className="container">
    <div className="row" style={{textAlign:"center", marginTop:"30px"}}>
        <div className="col-md-3">
            <Link to={"premierleague"}>
                <Card  >
                    <Card.Img src="http://localhost/f1project/premier.png" alt="Card image"  style={{height:"300px"}}/>
                </Card>
            </Link>
        </div>
        <div className="col-md-3">
        <Link to={"laliga"}>
            <Card  >
                <Card.Img src="http://localhost/f1project/laliga.jpg" alt="Card image"  style={{height:"300px"}}/>
            </Card>
        </Link>
        </div>
        <div className="col-md-3">
            <Link to={"bundesliga"}>
                <Card  >
                    <Card.Img src="http://localhost/f1project/bundesliga.jpg" alt="Card image"  style={{height:"300px"}}/>
                </Card>
            </Link>
        </div>
        <div className="col-md-3" > 
            <Link to={"seriea"}>
                <Card  >
                    <Card.Img src="http://localhost/f1project/seriea.png" alt="Card image"  style={{height:"300px"}}/>
                </Card>
            </Link>
        </div>
    </div>
    <div className="row" style={{textAlign:"center", marginTop:"50px"}}>
        <div className="col-md-3">
            <Link to={"ligue1"}>
                <Card  >
                    <Card.Img src="http://localhost/f1project/ligue1.png" alt="Card image"  style={{height:"300px"}}/>
                </Card>
            </Link>
        </div>
        <div className="col-md-3">
            <Link to={"champions"}>
                <Card  >
                    <Card.Img src="http://localhost/f1project/champions.png" alt="Card image"  style={{height:"300px"}}/>
                </Card>
            </Link>
        </div>
        <div className="col-md-3">
            <Link to={"europa"}>
                <Card  >
                    <Card.Img src="http://localhost/f1project/europa.png" alt="Card image"  style={{height:"300px"}}/>
                </Card>
            </Link>
        </div>
        <div className="col-md-3">
            <Link to={"conference"}>
                <Card  >
                    <Card.Img src="http://localhost/f1project/conference.png" alt="Card image"  style={{height:"300px"}}/>
                </Card>
            </Link>
        </div>
    </div>
</div>
<Bottom/>
</>)

}