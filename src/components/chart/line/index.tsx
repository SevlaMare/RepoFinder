import { useRef } from 'react';
import { scaleLinear, scaleTime, timeFormat, max, min } from 'd3';
import { LineChartProps, ChartRefType, DataPoint } from './types';

import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const xAxisTickFormat = timeFormat('%b/%Y');
const margin = {
  top: 20,
  right: 30,
  bottom: 65,
  left: 100,
};

export function LineChart({
  dataset,
  width = 300,
  height = 300,
}: LineChartProps) {
  const data = dataset;
  const chartRef = useRef<ChartRefType>(null);

  const innerHeight = height - margin.top - margin.bottom; // inner height
  const innerWidth = width - margin.left - margin.right; // inner width

  // -------- pick values from dataset attributes --------
  const xValue = (item: DataPoint) => +item.timestamp;
  const yValue = (item: DataPoint) => +item.value;

  // -------- axis scales / gen equidistant spacing based on dataset range
  const xMin = min(data, xValue);
  const xMax = max(data, xValue);

  const yMin = min(data, yValue);
  const yMax = max(data, yValue);

  const isRangeValid =
    xMin == undefined ||
    xMax == undefined ||
    yMin == undefined ||
    yMax == undefined;

  if (isRangeValid) {
    throw new Error('Dataset has invalid data');
  }

  const xScale = scaleTime().domain([xMin, xMax]).range([0, innerWidth]);
  const yScale = scaleLinear().domain([yMin, yMax]).range([innerHeight, 0]);

  return (
    <div ref={chartRef}>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            height={innerHeight}
            tickFormat={xAxisTickFormat}
          />

          <AxisLeft yScale={yScale} height={innerHeight} width={innerWidth} />

          <Marks
            data={data}
            xValue={xValue}
            xScale={xScale}
            yValue={yValue}
            yScale={yScale}
          />
        </g>
      </svg>
    </div>
  );
}
