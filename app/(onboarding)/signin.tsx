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
  ScrollView
} from 'react-native';
import * as yup from 'yup';
import React, {useState} from 'react';
import {Formik} from 'formik';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Loader from '@/components/loader';
import { ThemedText } from '@/components/ThemedText';
import CustomButton from '@/components/ui/CustomButton';
import InputField from '@/components/InputField';
import { useRouter } from 'expo-router';
import SafeAreaScreen from '@/components/SafeAreaScreen';
import { Colors } from '@/constants/Colors';

const {width} = Dimensions.get('screen');

type SigninInput = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export default function SignIn() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const {bottom} = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function submit({email, password, rememberMe}: SigninInput) {
    setLoading(true);
    // Add your signin logic here
    // Example: API call, authentication, etc.
    setTimeout(() => {
      setLoading(false);
      // Navigate to main app on successful login
      router.replace('/(tabs)');
    }, 2000);
  }

  const signinValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Enter a valid email')
      .trim()
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  return (
    <SafeAreaScreen className="">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingHorizontal: 21, 
          paddingBottom: 40,
          justifyContent: 'center'
        }}
      >
   
        <View className="items-center mb-8">
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
            className="text-3xl font-bold text-center mb-2"
          >
            Welcome back
          </ThemedText>
          <ThemedText 
            lightColor="#6C757D" 
            darkColor="#9BA1A6"
            className="text-base text-center px-4 leading-6"
          >
            Sign in to your account to continue
          </ThemedText>
        </View>

        <Formik
          validationSchema={signinValidationSchema}
          initialValues={{
            email: '',
            password: '',
            rememberMe: false,
          }}
          onSubmit={values => submit(values)}
        >
          {({touched, handleChange, handleSubmit, errors, isValid, values, setFieldValue}) => {
            return (
              <View className="flex-1">
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
                  placeholder="Enter your email"
                />

                {/* Password Input */}
                <InputField
                  password
                  required
                  label="Password"
                  error={touched.password && !!errors.password}
                  errorMessage={touched.password ? errors.password : undefined}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  autoCapitalize="none"
                  placeholder="Enter your password"
                />

                {/* Remember Me and Forgot Password Row */}
                <View className="flex-row items-center justify-between mb-8">
                  {/* Remember Me Checkbox */}
                  <View className="flex-row items-center">
                    <TouchableWithoutFeedback
                      onPress={() => setFieldValue('rememberMe', !values.rememberMe)}
                    >
                      <View
                        className="w-5 h-5 border-2 rounded items-center justify-center mr-3"
                        style={{
                          borderColor: values.rememberMe ? '#46BB1C' : '#DADADA',
                          backgroundColor: values.rememberMe ? '#46BB1C' : 'transparent',
                        }}
                      >
                        {values.rememberMe && (
                          <View className="w-2 h-2 bg-white rounded-sm" />
                        )}
                      </View>
                    </TouchableWithoutFeedback>
                    
                    <TouchableWithoutFeedback
                      onPress={() => setFieldValue('rememberMe', !values.rememberMe)}
                    >
                      <ThemedText 
                        lightColor={theme.text} 
                        darkColor={theme.text}
                        className="text-sm"
                      >
                        Remember me
                      </ThemedText>
                    </TouchableWithoutFeedback>
                  </View>

                  {/* Forgot Password Link */}
                  <TouchableWithoutFeedback onPress={() => {
                    // Navigate to forgot password screen
                    // router.push('/forgot-password');
                  }}>
                    <ThemedText 
                      lightColor="#46BB1C" 
                      darkColor="#46BB1C"
                      className="text-sm font-medium"
                    >
                      Forgot Password?
                    </ThemedText>
                  </TouchableWithoutFeedback>
                </View>

                
                <CustomButton
                  primary
                  title="Sign In"
                  // onPress={handleSubmit}
                  onPress={() => router.push('/(tabs)')}
                  disabled={!isValid}
                  className=""
                />

             

                {/* Sign Up Link */}
                <View className="items-center mt-3">
                  <TouchableWithoutFeedback onPress={() => router.push('/(onboarding)')}>
                    <View className="flex-row items-center">
                      <ThemedText 
                        lightColor="#6C757D" 
                        darkColor="#9BA1A6"
                        className="text-base"
                      >
                        Don't have an account?{' '}
                      </ThemedText>
                      <ThemedText 
                        lightColor="#46BB1C" 
                        darkColor="#46BB1C"
                        className="text-base font-semibold"
                      >
                        Sign Up
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

const styles = StyleSheet.create({
  logo: {
    width: 130,
    height: 60,
  },
});