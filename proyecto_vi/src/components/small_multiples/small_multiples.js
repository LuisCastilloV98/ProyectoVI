import React from 'react';
import Data from './ejemplo_100_filas'
import {ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter} from 'recharts'

const cardStyle =  {
    height: "350px",
    width: "350px",
    boxShadow: "-2px 0px 10px -2px"
}

const Chart = ({xCategory, xAxis, yCategory, yAxis}) => {
  let zipedData = xAxis.map((x,i) => ({
    'x': x,
    'y': yAxis[i]
  }));
  console.log(xCategory, yCategory);

  return (
    <ScatterChart width={300} height={300}
                  margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <YAxis dataKey='y' name='y' tick={{fontSize: 10}} type='number'/>
      <XAxis dataKey='x' name='x' tick={{fontSize: 10}} type='number'/>
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter name={`${xCategory}, ${yCategory}`} data={zipedData} fill="#8884d8" />
    </ScatterChart>
  )
}

class SMCard extends React.Component{
  constructor(props) {
    let xCategory = props.columnas[props.selectedA];
    let xAxis = props.datos[xCategory];
    let yCategory = props.columnas[props.selectedB];
    let yAxis = props.datos[yCategory];
    super(props)
    this.state = {
      xAxis: xAxis,
      xCategory: xCategory,
      yAxis: yAxis,
      yCategory: yCategory,
    }
  }

  changeX(event) {
    let category = this.props.columnas[event.target.value];
    let axis = this.props.datos[category];
    this.setState({
      xCategory: category,
      xAxis: axis,
    })
  }

  changeY(event) {
    let category = this.props.columnas[event.target.value];
    let axis = this.props.datos[category];
    this.setState({
      yCategory: category,
      yAxis: axis,
    })
  }

  render() {
    return (
      <div style={cardStyle}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <select onChange={(e) => this.changeX(e)} syle={{margin: '0'}}>
            {
              this.props.columnas.map((x, i) => (
                <option key={i} value={i} selected={i === this.props.selectedA}>{x}</option>
              ))
            }
          </select>
          <div> x </div>
          <select onChange={(e) => this.changeY(e)}>
            {
              this.props.columnas.map((x, i) => (
                <option key={i} value={i} selected={i === this.props.selectedB}>{x}</option>
              ))
            }
          </select>
        </div>
        <div>
          <Chart
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            xCategory={this.state.xCategory}
            yCategory={this.state.yCategory}
          />
        </div>
      </div>
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
  console.log(dataObjects);
  return dataObjects;
}

class SmallMultiples extends React.Component{
  dataObjects;
  columnas;

  render() {
    let dataObjects = processData(Data);
    let columnas = Data.columnas;

    return (
      <section style={{padding: 0, margin: 0}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <SMCard columnas={columnas} datos={dataObjects} selectedA={0} selectedB={1}/>
            <SMCard columnas={columnas} datos={dataObjects} selectedA={0} selectedB={2}/>
            <SMCard columnas={columnas} datos={dataObjects} selectedA={0} selectedB={3}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <SMCard columnas={columnas} datos={dataObjects} selectedA={1} selectedB={1}/>
            <SMCard columnas={columnas} datos={dataObjects} selectedA={1} selectedB={2}/>
            <SMCard columnas={columnas} datos={dataObjects} selectedA={1} selectedB={3}/>
          </div>
        </div>
      </section>
    )
  }

}

export default SmallMultiples;
