import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export default function ProfileIcon(props: SvgProps) {
  return (

    <Svg
      {...props}
      width={24}
      height={24}
      fill="none"
    >
      <Path
        fill={props.color}
        fillRule="evenodd"
        d="M12 4.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5ZM8.75 9a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0Z"
        clipRule="evenodd"
      />
      <Path
        fill={props.color}
        fillRule="evenodd"
        d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12c0 3.049 1.27 5.802 3.308 7.757A10.717 10.717 0 0 0 12 22.75c2.888 0 5.512-1.14 7.442-2.993A10.721 10.721 0 0 0 22.75 12c0-5.937-4.813-10.75-10.75-10.75ZM2.75 12a9.25 9.25 0 0 1 18.5 0c0 2.195-.764 4.21-2.041 5.797A4.749 4.749 0 0 0 15 15.25H9a4.749 4.749 0 0 0-4.209 2.547A9.209 9.209 0 0 1 2.75 12ZM15 16.75c1.434 0 2.652.93 3.083 2.218A9.212 9.212 0 0 1 12 21.25c-2.33 0-4.456-.86-6.083-2.282A3.252 3.252 0 0 1 9 16.75h6Z"
        clipRule="evenodd"
      />
    </Svg>
  )
}