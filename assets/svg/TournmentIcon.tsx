import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export default function TournamentIcon(props: SvgProps) {
  return (

    <Svg
      {...props}

      width={20}
      height={20}
      fill="none"
    >
      <Path
        fill={props.color}
        d="M0 0v2h5v4H0v2h5c1.11 0 2-.89 2-2V5h5v10H7v-1c0-1.11-.89-2-2-2H0v2h5v4H0v2h5c1.11 0 2-.89 2-2v-1h5c1.11 0 2-.89 2-2v-4h6V9h-6V5c0-1.11-.89-2-2-2H7V2c0-1.11-.89-2-2-2H0Z"
      />
    </Svg>
  )
}