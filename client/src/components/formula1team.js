import React from 'react'
import {useParams} from 'react-router';
import axios from 'axios';



export default function Formula1driver (){
    const {id} =useParams();
    const [profile, setProfile]= React.useState([])

    React.useEffect(()=>{
        axios({
            method: 'GET',
            url: "http://localhost:3001/formula1/team/profile/"+id
        })
        .then((response) =>{
             setProfile(response.data)
                })
        .catch(error=>{
            console.log(error)
        })
    },[])

    return(<>
      <div className="container">
          <div className="row">
              <div className="col-md-3">
                  <img alt={"image"+id} style={{height:"300px", width:"300px", borderRadius:"50%", border:"5px solid black"}}
                  src={"http://localhost/f1project/formula1/teams/"+id+".jpg" }/>
                   <div style={{marginTop:"30px"}} >
                        <p><b>Name:</b> {profile.name}</p>
                        <p><b>Team Principal:</b> {profile.principal}</p>
                        <p><b>Season Points:</b> {profile.points}</p>
                        <p><b>Country:</b> {profile.country}</p>
                        <p><b>Owner:</b> {profile.owner}</p>
                    </div>
              </div>
          </div>
      </div>
    </>)
}