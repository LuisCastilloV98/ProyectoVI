import React from 'react';
import {ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter} from 'recharts'

const Chart = ({xCategory, xAxis, yCategory, yAxis, dataClick}) => {
  let zipedData = xAxis.map((x,i) => {
    let value = {
      id: i
    };
    value[xCategory] = x;
    value[yCategory] = yAxis[i];
    return value;
  });

  return (
    <ScatterChart width={300} height={300}
                  margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <YAxis dataKey={ yCategory } name={ yCategory } tick={{fontSize: 10}} type='number'/>
      <XAxis dataKey={ xCategory } name={ xCategory } tick={{fontSize: 10}} type='number'/>
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter onClick={dataClick} name={`${xCategory}, ${yCategory}`} data={zipedData} fill="#8884d8" />
    </ScatterChart>
  )
}

export default Chart;
