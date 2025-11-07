import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export default function CloseIcon(props: SvgProps) {
  return (

    <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={6}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M.75 4.917 2.57 3.08C4.022 1.616 4.747.883 5.632.77c.217-.027.436-.027.653 0 .884.113 1.61.846 3.062 2.31l1.82 1.837"
    />
  </Svg>
  )
}