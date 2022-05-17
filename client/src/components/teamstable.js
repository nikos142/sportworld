import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TeamsTable ({league , id}){
    const [teams, setTeams] =React.useState([]);
    const [regelated, setRegelated] =React.useState([]);
    const [promoted, setPromoted] =React.useState([]);
    const [playoffs, setPlayoffs] =React.useState([]);
    const [playouts, setPlayouts] =React.useState([]);
    const [champions, setChampions] =React.useState([]);
    const [europa, setEuropa] =React.useState([]);
    const [conference, setConference] =React.useState([]);
    React.useEffect(() => {
   
        axios({
          method:"get",
          url: "http://localhost:3001/"+league,
        })
       .then((response) =>{ 
         console.log(response.data)
         setTeams(response.data)
       })
       .catch((error) => {console.error(error)
        });

        axios({
          method:"get",
          url: "http://localhost:3001/rules/"+id,
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
            <table className="table table-striped" style={{ marginLeft:"30%",width:"70%" }}>
                <thead>
                   <td></td> <td>Team</td><td style={{textAlign:"right"}}>Points</td>
                </thead>
                <tbody>
                    {teams.map((row, index) =>(
                       <tr key={index} style={{height:"20px"}} >
                         <td style={{width:"20px",
                                    textAlign:"center",
                                    backgroundColor:teams.length-index<=regelated&&"red"
                                    ||(index+1)<=champions&&"blue" 
                                    ||(index+1)>champions&&(index+1)<=champions+europa&&"orange"
                                    ||(index+1)>champions+europa&&(index+1)<=champions+europa+conference&&"yellow"}}>{index+1}</td>
                         <td style={{fontWeight:"bold"}}><Link className='link' to={"/football/"+league+"/"+row.id}>{row.name}</Link></td>
                         <td style={{textAlign: 'right'}}>{row.points}</td>
                       </tr>
                    ))}
                </tbody>
            </table>
</>)
}