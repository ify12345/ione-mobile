/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dimensions,
  View,
  TouchableWithoutFeedback,
  useColorScheme,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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
import Toast from 'react-native-toast-message';
import { useAppDispatch } from '@/redux/store';
import { login } from '@/api/authThunks';


const { width } = Dimensions.get('screen');

type SigninInput = {
  email: string;
  password: string;
};

export default function SignIn() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { bottom } = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const scrollViewRef = React.useRef<ScrollView>(null);

  const handleInputFocus = (yPosition: number) => {
    scrollViewRef.current?.scrollTo({ y: yPosition, animated: true });
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const signinValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const handleSubmit = async (values: SigninInput) => {
    const payload = {
      email: values.email,
      password: values.password,
    };

    setLoading(true);
    dispatch(login(payload))
      .unwrap()
      .then((response) => {
        setLoading(false);
        console.log(response);
       Toast.show({
          type: 'success',
          props: {
            title: 'Success',
            message: response.message || 'Login successful',
          },
        });
        router.replace('/(tabs)');
      })
      .catch((err) => {
        setLoading(false);
        console.log('error is', err);
        const message = err?.msg?.message || err?.msg || 'Login failed';
        Toast.show({
          type: 'error',
          props: {
            title: 'Error',
            message: message,
          },
        });
      });
  };

  return (
    <SafeAreaScreen className="h-svh w-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
        <Formik
          initialValues={initialValues}
          validationSchema={signinValidationSchema}
          onSubmit={handleSubmit}>
          {({ handleChange, handleSubmit, values, errors, touched, handleBlur, setFieldValue }) => (
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
                <Icon />
              </View>

              {/* Header */}
              <View className="mb-8 items-start">
                <ThemedText
                  lightColor={theme.text}
                  darkColor={theme.text}
                  className="mb-2 text-[20px] font-[500]">
                  Welcome Back
                </ThemedText>
                <ThemedText
                  lightColor="#6C757D"
                  darkColor="#9BA1A6"
                  className="text-sm">
                  Sign in to continue
                </ThemedText>
              </View>

              {/* Form Fields */}
              <View className="flex flex-col gap-[20px]">
                {/* Email Input */}
                <View className="w-full">
                  <InputField
                    required
                    label="Email Address"
                    placeholder="Enter email address"
                    keyboardType="email-address"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    onFocus={() => handleInputFocus(0)}
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect={false}
                    errorMessage={touched.email && errors.email ? errors.email : ''}
                  />
                </View>

                {/* Password Input */}
                <View className="w-full">
                  <InputField
                    password
                    required
                    label="Password"
                    placeholder="Enter password"
                    secureTextEntry
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    onFocus={() => handleInputFocus(100)}
                    autoCapitalize="none"
                    errorMessage={touched.password && errors.password ? errors.password : ''}
                  />
                </View>

                {/* Forgot Password Link */}
                <View className="flex flex-row items-end justify-end">
                  <TouchableWithoutFeedback
                    onPress={() => router.push('/forgottenpassword')}>
                    <ThemedText
                      lightColor="#46BB1C"
                      darkColor="#46BB1C"
                      className="text-sm font-medium underline">
                      Forgot Password?
                    </ThemedText>
                  </TouchableWithoutFeedback>
                </View>
              </View>

              {/* Submit Button */}
              <View className="mt-8 w-full">
                <CustomButton
                  primary
                  title={loading ? 'Signing In...' : 'Sign In'}
                  onPress={() => handleSubmit()}
                  disabled={loading}
                />
              </View>

              {/* Sign Up Link */}
              <View className="mt-6 items-center">
                <TouchableWithoutFeedback onPress={() => router.push('/(onboarding)/signup')}>
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
          )}
        </Formik>
      </KeyboardAvoidingView>
      <Loader visible={loading} />
    </SafeAreaScreen>
  );
}