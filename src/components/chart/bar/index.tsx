import { useRef } from 'react';

import { scaleLinear, scaleBand } from 'd3';
import { BarChartProps, ChartRefType, DataPoint } from './types';

import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Bars } from './Bars';

const margin = {
  top: 20,
  right: 30,
  bottom: 65,
  left: 100,
};

export function BarChart({
  dataset,
  width = 300,
  height = 300,
}: BarChartProps) {
  const data = dataset;
  const chartRef = useRef<ChartRefType>(null);

  const innerHeight = height - margin.top - margin.bottom; // inner height
  const innerWidth = width - margin.left - margin.right; // inner width

  // -------- pick values from dataset attributes --------
  const xValue = (item: DataPoint) => item.category; // Assuming category is a string
  const yValue = (item: DataPoint) => +item.value;

  // -------- axis scales / gen equidistant spacing based on dataset range
  const xScale = scaleBand()
    .domain(data.map(xValue))
    .range([0, innerWidth])
    .padding(0.1); // Add padding between bars

  const yScale = scaleLinear()
    .domain([0, Math.max(...data.map(yValue))]) // Set domain from 0 to max value
    .range([innerHeight, 0]);

  return (
    <div ref={chartRef}>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            height={innerHeight}
            tickFormat={value => value} // Format for x-axis labels
          />

          <AxisLeft
            yScale={yScale}
            innerHeight={innerHeight}
            width={innerWidth}
          />

          {/* Render Bars */}
          <Bars
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            innerHeight={innerHeight}
          />
        </g>
      </svg>
    </div>
  );
}
