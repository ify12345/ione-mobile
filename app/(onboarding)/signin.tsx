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
import * as React from 'react';
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
  const [loading, setLoading] = React.useState(false);
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
    <SafeAreaScreen className="mt-[52px]">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingHorizontal: 21, 
          paddingBottom: 40,
          justifyContent: 'center'
        }}
      >
   
        <View className="items-center flex flex-row justify-between mb-8">
            <ThemedText 
            lightColor={theme.text} 
            darkColor={theme.text}
            
            className="text-[20px] font-[500] text-center "
          >
            Welcome Back
          </ThemedText>
          <Image
            source={require('@/assets/images/icon.png')}
           className='w-[100px] h-[20px]'
            resizeMode="contain"
          />

        </View>

        {/* Header */}

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
                <View className="flex-row mt-[54px]  flex justify-end items-end  mb-8">
                  {/* Remember Me Checkbox */}

                  {/* Forgot Password Link */}
                  <TouchableWithoutFeedback onPress={() => {
                    // Navigate to forgot password screen
                    router.push('/forgottenpassword');
                  }}>
                    <ThemedText 
                      lightColor="#46BB1C" 
                      darkColor="#46BB1C"
                      className="text-sm underline font-medium"
                    >
                     Reset Your Password?
                    </ThemedText>
                  </TouchableWithoutFeedback>
                </View>

                <View className='mt-[300px]'>
                <CustomButton
                  primary
                  title="Sign In"
                  // onPress={handleSubmit}
                  // onPress={() => router.push('')}
                  disabled={!isValid}
                  className=""
                />

             </View>

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

// const styles = StyleSheet.create({
//   logo: {
//     width: 130,
//     height: 60,
//   },
// });