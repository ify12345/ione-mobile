/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import SafeAreaScreen from '@/components/SafeAreaScreen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
  useColorScheme,
  TextInput,
} from 'react-native';
import NotificationIcon from '@/assets/svg/NotificationIcon';
import PitchCarousel from '@/components/PitchCarousel';
import FilterSvg from '@/assets/svg/FilterSvg';
import FixtureList from '@/components/FixtureList';

// Sample data for pitches
const nearbyPitches = [
  {
    id: '1',
    name: 'Lakowe Turf',
    location: 'Lakowe Lakes, Lakowe, Lagos',
    isBooked: true,
    image: require('@/assets/images/pitch.png')
  },
  {
    id: '2',
    name: 'Victory Stadium',
    location: 'Surulere, Lagos',
    isBooked: false,
    image: require('@/assets/images/pitch.png')
  },
  {
    id: '3',
    name: 'Eagle Arena',
    location: 'Lekki Phase 1, Lagos',
    isBooked: false,
    image: require('@/assets/images/pitch.png')
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#ffffff' : '#000000';
  const itemIconColor = colorScheme === 'dark' ? '#ffffff' : '#46BB1C';

  return (
    <SafeAreaScreen className="py-6 gap-5 px-[35px]">
      <View className="flex flex-col gap-6">
        {/* Header */}
        <View className="flex flex-row items-center justify-between">
          <View>
            <ThemedText className="text-sm font-normal">
              Hey, Kevin👋
            </ThemedText>
            <ThemedText className="text-xl font-semibold">
              {"It's Matchday!"}
            </ThemedText>
          </View>

          <TouchableOpacity>
            <NotificationIcon />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center bg-white dark:bg-gray-800 rounded-[5px] px-[21px] py-[15px] border border-[#7D7D7D] dark:border-gray-700">
          <TextInput
            placeholder="Search for locations"
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-xs dark:text-white h-auto"
          />
          <View className="ml-2">
            <FilterSvg/>
          </View>
        </View>

        {/* Nearby Pitches Section */}
        <View>
          <ThemedText className="text-lg font-semibold mb-[10px]">
            Nearby Pitches
          </ThemedText>
          <PitchCarousel data={nearbyPitches} />
        </View>

        {/* Upcoming Fixtures Section */}
        <View className="mt-4">
          <ThemedText className="text-lg font-semibold mb-4">
            Upcoming Fixtures
          </ThemedText>
          
         <FixtureList/>
        </View>
      </View>
    </SafeAreaScreen>
  );
}