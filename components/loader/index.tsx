/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { StyleSheet, View, Modal, useColorScheme } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { Image } from 'expo-image'
import { ThemedText } from '../ThemedText'
import { Colors } from '@/constants/Colors'

interface Prop {
  visible: boolean
}

export default function Loader({ visible }: Prop) {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  return (
    <Modal transparent visible={visible} animationType="slide">

      <View style={styles.modalContainer} className='bg-black/90'>
        <View className='flex-col justify-center items-center flex-1'>

          <LottieView source={require('@/assets/lottie/loader.json')} autoPlay loop style={styles.svg} />
           <ThemedText
          lightColor='#fff'
          darkColor={theme.text}
          className="text-base"
        >
         Loading...
        </ThemedText>
        </View>

        <ThemedText
          lightColor='#fff'
          darkColor={theme.text}
          className="text-base"
        >
          i-one
        </ThemedText>

      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 30
  },
  text: {
    marginTop: 24
  },
  svg: {
    width: 150,
    height: 150,
  }
})