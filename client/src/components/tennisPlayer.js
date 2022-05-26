import React from 'react'
import {useParams} from 'react-router';
import axios from 'axios';
import {TennisPlayerObject, TennisMatchObject} from"./objects/objects.js";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {TabPanel, a11yProps} from "./../helpers/functions";


export default function TennisPlayer (){
    const {id } =useParams();
    const [names, setNames]= React.useState([])
    const [value, setValue] = React.useState(0);
    const [donematches, setDoneMatches]= React.useState([])
    const [nextmatches, setNextMatches]= React.useState([])
    React.useEffect(()=>{
        axios({
            method: 'GET',
            url: "http://localhost:3001/tennis/profile/"+id
        })
        .then((response) =>{
                 var obj =Object.create(TennisPlayerObject)
                 obj.id=response.data.profile[0].id
                obj.name =response.data.profile[0].fname +" "+response.data.profile[0].lname
                obj.atp_rank= response.data.profile[0].atp_rank
                obj.nationality= response.data.profile[0].nationality
                obj.hand= response.data.profile[0].hand
                setNames(obj)
                var data2=[]
                var data3=[]
                response.data.matches.forEach((element)=>{
                    console.log(element.done)
                    if(element.done===1){
                        const obj = Object.create(TennisMatchObject)
                        obj.id=element.id
                        obj.player1=element.player1
                        obj.player2= element.player2
                        obj.time= element.time
                        obj.date= element.date
                        obj.tour=element.tour
                        obj.score= element.player1_sets+":"+element.player2_sets
                        data2.push(obj)
                    }
                    else{
                        const obj = Object.create(TennisMatchObject)
                        obj.id=element.id
                        obj.player1=element.player1
                        obj.player2= element.player2
                        obj.time= element.time
                        obj.date= element.date
                        obj.tour=element.tour
                        data3.push(obj)
                    }
                })
                setDoneMatches(data2)
                setNextMatches(data3)
                })
        .catch(error=>{
            console.log(error)
        })
    },[])

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return(<>
      <div className="container">
          <div className="row">
              <div className="col-md-3">
                  <img alt={"image"+id} style={{height:"300px", width:"300px", borderRadius:"50%"}}
                  src={"http://localhost/f1project/tennis/avatars/"+id+".jpg"} />
              </div>
              <div className="col-md-9">
                <Box >
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Last Matches" {...a11yProps(0)} />
                        <Tab label="Next Matches" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <table className="table">
                        <tbody>
                            {donematches.map((item , index)=>(<tr key={index}>
                                <td>{item.tour}</td><td>{item.player1}</td><td>{item.player2}</td><td>{item.date}</td><td>{item.time}</td><td>{item.score}</td>
                            </tr>))}
                        </tbody>
                    </table>
                </TabPanel>
                <TabPanel value={value} index={1}>
                <table className="table">
                        <tbody>
                            {nextmatches.map((item , index)=>(<tr key={index}>
                                <td>{item.tour}</td><td>{item.player1}</td><td>{item.player2}</td><td>{item.date}</td><td>{item.time}</td>
                            </tr>))}
                        </tbody>
                    </table>
                </TabPanel>
              </div>
              <div className="row" style={{marginTop:"30px"}}>
                <div className="col-md-3" >
                    <p><b>name:</b> {names.name}</p>
                    <p><b>nationality:</b> {names.nationality}</p>
                    <p><b>Hand:</b> {names.hand}</p>
                    <p><b>Atp Ranking:</b> {names.atp_rank}</p>
                </div>
          </div>
      </div>
      </div>
    </>)
}