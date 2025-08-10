import { AxisBottomProps } from './types';

const labelStyle: React.CSSProperties = {
  textAnchor: 'end',
  transform: 'rotate(-45deg)',
  transformOrigin: 'top left',
  fontSize: '12px',
  fill: '#374151',
};

const tickStyle = {
  stroke: 'black',
};

const AxisLineStyle = {
  stroke: 'black',
};

export const AxisBottom: React.FC<AxisBottomProps> = ({
  xScale,
  height,
  tickFormat,
}) => {
  return (
    <g transform={`translate(0, ${height})`}>
      <line
        x1={0}
        x2={0}
        y1={-height} // goes up from the axis
        y2={5} // to the bottom
        style={AxisLineStyle}
      />

      {xScale.domain().map(tickValue => {
        const formattedLabel = tickFormat(tickValue);

        const isTextMax6Characters = formattedLabel.length > 6;
        const truncatedLabel = isTextMax6Characters
          ? `${formattedLabel.slice(0, 6)}...`
          : formattedLabel;
        return (
          <g
            key={tickValue}
            transform={`translate(${xScale(tickValue) + xScale.bandwidth() / 2}, 0)`}
          >
            <line y2={6} style={tickStyle} />

            <text dy={10} y={9} style={labelStyle}>
              {truncatedLabel}
            </text>
          </g>
        );
      })}
    </g>
  );
};
