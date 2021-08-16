import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { AddUserPanel } from './AddUserPanel'
import { MyTable } from './MyTable';
import { CalculatePanel } from './CalculatePanel';

export class MainContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };

        this.handleAddUserSubmit = this.handleAddUserSubmit.bind(this);
    }

    formatDatestring(datestring) {
        let d = new Date(datestring),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;

        if (day.length < 2)
            day = '0' + day;

        return '[' + [day, month, year].join('.') + ']';
    }

    prepareTableData(data) {
        return data.map(user => {
            return {
                id: user.id,
                registration: this.formatDatestring(user.registration),
                lastActivity: this.formatDatestring(user.lastActivity),
            };
        });
    }

    loadTableData() {
        const xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl, true);

        xhr.onload = function () {
            let data = JSON.parse(xhr.responseText);

            if (!data || data.length === 0) {
                data = [];
            }

            this.setState({
                users: this.prepareTableData(data),
            });
        }.bind(this);

        xhr.send();
    }

    componentDidMount() {
        this.loadTableData();
    }

    handleAddUserSubmit(userActivity) {
        if (userActivity) {
            const data = new FormData();
            data.append("registration", userActivity.registration);
            data.append("lastActivity", userActivity.lastActivity);

            const xhr = new XMLHttpRequest();
            xhr.open("post", this.props.apiUrl, true);

            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadTableData();
                }
            }.bind(this);

            xhr.send(data);
        }
    }

     render() {
        return (
            <Container className="mx-5 my-5 py-5">
                <Row className="my-5">
                    <AddUserPanel onAddUserSubmit={this.handleAddUserSubmit} />
                </Row>

                <Row className="my-5">
                    <MyTable data={this.state.users} />
                </Row>

                <Row className="my-5">
                    <CalculatePanel apiUrl={this.props.apiUrl} />
                </Row>
            </Container>
        );
    }
}