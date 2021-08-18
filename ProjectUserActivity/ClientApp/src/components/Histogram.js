import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { Chart } from 'react-google-charts';

export class Histogram extends React.Component {
    render() {
        const options = {
            title: 'Users activity distribution',
            legend: { position: 'none' },
            colors: [ '#4A9DFF'],
            backgroundColor: 'white',
            hAxis: {
                title: 'Days',
                minValue: 0,
            },
            vAxis: {
                title: 'Users',
                minValue: 0,
            }
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