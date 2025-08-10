import { BarsProps } from './types';

const barsStyle = {
  primary: 'rgb(59, 130, 246)',
  secondary: 'rgb(136, 136, 136)',
};

const labelStyle: React.CSSProperties = {
  textAnchor: 'middle',
  fontSize: '12px',
  fill: 'rgb(55, 65, 81)',
};

const barGap = 5;
const cornerRadius = 3;

export const Bars: React.FC<BarsProps> = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  innerHeight,
}) => {
  return (
    <g>
      {data.map((item, index) => {
        const isLast = index === data.length - 1;
        const barX = xScale(xValue(item))!;
        const barY = yScale(yValue(item));
        const barWidth = xScale.bandwidth() - barGap;
        const barHeight = innerHeight - barY;

        return (
          <g key={xValue(item)} transform={`translate(5,0)`}>
            {/* Bar */}
            <rect
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              rx={cornerRadius}
              ry={cornerRadius}
              fill={isLast ? barsStyle.secondary : barsStyle.primary}
            />

            {/* Value label */}
            <text
              x={barX + barWidth / 2}
              y={barY - 4} // Slightly above the bar
              style={labelStyle}
            >
              {yValue(item)}
            </text>
          </g>
        );
      })}
    </g>
  );
};
