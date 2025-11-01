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
  KeyboardAvoidingView,
  Platform,
  Keyboard,
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

const { width } = Dimensions.get('screen');

// Custom Checkbox Component
type CheckboxProps = {
  checked: boolean;
  onToggle: () => void;
  label: string;
  required?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({ checked, onToggle, label, required = false }) => {
  return (
    <TouchableWithoutFeedback onPress={onToggle}>
      <View className="flex flex-row items-start gap-3">
        <View
          className={`h-5 w-5 rounded border-2 items-center justify-center ${
            checked ? 'bg-[#00FF94] border-[#00FF94]' : 'bg-white border-gray-400'
          }`}>
          {checked && (
            <View className="w-2 h-2 bg-white rounded-sm" />
          )}
        </View>
        <View className="flex-1">
          <ThemedText className="text-sm">
            {required && <ThemedText className="text-red-500">* </ThemedText>}
            {label}
          </ThemedText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Terms and Conditions Checkbox Component
const TermsCheckbox: React.FC<{ checked: boolean; onToggle: () => void }> = ({ checked, onToggle }) => {
  return (
    <TouchableWithoutFeedback onPress={onToggle}>
      <View className="flex flex-row items-start gap-3">
        <View
          className={`h-5 w-5 rounded border-2 items-center justify-center ${
            checked ? 'bg-[#00FF94] border-[#00FF94]' : 'bg-white border-gray-400'
          }`}>
          {checked && (
            <View className="w-2 h-2 bg-white rounded-sm" />
          )}
        </View>
        <View className="flex-1">
          <ThemedText className="text-sm text-gray-700">
            I agree to the{' '}
            <ThemedText 
              className="text-[#00FF94] underline" 
              onPress={() => {/* Navigate to terms */}}
            >
              Terms and Conditions
            </ThemedText>{' '}
            and{' '}
            <ThemedText 
              className="text-[#00FF94] underline" 
              onPress={() => {/* Navigate to privacy */}}
            >
              Privacy Policy
            </ThemedText>
          </ThemedText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function SignUp() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { bottom } = useSafeAreaInsets();
  const [loading, setLoading] = React.useState(false);
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const [newsletter, setNewsletter] = React.useState(false);
  const router = useRouter();
  const scrollViewRef = React.useRef<ScrollView>(null);


  const handleInputFocus = (yPosition: number) => {
    scrollViewRef.current?.scrollTo({ y: yPosition, animated: true });
  };

  return (
    <SafeAreaScreen className="h-svh w-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 21,
            paddingBottom: 40,
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled">
          <View className="mb-8 mt-4 items-end">
            <Image
              source={require('@/assets/images/icon.png')}
              className="h-[20px] w-[100px]"
              resizeMode="contain"
            />
          </View>

          {/* Header */}
          <View className="mb-8 items-start">
            <ThemedText
              lightColor={theme.text}
              darkColor={theme.text}
              className="mb-2 text-center text-[20px] font-[500]">
              Create An Account
            </ThemedText>
          </View>

          {/* Form Fields */}
          <View className="flex flex-col gap-[20px]">
            <View className="flex w-full flex-row justify-between gap-[27px]">
              <View className="flex-1">
                <InputField
                  required
                  label="First Name"
                  placeholder="Enter first name"
                  onFocus={() => handleInputFocus(0)}
                />
              </View>
              <View className="flex-1">
                <InputField
                  required
                  label="Last Name"
                  placeholder="Enter last name"
                  onFocus={() => handleInputFocus(0)}
                />
              </View>
            </View>
            <View className="flex w-full flex-row justify-between gap-[27px]">
              <View className="flex-1">
                <InputField
                  required
                  label="Nickname"
                  placeholder="Enter Nickname"
                  onFocus={() => handleInputFocus(0)}
                />
              </View>
              <View className="flex-1">
                <InputField
                  required
                  label="Position"
                  placeholder="Enter Position"
                  onFocus={() => handleInputFocus(0)}
                />
              </View>
            </View>
            <View className="flex-1">
              <InputField
                required
                label="Location"
                placeholder="N0 11, Trinity Estate, Awoyaya"
                onFocus={() => handleInputFocus(0)}
              />
            </View>
            <View className="w-full">
              <InputField
                required
                label="Email Address"
                placeholder="Enter email address"
                keyboardType="email-address"
                onFocus={() => handleInputFocus(100)}
              />
            </View>

            <View className="w-full">
              <InputField
                required
                label="Phone Number"
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                onFocus={() => handleInputFocus(150)}
              />
            </View>

            <View className="w-full">
              <InputField
                password
                required
                label="Password"
                placeholder="Enter password"
                secureTextEntry
                onFocus={() => handleInputFocus(200)}
              />
            </View>

            {/* Checkboxes Section */}
            <View className=" flex flex-col gap-4">
              {/* Terms and Conditions - Required */}
              <View className="  rounded-lg">
                <TermsCheckbox
                  checked={acceptedTerms}
                  onToggle={() => setAcceptedTerms(!acceptedTerms)}
                />
               
              </View>

              {/* Newsletter Subscription - Optional */}
              <View className="  rounded-lg">
                <Checkbox
                  checked={newsletter}
                  onToggle={() => setNewsletter(!newsletter)}
                  label="Recieve Emails from our Newsletter"
                  required={false}
                />
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <View className="mt-6 w-full">
             <CustomButton  primary title="Create An Account " onPress={() => router.push('/signup')} />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
      <Loader visible={loading} />
    </SafeAreaScreen>
  );
}