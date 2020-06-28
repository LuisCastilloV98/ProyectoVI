import React from 'react';
import {ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter} from 'recharts'

class Chart extends React.Component {
  render() {
    let zipedData = this.props.xAxis.map((x,i) => {
      let value = {
        id: i
      };
      value[this.props.xCategory] = x;
      value[this.props.yCategory] = this.props.yAxis[i];
      return value;
    });

    let zipedSelectedData = this.props.selectedIds.map(id => (
      zipedData[id]
    ))

    return (
      <ScatterChart width={300} height={300}
                    onMouseDown={(e) => {console.log(e)}}
                    margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
        <CartesianGrid
          strokeDasharray="3 3" />
        <YAxis dataKey={ this.props.yCategory } name={ this.props.yCategory } tick={{fontSize: 10}} type='number'/>
        <XAxis dataKey={ this.props.xCategory } name={ this.props.xCategory } tick={{fontSize: 10}} type='number'/>
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter onClick={this.props.dataClick} name={`${this.props.xCategory}, ${this.props.yCategory}`} data={zipedData} fill="#8884d8" />
        <Scatter
          onClick={this.props.dataClick}
          name={`${this.props.xCategory}, ${this.props.yCategory}`}
          data={zipedSelectedData}
          fill="#88d884" />
      </ScatterChart>
    )
  }
}

export default Chart;
