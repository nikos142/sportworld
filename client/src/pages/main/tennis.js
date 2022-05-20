import React from 'react'
import axios from 'axios'
import { TennisMenu } from '../../components/submenus/tennisMenu'
import { TennisPlayerObject, TournamentObject } from '../../components/objects/objects'
import Avatar from '@mui/material/Avatar';


export default function Tennis(){

    const [players, setPlayers]= React.useState()
    const [tour , setTour] = React.useState()
    React.useEffect(() =>{
        axios({
            method: 'GET',
            url: "http://localhost:3001/tennis/ranking",
        })
        .then(response =>{
            console.log(response.data)
            var data=[]
            response.data.forEach(element => {
                const obj = Object.create(TennisPlayerObject)
                obj.id=element.id
                obj.name =element.fname +" "+element.lname
                obj.atp_rank= element.atp_rank
                data.push(obj)
            });
            setPlayers(data)
        })
        .catch(error=>{
            console.log(error)
        })

        axios({
            method: 'GET',
            url: "http://localhost:3001/tennis/tournaments",
        })
        .then(response =>{
            var data=[]
            response.data.forEach(element => {
                const obj = Object.create(TournamentObject)
                obj.id=element.id
                obj.name =element.name
                obj.surface= element.surface
                obj.country = element.country
                obj.type= element.type
                obj.start= element.start
                obj.end = element.end
                data.push(obj)
            });
            setTour(data)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])

return(<>
<TennisMenu/>
<div className="container">
    <div className="row" style={{ marginTop:"30px"}}>
        <div className="col-md-4">
        <img style={{width:"90%", height:"250px"}} 
        src="http://localhost/f1project/tennis/court.gif"></img>
        </div>
        <div className="col-md-4">{JSON.stringify(tour)}</div>
        <div className="col-md-4">
            <table className="table">
                <thead>
                   <tr><th>ATP Ranking</th></tr>
                </thead>
                <tbody>
                {players.map(( item ,index) => (<tr key={index}>  
                                                                <td><Avatar alt={item.name} sx={{ width: 56, height: 56 }} src={"http://localhost/f1project/tennis/avatars/"+item.id+".jpg" }/></td>
                                                                <td>{item.name}</td>
                                                                <td>{item.atp_rank}</td>
                                                </tr>))}
             
                </tbody>
            </table>
        </div>
    </div>
</div>
</>)

}