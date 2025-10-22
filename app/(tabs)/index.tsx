/* eslint-disable @typescript-eslint/no-unused-vars */
import SafeAreaScreen from '@/components/SafeAreaScreen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlatList, ScrollView, TouchableOpacity, View, useColorScheme } from 'react-native';

export default function HomeScreen() {

  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#ffffff' : '#000000';
  const itemIconColor = colorScheme === 'dark' ? '#ffffff' : '#46BB1C';

  return (
    <SafeAreaScreen className="py-6 px-4 gap-5">


      <ThemedView
        lightColor="#f5fff2"
        darkColor="#1f1f1f"
        className='w-full border-[0.5px] border-primary bg-primaryLight rounded-lg p-4 gap-4'>

        <View className='flex-row items-start'>

          <View className='flex-row items-center gap-2'>
            <View className='size-[48px] rounded-full border border-black' />
            <View>
              <ThemedText type="default" className='text-sm font-bold'>
                Hello Tola
              </ThemedText>

            </View>
          </View>



        </View>


      </ThemedView>

    </SafeAreaScreen>
  );
}