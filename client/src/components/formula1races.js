import React from 'react'
import axios from 'axios';


export default function Formula1Races (){

    React.useEffect(()=>{
        axios({
            method: 'GET',
            url: "http://localhost:3001/formula1/races"
        })
        .then((response) =>{
                console.log(response.data)
                })
        .catch(error=>{
            console.log(error)
        })
    },[])



    return(<>
      <div className="container">
        
      </div>
    </>)
}