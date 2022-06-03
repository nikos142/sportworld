import React from 'react'
import { useParams } from 'react-router';
import axios from 'axios';

export default function MatchDetails(){
const {id}=useParams();
const [lineups , setLineups]=React.useState([])

React.useEffect(()=>{
    axios({
        method: 'GET',
        url: "http://localhost:3001/football/match/lineups/"+id,
    })
    .then(response =>{
        setLineups(response.data)
    })
},[])
    
        return (<>
              {JSON.stringify(lineups)}
        </>);
 }
 