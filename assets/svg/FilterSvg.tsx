import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const FilterSvg = (props: SvgProps) => (
  <Svg
    {...props}
    width={18}
    height={18}
    fill="none"
  >
    <Path
      fill="#03EA89"
      fillRule="evenodd"
      d="M4.5 1.688a2.062 2.062 0 1 0 0 4.124 2.062 2.062 0 0 0 0-4.125ZM3.562 3.75a.937.937 0 1 1 1.875 0 .937.937 0 0 1-1.875 0Z"
      clipRule="evenodd"
    />
    <Path
      fill="#03EA89"
      d="M9 3.188a.563.563 0 0 0 0 1.124h6a.562.562 0 1 0 0-1.125H9Z"
    />
    <Path
      fill="#03EA89"
      fillRule="evenodd"
      d="M13.5 6.938a2.062 2.062 0 1 0 0 4.124 2.062 2.062 0 0 0 0-4.124ZM12.562 9a.937.937 0 1 1 1.875 0 .937.937 0 0 1-1.874 0Z"
      clipRule="evenodd"
    />
    <Path
      fill="#03EA89"
      d="M3 8.438a.563.563 0 0 0 0 1.124h6a.563.563 0 0 0 0-1.124H3Z"
    />
    <Path
      fill="#03EA89"
      fillRule="evenodd"
      d="M4.5 12.188a2.062 2.062 0 1 0 0 4.124 2.062 2.062 0 0 0 0-4.125Zm-.938 2.062a.937.937 0 1 1 1.875 0 .937.937 0 0 1-1.875 0Z"
      clipRule="evenodd"
    />
    <Path
      fill="#03EA89"
      d="M9 13.688a.562.562 0 1 0 0 1.124h6a.562.562 0 1 0 0-1.124H9Z"
    />
  </Svg>
)
export default FilterSvg
