/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
// import BankIcon from '@/assets/svg/BankIcon';
import SafeAreaScreen from '@/components/SafeAreaScreen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomButton from '@/components/ui/CustomButton';
import { Toggle } from '@/components/ui/Toggle';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View, useColorScheme } from 'react-native';
import { Image } from 'expo-image';

export default function ProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { width, height } = Dimensions.get('window');
  const iconColor = colorScheme === 'dark' ? '#F5FFF2BA' : '#1C1C1C';
  const itemIconColor = colorScheme === 'dark' ? '#ffffff' : '#fff';

  return (
    <SafeAreaScreen className="py-6 px-4 gap-5">

      <View className='w-full px-[35px] gap-[35px]'>

        <View className='flex-row justify-between flex items-center w-full'>
          <ThemedText className='text-2xl font-semibold'>Profile</ThemedText>
          <TouchableOpacity onPress={()=>router.push('/stats')}>
          <ThemedText className='text-sm font-medium'>Stats<Feather name="arrow-up-right" size={14} color="black" /></ThemedText>
          </TouchableOpacity>
        </View>

        <Image
          source={require('@/assets/images/profile.png')}
          resizeMode='cover'
          style={{ width: width - 70, height: height * 0.4, alignSelf: 'center' }}

        />

        <ThemedText className='text-2xl font-semibold'>Ororo</ThemedText>

        <ScrollView className='mt-[10px] border-t border-black/19 dark:border-gray-400 py-8 flex  gap-[34px]'>

          <View className='flex flex-row gap-[44px] items-center mb-9'>

            <View className='flex flex-row gap-4 items-center'>
              <ThemedText className='text-xs'>First Name:</ThemedText>
              <ThemedText className='text-sm font-medium'>John</ThemedText>
            </View>

            <View className='flex flex-row gap-4 items-center'>
              <ThemedText className='text-xs'>Last Name:</ThemedText>
              <ThemedText className='text-sm font-medium'>Doe</ThemedText>
            </View>

          </View>

          <View className='flex flex-row gap-[44px] items-center mb-9'>

            <View className='flex flex-row gap-4 items-center'>
              <ThemedText className='text-xs'>Nickname:</ThemedText>
              <ThemedText className='text-sm font-medium'>Ororo</ThemedText>
            </View>

            <View className='flex flex-row gap-4 items-center'>
              <ThemedText className='text-xs'>DOB:</ThemedText>
              <ThemedText className='text-sm font-medium'>07.10.1999</ThemedText>
            </View>

          </View>

          <View className='flex flex-row gap-[44px] items-center mb-9'>

            <View className='flex flex-row gap-4 items-center'>
              <ThemedText className='text-xs'>Height:</ThemedText>
              <ThemedText className='text-sm font-medium'>5ft 3inch</ThemedText>
            </View>

            <View className='flex flex-row gap-4 items-center'>
              <ThemedText className='text-xs'>POB:</ThemedText>
              <ThemedText className='text-sm font-medium'>Brazil</ThemedText>
            </View>

          </View>

          <View className='flex flex-row gap-[44px] items-center mb-9'>

            <View className='flex flex-row gap-4 items-center'>
              <ThemedText className='text-xs'>Position:</ThemedText>
              <ThemedText className='text-sm font-medium'>Striker</ThemedText>
            </View>

          </View>


        </ScrollView>

      </View>

    </SafeAreaScreen>
  );
}