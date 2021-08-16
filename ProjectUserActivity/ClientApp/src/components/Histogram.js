import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { Chart } from 'react-google-charts';

export class Histogram extends React.Component {
    render() {
        const options = {
            title: 'Users total days',
            legend: { position: 'none' },
            colors: [ '#4A9DFF'],
            backgroundColor: 'white',
        };

        return (
            <Container className="histogram white-shadow">
                <Chart
                chartType="Histogram"
                data={this.props.data}
                options={options} />
            </Container>
        );
    }
}