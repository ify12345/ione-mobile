import { Image } from 'expo-image';
import { Platform, Text, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function HomeScreen() {
  return (
   <View className='flex-1 items-center justify-center' >
     <Text className='text-4xl font-bold text-green-500'>Hello, world!</Text>
   </View>
  );
}


