import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { NavPanel } from './NavPanel';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';

export class App extends React.Component {
    render() {
        return (
            <Container fluid className="bg-light">
                <Row>
                    <NavPanel />
                </Row>
                
                <Row className="sidebar px-0 d-lg-block d-none">
                    <Sidebar />
                </Row>

                <Row>
                    <Col lg={2} className="d-lg-block d-none">
                    </Col>

                    <Col lg={8}>
                        <MainContent apiUrl="/api/users"/>
                    </Col>

                    <Col lg={2} className="d-lg-block d-none"></Col>
                </Row>
            </Container>
        );
    }
}