/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
// import BankIcon from '@/assets/svg/BankIcon';
import SafeAreaScreen from '@/components/SafeAreaScreen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomButton from '@/components/ui/CustomButton';
import { Toggle } from '@/components/ui/Toggle';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity, View, useColorScheme } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#F5FFF2BA' : '#1C1C1C';
  const itemIconColor = colorScheme === 'dark' ? '#ffffff' : '#fff';

  return (
    <SafeAreaScreen className="py-6 px-4 gap-5">

      <View className='w-full justify-between flex-row items-center'>

      </View>

      <ThemedView
        lightColor="#f5fff2"
        darkColor="#1f1f1f"
        className='w-full border-[0.5px] border-primary bg-primaryLight rounded-lg p-4 gap-4'>


        <View className='flex-col  gap-2 bg-primaryDark p-4 rounded-lg'>

        </View>

        <View className='flex-row justify-between gap-2'>

        </View>
      </ThemedView>

    </SafeAreaScreen>
  );
}