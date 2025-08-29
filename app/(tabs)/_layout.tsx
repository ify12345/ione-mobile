import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeIcon from '@/assets/svg/HomeIcon';
import TicketsIcon from '@/assets/svg/TicketsIcon';
import EarningIcon from '@/assets/svg/EarningIcon';
import HistoryIcon from '@/assets/svg/HistoryIcon';
import ProfileIcon from '@/assets/svg/ProfileIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,      
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} width={28} height={28} />,
     
        }}
        
      />

      <Tabs.Screen
        name="tickets"
        options={{
          title: 'Tickets',

          tabBarIcon: ({ color }) => <TicketsIcon color={color} width={28} height={28} />,
        }}
      />

      <Tabs.Screen
        name="earnings"
        options={{
          title: 'Earnings',

          tabBarIcon: ({ color }) => <EarningIcon color={color} width={28} height={28} />,
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: 'History',

          tabBarIcon: ({ color }) => <HistoryIcon color={color} width={28} height={28} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',

          tabBarIcon: ({ color }) => <ProfileIcon color={color} width={28} height={28} />,
        }}
      />
   
    </Tabs>
  );
}