import React from 'react'
import { Link } from 'react-router-dom';


export default function TeamsTable ({league ,teams, champions, europa, conference,regelated}){
  
    
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