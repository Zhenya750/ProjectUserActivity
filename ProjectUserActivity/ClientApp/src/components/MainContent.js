import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { MyTable } from './MyTable';
import { CalculatePanel } from './CalculatePanel';

export class MainContent extends React.Component {

     render() {
        return (
            <Container className="mx-5 my-5 py-5">
                <Row className="my-5">
                    <MyTable apiUrl={this.props.apiUrl} />
                </Row>

                <Row className="my-5">
                    <CalculatePanel apiUrl={this.props.apiUrl} />
                </Row>
            </Container>
        );
    }
}