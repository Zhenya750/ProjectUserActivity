import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

export class AddUserPanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            registration: '',
            lastActivity: '',
            error: null,
        };

        this.handleRegistrationChange = this.handleRegistrationChange.bind(this);
        this.handleLastActivityChange = this.handleLastActivityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
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

        const error = this.validate(reg, lastact);

        if (error) {
            this.setState({
                error: error,
            });

            return;
        }

        this.props.onAddUserSubmit({
            registration: reg,
            lastActivity: lastact,
        });

        this.setState({
            registration: '',
            lastActivity: '',
            error: null,
        });
    }

    validate(registration, lastActivity) {
        if (!registration || !lastActivity) {
            return 'Fields cannot be empty';
        }

        if (new Date(registration).getTime() > new Date(lastActivity).getTime()) {
            return 'Registration date cannot exceed the last user activity';
        }

        return null;
    }

    render() {
        return (
            <Container className="new-user-form">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalUserInfo">
                        <Form.Label column>
                            <p className="form-title">New user</p>
                        </Form.Label>

                        <Col>
                            <Form.Control
                                type="date"
                                className="form-input"
                                value={this.state.registration}
                                onChange={this.handleRegistrationChange} />
                        </Col>

                        <Col>
                            <Form.Control
                                type="date"
                                className="form-input"
                                value={this.state.lastActivity}
                                onChange={this.handleLastActivityChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formNewUser">
                        {this.state.error &&
                            <Col>
                                <p className="table-text form-title error-message">{this.state.error}</p>
                            </Col>
                        }

                        <Col className="text-end">
                            <Button
                                type="submit"
                                className="usual-button">Save</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        );
    }
}