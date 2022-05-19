import React from 'react'
import { Bottom } from '../../components/bottom'
import { LeagueCard } from '../../components/leagueCard'

export default function football(){

return(<>

<div className="container">
    <div className="row" style={{textAlign:"center", marginTop:"30px"}}>
        <div className="col-md-4 mycard">
        <LeagueCard url="/football/premierleague" title="Premier League" img="http://localhost/f1project/premier.png"/>
        </div>
        <div className="col-md-4">
        <LeagueCard  url="/football/laliga"  title="La Liga" img="http://localhost/f1project/laliga.jpg"/>
        </div>
        <div className="col-md-4">
            <LeagueCard  url="/football/bundesliga"  title="Bundesliga" img="http://localhost/f1project/bundesliga.jpg"/>
        </div>
    </div>
    <div className="row" style={{textAlign:"center", marginTop:"30px"}}>
        <div className="col-md-4" > 
          <LeagueCard  url="/football/serieA"  title="Serie A" img="http://localhost/f1project/seriea.png"/>
        </div>
        <div className="col-md-4">
        <LeagueCard  url="/football/ligue1" title="Ligue1" img="http://localhost/f1project/ligue1.jpg"/>
        </div>
        <div className="col-md-4">
        <LeagueCard  url="/football/more" title="More Leagues" img="http://localhost/f1project/football.jpg"/>
        </div>
    </div>
</div>
<Bottom/>
</>)

}