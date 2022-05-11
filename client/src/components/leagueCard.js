import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link} from "react-router-dom";

export const LeagueCard =({title, img, url}) => {
return(<>
    <Card>
    <Card.Img variant="top" src={img} style={{height:"250px"}}/>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>
       
      </Card.Text>
      <Link to={url}>
      <Button variant="outline-dark">Enter</Button>
      </Link>
  </Card.Body>
  </Card></>
)
}