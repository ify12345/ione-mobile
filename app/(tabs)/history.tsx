/* eslint-disable @typescript-eslint/no-unused-vars */
import { Image } from 'expo-image';
import { FlatList, TouchableOpacity, View, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import SafeAreaScreen from '@/components/SafeAreaScreen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import TicketsIcon from '@/assets/svg/TicketsIcon';
import CartCarryIcon from '@/assets/svg/CartCarryIcon';
import HistoryList from '@/components/HistoryList';

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
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'inProgress'>('all');

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

  const renderTicketItem = ({ item }: { item: DeliveryItem }) => (
    <HistoryList
      item={item}
      onViewDetails={() => handleViewDetails(item)}
    />
  );

  return (

    <SafeAreaScreen className="py-6 px-4 gap-5">
       <View className="flex-row justify-center items-center py-4">
        <ThemedText type="subtitle" className="text-lg font-bold">
           History
        </ThemedText>
       </View>
  
      <View className="flex-row gap-4 justify-between items-center">
        <TouchableOpacity
          className={`py-2 items-center ${activeTab === 'all' ? 'border-b-2 border-primary' : ''}`}
          onPress={() => setActiveTab('all')}
        >
          <ThemedText type="default" className={`${activeTab === 'all' ? 'font-bold text-primary' : 'text-gray-500'}`}>
            All Request
          </ThemedText>
        </TouchableOpacity>

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
      
    </SafeAreaScreen>

  );
}
