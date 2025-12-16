import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export default function PlusIcon(props: SvgProps) {
  return (

    <Svg
    // xmlns="http://www.w3.org/2000/svg"
     width={13}
    height={13}
    fill="none"
    {...props}
  >
    <Path stroke="#000" strokeLinecap="round" d="M6 .5v12M.5 7H12" />
  </Svg>
  )
}