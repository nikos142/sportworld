import React from 'react'
import axios from 'axios';
import { Bottom } from '../components/bottom';
import { FootballMenu } from '../components/submenus/footballmenu'
import TeamsTable from '../components/teamstable';
import LeagueCharts from '../components/leagueCharts';
import ConcededChart from '../components/concededChart';
import CardsCharts from '../components/cardsChart';


export default function PremierLeague (){
    const [regelated, setRegelated] =React.useState([]);
    const [promoted, setPromoted] =React.useState([]);
    const [playoffs, setPlayoffs] =React.useState([]);
    const [playouts, setPlayouts] =React.useState([]);
    const [champions, setChampions] =React.useState([]);
    const [league, setLeague] =React.useState("premierleague");
    const [europa, setEuropa] =React.useState([]);
    const [conference, setConference] =React.useState([]);
    const [data , setData] = React.useState([]) 
   

    React.useEffect(() => {
   
        axios({
          method:"get",
          url: "http://localhost:3001/football/"+league,
        })
       .then((response) =>{ 
        response.data.stats.forEach((element)=>{
         data.push({
           id:element.team_id,
           name:element.name, 
           goals:element.goals , 
           conceded:element.conceded , 
           ycards:element.yellow_cards , 
           rcards:element.red_cards , 
           points:element.points,
           color:element.color
          })
        })
     })
       .catch((error) => {console.error(error)
        });

        axios({
          method:"get",
          url: "http://localhost:3001/football/rules/1",
        })
       .then((response) =>{ 
         setRegelated(response.data[0].regelated)
         setPromoted(response.data[0].promoted)
         setPlayoffs(response.data[0].playoffs)
         setPlayouts(response.data[0].playouts)
         setChampions(response.data[0].champions)
         setEuropa(response.data[0].europa)
         setConference(response.data[0].conference)
       })
       .catch((error) => {console.error(error)
        });
    },[]) 



return(<>
<FootballMenu/>
<div className='container-fluid'>
    <div className='row'>
        <div className='col-md-8'>
            <h3 style={{marginLeft:"40%"}}>Premier League Stats</h3>   
        </div>
        <div className='col-md-4'>
        <h3 style={{textAlign:"center"}}>Standings</h3>
        </div>
    </div><br/>
    <div className='row'>
        <div className='col-md-4'>  
            <LeagueCharts data={data}/>
            <CardsCharts data={data}/>
        </div>
        <div className='col-md-4'>  
            <ConcededChart data={data}/>
        </div>
        <div className='col-md-4'>
           <TeamsTable teams={data} league={league} champions={champions}  europa={europa}  conference={conference} regelated={regelated}/>
        </div>
    </div>
</div>
<Bottom/>
</>)
}