import React from 'react'
import { Bottom } from "../../components/bottom";
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom';

export default function basketball(){

return(<>
<div className="container">
    <div className="row" style={{textAlign:"center", marginTop:"30px"}}>
        <div className="col-md-4">
            <Link to={"nba"}>
                <Card>
                    <Card.Img src="http://localhost/f1project/nba.jpg" alt="Card image"  style={{height:"250px"}}/>
                </Card>
            </Link>
        </div>
        <div className="col-md-4">
        <Link to={"euroleague"}>
            <Card>
                <Card.Img src="http://localhost/f1project/euroleague.png" alt="Card image"  style={{height:"250px"}}/>
            </Card>
        </Link>
        </div>
        <div className="col-md-4">
            <Link to={"eurocup"}>
                <Card>
                    <Card.Img src="http://localhost/f1project/eurocup.png" alt="Card image"  style={{height:"250px"}}/>
                </Card>
            </Link>
        </div>
    </div>
    <div className="row" style={{textAlign:"center", marginTop:"50px"}}>
        <div className="col-md-4" > 
            <Link to={"acb"}>
                <Card>
                    <Card.Img src="http://localhost/f1project/acb.jpg" alt="Card image"  style={{height:"250px"}}/>
                </Card>
            </Link>
        </div>
        <div className="col-md-4">
        <Link to={"bbl"}>
                <Card>
                    <Card.Img src="http://localhost/f1project/bbl.png" alt="Card image"  style={{height:"250px"}}/>
                </Card>
            </Link>
        </div>
        <div className="col-md-4">
        <Link to={"lnb"}>
            <Card>
                <Card.Img src="http://localhost/f1project/lnb.jpg" alt="Card image"  style={{height:"250px"}}/>
            </Card>
        </Link>
        </div>
    </div>
</div>
<Bottom/>
</>)

}