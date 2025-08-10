import { scaleLinear, scaleBand } from 'd3';

export interface DataPoint {
  category: string;
  value: number | string; // value might come as number or string
}

export type ChartRefType = HTMLDivElement | null;

export interface BarChartProps {
  dataset: DataPoint[];
  width?: number;
  height?: number;
}

export interface AxisBottomProps {
  xScale: scaleBand<string>; // D3 scale for x-axis
  height: number; // Height of the axis
  tickFormat: (value: string) => string; // Function to format tick labels
}

export interface AxisLeftProps {
  yScale: scaleLinear<number, number>; // D3 scale for y-axis
  width: number; // Width of the chart\
  innerHeight: number;
}

export interface BarsProps {
  data: any[];
  xScale: scaleBand<string>;
  yScale: scaleLinear<number, number>;
  xValue: (d: any) => string;
  yValue: (d: any) => number;
  innerHeight: number;
}
