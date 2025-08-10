import { line, curveLinear, csv, scaleBand, scaleLinear, max } from 'd3';
import styles from './chart.module.css';

export const Marks = ({ data, xScale, yScale, xValue, yValue }) => {
  return (
    <g className={styles.marks} key={Math.random()}>
      {/* line connecting the dots */}
      <path
        fill='none'
        stroke='black'
        d={line()
          .x(item => xScale(xValue(item)))
          .y(item => yScale(yValue(item)))
          .curve(curveLinear)(data)}
      />
      {/* dots */}
      {data.map(item => (
        <rect
          key={item.id}
          x={xScale(xValue(item))}
          y={yScale(yValue(item))}
          transform='translate(-6,-6)'
          width='12'
          height='12'
          rx='2'
        />
      ))}
    </g>
  );
};
