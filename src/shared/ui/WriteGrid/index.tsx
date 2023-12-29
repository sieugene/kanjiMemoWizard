import { FC, SVGAttributes, useMemo } from "react";

type Props = SVGAttributes<SVGSVGElement> & {
  size: number;
};
export const WriteGrid: FC<Props> = (props) => {
  const { size } = props;
  const halfSize = useMemo(() => size / 2, [size]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...props}
    >
      <line
        x1="0"
        y1="0"
        x2={size}
        y2={size}
        stroke="#DDD"
        stroke-dasharray="5,5"
      />
      <line
        x1={size}
        y1="0"
        x2="0"
        y2={size}
        stroke="#DDD"
        stroke-dasharray="5,5"
      />
      <line
        x1={halfSize}
        y1="0"
        x2={halfSize}
        y2={size}
        stroke="#DDD"
        stroke-dasharray="5,5"
      />
      <line
        x1="0"
        y1={halfSize}
        x2={size}
        y2={halfSize}
        stroke="#DDD"
        stroke-dasharray="5,5"
      />
    </svg>
  );
};
