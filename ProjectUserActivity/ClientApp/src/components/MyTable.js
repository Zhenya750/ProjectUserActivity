import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';


export class MyTable extends React.Component {
    render() {
        const cols = [
            { dataField: 'id', text: 'UserID', sort: true },
            { dataField: 'registration', text: 'Registration date', sort: true },
            { dataField: 'lastActivity', text: 'Last activity date', sort: true },
        ];

        const options = {
            paginationSize: 5,
            showTotal: false,
            sizePerPageList: [
                { text: '5', value: 5 },
                { text: '10', value: 10 },
                { text: 'All', value: this.props.data.length }
            ],
        };

        return (
            <Container>
                <h2 className="title">Users activity distribution</h2>

                <BootstrapTable 
                    keyField='id' 
                    data={this.props.data} 
                    columns={cols}
                    pagination={paginationFactory(options)}
                    headerWrapperClasses="table-header table-text"
                    bodyClasses="table-row table-text table-row-text"
                    id="table" 
                />
            </Container>
        );
    }
}