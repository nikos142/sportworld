import React from 'react'
import axios from 'axios';
import { Bottom } from '../components/bottom';
import { FootballMenu } from '../components/submenus/footballmenu'
import TeamsTable from '../components/teamstable';
import LeagueCharts from '../components/leagueCharts';


export default function PremierLeague (){
    const [teams, setTeams] =React.useState([]);
    const [regelated, setRegelated] =React.useState([]);
    const [promoted, setPromoted] =React.useState([]);
    const [playoffs, setPlayoffs] =React.useState([]);
    const [playouts, setPlayouts] =React.useState([]);
    const [champions, setChampions] =React.useState([]);
    const [europa, setEuropa] =React.useState([]);
    const [conference, setConference] =React.useState([]);
    const [data , setData] = React.useState([]) 
    const [colors, setColors] = React.useState([])
   

    React.useEffect(() => {
   
        axios({
          method:"get",
          url: "http://localhost:3001/football/bundesliga",
        })
       .then((response) =>{ 
         setTeams(response.data.teams)
        response.data.teams.forEach((element) =>{
          colors.push({id:element.id, color:element.color } )
        })
        response.data.stats.forEach((element)=>{
         data.push({id:element.team_id, goals:element.goals , conceded:element.conceded } )
        })
     })
       .catch((error) => {console.error(error)
        });

        axios({
          method:"get",
          url: "http://localhost:3001/football/rules/5",
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
            <h3 style={{marginLeft:"40%"}}>Bundesliga Stats</h3>   
            <LeagueCharts data={data} colors={colors}/>
        </div>
        <div className='col-md-4'>
        <h3 style={{marginLeft:"55%"}}>Standings</h3>
           <TeamsTable teams={teams}  champions={champions}  europa={europa}  conference={conference} regelated={regelated}/>
        </div>
    </div>
</div>
<Bottom/>
</>)
}