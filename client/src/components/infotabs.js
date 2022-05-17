import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav'
import React from 'react';
import axios from 'axios';
import {FixtureObject,ResultObject, TransferObject} from"./objects/objects.js";

export default function Infotabs({id}) {

    
const [names, setNames]= React.useState([])
const [results, setResults]= React.useState([])
const [fixtures, setFixtures]= React.useState([])
const [transfers, setTransfers]= React.useState([])
React.useEffect(()=>{
    axios({
        method: 'GET',
        url: "http://localhost:3001/players/"+id,
    })
    .then(response =>{
        console.log(response.data)
        var tempnames=[]
         response.data.forEach((element) => {
            tempnames.push(element.fname+" " + element.lname+" ")
          });
          setNames(tempnames)
    })
    .catch(error=>{
        console.log(error)
    })

    axios({
        method: 'GET',
        url: "http://localhost:3001/matches/"+id,
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
            obj2.league= element.league;
            obj2.home_team = element.home_team;
            obj2.away_team = element.away_team;
            obj2.score = element.home_team_score + ":" +element.away_team_score;
            obj2.date=element.date;
            obj2.time = element.time;
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
        url: "http://localhost:3001/transfers/"+id,
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
                        {names.map(( name ,index) => (<p key={index}>{name}</p>) )}
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            {results.length>0?(<table className='table'>
                                <thead>
                                    <td>Match</td><td>Home Team</td><td>Away Team</td><td>Score</td><td>Date</td><td>Time</td>
                                </thead>
                                <tbody>
                        {results.map(( item ,index) => (<tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{item.home_team}</td>
                                                            <td>{item.away_team}</td>
                                                            <td>{item.score}</td>
                                                            <td>{item.date}</td>
                                                            <td>{item.time}</td>
                                                        </tr>) )}
                        </tbody>
                        </table>):(<p>No results</p>)}
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                       {fixtures.length>0 ?(<table className='table'>
                                <thead>
                                    <td>Match</td><td>Home Team</td><td>Away Team</td><td>Date</td><td>Time</td>
                                </thead>
                                <tbody>
                        {fixtures.map(( item ,index) => (<tr key={index}> <td>{index+1}</td><td>{item.home_team}</td><td>{item.away_team}</td><td>{item.date}</td><td>{item.time}</td></tr>) )}
                        </tbody>
                        </table>):(<p>No scheduled matches</p>)}
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                        {JSON.stringify(transfers)}
                    </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
    </>)
}