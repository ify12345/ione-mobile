/* eslint-disable @typescript-eslint/no-unused-vars */
// import BankIcon from '@/assets/svg/BankIcon';
// import HistoryRequest, { historyRequests } from '@/components/HistoryRequest';
import SafeAreaScreen from '@/components/SafeAreaScreen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomButton from '@/components/ui/CustomButton';
import { Toggle } from '@/components/ui/Toggle';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';
import React from 'react';
import { useState } from 'react';
import { FlatList, TouchableOpacity, View, useColorScheme } from 'react-native';

export default function TournamentScreen() {

  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#ffffff' : '#000000';
  const itemIconColor = colorScheme === 'dark' ? '#ffffff' : '#fff';

  const [isOnline, setIsOnline] = useState(true);
  const [isActive, setIsActive] = useState(true);

  const items = [
    {
      id: 1,
      title: "This Week",
      amount: '₦81,500',
    },
    {
      id: 2,
      title: 'This Month',
      amount: '₦81,500',
    },
    {
      id: 3,
      title: 'Total Delivered',
      amount: '23',
    },
  ];


  return (
    <SafeAreaScreen className="py-6 px-4 gap-5">

      <ThemedText lightColor='#fff' type="default" className=''>
        Tournaments
      </ThemedText>
      <ThemedView
        lightColor="#f5fff2"
        darkColor="#1f1f1f"
        className='w-full border-[0.5px] border-primary bg-primaryLight rounded-lg p-4 gap-4'>

      </ThemedView>
    </SafeAreaScreen>
  );
}