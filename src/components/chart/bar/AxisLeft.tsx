import { AxisLeftProps } from './types';

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fill: 'rgb(55, 65, 81)',
  textAnchor: 'end',
};

const gridLineStyle = {
  stroke: 'lightgray',
};

const alignLabelY = 4;
const alignLabelX = -8;

export const AxisLeft: React.FC<AxisLeftProps> = ({
  yScale,
  width,
  innerHeight,
}) => {
  return (
    <g>
      {yScale.ticks().map(tickValue => (
        <g key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
          <line x1={-5} x2={width} style={gridLineStyle} />
          <text x={alignLabelX} dy={alignLabelY} style={labelStyle}>
            {tickValue}
          </text>
        </g>
      ))}

      {/* Y axis guide line */}
      <line
        x1={-5}
        x2={width}
        y1={innerHeight}
        y2={innerHeight}
        stroke='#000'
      />
    </g>
  );
};
