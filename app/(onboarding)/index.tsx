/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/order */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-dynamic-require */
import {
  Dimensions,
  View,
  TouchableWithoutFeedback,
  useColorScheme,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import CustomButton from '@/components/ui/CustomButton';
import { useRouter } from 'expo-router';
import SafeAreaScreen from '@/components/SafeAreaScreen';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('screen');

export default function SignUp() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();

  return (
    <SafeAreaScreen className="flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 21, paddingBottom: 40 }}>
        {/* Logo */}
        <View className="mb-8 mt-10 items-center">
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Header */}
        <View className="mb-8 items-center">
          <Image
            source={require('@/assets/images/goal.png')}
            // style={{ width: width * 0.8, height: width * 0.8 }}
            style={styles2.man}
            resizeMode="contain"
          />
          <ThemedText
            lightColor={theme.text}
            darkColor={theme.text}
            // type="medium"
            className="mb-2 text-center text-[17px] font-[300]">
            The easy way to organize teams, schedule games, track stats, and find local 5-a-side
            venues!
          </ThemedText>
        </View>
        <View className="mt-4 flex flex-col gap-[22px]">
          <CustomButton primary title="Create an Account " onPress={() => router.push('/role')} />
          <TouchableOpacity onPress={() => router.push('/signin')} className="flex w-full items-center justify-center rounded-[6px] border-[1px] border-[#0C4D2E] py-[12px]">
            <Text className='text-primaryDark'>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaScreen>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 130,
    height: 60,
  },
});
const styles2 = StyleSheet.create({
  man: {
    width: 412,
    height: 412,
  },
});
