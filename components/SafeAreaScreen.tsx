/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginVertical: 20,
  }
})

export default function SafeAreaScreen({children, style,className}: Props) {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View
    className={className}
      style={[styles.screen, { paddingTop: top,  }, style]}>
      {children}
    </View>
  )
}
// paddingBottom: bottom