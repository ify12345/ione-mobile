/* eslint-disable @typescript-eslint/no-unused-vars */
import { Image } from 'expo-image';
import { FlatList, ScrollView, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SafeAreaScreen from '@/components/SafeAreaScreen';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { Toggle } from '@/components/ui/Toggle';
import TicketsIcon from '@/assets/svg/TicketsIcon';
import EarningIcon from '@/assets/svg/EarningIcon';
import DeliveryCard, { deliveryRequests } from '@/components/DeliveryRequest';

export default function HomeScreen() {

  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#ffffff' : '#000000';
  const itemIconColor = colorScheme === 'dark' ? '#ffffff' : '#46BB1C';
  
  const [isOnline, setIsOnline] = useState(true);
  const [isActive, setIsActive] = useState(true);

  const items = [
    {
      id: 1,
      icon: <MaterialCommunityIcons name="truck-fast-outline" size={24} color={itemIconColor} />,
      title: "Today's Deliveries",
      amount: '15',
    },
    {
      id: 2,
      icon: <TicketsIcon color={itemIconColor} />,
      title: 'Active Tickets',
      amount: '5',
    },
    {
      id: 3,
      icon: <EarningIcon color={itemIconColor} />,
      title: 'Total Earnings',
      amount: '₦81,500',
    },
  ];


  return (
    <SafeAreaScreen className="py-6 px-4 gap-5">
      <View className='w-full justify-between flex-row items-center'>
        <View className='flex-row items-center gap-3'>
          <FontAwesome6
            name="location-dot"
            size={24}
            color={iconColor}
          />
          <ThemedText type="default" className='text-lg font-bold'>
            Eti Osa, Lekki
          </ThemedText>
        </View>

        <TouchableOpacity className='relative'>
          <Fontisto
            name="bell"
            size={24}
            color={iconColor}
          />
          <View className='absolute top-1 -right-0'>
            <ThemedText type="default" className='text-xs font-bold bg-red-500 size-[7px] rounded-full border border-stroke'></ThemedText>
          </View>
        </TouchableOpacity>
      </View>

      <ThemedView
        lightColor="#f5fff2"
        darkColor="#1f1f1f"
        className='w-full border-[0.5px] border-primary bg-primaryLight rounded-lg p-4 gap-4'>

        <View className='flex-row items-start'>

          <View className='flex-row items-center gap-2'>
            <View className='size-[48px] rounded-full border border-black' />
            <View>
              <ThemedText type="default" className='text-sm font-bold'>
                Hello Sarah
              </ThemedText>
              <ThemedText type="medium" className='text-xs text-gray-500' numberOfLines={1}>
                {"Here's your delivery summary today."}
              </ThemedText>
            </View>
          </View>

          <View className='flex-row items-center gap-2 flex-1'>
            <Toggle
              isOn={isOnline}
              onToggle={setIsOnline}
              size="small"
            />

            <ThemedText type="medium" className='flex-1' numberOfLines={1}>
              {isOnline ? 'online' : 'offline'}
            </ThemedText>
          </View>

        </View>

        <View className='flex-row justify-between gap-2'>
          {items.map(item => (
            <View key={item.id} className='flex flex-col items-center border-stroke border rounded-lg flex-1 px-1 py-4'>
              {item.icon}
              <ThemedText type="medium" className='text-center'>
                {item.title}
              </ThemedText>
              <ThemedText type="default" className='text-center'>
                {item.amount}
              </ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      <ThemedText className='font-semibold'>Available Request</ThemedText>

      {
        !isActive && (
          <ScrollView>
            <View className='w-full border border-stroke rounded-lg py-[200px] px-[55px] gap-4 justify-center items-center'>
              <ThemedText type="default" className='text-center'>
                If there are any delivery request, they will be displayed here
              </ThemedText>
            </View>
          </ScrollView>
        )
      }

      {
        isActive && (
          <FlatList
            data={deliveryRequests}
            renderItem={({ item }) => <DeliveryCard item={item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )
      }
    </SafeAreaScreen>
  );
}