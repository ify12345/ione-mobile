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
import Feather from '@expo/vector-icons/Feather';
import DeliveryCard, { deliveryRequests } from '@/components/DeliveryRequest';
import CustomButton from '@/components/ui/CustomButton';
import BankIcon from '@/assets/svg/BankIcon';
import HistoryRequest, { historyRequests } from '@/components/HistoryRequest';

export default function EarningScreen() {

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

        <View className='flex-col  gap-2 bg-primaryDark p-4 rounded-lg'>
          <View className='flex-row justify-between w-full'>
            <View className='gap-3'>
              <ThemedText lightColor='#fff' type="default" className=''>
                Total Earnings
              </ThemedText>
              <View className='flex-row items-center gap-2'>
                <ThemedText lightColor='#fff' type="title" className='text-center'>
                  ₦81,500
                </ThemedText>
                <Feather name="eye-off" size={18} color={itemIconColor} />
              </View>
            </View>
            <CustomButton
              title="Withdraw"
              onPress={() => { }}
              primary
              className=''
              style={{ maxWidth: 80, height: 32, paddingVertical: 1 }}
              titleStyle={{ fontSize: 12 }}
            />
          </View>
          <ThemedText lightColor='#46BB1C' darkColor='#46BB1C' className="text-base font-bold">
            12 deliveries completed
          </ThemedText>
        </View>

        <View className='flex-row justify-between gap-2'>
          {items.map(item => (
            <View key={item.id} className='flex flex-col items-center border-stroke border rounded-lg flex-1 px-1 py-4'>

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

      <View className='flex-col gap-2 shadow-sm p-4 bg-white dark:bg-[#1f1f1f] rounded-lg w-ful'>
        <ThemedText type="medium" className='text-lg font-bold'>
          Bank Account
        </ThemedText>
        <View className='flex-row justify-between items-center'>
          <View className='flex-row items-center gap-2'>
            <BankIcon />
            <View>
              <ThemedText type="default" className='text-sm'>
                Access Bank
              </ThemedText>
              <ThemedText type="default" className='text-sm'>
                1234567890
              </ThemedText>
            </View>
          </View>
          <TouchableOpacity>
            <ThemedText lightColor='#46BB1C' darkColor='#46BB1C' type="default" className=''>
              Edit
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View className=''>

        <ThemedText className='font-semibold'>Payout History</ThemedText>

        {
          isActive && (
            <FlatList
              data={historyRequests}
              renderItem={({ item }) => <HistoryRequest item={item} />}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )
        }
      </View>
    </SafeAreaScreen>
  );
}