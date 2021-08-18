import React from 'react';
import { Container } from 'react-bootstrap'
import { AddUserPanel } from './AddUserPanel';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


export class MyTable extends React.Component {

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
        const cols = [
            { dataField: 'id', text: 'UserID', sort: true },
            { dataField: 'registration', text: 'Registration date', sort: true },
            { dataField: 'lastActivity', text: 'Last activity date', sort: true },
        ];

        return (
            <Container>
                <BootstrapTable 
                    keyField='id' 
                    data={this.state.users} 
                    columns={cols}
                    headerWrapperClasses="table-header table-text"
                    bodyClasses="table-row table-text table-row-text"
                    id="table" 
                />

                <AddUserPanel onAddUserSubmit={this.handleAddUserSubmit} />

            </Container>
        );
    }
}