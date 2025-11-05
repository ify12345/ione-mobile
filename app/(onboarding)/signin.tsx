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

const { width } = Dimensions.get('screen');

type SigninInput = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export default function SignIn() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { bottom } = useSafeAreaInsets();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  function submit({ email, password, rememberMe }: SigninInput) {
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
    email: yup.string().email('Enter a valid email').trim().required('Email is required'),
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
          justifyContent: 'center',
          flexGrow: 1,
        }}>
        <View className="mb-8 flex flex-row items-center justify-between">
          <ThemedText
            lightColor={theme.text}
            darkColor={theme.text}
            className="text-center text-[20px] font-[500] ">
            Welcome Back
          </ThemedText>
          <Icon />
        </View>

        {/* Header */}

        <Formik
          validationSchema={signinValidationSchema}
          initialValues={{
            email: '',
            password: '',
            rememberMe: false,
          }}
          onSubmit={(values) => submit(values)}>
          {({ touched, handleChange, handleSubmit, errors, isValid, values, setFieldValue }) => {
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
                <View className="mb-8 mt-[54px]  flex flex-row items-end  justify-end">
                  {/* Remember Me Checkbox */}

                  {/* Forgot Password Link */}
                  <TouchableWithoutFeedback
                    onPress={() => {
                      // Navigate to forgot password screen
                      router.push('/forgottenpassword');
                    }}>
                    <ThemedText
                      lightColor="#46BB1C"
                      darkColor="#46BB1C"
                      className="text-sm font-medium underline">
                      Reset Your Password?
                    </ThemedText>
                  </TouchableWithoutFeedback>
                </View>

                {/* Sign Up Link */}
              </View>
            );
          }}
        </Formik>
        <View className="">
          <CustomButton
            primary
            title="Sign In"
            // onPress={handleSubmit}
            // onPress={() => router.push('')}
            // disabled={!isValid}
            className=""
          />
        </View>
        <View className="mt-3 items-center">
          <TouchableWithoutFeedback onPress={() => router.push('/(onboarding)')}>
            <View className="flex-row items-center">
              <ThemedText lightColor="#6C757D" darkColor="#9BA1A6" className="text-base">
                Don't have an account?{' '}
              </ThemedText>
              <ThemedText
                lightColor="#46BB1C"
                darkColor="#46BB1C"
                className="text-base font-semibold">
                Sign Up
              </ThemedText>
            </View>
          </TouchableWithoutFeedback>
        </View>
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
