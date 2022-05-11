import React from 'react'
import { LeagueCard } from '../../components/leagueCard'
import { Bottom } from "../../components/bottom";

export default function basketball(){

return(<>
<div className="container">
    <div className="row" style={{textAlign:"center", marginTop:"30px"}}>
        <div className="col-md-4">
            <LeagueCard 
                url="/basketball/nba" 
                title="NBA" 
                img="http://localhost/f1project/nba.jpg"
            />
        </div>
        <div className="col-md-4">
            <LeagueCard  
                url="/basketball/euroleague" 
                title="Euroleague" 
                img="http://localhost/f1project/euroleague.png"
            />
        </div>
        <div className="col-md-4">
            <LeagueCard  
                url="/basketball/eurocup"  
                title="Eurocup" 
                img="http://localhost/f1project/eurocup.png"
            />
        </div>
    </div>
    <div className="row" style={{textAlign:"center", marginTop:"30px"}}>
        <div className="col-md-4" > 
            <LeagueCard  
                url="/basketball/acb"  
                title="ACB" 
                img="http://localhost/f1project/acb.jpg"
            />
        </div>
        <div className="col-md-4">
            <LeagueCard  
                url="/basketball/bbl" 
                title="BBL" 
                img="http://localhost/f1project/bbl.png" 
            />
        </div>
        <div className="col-md-4">
            <LeagueCard  
                url="/basketball/lnb"   
                title="LNB" 
                img="http://localhost/f1project/lnb.jpg"
            />
        </div>
    </div>
</div>
<Bottom/>
</>)

}