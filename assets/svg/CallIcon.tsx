import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"
const CallIcon = (props: SvgProps) => (
  <Svg
    {...props}
    width={43}
    height={42}
    fill="none"
  >
    <Rect width={42} height={42} x={0.5} fill="#D5F1CC" rx={21} />
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12.5h4l2 5-2.5 1.5a11 11 0 0 0 5 5l1.5-2.5 5 2v4a2 2 0 0 1-2 2 16 16 0 0 1-15-15 2 2 0 0 1 2-2Z"
    />
  </Svg>
)
export default CallIcon
