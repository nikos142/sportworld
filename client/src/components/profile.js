import React from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import Infotabs from './infotabs';


export default function Profile(){
const {id } =useParams();
const [fname, setFname] = React.useState();
const [lname, setLname] = React.useState()
const [stadium, setStadium] = React.useState()
const [town, setTown] = React.useState()
const [owner, setOwner] = React.useState()

React.useEffect(() =>{
    axios({
        method: 'GET',
        url: "http://localhost:3001/football/team/profile/"+id,
    })
    .then(response =>{
       setFname(response.data[0].fname)
       setLname(response.data[0].lname)
       setStadium(response.data[0].stadium)
       setTown(response.data[0].city)
       setOwner(response.data[0].owner)
    })
    .catch(error=>{
        console.log(error)
    })
},[])
return(<>
 <div className="container">
     <div className="row" style={{marginTop:"30px"}}>
         <div className="col-md-3" >
             <img className="img-responsive" style={{width:"80%", height:"300px"}} 
             src={'http://localhost/f1project/teams/'+id+".png"}/>
             <div style={{marginTop:"30px", marginLeft:"20px"}}>
                <p><b>Town:</b> {town}</p>
                <p><b>Stadium:</b> {stadium}</p>
                <p><b>Owner:</b> {owner}</p>
                <p><b>Coach:</b> {fname} {lname}</p>
             </div>
         </div>
         <div className="col-md-9"> 
          <Infotabs id={id}/>
         </div>
     </div>
 </div>
</>)
}