import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

export class AddUserPanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            registration: '',
            lastActivity: '',
        };

        this.handleRegistrationChange = this.handleRegistrationChange.bind(this);
        this.handleLastActivityChange = this.handleLastActivityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleRegistrationChange(event) {
        this.setState({
            registration: event.target.value
        });
    }

    handleLastActivityChange(event) {
        this.setState({
            lastActivity: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const reg = this.state.registration;
        const lastact = this.state.lastActivity;

        if (new Date(reg).getTime() > new Date(lastact).getTime()) {
            //return;
        }

        this.props.onAddUserSubmit({
            registration: reg,
            lastActivity: lastact,
        });

        this.setState({
            registration: '',
            lastActivity: '',
        });
    }

    render() {
        return (
            <Container>
                <h2 className="title">New user</h2>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalRegDate">
                        <Form.Label column sm={3}>
                            <p className="form-title">Registration date</p>
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                type="date"
                                placeholder="none"
                                className="form-input"
                                value={this.state.registration}
                                onChange={this.handleRegistrationChange} />
                        </Col>
                        <Col></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalLastDate">
                        <Form.Label column sm={3}>
                            <p className="form-title">Date last activity</p>
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                type="date"
                                className="form-input"
                                value={this.state.lastActivity}
                                onChange={this.handleLastActivityChange} />
                        </Col>
                        <Col></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 float-end">
                        <Col>
                            <Button type="submit" className="usual-button">Save</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        );
    }
}