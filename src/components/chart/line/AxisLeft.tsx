import { AxisLeftProps } from './types';
import styles from './chart.module.css';

export const AxisLeft = ({
  yScale,
  width,
  height,
  offset = 25,
}: AxisLeftProps) =>
  yScale.ticks(10).map((tickValue, index) => (
    <g key={Math.random()} className={`${styles.axis} ${styles.xaxis}`}>
      {index == 0 ? <line x2={width} y1={height} y2={height} /> : null}

      <line x2={width} transform={`translate(0,${yScale(tickValue)})`} />

      <text
        key={tickValue}
        x={-offset}
        transform={`translate(0,${yScale(tickValue)})`}
      >
        {tickValue}
      </text>
    </g>
  ));
