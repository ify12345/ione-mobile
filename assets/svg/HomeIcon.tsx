import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export default function HomeIcon (props: SvgProps) {
  return (
    <Svg
      {...props}
      width={24}
      height={25}
      fill="none"
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.4}
      strokeWidth={1.727}
      d="m14.98 2.932 5.39 4.2c.9.7 1.63 2.19 1.63 3.32v7.41c0 2.32-1.89 4.22-4.21 4.22H6.21c-2.32 0-4.21-1.9-4.21-4.21v-7.28c0-1.21.81-2.76 1.8-3.45l6.18-4.33c1.4-.98 3.65-.93 5 .12ZM12 18.086v-3"
    />
  </Svg>
)
}