import React from 'react'
import { ActivityIndicator, ActivityIndicatorProps, useColorScheme } from 'react-native';


function Spinner({
  size = 'small',
  animating = false,
  color,
  hidesWhenStopped,
  style
}: ActivityIndicatorProps) {
  const colorScheme = useColorScheme();
  const spinnerColor = color ?? colorScheme ?? '#000';
  return (
    <ActivityIndicator
      size={size}
      animating={animating}
      color={spinnerColor}
      hidesWhenStopped={hidesWhenStopped}
      style={style}
    />
  )
}

export default Spinner;