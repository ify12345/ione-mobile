import * as React from "react"
import Svg, { SvgProps, Path, Rect } from "react-native-svg"
export default function BankIcon(props: SvgProps) {
  return (
    <Svg
    {...props}
  
    width={40}
    height={40}
    fill="none"
  >
    <Rect width={40} height={40} fill="#0482EF" fillOpacity={0.16} rx={12} />
    <Path
      fill="#0482EF"
      fillRule="evenodd"
      d="M20.633 10.156a2 2 0 0 0-1.265 0l-8 2.667A2 2 0 0 0 10 14.72V17a2 2 0 0 0 2 2h1v5h-1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-1v-5h1a2 2 0 0 0 2-2v-2.28a2 2 0 0 0-1.367-1.897l-8-2.667ZM25 24v-5h-2v5h2Zm-4 0v-5h-2v5h2Zm-4 0v-5h-2v5h2Zm-5 2v2h16v-2H12Zm0-9v-2.28l8-2.666 8 2.666V17H12Z"
      clipRule="evenodd"
    />
  </Svg>
  )
}