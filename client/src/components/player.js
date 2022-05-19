import React from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import {PlayerObject} from"./objects/objects.js";

export default function Player (){
    const {id } =useParams();
    const [names, setNames]= React.useState([])
    React.useEffect(()=>{
        axios({
            method: 'GET',
            url: "http://localhost:3001/player/"+id
        })
        .then((response) =>{
                 var obj =Object.create(PlayerObject)
                 obj.id=response.data.id
                 obj.name=response.data.fname+" "+response.data.lname
                 obj.nationality=response.data.nationality
                 obj.foot=response.data.foot
                 obj.worth=response.data.worth
                 console.log(obj)
                setNames(obj)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])
    return(<>
      <div className="container">
          <div className="row">
              <div className="col-md-3">
                  <img style={{height:"300px", width:"300px", borderRadius:"50%"}}
                  src={"http://localhost/f1project/players/"+id+".jpg"} />
              </div>
              <div className="col-md-9">
                  a table with stats
              </div>
              <div className="row" style={{marginTop:"30px"}}>
                <div className="col-md-3" >
                    <p><b>name:</b> {names.name}</p>
                    <p><b>nationality:</b> {names.nationality} </p>
                    <p><b>Preferred foot:</b> {names.foot} </p>
                    <p><b>Worth: {names.worth}€ </b></p>
                </div>
          </div>
      </div>
      </div>
    </>)
}