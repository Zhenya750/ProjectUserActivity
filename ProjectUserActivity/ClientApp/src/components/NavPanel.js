import React from 'react';
import { Container, Row, Col, Navbar, Form, FormControl, Image } from 'react-bootstrap'

export class NavPanel extends React.Component {
    render() {
        return (
            <Navbar className="navpanel" fixed="top">
                <Navbar.Brand className="mx-3">
                    <h2 className="brand">Company Brand</h2>
                </Navbar.Brand>

                <Container>
                    <Form>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="mr-2 form-input search-input" />
                    </Form>

                    <Navbar.Collapse className="justify-content-end">
                        <Image src="img/programmer.jpg" width="40px" roundedCircle className="mx-4"/>
                        <Image src="img/signout.svg" width="20px" roundedCircle />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}