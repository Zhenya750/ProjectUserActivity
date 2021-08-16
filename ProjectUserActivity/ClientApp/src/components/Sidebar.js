import React from 'react';
import { Container, Row, Col, Accordion, ListGroup } from 'react-bootstrap'

export class Sidebar extends React.Component {
    render() {
        return (
            <Container>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <p className="form-title py-2">Projects</p>
                        </Accordion.Header>

                        <Accordion.Body>
                            <ListGroup>
                                <ListGroup.Item>Steampunk defense</ListGroup.Item>
                                <ListGroup.Item>Worldwar Clicker</ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        );
    }
}