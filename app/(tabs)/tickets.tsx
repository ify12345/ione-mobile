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
import CartCarryIcon from '@/assets/svg/CartCarryIcon';
import TicketsRequest from '@/components/TicketDetails';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TicketDetails from '@/components/TicketDetails';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import DeliveryDetailsBottomSheet from '@/components/ui/DeliveryDetailsBottomSheet';

interface DeliveryItem {
  id: string;
  status: string;
  pickup: {
    address: string;
  };
  dropoff: {
    address: string;
  };
  deliveryWindow: string;
  distance: string;
  amount: string;
}



export default function TicketScreen() {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#ffffff' : '#000000';
  const itemIconColor = colorScheme === 'dark' ? '#ffffff' : '#46BB1C';

  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState<'inProgress' | 'completed'>('inProgress');

  const items = [
    {
      id: 1,
      icon: <TicketsIcon color={itemIconColor} />,
      title: "All Tickets",
      amount: '15',
    },
    {
      id: 2,
      icon: <CartCarryIcon color={itemIconColor} />,
      title: 'In Transit',
      amount: '5',
    },
    {
      id: 3,
      icon: <MaterialCommunityIcons name="truck-fast-outline" size={24} color={itemIconColor} />,
      title: 'Delivered',
      amount: '15',
    },
  ];

  const ticketRequests = [
    {
      id: 'MA-2024-0892',
      status: 'In Progress',
      pickup: {
        address: '15 Broad Street, Lagos Island'
      },
      dropoff: {
        address: 'Airport road Benin City'
      },
      deliveryWindow: '2 - 3 days',
      distance: '25mins',
      amount: '₦8550'
    },
    {
      id: 'MA-2024-0893',
      status: 'Delivered',
      pickup: {
        address: '23 Victoria Island, Lagos'
      },
      dropoff: {
        address: 'Ikeja GRA, Lagos'
      },
      deliveryWindow: '1 - 2 days',
      distance: '12mins',
      amount: '₦5200'
    },
    {
      id: 'MA-2024-0894',
      status: 'Awaiting Confirmation',
      pickup: {
        address: '45 Allen Avenue, Ikeja'
      },
      dropoff: {
        address: 'Festac Town, Lagos'
      },
      deliveryWindow: 'Today',
      distance: '15mins',
      amount: '₦7800'
    }
  ];

  const pendingRequests = ticketRequests.filter(
    (ticket) => ticket.status !== 'Delivered'
  );
  const completedRequests = ticketRequests.filter(
    (ticket) => ticket.status === 'Delivered'
  );

  const [selectedItem, setSelectedItem] = useState<DeliveryItem | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleViewDetails = (item: DeliveryItem) => {
    setSelectedItem(item);
    setIsBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
    setSelectedItem(null);
  };

  const renderTicketItem = ({ item }: { item: DeliveryItem }) => (
    <TicketDetails
      item={item}
      onViewDetails={() => handleViewDetails(item)}
    />
  );

  return (

    <SafeAreaScreen className="py-6 px-4 gap-5">

      <View className='w-full justify-between flex-row items-center'>
        <View className='flex-row items-center gap-3'>
          <FontAwesome6 name="location-dot" size={24} color={iconColor} />
          <ThemedText type="default" className='text-lg font-bold'>
            Eti Osa, Lekki
          </ThemedText>
        </View>

        <TouchableOpacity className='relative'>
          <Fontisto name="bell" size={24} color={iconColor} />
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

      <View className="flex-row gap-4">
        <TouchableOpacity
          className={`py-2 items-center ${activeTab === 'inProgress' ? 'border-b-2 border-primary' : ''}`}
          onPress={() => setActiveTab('inProgress')}
        >
          <ThemedText type="default" className={`${activeTab === 'inProgress' ? 'font-bold text-primary' : 'text-gray-500'}`}>
            In Progress
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          className={`py-2 items-center ${activeTab === 'completed' ? 'border-b-2 border-primary' : ''}`}
          onPress={() => setActiveTab('completed')}
        >
          <ThemedText type="default" className={`${activeTab === 'completed' ? 'font-bold text-primary' : 'text-gray-500'}`}>
            Completed
          </ThemedText>
        </TouchableOpacity>
      </View>

      {activeTab === 'completed' ? (
        <FlatList
          data={completedRequests}
          renderItem={renderTicketItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
      ) : (
        <FlatList
          data={pendingRequests}
          renderItem={renderTicketItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
      )}

      {selectedItem && (
        <DeliveryDetailsBottomSheet
          item={selectedItem}
          isVisible={isBottomSheetVisible}
          onClose={handleCloseBottomSheet}
        />
      )}
    </SafeAreaScreen>

  );
}
