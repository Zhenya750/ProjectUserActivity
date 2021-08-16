import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'

export class RollingRetention extends React.Component {
    render() {
        return (
            <Container className="white-shadow roll-ret">
                <Row>
                    <Col>
                        <p>Rolling Retention 7 day: </p>
                        <h1>{this.props.value}%</h1>
                    </Col>
                </Row>
            </Container>
        );
    }
}