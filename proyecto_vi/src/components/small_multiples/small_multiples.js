import React from 'react';
import Data from './tasas_colegios.js';
import Chart from './chart';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import { Form, Card, Container, Row, Col } from 'react-bootstrap';
import am4geodata_costarica from '../../assets/data/costarica';

const SMCard = ({
  selectedColumn,
  selectedRow,
  columnas,
  datos,
  colegios,
  selectedIds,
  changeCol,
  dataClick
}) => {
  let xCategory = columnas[selectedColumn];
  let xAxis = datos[xCategory];
  let yCategory = columnas[selectedRow];
  let yAxis = datos[yCategory];

  return (
    <Card>
      <Card.Title>
        <Form.Control as="select" onChange={(e) => changeCol(e)}>
          {
            columnas.map((x, i) => (
              <option key={i} value={i} selected={i === selectedRow}>{x}</option>
            ))
          }
        </Form.Control>
      </Card.Title>

      <Card.Body>
        <Chart
          xAxis={xAxis}
          yAxis={yAxis}
          xCategory={xCategory}
          yCategory={yCategory}
          selectedIds={selectedIds}
          colegios={colegios}
          dataClick={dataClick}
        />
      </Card.Body>
    </Card>
  )

}

class SMRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRow: this.props.selectedRow,
      selectedColumns: [0, 1, 22],
    }
  }

  changeRow(event) {
    this.setState({selectedRow: event.target.value});
  }

  changeCol(event, index) {
    let cols = this.state.selectedColumns;
    cols[index] = event.target.value;
    this.setState({selectedColumns: cols});
  }

  render() {
    return (
      <Card>
        <Card.Header>
          <Form.Control as="select" onChange={(e) => this.changeRow(e)}>
            {
              this.props.columnas.map((x, i) => (
                <option key={i} value={i} selected={i === this.state.selectedRow}>{x}</option>
              ))
            }
          </Form.Control>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <SMCard
                columnas={this.props.columnas}
                datos={this.props.dataObjects}
                colegios={this.props.colegios}
                selectedColumn={this.state.selectedRow}
                selectedRow={this.state.selectedColumns[0]}
                selectedIds={this.props.selectedDataPointIds}
                changeCol={(e) => this.changeCol(e, 0)}
                dataClick={this.props.selectDataPoints}
              />
            </Col>
            <Col>
              <SMCard
                columnas={this.props.columnas}
                datos={this.props.dataObjects}
                colegios={this.props.colegios}
                selectedColumn={this.state.selectedRow}
                selectedRow={this.state.selectedColumns[1]}
                selectedIds={this.props.selectedDataPointIds}
                changeCol={(e) => this.changeCol(e, 1)}
                dataClick={this.props.selectDataPoints}
              />
            </Col>
            <Col>
              <SMCard
                columnas={this.props.columnas}
                datos={this.props.dataObjects}
                colegios={this.props.colegios}
                selectedColumn={this.state.selectedRow}
                selectedRow={this.state.selectedColumns[2]}
                selectedIds={this.props.selectedDataPointIds}
                changeCol={(e) => this.changeCol(e, 2)}
                dataClick={this.props.selectDataPoints}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }
}

class SmallMultiples extends React.Component{
  dataObjects;
  columnas;

  constructor(props) {
    super(props);
    this.state = {
      selectedDataPointIds: [],
      polygonSeriesmap_puntos: null
    }
  }


  selectDataPoints(...ids) {
    if (ids.length === 0) return;
    const datos = ids[0][0];
    this.setState({
      selectedDataPointIds: datos
    })
    this.setMapValues(datos, Data.coordenadas, Data.centros_educativos);
  }


  render() {
    let dataObjects = processData(Data);
    let columnas = Data.columnas;
    let colegios = Data.centros_educativos;

    return (
      <Container>
        <div id="chartdiv2" style={{ height: "35vh" }}></div>
        <SMRow columnas={columnas}
               dataObjects={dataObjects}
               selectedRow={0}
               colegios={colegios}
               selectedDataPointIds={this.state.selectedDataPointIds}
               selectDataPoints={(...ids) => this.selectDataPoints(ids)}/>
        <SMRow columnas={columnas}
               dataObjects={dataObjects}
               selectedRow={1}
               colegios={colegios}
               selectedDataPointIds={this.state.selectedDataPointIds}
               selectDataPoints={(...ids) => this.selectDataPoints(ids)}/>
      </Container>
    )
  }


  createMapChart() {
    /* Create map instance */
    var chart = am4core.create("chartdiv2", am4maps.MapChart);

    /* Set map definition */
    //chart.geodata = am4geodata_worldLow;
    //chart.geodataSource.url = "http://daticos-geotec.opendata.arcgis.com/datasets/249bc8711c33493a90b292b55ed3abad_0.geojson";
    //chart.geodata = am4geodata_costarica;
    chart.geodata = am4geodata_costarica;

    /* Set projection */
    chart.projection = new am4maps.projections.Miller();

    /* Create map polygon series */
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    /* Make map load polygon (like country names) data from GeoJSON */
    polygonSeries.useGeodata = true;

    /* Configure series */
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.applyOnClones = true;
    polygonTemplate.togglable = true;
    polygonTemplate.tooltipText = "{NOM_CANT_1}";
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeOpacity = 0.5;
    polygonTemplate.fill = chart.colors.getIndex(0);
    var lastSelected;
    polygonTemplate.events.on("hit", function(ev) {
      if (lastSelected) {
        // This line serves multiple purposes:
        // 1. Clicking a country twice actually de-activates, the line below
        //    de-activates it in advance, so the toggle then re-activates, making it
        //    appear as if it was never de-activated to begin with.
        // 2. Previously activated countries should be de-activated.
        lastSelected.isActive = false;
      }
      ev.target.series.chart.zoomToMapObject(ev.target);
      if (lastSelected !== ev.target) {
        lastSelected = ev.target;
      }
    })


    /* Create selected and hover states and set alternative fill color */
    var ss = polygonTemplate.states.create("active");
    ss.properties.fill = chart.colors.getIndex(2);

    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(4);

    // Small map
    chart.smallMap = new am4maps.SmallMap();
    // Re-position to top right (it defaults to bottom left)
    chart.smallMap.align = "right";
    chart.smallMap.valign = "top";
    chart.smallMap.series.push(polygonSeries);

    // Zoom control
    chart.zoomControl = new am4maps.ZoomControl();

    var homeButton = new am4core.Button();
    homeButton.events.on("hit", function(){
      chart.goHome();
    });

    homeButton.icon = new am4core.Sprite();
    homeButton.padding(7, 5, 7, 5);
    homeButton.width = 30;
    homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
    homeButton.marginBottom = 10;
    homeButton.parent = chart.zoomControl;
    homeButton.insertBefore(chart.zoomControl.plusButton);
    //Agregacion de puntos
    // Add image series
    var imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.mapImages.template.propertyFields.longitude = "longitude";
    imageSeries.mapImages.template.propertyFields.latitude = "latitude";
    imageSeries.mapImages.template.tooltipText = "{title}";
    imageSeries.mapImages.template.propertyFields.url = "url";

    var circle = imageSeries.mapImages.template.createChild(am4core.Circle);
    circle.radius = 1;
    circle.propertyFields.fill = "color";

    var circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
    circle2.radius = 1;
    circle2.propertyFields.fill = "color";


    circle2.events.on("inited", function (event) {
      animateBullet(event.target, 1);
    })


    function animateBullet(circle, con) {
      if (con < 3) {
        var animation = circle.animate([
          { property: "scale", from: 1, to: 5 },
          { property: "opacity", from: 1, to: 0 }],
                                       1000,
                                       am4core.ease.circleOut);
        animation.events.on("animationended", function (event) {
          animateBullet(event.target.object, con + 1);
        })
      }
    }

    this.setState({
      polygonSeriesmap_puntos: imageSeries
    })
  }

  componentDidMount() {
    this.createMapChart();
  }

  setMapValues(selectedData, coordenadas, colegios) {
    //console.log(province, canton, anno);
    var temp = [];

    selectedData.forEach((x) => {
      temp.push({
        "title": colegios[x],
        "latitude": coordenadas[x].Latitud,
        "longitude": coordenadas[x].Longitud,
        "color": "red"
      })
    })

    const x = this.state.polygonSeriesmap_puntos;
    x.data = temp
    this.setState({
      polygonSeriesmap_puntos: x
    })
  }

}

const processData = (data) => {
  const dataObjects = {};
  for (let i = 0; i < data.columnas.length; i++) {
    let columna = data.columnas[i];
    let datos = data.datos['2014'].map(x => x[i]);
    dataObjects[columna] = datos;
  }
  return dataObjects;
}

export default SmallMultiples;
