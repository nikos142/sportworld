import React from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import {PlayerObject} from"./objects/objects.js";
import WorthChart from './worthChart.js';

export default function Player (){
    const {id } =useParams();
    const [names, setNames]= React.useState([]);
    const [goals, setGoals]= React.useState(0);
    const [assists, setAssists]= React.useState(0);
    const [yellowcards, setYellowCards]= React.useState(0);
    const [redcards, setRedCards]= React.useState(0);
    const [data , setData] = React.useState([]) 
    const [owngoals, setOwnGoals]= React.useState(0);
    React.useEffect(()=>{
        axios({
            method: 'GET',
            url: "http://localhost:3001/football/player/"+id
        })
        .then((response) =>{
                 var obj =Object.create(PlayerObject)
                 obj.id=response.data.player.id
                 obj.name=response.data.player.fname+" "+response.data.player.lname
                 obj.age = response.data.player.age
                 obj.country=response.data.player.country_id
                 obj.foot=response.data.player.foot
                 obj.position=response.data.player.position
                 obj.worth=response.data.player.worth
                 obj.age=response.data.player.age
                 obj.height=parseFloat(response.data.player.height/100)
                setNames(obj)

                setGoals(response.data.stats[0].goals)
                setAssists(response.data.stats[0].assists)
                setYellowCards(response.data.stats[0].yellow_cards)
                setRedCards(response.data.stats[0].red_cards)
                setOwnGoals(response.data.stats[0].owngoals)

                response.data.worth.forEach((element)=>{
                    data.push({
                      date:element.date, 
                      worth:element.worth
                     })
            })
        })
        .catch(error=>{
            console.log(error)
        })
},[])

    return(<>
      <div className="container">
          <div className="row">
              <div className="col-md-3" style={{marginTop:"30px"}}>
                  <img style={{height:"300px", width:"300px", border:"5px solid black", borderRadius:"50%"}}
                  src={"http://localhost/f1project/players/"+id+".jpg"} />
                   <div style={{marginTop:"20px"}}>
                        <p><b>Name:</b> {names.name}</p>
                        <p><b>Age:</b> {names.age}</p>
                        <p><b>Height:</b> {names.height}</p>
                        <p><b>Nationality:</b> {names.country} </p>
                        <p><b>Position:</b> {names.position} </p>
                        <p><b>Preferred foot:</b> {names.foot} </p>
                        <p><b>Worth:</b> {names.worth}€</p>
                    </div>
              </div>
              <div className='col-md-6' >
                <h3 style={{marginTop:"100px"}} >Transfer Value</h3>
              <WorthChart data={data}/>
              </div>
              <div className="col-md-3">
                <h3>Season Stats</h3>
              <table className='table' style={{marginTop:"20px"}}>
                     <thead>
                         <tr style={{textAlign:"center"}}>
                             <th><img style={{width:"22px"}} src="http://localhost/f1project/football.png"/></th>
                             <th><img style={{width:"30px"}} src="http://localhost/f1project/boot.png"/></th>
                             <th><img style={{width:"22px"}} src="http://localhost/f1project/owngoal.jpg"/></th>
                             <th><img style={{width:"20px"}} src="http://localhost/f1project/yellow_card.jpg"/></th>
                             <th><img style={{width:"18px"}} src="http://localhost/f1project/red_card.png"/></th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr style={{textAlign:"center"}}>
                             <td>{goals}</td><td>{assists}</td><td>{owngoals}</td><td>{yellowcards}</td><td>{redcards}</td>
                        </tr>
                    </tbody>
                 </table>
              </div>
          </div>   
          <div className='row' style={{marginTop:"-400px"}}>
            <div className='col-md-3'></div>
            <div className='col-md-6'></div>
            <div className='col-md-3' style={{textAlign:"center"}}>
                <h3>Previous Teams</h3>
                <table className='table'>
                    <thead><tr><th>Team</th><th>From</th><th>Until</th></tr></thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
          </div>
      </div>
    </>)
}