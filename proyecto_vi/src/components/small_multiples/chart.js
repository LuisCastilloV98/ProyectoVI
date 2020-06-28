import React from 'react';
import {ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter} from 'recharts'

const Chart = ({xCategory, xAxis, yCategory, yAxis, selectedIds, dataClick}) => {
  let zipedData = xAxis.map((x,i) => {
    let value = {
      id: i
    };
    value[xCategory] = x;
    value[yCategory] = yAxis[i];
    return value;
  });

  let zipedSelectedData = selectedIds.map(id => (
    zipedData[id]
  ))

  console.log(selectedIds);
  console.log(zipedSelectedData);

  return (
    <ScatterChart width={300} height={300}
                  onMouseDown={(e) => {console.log(e)}}
                  margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
      <CartesianGrid
        strokeDasharray="3 3" />
      <YAxis dataKey={ yCategory } name={ yCategory } tick={{fontSize: 10}} type='number'/>
      <XAxis dataKey={ xCategory } name={ xCategory } tick={{fontSize: 10}} type='number'/>
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter onClick={dataClick} name={`${xCategory}, ${yCategory}`} data={zipedData} fill="#8884d8" />
      <Scatter
        onClick={dataClick}
        name={`${xCategory}, ${yCategory}`}
        data={zipedSelectedData}
        fill="#88d884" />
    </ScatterChart>
  )
}

export default Chart;
