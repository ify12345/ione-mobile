import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export default function EarningIcon(props: SvgProps) {
  return (
    <Svg
      {...props}
      width={24}
      height={25}
      fill="none"
    >
      <Path
        fill={props.color}
        fillOpacity={0.4}
        d="M5 6.593a1 1 0 0 0 0 2h2a1 1 0 1 0 0-2H5ZM16 7.593a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1ZM5 15.593a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H5ZM16 16.593a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Z"
      />
      <Path
        fill={props.color}
        fillOpacity={0.4}
        fillRule="evenodd"
        d="M12 9.093a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm1 3a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z"
        clipRule="evenodd"
      />
      <Path
        fill={props.color}
        fillOpacity={0.4}
        fillRule="evenodd"
        d="M5 4.093a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4v-8a4 4 0 0 0-4-4H5Zm-2 4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8Z"
        clipRule="evenodd"
      />
    </Svg>
  )
}