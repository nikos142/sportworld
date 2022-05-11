import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TeamsTable ({league}){
    const [teams, setTeams] =React.useState([]);
    React.useEffect(() => {
   
        axios({
          method:"get",
          url: "http://localhost:3001/"+league+"/teams",
        })
       .then((response) =>{setTeams(response.data)
       })
       .catch((error) => {console.error(error)
        });

    },[]) 


return(<>
            <table className="table table-striped" style={{width:"100%" }}>
                <thead>
                   <td></td> <td>Team</td><td>Town</td><td>Year Founded</td>
                </thead>
                <tbody>
                    {teams.map((row, index) =>(
                       <tr key={index}>
                         <td >{row.id}</td>
                         <td style={{fontWeight:"bold"}}><Link className='link' to={"/football/"+league+"/team/"+row.id+"/"+row.name}>{row.name}</Link></td>
                         <td>{row.town}</td>
                         <td style={{textAlign: 'center'}}>{row.founded}</td>
                       </tr>
                    ))}
                </tbody>
            </table>
</>)
}