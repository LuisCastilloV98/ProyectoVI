import React from 'react';
import { ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter, ReferenceArea, Label} from 'recharts'

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      areaStart: null,
      areaEnd: null,
    }
  }

  selectData() {
    let zipedData = this.props.xAxis.map((x,i) => {
      let value = {
        id: i
      };
      value[this.props.xCategory] = x;
      value[this.props.yCategory] = this.props.yAxis[i];
      return value;
    });

    let xValues = [this.state.areaStart[0], this.state.areaEnd[0]].sort();
    let yValues = [this.state.areaStart[1], this.state.areaEnd[1]].sort();
    let selectedIds = []

    zipedData.forEach((dataPoint, i) => {
      if (dataPoint[this.props.xCategory] > xValues[0] &&
          dataPoint[this.props.xCategory] < xValues[1] &&
          dataPoint[this.props.yCategory] > yValues[0] &&
          dataPoint[this.props.yCategory] < yValues[1]) {
        selectedIds.push(i);
      }
    });

    this.props.dataClick(selectedIds);
    this.setState({areaStart: null, areaEnd: null});
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
                    onMouseDown={(e) => {this.setState({areaStart: [e.xValue, e.yValue], areaEnd: [e.xValue, e.yValue]})}}
                    onMouseMove={(e) => {e!=null &&
                                         this.state.areaStart != null &&
                                         this.setState({areaEnd: [e.xValue, e.yValue]})
                                        }}
                    onMouseUp={(e) => {this.selectData()}}
                    margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
        <CartesianGrid
          strokeDasharray="3 3" />
        <YAxis dataKey={this.props.yCategory} name={ this.props.yCategory } tick={{fontSize: 10}} type='number'>
          <Label value={this.props.yCategory} angle={-90} offset={140} position="insideBottom" />
        </YAxis>
        <XAxis dataKey={this.props.xCategory} name={ this.props.xCategory } tick={{fontSize: 10}} type='number'>
          <Label value={this.props.xCategory} offset={0} position="insideBottom" />
        </XAxis>
        <Scatter onClick={(e) => this.props.dataClick(e.id)} name={`${this.props.xCategory}, ${this.props.yCategory}`} data={zipedData} fill="#8884d8" />
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
            /> : <Tooltip content={<this.CustomTooltip/>} cursor={{ strokeDasharray: '3 3' }} />
        }
      </ScatterChart>
    )
  }

  CustomTooltip = ({ active, payload }) => {
    if (active) {
      const colegio_id = payload[0].payload.id;
      const colegio = this.props.colegios[colegio_id];
      return (
        <div style={{backgroundColor: 'rgba(240, 240, 240, 0.5)'}}>
          <p className="label">{`Colegio: ${colegio}`}</p>
          <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
          <p className="label">{`${payload[1].name} : ${payload[1].value}`}</p>
        </div>
      );
    }

    return null;
  };

}


export default Chart;
