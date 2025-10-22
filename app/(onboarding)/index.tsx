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
  ScrollView
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
        contentContainerStyle={{ paddingHorizontal: 21, paddingBottom: 40 }}
      >
        {/* Logo */}
        <View className="items-center mt-10 mb-8">
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Header */}
        <View className="items-center mb-8">
          <ThemedText
            lightColor={theme.text}
            darkColor={theme.text}
            type="title"
            className="text-2xl font-bold text-center mb-2"
          >
            Tola go to the bottom tab navigation by pressing continue
          </ThemedText>

        </View>

        <CustomButton
          primary
          title="Continue"
          onPress={() => router.push('/(tabs)')}


        />
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