import React from 'react'
import {useParams} from 'react-router';
import axios from 'axios';
import {DriverObject} from"./objects/objects.js";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {TabPanel, a11yProps} from "./../helpers/functions";


export default function Formula1driver (){
    const {id} =useParams();
    const [profile, setProfile]= React.useState([])
    const [value, setValue] = React.useState(0);
    const [previousRaces, setPreviousRaces]= React.useState([])

    React.useEffect(()=>{
        axios({
            method: 'GET',
            url: "http://localhost:3001/formula1/driver/profile/"+id
        })
        .then((response) =>{
                var obj =Object.create(DriverObject)
                obj.id=response.data.id
                obj.name =response.data.name
                obj.points =response.data.points
                obj.country= response.data.country
                obj.team= response.data.team
                obj.weight= response.data.weight
                obj.height= response.data.height
                setProfile(obj)
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
                  <img alt={"image"+id} style={{height:"300px", width:"300px", borderRadius:"50%", border:"5px solid black"}}
                  src={"http://localhost/f1project/formula1/avatars/"+id+".jpg"} />
              </div>
              <div className="col-md-9">
                <Box >
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Last Races" {...a11yProps(0)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <table className="table">
                        <tbody>
                            {previousRaces.map((item , index)=>(<tr key={index}>
                                                                    <td>{item.tour}</td>
                                                                    <td>{item.player1}</td>
                                                                    <td>{item.player2}</td>
                                                                    <td>{item.date}</td>
                                                                    <td>{item.time}</td>
                                                                    <td>{item.score}</td>
                                                                </tr>))}
                        </tbody>
                    </table>
                </TabPanel>
              </div>
              <div className="row" style={{marginTop:"30px"}}>
                <div className="col-md-3" >
                    <p><b>Name:</b> {profile.name}</p>
                    <p><b>Team:</b> {profile.team}</p>
                    <p><b>Season Points:</b> {profile.points}</p>
                    <p><b>Country:</b> {profile.country}</p>
                    <p><b>Height:</b> {profile.height} cm</p>
                    <p><b>Weight:</b> {profile.weight} kg</p>
                </div>
          </div>
      </div>
      </div>
    </>)
}