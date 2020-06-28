import React from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import data_colegios from './dataRadar';
import { Container, Button, Form, Col, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import options from './options';

class Hierarchy extends React.Component {

    state = {
        industry: [],
    };

    constructor(props) {
        super(props);
        this.gloabachartRadarChart = null;

    }


    create_sankey() {
        let chartSankey = am4core.create("hierarchy", am4charts.SankeyDiagram);
        chartSankey.data = [
            { "from": "Violencia", "to": "SM", "value": 70 },
            { "from": "Violencia", "to": "IM", "value": 30 },
            { "from": "IM", "to": "Violen. Verbal", "value": 7 },
            { "from": "IM", "to": "Violen. Fisica", "value": 7 },
            { "from": "IM", "to": "Violen. Escrita", "value": 16 },
            { "from": "SM", "to": "Violen. Verbal", "value": 14 },
            { "from": "SM", "to": "Violen. Fisica", "value": 14 },
            { "from": "SM", "to": "Violen. Escrita", "value": 42 },
        ]

        chartSankey.dataFields.fromName = "from";
        chartSankey.dataFields.toName = "to";
        chartSankey.dataFields.value = "value";

        chartSankey.links.template.interactionsEnabled = true;
        chartSankey.links.template.events.on("hit", function (ev) {
            let connection = ev.target.dataItem.properties;
            let value = ev.target.value;
            console.log('data context: ', ev.target.dataItem.dataContext);
            console.log("clicked on ", connection, value);
        }, this);

    }

    create_polarchart() {
        let chartRadarChart = am4core.create("chartdiv", am4charts.RadarChart);
        chartRadarChart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chartRadarChart.data = data_colegios;

        chartRadarChart.padding(20, 20, 20, 20);

        let categoryAxis = chartRadarChart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.labels.template.location = 0.5;
        categoryAxis.renderer.tooltipLocation = 0.5;
        categoryAxis.renderer.cellStartLocation = 0.2;
        categoryAxis.renderer.cellEndLocation = 0.8;

        let valueAxis = chartRadarChart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.labels.template.horizontalCenter = "left";
        valueAxis.min = 0;

        let series1 = chartRadarChart.series.push(new am4charts.RadarColumnSeries());
        series1.columns.template.tooltipText = "{name}: {valueY.value}";
        series1.columns.template.width = am4core.percent(100);
        series1.name = "Series 1";
        series1.dataFields.categoryX = "category";
        series1.dataFields.valueY = "value1";

        let series2 = chartRadarChart.series.push(new am4charts.RadarColumnSeries());
        series2.columns.template.width = am4core.percent(100);
        series2.columns.template.tooltipText = "{name}: {valueY.value}";
        series2.name = "Series 2";
        series2.dataFields.categoryX = "category";
        series2.dataFields.valueY = "value2";


        chartRadarChart.seriesContainer.zIndex = -1;

        chartRadarChart.scrollbarX = new am4core.Scrollbar();
        chartRadarChart.scrollbarX.exportable = false;
        chartRadarChart.scrollbarY = new am4core.Scrollbar();
        chartRadarChart.scrollbarY.exportable = false;

        chartRadarChart.cursor = new am4charts.RadarCursor();
        chartRadarChart.cursor.xAxis = categoryAxis;
        chartRadarChart.cursor.fullWidthXLine = true;
        chartRadarChart.cursor.lineX.strokeOpacity = 0;
        chartRadarChart.cursor.lineX.fillOpacity = 0.1;
        chartRadarChart.cursor.lineX.fill = am4core.color("#000000");

        this.gloabachartRadarChart = chartRadarChart;

    }

    handleTypeaheadChangeIndustry = selected => {
        const industry = selected.map(option => option.name);
        this.setState({ industry });
      };

    validate = e => {
        e.preventDefault(); // Don't reload the page
        console.log(this.state.industry);
        alert(this.state.industry);
        return true;
    };

    componentDidMount() {
        this.create_sankey();
        this.create_polarchart();

    }


    componentWillUnmount() {
        if (this.chartSankey) {
            this.chartSankey.dispose();
        }
    }

    render() {

        return (
            <Container fluid>
                <Row>
                    <Col>
                        <div id="chartdiv" style={{ height: "75vh" }}></div>

                        <Form onSubmit={this.validate}>
                            <Form.Group>
                                <Form.Label>Colegios</Form.Label>
                                <Typeahead
                                    id="basic-example"
                                    labelKey="name"
                                    multiple
                                    onChange={this.handleTypeaheadChangeIndustry}
                                    options={options}
                                    placeholder="Escoje alguna institución...">
                                </Typeahead>
                            </Form.Group>
                            <Button type="submit">Actualizar</Button>
                        </Form>

                    </Col>
                    <Col>
                        <div id="hierarchy" style={{ height: "75vh" }}></div>
                    </Col>
                </Row>
            </Container>
        );

       
    }
}

export default Hierarchy;
