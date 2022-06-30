import axios from 'axios';
import React from 'react'
import { Link} from "react-router-dom";
import { useParams } from 'react-router-dom';

export default function TennisMatchDetails () {
    const {id } = useParams();
    
    React.useEffect(()=>{
       axios({
             method: 'GET',
               url: "http://localhost:3001/tennis/match/details/"+id
       })
         .then((response) =>{
               console.log(response.data)
            })
         .catch(error=>{
             console.log(error)
         })
    },[])
    return(<>
      {id}
   </>)
}