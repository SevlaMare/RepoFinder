export interface DataPoint {
  timestamp: number;
  value: number;
}

export interface LineChartProps {
  dataset: DataPoint[];
  width?: number;
  height?: number;
}

export type ChartRefType = HTMLDivElement | null;

export interface AxisBottomProps {
  xScale: (value: number) => number; // Function to scale x values
  tickFormat: (value: number) => string; // Function to format tick labels
  height: number; // Height of the axis
  offset?: number; // Optional space before start plot dots
}
