import React from 'react'
import { Link } from 'react-router-dom';


export default function TeamsTable ({league ,teams, champions, europa, conference,regelated}){
    
return(<>
        <table className="table table-striped" style={{width:"100%" }}>
            <thead>
                <tr><th></th><th>Team</th><th>GM</th><th>GC</th><th>GD</th><th style={{textAlign:"right"}}>Points</th></tr>
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
                         <td>{row.goals}</td>
                         <td>{row.conceded}</td>
                         <td>{row.goals-row.conceded}</td>
                         <td style={{textAlign: 'right'}}>{row.points}</td>
                       </tr>
                    ))}
            </tbody>
         </table>
</>)
}