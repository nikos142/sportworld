import React from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import Infotabs from './infotabs';





export default function Profile(){
const {id , name, league} =useParams();
const [fname, setFname] = React.useState();
const [lname, setLname] = React.useState()
const [stadium, setStadium] = React.useState()
const [town, setTown] = React.useState()
const [owner, setOwner] = React.useState()


React.useEffect(() =>{
    axios({
        method: 'GET',
        url: "http://localhost:3001/"+league+"/teams/"+id,
    })
    .then(response =>{
        console.log(response.data[0].fname)
       setFname(response.data[0].fname)
       setLname(response.data[0].lname)
       setStadium(response.data[0].stadium)
       setTown(response.data[0].town)
       setOwner(response.data[0].owner)
    })
    .catch(error=>{
        console.log(error)
    })
})
return(<>
 <div className="container">
     <div className="row" style={{marginTop:"30px"}}>
         <div className="col-md-2" >
             <img className="img-responsive" style={{width:"100%"}} src={'http://localhost/f1project/teams/'+league+'/'+id+".png"}/>
         </div>
         <div className="col-md-10"> 
          <Infotabs/>
         </div>
     </div>
     <div className="row" style={{marginTop:"30px"}}>
         <div className="col-md-2" >
             <p>Name:{name}</p>
             <p>Town: {town}</p>
             <p>Stadium: {stadium}</p>
             <p>Owner: {owner}</p>
             <p>Coach: {fname} {lname}</p>
         </div>
         </div>
 </div>
</>)

}