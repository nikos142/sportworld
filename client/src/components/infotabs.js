import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import React from 'react';
import axios from 'axios';
import {FixtureObject,PlayerObject,ResultObject, factsObject, TransferObject} from"./objects/objects.js";
import Avatar from '@mui/material/Avatar';
import Button from 'react-bootstrap/Button'



export default function Infotabs({id}) {

const [attackers, setAttackers]= React.useState([])
const [midfielders, setMidfielders]= React.useState([])
const [defenders, setDefenders]= React.useState([])
const [goalkeepers, setGoalkeepers]= React.useState([])
const [results, setResults]= React.useState([])
const [fixtures, setFixtures]= React.useState([])
const [transfers, setTransfers]= React.useState([])


React.useEffect(()=>{
    axios({
        method: 'GET',
        url: "http://localhost:3001/football/players/"+id,
    })
    .then(response =>{
        var attackers=[]
        var defenders=[]
        var midfielders=[]
        var goalkeepers=[]
         response.data.forEach((element) => {
             var obj =Object.create(PlayerObject)
             obj.id=element.id
             obj.name=element.fname+" " + element.lname
             switch(element.position) {
                case "striker":
                   attackers.push(obj)
                  break;
                case "midfielder":
                   midfielders.push(obj)
                  break;
                case "defender":
                   defenders.push(obj)
                  break;
                case "goalkeeper":
                   goalkeepers.push(obj)
                  break;
              }
          });
           setAttackers(attackers)
           setDefenders(defenders)
           setMidfielders(midfielders)
           setGoalkeepers(goalkeepers)
    })
    .catch(error=>{
        console.log(error)
    })

    axios({
        method: 'GET',
        url: "http://localhost:3001/football/matches/"+id,
    })
    .then(response =>{
        var tempResults=[]
        var tempFixtures=[]
    response.data.forEach((element) =>{
        if(element.done===0)
        {  
             var obj= Object.create(FixtureObject)
                obj.id=element.id;
                obj.league= element.league;
                obj.home_team = element.home_team;
                obj.away_team = element.away_team;
                obj.date=element.date;
                obj.time = element.time;
                tempFixtures.push(obj)
        }
        else
        {  
            var obj2= Object.create(ResultObject)
            obj2.id = element.id;
            obj2.league= element.reference;
            obj2.home_team = element.home_team;
            obj2.away_team = element.away_team;
            obj2.score = element.home_team_score + ":" +element.away_team_score;
            obj2.date=element.date;
            obj2.time = element.time;
            var tempfacts=[]
            for (var i in element.facts)
            {
                var obj3= Object.create(factsObject)
                obj3.player= element.facts[i].player
                obj3.type= element.facts[i].type
                obj3.team= element.facts[i].team
                obj3.minute= element.facts[i].minute
                tempfacts.push(obj3)
            }
            obj2.facts= tempfacts
            tempResults.push(obj2)
        }
    })
      setFixtures(tempFixtures)
      setResults(tempResults)
    })
    .catch(error=>{
        console.log(error)
    })

    axios({
        method: 'GET',
        url: "http://localhost:3001/football/transfers/"+id,
    })
    .then(response =>{
        console.log(response.data)
        var tempTransfers=[]
        response.data.forEach((element) =>{
                 var obj= Object.create(TransferObject)
                    obj.id=element.id;
                    obj.player= element.player;
                    obj.from= element.from;
                    obj.to = element.to;
                    obj.fee= element.fee;
                    obj.date=element.date;
                    tempTransfers.push(obj)
        })
        setTransfers(tempTransfers)

    })
    .catch(error=>{
        console.log(error)
    })
},[])

    return(<>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        <Nav.Link eventKey="first">Squad</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="second">Results</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="third">Next Matches</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="fourth">Transfers</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <table >
                                <tbody>
                                    <tr style={{display:"flex", flexWrap:"wrap"}}>
                                {goalkeepers.map((row,index)=> (
                                    <td style={{padding:"15px"}} key={index}>
                                  <td><Avatar  src={"http://localhost/f1project/players/"+row.id+".jpg"}/></td>
                                  <td><Link to={"/football/player/profile/"+row.id} className="link">{row.name}</Link></td>
                                        </td>
                                    ))}
                                    </tr>
                                </tbody>
                            </table>       
                            <table >
                                <tbody>
                                    <tr style={{display:"flex", flexWrap:"wrap"}}>
                                {defenders.map((row,index)=> (
                                    <td style={{padding:"15px"}} key={index}>
                                  <td><Avatar  src={"http://localhost/f1project/players/"+row.id+".jpg"}/></td>
                                  <td><Link to={"/football/player/profile/"+row.id} className="link" >{row.name}</Link></td>
                                        </td>
                                    ))}
                                    </tr>
                                </tbody>
                            </table>       
                            <table >
                                <tbody>
                                    <tr style={{display:"flex", flexWrap:"wrap"}}>
                                {midfielders.map((row,index)=> (
                                    <td style={{padding:"15px"}} key={index}>
                                  <td><Avatar  src={"http://localhost/f1project/players/"+row.id+".jpg"}/></td>
                                  <td><Link to={"/football/player/profile/"+row.id} className="link" >{row.name}</Link></td>
                                        </td>
                                    ))}
                                    </tr>
                                </tbody>
                            </table>       
                            <table >
                                <tbody>
                                    <tr style={{display:"flex", flexWrap:"wrap"}}>
                                {attackers.map((row,index)=> (
                                    <td style={{padding:"15px"}} key={index}>
                                  <td><Avatar  src={"http://localhost/f1project/players/"+row.id+".jpg"}/></td>
                                  <td><Link to={"/football/player/profile/"+row.id} className="link" >{row.name}</Link></td>
                                        </td>
                                    ))}
                                    </tr>
                                </tbody>
                            </table>       
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            {results.length>0?(<table className='table'>
                                <thead>
                                    <tr>
                                        <th>Match</th>
                                        <th>Home Team</th>
                                        <th>Away Team</th>
                                        <th>Score</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {results.map(( item ,index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.home_team}</td>
                                        <td>{item.away_team}</td>
                                        <OverlayTrigger
                                            trigger="hover"
                                            key="bottom"
                                            placement='right'
                                            overlay={
                                            <Popover id={`popover`}>
                                            <Popover.Header as="h3">{`Match Facts`}</Popover.Header>
                                                <Popover.Body>
                                                    {item.facts.map((facts, index)=>(<p key={index}>{facts.minute} {facts.type==="owngoal"&&(<img className="factIcons"
                                                                                                                    src="http://localhost/f1project/owngoal.jpg"/>)||
                                                                                                                    facts.type==="goal"&&(<img  className="factIcons"
                                                                                                                    src="http://localhost/f1project/football.png"/>)||
                                                                                                                    facts.type==="yellow card"&&(<img className="factIcons"
                                                                                                                    src="http://localhost/f1project/yellow_card.jpg"/>)||
                                                                                                                    facts.type==="red card"&&(<img className='factIcons'
                                                                                                                    src="http://localhost/f1project/red_card.png"/>)}{facts.player}
                                                                                     </p>))}
                                                </Popover.Body>
                                            </Popover>}>
                                            <td> {item.score}</td>
                                        </OverlayTrigger>
                                        <td>{item.date}</td>
                                        <td>{item.time}</td>
                                        <td><Link to={"/football/match/details/"+item.id}><Button>View</Button></Link></td>
                                    </tr>) )}
                                </tbody>
                            </table>):(<p>No results</p>)}
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                       {fixtures.length>0 ?(<table className='table'>
                                <thead>
                                    <tr>
                                        <th>Match</th>
                                        <th>Home Team</th>
                                        <th>Away Team</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {fixtures.map(( item ,index) => (<tr key={index}>
                                                                        <td>{index+1}</td>
                                                                        <td>{item.home_team}</td>
                                                                        <td>{item.away_team}</td>
                                                                        <td>{item.date}</td>
                                                                        <td>{item.time}</td>
                                                                </tr>))}
                                </tbody>
                        </table>):(<p>No scheduled matches</p>)}
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                    {transfers.length>0 ?(<table className='table'>
                                <thead>
                                    <tr>
                                        <th>Player</th>
                                        <th>From</th>
                                        <th></th>
                                        <th>To</th>
                                        <th>Fee</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {transfers.map(( item ,index) => (<tr key={index}>
                                                                        <td>{item.player}</td>
                                                                        <td>{item.from}</td>
                                                                        <td>
                                                                            <img style={{width:"15px"}}
                                                                                 src="http://localhost/f1project/arrow.png">
                                                                            </img>
                                                                        </td>
                                                                        <td>{item.to}</td>
                                                                        <td>{item.fee}</td>
                                                                        <td>{item.date}</td>
                                                                </tr>))}
                                </tbody>
                        </table>):(<p>No recent transfers</p>)}
                    </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
    </>)
}