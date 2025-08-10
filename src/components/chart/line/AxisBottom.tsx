import { AxisBottomProps } from './types';
import styles from './chart.module.css';

export const AxisBottom = ({
  xScale, // position ticks
  tickFormat, // fx to format x axis labels
  height,
  offset = 20, // space before start plot dots
}: AxisBottomProps) =>
  xScale.ticks(6).map((tickValue, index) => (
    <g
      key={tickValue}
      className={`${styles.axis} ${styles.yaxis}`}
      transform={`translate(${xScale(tickValue)},0)`}
    >
      {/* vertical grid lines, one for each dot */}
      <line y2={height} />

      {/* x axis labels */}
      <text y={height + offset} transform={`rotate(0, 0, ${height + offset})`}>
        {tickFormat(tickValue).toUpperCase()}
      </text>
    </g>
  ));
