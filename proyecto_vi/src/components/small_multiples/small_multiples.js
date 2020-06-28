import React from 'react';
import Data from './ejemplo_100_2';
import Chart from './chart';
import { Form, Card, Container, Row, Col } from 'react-bootstrap';

const SMCard = ({selectedA, selectedB, columnas, datos, changeCol, dataClick}) => {
  let xCategory = columnas[selectedA];
  let xAxis = datos[xCategory];
  let yCategory = columnas[selectedB];
  let yAxis = datos[yCategory];
  return (
    <Card>
      <Card.Title>
        <Form.Control as="select" onChange={(e) => changeCol(e)}>
          {
            columnas.map((x, i) => (
              <option key={i} value={i} selected={i === selectedB}>{x}</option>
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
      selectedColumns: [0, 1, 2],
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

  dataClick(event) {
   
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
                selectedA={this.state.selectedRow}
                selectedB={this.state.selectedColumns[0]}
                changeCol={(e) => this.changeCol(e, 0)}
              />
            </Col>
            <Col>
              <SMCard
                columnas={this.props.columnas}
                datos={this.props.dataObjects}
                selectedA={this.state.selectedRow}
                selectedB={this.state.selectedColumns[1]}
                changeCol={(e) => this.changeCol(e, 1)}
              />
            </Col>
            <Col>
              <SMCard
                columnas={this.props.columnas}
                datos={this.props.dataObjects}
                selectedA={this.state.selectedRow}
                selectedB={this.state.selectedColumns[2]}
                changeCol={(e) => this.changeCol(e, 2)}
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

  render() {
    let dataObjects = processData(Data);
    let columnas = Data.columnas;

    return (
      <Container>
        <SMRow columnas={columnas} dataObjects={dataObjects} selectedRow={0}/>
        <SMRow columnas={columnas} dataObjects={dataObjects} selectedRow={1}/>
      </Container>
    )
  }

}

const processData = (data) => {
  const dataObjects = {};
  for (let i = 0; i < data.columnas.length; i++) {
    let columna = data.columnas[i];
    let datos = data.datos.map(x => x[i]);
    dataObjects[columna] = datos;
  }
  return dataObjects;
}

export default SmallMultiples;
