import React from 'react'
import { useParams } from 'react-router';
import axios from 'axios';


export default function MatchDetails(){
const {id}=useParams();
const [hometeam, setHomeTeam]=React.useState([])
const [awayteam, setAwayTeam]=React.useState([])
const [home, setHome]=React.useState([])
const [away, setAway]=React.useState([])
const [score, setScore]=React.useState("")

React.useEffect(()=>{
    axios({
        method: 'GET',
        url: "http://localhost:3001/football/match/details/"+id,
    })
    .then(response =>{
           setScore(response.data.score[0].home+"-"+response.data.score[1].away)
           setHome(response.data.teams[0])
           setAway(response.data.teams[1])
           setHomeTeam(response.data.home)
           setAwayTeam(response.data.away)
    })
},[])
    
        return (<>
              <div className='container'>
                <div className='row'>
                    <div className="col-md-3" style={{textAlign:"center"}}>
                        <img  style={{width:"150px"}}src={"http://localhost/f1project/teams/"+home.id+".png"}/>
                    </div>
                    <div className='col-md-6' style={{textAlign:"center",fontSize:"40pt"}}>{score}</div>
                    <div className='col-md-3' style={{textAlign:"center"}}>
                        <img  style={{width:"150px"}}src={"http://localhost/f1project/teams/"+away.id+".png"}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3'>
                        {JSON.stringify(hometeam)}
                    </div>
                    <div className='col-md-6'>
                    </div>
                     <div className='col-md-3'>
                        {JSON.stringify(awayteam)}
                    </div>   
                </div>
              </div>
        </>);
 }
 