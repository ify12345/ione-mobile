/* eslint-disable react/no-unescaped-entities */
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
import * as yup from 'yup';
import * as React from 'react';
import { Formik } from 'formik';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Loader from '@/components/loader';
import { ThemedText } from '@/components/ThemedText';
import CustomButton from '@/components/ui/CustomButton';
import InputField from '@/components/InputField';
import { useRouter } from 'expo-router';
import SafeAreaScreen from '@/components/SafeAreaScreen';
import { Colors } from '@/constants/Colors';
import { Icon } from '@/components/ui/Icon';

const { height, width } = Dimensions.get('screen');

export default function ForgottenPassword() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { bottom } = useSafeAreaInsets();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  return (
    <SafeAreaScreen className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 21,
          paddingBottom: 20,
          flexGrow: 1,
          justifyContent: 'space-between',
        }}>
          <View className='w-full items-center mt-[3%]'>
        <View className="mb-8 items-center">
          {/* <Image
            source={require('@/assets/images/icon.png')}
            className="h-[40px] w-[100px]"
            resizeMode="contain"
          /> */}
          <Icon/>
        </View>

        {/* Header */}
        <View className="mb-8 flex flex-col  items-center gap-[5px]">
          <ThemedText
            lightColor={theme.text}
            darkColor={theme.text}
            className="mb-2 text-center text-[20px] font-[600]">
            Forgotten Password?
          </ThemedText>
          <ThemedText
            lightColor="#6C757D"
            darkColor="#9BA1A6"
            className="px-4 text-center text-base leading-6">
            Enter your email to reset password
          </ThemedText>
        </View>
       
          <Image
            source={require('@/assets/images/thinking.png')}
            resizeMode='contain'
         className="w-[100%] mt-[3%]"
            style={{ height: height * 0.4 }}
          />
      </View>
        <View className="">
          <View className="flex-1">
            {/* Email Input */}
            <InputField
              required
              label="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              placeholder="Enter your email"
            />

            {/* Remember Me and Forgot Password Row */}

            <View className='flex flex-col gap-[10px]'>
              <CustomButton
                primary
                title="Get Code"
                // onPress={handleSubmit}
                onPress={() => router.push('/verify')}
                className=""
              />
              <TouchableOpacity
                onPress={() => router.push('/signin')}
                className="flex w-full items-center justify-center rounded-[6px] border-[1px] border-[#0C4D2E] py-[18px]">
                <Text className="text-primaryDark">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Loader visible={loading} />
    </SafeAreaScreen>
  );
}


