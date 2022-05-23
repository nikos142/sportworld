import React from 'react'
import axios from 'axios'
import {TennisPlayerObject, TournamentObject} from '../../components/objects/objects'
import Avatar from '@mui/material/Avatar';
import Card from 'react-bootstrap/Card'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';
import {TabPanel, a11yProps} from "./../../helpers/functions";
import { MDBMask, MDBView } from "mdbreact";

export default function Tennis(){

    const [ATPplayers, setATPPlayers]= React.useState([])
    const [WATPplayers, setWATPPlayers]= React.useState([])
    const [tour , setTour] = React.useState([])
    const [value, setValue] = React.useState(0);
    React.useEffect(() =>{
        axios({
            method: 'GET',
            url: "http://localhost:3001/tennis/ranking" ,
        })
        .then(response =>{
            var data=[]
            var data2=[]
           response.data.atp.forEach(element => {
                const obj = Object.create(TennisPlayerObject)
                obj.id=element.id
                obj.name =element.fname +" "+element.lname
                obj.atp_rank= element.atp_rank
                obj.hand= element.hand
                data.push(obj)
            })
            setATPPlayers(data)
            response.data.watp.forEach(element => {
                const obj = Object.create(TennisPlayerObject)
                obj.id=element.id
                obj.name =element.fname +" "+element.lname
                obj.atp_rank= element.atp_rank
                obj.hand= element.hand
                data2.push(obj)
            })
            setWATPPlayers(data2)
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

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

return(<>
<div className="container">
    <div className="row" style={{ marginTop:"50px"}}>
        <div className="col-md-8">
            <div className="row">
                <div className="col-md-6">
                    <Link to={"rollandgarros"}>
                        <Card className="bg-dark text-white" >
                            <Card.Img src="http://localhost/f1project/tennis/rolandgarros.jpg" alt="Card image"  style={{height:"250px"}}/>
                            <Card.ImgOverlay>
                                <Card.Title>Roland Garros</Card.Title>
                                <Card.Text>
                                Το Ρολάν Γκαρός ή Γαλλικό Όπεν είναι τουρνουά τένις που διεξάγεται κάθε χρόνο στο Παρίσι.
                                Το τουρνουά διεξάγεται από το 1891.
                                Το Ρολάν Γκαρός διεξάγεται κάθε χρόνο ανάμεσα στα τέλη Μαΐου και αρχές Ιουνίου στο Παρίσι, στο Στάδιο Ρολάν Γκαρός.
                                </Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                    </Link>
                </div>
                <div className="col-md-6">
                    <Link to={"wimbledon"}>
                        <Card className="bg-dark text-white">
                            <Card.Img src="http://localhost/f1project/tennis/wimbledon.png" alt="Card image"  style={{height:"250px"}}/>
                            <Card.ImgOverlay>
                                <Card.Title>Wimbledon</Card.Title>
                                <Card.Text>
                                Το τουρνουά του Γουίμπλεντον γνωστό και ως Γουίμπλεντον είναι το παλαιότερο πρωτάθλημα στην αντισφαίριση και το πιο γνωστό. 
                                Ξεκινάει στο τέλος Ιουνίου και ολοκληρώνεται ως τον Ιούλιο. 
                                Η διοργάνωση λαμβάνει χώρα στις εγκαταστάσεις του All England Lawn Tennis and Croquet Club στο Γουίμπλεντον της Αγγλίας.
                                </Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                    </Link>
                </div>
            </div>
            <div className="row" style={{marginTop:"50px"}}>
                <div className="col-md-6">
                    <Link to={"usopen"}>
                        <Card className="bg-dark text-white">
                            <Card.Img src="http://localhost/f1project/tennis/usopen.jpg" alt="Card image" style={{height:"250px"}} />
                            <Card.ImgOverlay>
                                <Card.Title>US Open</Card.Title>
                                <Card.Text>
                                Το Αμερικανικό Όπεν είναι ένα από τα τέσσερα συνολικά τουρνουά Γκραν Σλαμ στην αντισφαίριση, 
                                το τελευταίο χρονικά κατά τη διάρκεια της χρονιάς, 
                                sτο οποίο διοργανώνεται στις Ηνωμένες Πολιτείες από την Ομοσπονδία Αντισφαίρισης των Ηνωμένων Πολιτειών.
                                </Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                    </Link>
                </div>
                <div className="col-md-6">
                    <Link to={"australianopen"}>
                        <Card className="bg-dark text-white">
                            <Card.Img src="http://localhost/f1project/tennis/australianopen.jpg" alt="Card image" style={{height:"250px"}} />
                            <Card.ImgOverlay>
                                <Card.Title>Australian Open</Card.Title>
                                <Card.Text>
                                Το Αυστραλιανό Όπεν είναι ένα από τα τέσσερα συνολικά τουρνουά Γκραν Σλαμ στο επαγγελματικό τένις.
                                 Διεξάγεται κάθε χρόνο στην Αυστραλία υπό την αιγίδα της Tennis Australia, 
                                πρώην Αυστραλιανή Ένωση της Αντισφαίρισης σε Χόρτο και ο πρώτος αγώνας έγινε σε γήπεδο κρίκετ στη Μελβούρνη το 1905.
                                </Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' ,marginTop:"-60px" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="ATP Ranking" {...a11yProps(0)} />
                    <Tab label="WATP Ranking" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <table className="table" >
                    <tbody>
                    {ATPplayers.map(( item ,index) => (<tr key={index}>  
                                                          <td><Avatar alt={item.name} 
                                                                      sx={{ width: 50, height: 50 }} 
                                                                      src={"http://localhost/f1project/tennis/avatars/"+item.id+".jpg" }/></td>
                                                          <td><Link className="link" to={"profile/"+item.id}>{item.name}</Link></td>
                                                          <td>{item.atp_rank}</td>
                                                      </tr>))}
                    </tbody>
                </table>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <table className="table">
                    <tbody>
                    {WATPplayers.map(( item ,index) => (<tr key={index}>  
                                                          <td><Avatar alt={item.name} 
                                                                      sx={{ width: 50, height: 50 }} 
                                                                      src={"http://localhost/f1project/tennis/avatars/"+item.id+".jpg" }/></td>
                                                          <td><Link className='link' to={"profile/"+item.id}>{item.name}</Link></td>
                                                          <td>{item.atp_rank}</td>
                                                      </tr>))}
                    </tbody>
                </table>
            </TabPanel>
        </div>
    </div>
</div>
</>)}

