import React  from 'react'
import Card from 'react-bootstrap/Card'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';
import {TabPanel, a11yProps} from "./../../helpers/functions";
import { Bottom } from '../../components/bottom';
import { DriverObject , FormulaTeamObject} from '../../components/objects/objects';

export default function Formula1(){

   
        const [value, setValue] = React.useState(0);
        const [drivers, setDrivers]= React.useState([])
        const [teams, setTeams]= React.useState([])
      
        React.useEffect(() =>{
                axios({
                    method: 'GET',
                    url: "http://localhost:3001/formula1/ranking" ,
                })
                .then(response =>{
                        var data=[]
                        var data2=[]
                       response.data.drivers.forEach(element => {
                            const obj = Object.create(DriverObject)
                            obj.id=element.id
                            obj.name =element.fname +" "+element.lname
                            obj.points= element.points
                            data.push(obj)
                        })
                        setDrivers(data)
                        response.data.teams.forEach(element => {
                            const obj = Object.create(FormulaTeamObject)
                            obj.id=element.id
                            obj.name =element.name 
                            obj.points = element.points
                            data2.push(obj)
                        })
                        setTeams(data2)
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
    <div className="row" style={{ marginTop:"50px"}}>
        <div className="col-md-8">
            <div className="row">
                <div className="col-md-6">
                    <Link to={"drivers"}>
                        <Card className="bg-dark text-white" >
                            <Card.Img src="http://localhost/f1project/formula1/drivers.jpg" alt="Card image"  style={{height:"250px"}}/>
                        </Card>
                    </Link>
                </div>
                <div className="col-md-6">
                    <Link to={"teams"}>
                        <Card className="bg-dark text-white">
                            <Card.Img src="http://localhost/f1project/formula1/constructors.jpg" alt="Card image"  style={{height:"250px"}}/>
                        </Card>
                    </Link>
                </div>
            </div>
            <div className="row" style={{marginTop:"50px"}}>
                <div className="col-md-6">
                    <Link to={"history"}>
                        <Card className="bg-dark text-white">
                            <Card.Img src="http://localhost/f1project/formula1/history.jpg" alt="Card image" style={{height:"250px"}} />
                        </Card>
                    </Link>
                </div>
                <div className="col-md-6">
                    <Link to={"races"}>
                        <Card className="bg-dark text-white">
                            <Card.Img src="http://localhost/f1project/formula1/races.jpg" alt="Card image" style={{height:"250px"}} />
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' ,marginTop:"-70px" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Drivers" {...a11yProps(0)} />
                    <Tab label="Constructors" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <table className="table" >
                    <tbody>
                    {drivers.map(( item ,index) => (<tr key={index}>  
                                                        <td><Avatar alt={item.name} 
                                                                    sx={{ width: 50, height: 50 }} 
                                                                    src={"http://localhost/f1project/formula1/avatars/"+item.id+".jpg" }/></td>
                                                          <td><Link className="link" to={"profile/"+item.id}>{item.name}</Link></td>
                                                          <td>{item.points}</td>
                                                   </tr>))}
                    </tbody>
                </table>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <table className="table">
                    <tbody>
                    {teams.map(( item ,index) => (<tr key={index}> 
                                                          <td><Avatar alt={item.name} 
                                                                    sx={{ width: 50, height: 50 }} 
                                                                    src={"http://localhost/f1project/formula1/teams/"+item.id+".jpg" }/></td> 
                                                          <td><Link className="link" to={"profile/"+item.id}>{item.name}</Link></td>
                                                          <td>{item.points}</td>
                                                </tr>))}
                    </tbody>
                </table>
            </TabPanel>
        </div>
    </div>
</div>
<Bottom/>
</>)
}