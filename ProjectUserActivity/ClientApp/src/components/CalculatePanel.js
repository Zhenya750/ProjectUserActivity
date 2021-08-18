import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { RollingRetention } from './RollingRetention';
import { Histogram } from './Histogram';

export class CalculatePanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rollingRetention: null,
            histogramData: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getHistogramData(totalDays) {

        const data = totalDays.map((days, i) => {
            return ['', days];
        });

        return [['', 'Days']].concat(data);
    }

    loadRollingRetention(day) {
        const xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl + '/rollingretention/' + day, true);

        xhr.onload = function () {
            const data = JSON.parse(xhr.responseText);
            this.setState({
                rollingRetention: data,
            });
        }.bind(this);

        xhr.send();

    }

    loadTotalDays() {
        const xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl + '/totaldays', true);

        xhr.onload = function () {
            const data = JSON.parse(xhr.responseText);
            
            this.setState({
                histogramData: this.getHistogramData(data),
            });
        }.bind(this);

        xhr.send();
    }

    handleSubmit(event) {
        event.preventDefault();

        this.loadRollingRetention(7);
        this.loadTotalDays();
    }

    render() {
        return (
            <Container>
                <Row>
                    <h2 className="title">Calculation</h2>
                </Row>

                <Row>
                    <Form onSubmit={this.handleSubmit} >
                        <Form.Group as={Row} className="mb-3 float-end">
                            <Col>
                                <Button
                                    type="submit"
                                    className="usual-button">Calculate</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Row>

                <Row className='form-title'>
                    {this.state.rollingRetention != null &&
                        <Col sm={4}>
                            <RollingRetention value={this.state.rollingRetention} />
                        </Col>
                    }

                    {this.state.histogramData != null &&
                        <Col sm={8}>
                            <Histogram data={this.state.histogramData} />
                        </Col>
                    }
                </Row>
            </Container>
        );
    }
}