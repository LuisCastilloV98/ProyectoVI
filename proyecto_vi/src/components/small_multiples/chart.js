import React from 'react';
import {ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter, ReferenceArea} from 'recharts'

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      areaStart: null,
      areaEnd: null,
    }
  }

  selectData() {

    this.setState({areaEnd: null, areaStart: null});
  }

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
                    onMouseDown={(e) => {this.setState({areaStart: [e.xValue, e.yValue]})}}
                    onMouseMove={(e) => {e!=null &&
                                         this.state.areaStart != null &&
                                         this.setState({areaEnd: [e.xValue, e.yValue]})
                                        }}
                    onMouseUp={(e) => {this.selectData()}}
                    margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
        <CartesianGrid
          strokeDasharray="3 3" />
        <YAxis dataKey={ this.props.yCategory } name={ this.props.yCategory } tick={{fontSize: 10}} type='number'/>
        <XAxis dataKey={ this.props.xCategory } name={ this.props.xCategory } tick={{fontSize: 10}} type='number'/>
        <Scatter onClick={this.props.dataClick} name={`${this.props.xCategory}, ${this.props.yCategory}`} data={zipedData} fill="#8884d8" />
        <Scatter
          onClick={this.props.dataClick}
          name={`${this.props.xCategory}, ${this.props.yCategory}`}
          data={zipedSelectedData}
          fill="#88d884" />
        {
          (this.state.areaStart != null && this.state.areaEnd != null) ?
            <ReferenceArea x1={this.state.areaStart[0]}
              y1={this.state.areaStart[1]}
              x2={this.state.areaEnd[0]}
              y2={this.state.areaEnd[1]}
              strokeOpacity={0.3}
            /> : <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        }
      </ScatterChart>
    )
  }
}

export default Chart;
