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
import * as yup from 'yup';
import React, {useState} from 'react';
import {Formik} from 'formik';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';

import Loader from '@/components/loader';
import { ThemedText } from '@/components/ThemedText';
import CustomButton from '@/components/ui/CustomButton';
import InputField from '@/components/InputField';
import { useRouter } from 'expo-router';
import SafeAreaScreen from '@/components/SafeAreaScreen';
import { Colors } from '@/constants/Colors';

const {width} = Dimensions.get('screen');

type RegisterPayload = {
  email: string;
  phone_number: string;
  password: string;
  acceptTexts?: boolean;
  role: string;
};

type SignupTwoInput = {
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
  role?: string;
  acceptTexts?: boolean;
};

const commonPasswords = [
  'password',
  '123456',
  '123456789',
  'qwerty',
  'abc123',
  'football',
  '12345',
  'monkey',
  'letmein',
  '111111',
];

export default function SignUp() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const {bottom} = useSafeAreaInsets();
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Private Car Owner');
  const router = useRouter();

  function toggleCountryModal() {
    setCountryModalVisible(!countryModalVisible);
  }

  function submit({email, phone, password, acceptTexts}: SignupTwoInput) {
    setLoading(true);
    // Add your signup logic here
    setTimeout(() => {
      setLoading(false);
      // Navigate to next screen or handle success
      router.replace('/(tabs)');
    }, 2000);
  }

  const checkPasswordCriteria = (password: string, email: string) => ({
    hasEightChars: password.length >= 8,
    hasUpperAndLower: /(?=.*[a-z])(?=.*[A-Z])/.test(password),
    hasNumberOrSymbol: /(?=.*[0-9])|(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password),
    doesNotContainEmail: email ? !password.toLowerCase().includes(email.toLowerCase()) : true,
    isNotCommonPassword: !commonPasswords.includes(password.toLowerCase()),
  });

  const signupValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Enter a valid email')
      .trim()
      .required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?:(?=.*\d)|(?=.*[\W_]))(?!.*\s).{8,}$/,
        'Enter a valid password',
      )
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
    acceptTexts: yup.boolean().oneOf([true], 'You must accept the terms'),
  });

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
            Create an account
          </ThemedText>
          <ThemedText 
            lightColor="#6C757D" 
            darkColor="#9BA1A6"
            className="text-base text-center px-4 leading-6"
          >
            Join Market Assist for personalized shopping and exclusive deals.
          </ThemedText>
        </View>

        <Formik
          validationSchema={signupValidationSchema}
          initialValues={{
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            acceptTexts: false,
          }}
          onSubmit={values => submit(values)}
        >
          {({touched, handleChange, handleSubmit, errors, isValid, values, setFieldValue}) => {
            const passwordCriteria = checkPasswordCriteria(values.password, values.email);
            const allPasswordCriteriaMet = Object.values(passwordCriteria).every(Boolean);
            
            return (
              <View className="flex-1">
                {/* User Role Picker */}
                <InputField
                  label="User"
                  selectPicker
                  value={selectedRole}
                  placeholder="Select user type"
                  rightIcon={<AntDesign name="down" size={14} color={theme.icon} />}
                  pickerPressed={() => {
                    // Handle role selection
                  }}
                />

                {/* Email Input */}
                <InputField
                  required
                  label="Email"
                  keyboardType="email-address"
                  error={touched.email && !!errors.email}
                  errorMessage={touched.email ? errors.email : undefined}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  placeholder="Enter email"
                />

                {/* Phone Input */}
                <InputField
                  isPhoneInput
                  required
                  label="Phone number"
                  keyboardType="phone-pad"
                  error={touched.phone && !!errors.phone}
                  errorMessage={touched.phone ? errors.phone : undefined}
                  onChangeText={handleChange('phone')}
                  value={values.phone}
                  autoComplete="tel"
                  placeholder="+234 812 345 6789"
                  countryCodeValue="NGN"
                  openCountryModal={toggleCountryModal}
                  flagUri="https://flagcdn.com/w320/ng.png"
                />

                {/* Password Input */}
                <InputField
                  password
                  required
                  label="Password"
                  error={touched.password && !!errors.password}
                  errorMessage={touched.password && !allPasswordCriteriaMet ? 'Password requirements not met' : undefined}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  autoCapitalize="none"
                  placeholder="Enter password"
                />

                {/* Password Criteria */}
                {values.password && (
                  <View className="mb-4 px-2">
                    <PasswordCriteriaItem
                      isValid={passwordCriteria.hasEightChars}
                      text="Contains at least 8 characters"
                    />
                    <PasswordCriteriaItem
                      isValid={passwordCriteria.hasUpperAndLower}
                      text="Contains both upper (A-Z) and lower (a-z) case letters"
                    />
                    <PasswordCriteriaItem
                      isValid={passwordCriteria.hasNumberOrSymbol}
                      text="Contains at least one number (0-9) or symbol"
                    />
                    <PasswordCriteriaItem
                      isValid={passwordCriteria.doesNotContainEmail}
                      text="Does not contain your email address"
                    />
                    <PasswordCriteriaItem
                      isValid={passwordCriteria.isNotCommonPassword}
                      text="Is not a commonly used password"
                    />
                  </View>
                )}

                {/* Confirm Password Input */}
                <InputField
                  password
                  required
                  label="Confirm Password"
                  error={touched.confirmPassword && !!errors.confirmPassword}
                  errorMessage={touched.confirmPassword ? errors.confirmPassword : undefined}
                  onChangeText={handleChange('confirmPassword')}
                  value={values.confirmPassword}
                  autoCapitalize="none"
                  placeholder="Confirm password"
                />

                {/* Terms Checkbox */}
                <View className="flex-row items-start mb-6 px-1">
                  <TouchableWithoutFeedback
                    onPress={() => setFieldValue('acceptTexts', !values.acceptTexts)}
                  >
                    <View
                      className="w-5 h-5 border-2 rounded items-center justify-center mt-1 mr-3"
                      style={{
                        borderColor: values.acceptTexts ? '#46BB1C' : '#DADADA',
                        backgroundColor: values.acceptTexts ? '#46BB1C' : 'transparent',
                      }}
                    >
                      {values.acceptTexts && (
                        <AntDesign name="check" size={14} color="white" />
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                  
                  <TouchableWithoutFeedback
                    onPress={() => setFieldValue('acceptTexts', !values.acceptTexts)}
                  >
                    <ThemedText 
                      lightColor="#6C757D" 
                      darkColor="#9BA1A6"
                      type="medium"
                      className="text-sm leading-5 flex-1"
                    >
                      By continuing, you agree to receive calls, WhatsApp messages, 
                      or SMS messages, including those sent by automated systems, 
                      from MarketAssist and its affiliates at the phone number you provided.
                    </ThemedText>
                  </TouchableWithoutFeedback>
                </View>

                {/* Submit Button */}
                <CustomButton
                  primary
                  title="Continue"
                  // onPress={handleSubmit}
                  disabled={!isValid || !values.acceptTexts}
                 
                />

                {/* Sign In Link */}
                <View className="items-center mt-3">
                  <TouchableWithoutFeedback onPress={() => router.push('/(onboarding)/signin')}>
                    <View className="flex-row items-center">
                      <ThemedText 
                        lightColor="#6C757D" 
                        darkColor="#9BA1A6"
                        className="text-base"
                      >
                        Already have an account?{' '}
                      </ThemedText>
                      <ThemedText 
                        lightColor="#46BB1C" 
                        darkColor="#46BB1C"
                        className="text-base font-semibold"
                      >
                        Sign In
                      </ThemedText>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
      <Loader visible={loading} />
    </SafeAreaScreen>
  );
}

// Password Criteria Item Component
function PasswordCriteriaItem({ isValid, text }: { isValid: boolean; text: string }) {
  return (
    <View className="flex-row items-start mb-2">
      <AntDesign
        name={isValid ? 'check' : 'close'}
        size={16}
        color={isValid ? '#46BB1C' : '#FF4D4F'}
      />
      <ThemedText
        type="medium"
        lightColor={isValid ? '#46BB1C' : '#FF4D4F'}
        darkColor={isValid ? '#46BB1C' : '#FF4D4F'}
        className="ml-2 text-sm leading-5 flex-1"
      >
        {text}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 130,
    height: 60,
  },
});