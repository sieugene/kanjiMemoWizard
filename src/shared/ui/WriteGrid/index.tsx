import { FC, SVGAttributes } from "react";

type Props = SVGAttributes<SVGSVGElement>;
export const WriteGrid: FC<Props> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" {...props}>
      <line
        x1="0"
        y1="0"
        x2="100"
        y2="100"
        stroke="#DDD"
        stroke-dasharray="5,5"
      />
      <line
        x1="100"
        y1="0"
        x2="0"
        y2="100"
        stroke="#DDD"
        stroke-dasharray="5,5"
      />
      <line
        x1="50"
        y1="0"
        x2="50"
        y2="100"
        stroke="#DDD"
        stroke-dasharray="5,5"
      />
      <line
        x1="0"
        y1="50"
        x2="100"
        y2="50"
        stroke="#DDD"
        stroke-dasharray="5,5"
      />
    </svg>
  );
};
