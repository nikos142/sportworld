import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav'

export default function Infotabs() {

    return(<>
 <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                    <Nav.Link eventKey="first">Profile</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="second">Squad</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="third">Results</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="fourth">Next Matches</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                    Η Μάντσεστερ Σίτι είναι επαγγελματική ομαδα ποδοσφαίρου που εδρεύει στο Μάντσεστερ. Αγωνίζεται στην αγγλική κατηγορία, την Πρέμιερ Λιγκ.Ιδρύθηκε το 1880 με το όνομα St. Mark's, μετονομάστηκε σε Ardwick Association Football Club το 1887 και απέκτησε το σημερινό της όνομα το 1894.
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      Kevin de bruine
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                        citi - liverpool
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                      city -united
                </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>
    </>)
}