import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { Image } from 'expo-image'

export default function Enroute() {
  return (

    <ParallaxScrollView
      headerImage={
        <Image
          source={require('@/assets/images/map.png')}
          contentFit="cover"
          style={{ height: '100%', width: '100%' }}
        />
      }
    >

      <ThemedView
        lightColor='#F8FFF6'
        className='p-4 rounded-lg gap-3 border border-primary'
      >
        <ThemedText type="default" className='text-lg font-semibold'>En-route to Delivery</ThemedText>
        <ThemedText type="medium" className='text-lg font-semibold'>You are now en route. Please follow the directions to complete the delivery</ThemedText>



      </ThemedView>

      <View className="mb-2 gap-2">
        <ThemedText className="text-lg font-semibold text-gray-900 mb-1">
          Delivery Details
        </ThemedText>
        <View className="flex-row items-center justify-between">
          <ThemedText className="text-sm text-gray-600">
            Delivery ID:
          </ThemedText>
          <View className={`px-3 py-1 rounded-full bg-brownLight`}>
            <Text className='text-xs font-medium text-brown'>
              enroute
            </Text>
          </View>
        </View>
        <ThemedText className="text-sm text-gray-900 font-light">
          Order #MA-2024-0892
        </ThemedText>
      </View>

      <View className="mb-2 border border-stroke dark:border-primary p-4 rounded-lg">
        <View className="flex-row items-center gap-3 mb-4">
          <View className="border-2 border-stroke bg-stroke rounded-full">
            <View className="w-3 h-3 rounded-full  bg-stroke border-2 border-white" />
          </View>
          <View className="flex-1">
            <ThemedText className="text-sm font-light text-gray-900 mb-1">
              15 Broad Street, Lagos Island
            </ThemedText>
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          <View className="border-2 border-primary bg-stroke rounded-full">
            <View className="w-3 h-3 rounded-full  bg-primary border-2 border-white" />
          </View>
          <View className="flex-1">
            <ThemedText lightColor='#46BB1C' darkColor='' className="text-sm font-light">
              Airport Road Benin City
            </ThemedText>
          </View>
        </View>
      </View>

      <View className="mb-2 rounded-lg gap-3">
        <ThemedText type="default" className='text-lg font-semibold'>Item(s) to Pickup</ThemedText>


        <View className="flex-1">
          <ThemedText className="text-sm font-light text-gray-900 mb-1 pb-2 border-b border-stroke dark:border-primary">
            Electronics
          </ThemedText>
        </View>
        <View className="flex-1">
          <ThemedText className="text-sm font-light text-gray-900 mb-1 pb-2 border-b border-stroke dark:border-primary">
            Clothes
          </ThemedText>
        </View>
        <View className="flex-1">
          <ThemedText className="text-sm font-light text-gray-900 mb-1 pb-2 border-b border-stroke dark:border-primary">
            Shoe
          </ThemedText>
        </View>


      </View>


    </ParallaxScrollView>
  )
}



