import React from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import data_colegios from './dataRadar';
import { Container, Button, Form, Col, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import  colegios from './dato_colegio';



class Hierarchy extends React.Component {

    state = {
        industry: [],
    };


    constructor(props) {
        super(props);
        this.gloabachartRadarChart = null;
        this.valoresComparar = ["Tasa Reprobados Total", "Tasa Aprobados Total", "Tasa Repitentes Total", "Tasa Abandono Total", "Tasa Adecuacion Significativa", "Tasa Aprobacion de Bachillerato"];
    }

    getdataforPolar(){
        var data_result = [];
        for (var i = 0; i < this.valoresComparar.length; i++) {
            var nuevo_elemento = {};
            nuevo_elemento.category = this.valoresComparar[i];
            for (var j = 0; j < colegios.length; j++) {
                var colegio_actual = colegios[j];
                var name_Columna = colegio_actual.nombre_ins;
                var value_Columna = colegio_actual[this.valoresComparar[i]];
                nuevo_elemento[name_Columna] = value_Columna;
            }
            data_result.push(nuevo_elemento);
        
        }
        console.log(data_result);

        return data_result;
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

        //data
        this.getdataforPolar();
        chartRadarChart.data =  this.getdataforPolar();

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

        chartRadarChart.seriesContainer.zIndex = -1;

        chartRadarChart.scrollbarX = new am4core.Scrollbar();
        chartRadarChart.scrollbarX.exportable = false;
        chartRadarChart.scrollbarY = new am4core.Scrollbar();
        chartRadarChart.scrollbarY.exportable = false;

        let cursor = new am4charts.RadarCursor();
        chartRadarChart.cursor = cursor;
        cursor.behavior = "selectY";

        cursor.xAxis = categoryAxis;
        cursor.innerRadius = am4core.percent(40);
        cursor.lineY.disabled = true;
        
        cursor.xAxis = categoryAxis;
        cursor.fullWidthXLine = true;
        cursor.lineX.strokeOpacity = 0;
        cursor.lineX.fillOpacity = 0.1;
        cursor.lineX.fill = am4core.color("#000000");

        cursor.lineX.fillOpacity = 0.2;
        cursor.lineX.fill = am4core.color("#000000");
        cursor.lineX.strokeOpacity = 0;
        cursor.fullWidthLineX = true;

        cursor.xAxis = categoryAxis;
        cursor.fullWidthXLine = true;
        cursor.lineX.strokeOpacity = 0;
        cursor.lineX.fillOpacity = 0.1;
        cursor.lineX.fill = am4core.color("#000000");

        // chartRadarChart.cursor = new am4charts.RadarCursor();
        // chartRadarChart.cursor.top

        // chartRadarChart.cursor.xAxis = categoryAxis;
        // chartRadarChart.cursor.fullWidthXLine = true;
        // chartRadarChart.cursor.lineX.strokeOpacity = 0;
        // chartRadarChart.cursor.lineX.fillOpacity = 0.1;
        // chartRadarChart.cursor.lineX.fill = am4core.color("#000000");

        this.gloabachartRadarChart = chartRadarChart;

    }

    handleTypeaheadChangeIndustry = selected => {
        const industry = selected.map(option => option);
        this.setState({ industry });
      };

    validate = e => {
        e.preventDefault(); // Don't reload the page
        this.gloabachartRadarChart.series.clear();
        for (var j = 0; j < this.state.industry.length; j++) {
            var colegio_actual =  this.state.industry[j];
            console.log(colegio_actual);

            let series1 = this.gloabachartRadarChart.series.push(new am4charts.RadarColumnSeries());
            series1.columns.template.tooltipText = "{name}: {valueY.value}";
            series1.columns.template.width = am4core.percent(100);
            series1.name = colegio_actual.nombre_ins;
            series1.dataFields.categoryX = "category";
            series1.dataFields.valueY = colegio_actual.nombre_ins;
        }

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
                                    labelKey="nombre_ins"
                                    multiple
                                    onChange={this.handleTypeaheadChangeIndustry}
                                    options={colegios}
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
