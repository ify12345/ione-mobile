/* eslint-disable @typescript-eslint/no-unused-vars */
import { Image } from 'expo-image';
import { View, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SafeAreaScreen from '@/components/SafeAreaScreen';


export default function SessionsScreen() {
  const colorScheme = useColorScheme();
  return (

    <SafeAreaScreen className="py-6 px-4 gap-5">

      <ThemedView
        lightColor="#f5fff2"
        darkColor="#1f1f1f"
        className='w-full border-[0.5px] border-primary bg-primaryLight rounded-lg p-4 gap-4'>
       

      </ThemedView>

      <View className="flex-row gap-4">
       
      </View>
    </SafeAreaScreen>

  );
}
