
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Formik } from 'formik';
import * as React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import { register, uploadAvatar } from '@/api/authThunks';
import * as ImagePicker from 'expo-image-picker';
import GeolocationComponent from '@/components/GeoLocation';
import InputField from '@/components/InputField';
import Loader from '@/components/loader';
import SafeAreaScreen from '@/components/SafeAreaScreen';
import { ThemedText } from '@/components/ThemedText';
import CustomButton from '@/components/ui/CustomButton';
import { Icon } from '@/components/ui/Icon';
import { Colors } from '@/constants/Colors';
import { useAppDispatch } from '@/redux/store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Toast from "react-native-toast-message";
import CustomDatePicker from '@/components/modals/CustomDatePicker';

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
          className={`h-5 w-5 rounded border-2 items-center justify-center ${checked ? 'bg-[#00FF94] border-[#00FF94]' : 'bg-white border-gray-400'
            }`}>
          {checked && <View className="w-2 h-2 bg-white rounded-sm" />}
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
const TermsCheckbox: React.FC<{ checked: boolean; onToggle: () => void }> = ({
  checked,
  onToggle,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onToggle}>
      <View className="flex flex-row items-start gap-3">
        <View
          className={`h-5 w-5 rounded border-2 items-center justify-center ${checked ? 'bg-[#00FF94] border-[#00FF94]' : 'bg-white border-gray-400'
            }`}>
          {checked && <View className="w-2 h-2 bg-white rounded-sm" />}
        </View>
        <View className="flex-1">
          <ThemedText className="text-sm text-gray-700">
            I agree to the{' '}
            <ThemedText
              className="text-[#00FF94] underline"
              onPress={() => {
                /* Navigate to terms */
              }}>
              Terms and Conditions
            </ThemedText>{' '}
            and{' '}
            <ThemedText
              className="text-[#00FF94] underline"
              onPress={() => {
                /* Navigate to privacy */
              }}>
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
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const [newsletter, setNewsletter] = React.useState(false);
  const [coordinates, setCoordinates] = React.useState<[number, number]>([0, 0]);
  const router = useRouter();
  const [avatarUri, setAvatarUri] = React.useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = React.useState(false);
    console.log(avatarUri)
  const handlePickAvatar = async (setFieldValue: (field: string, value: any) => void) => {

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Toast.show({
        type: 'error',
        props: {
          title: 'Permission Required',
          message: 'Camera roll permissions are required to upload an avatar',
        },
      });
      return;
    }

    // Pick image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setUploadingAvatar(true);

      try {
        // Upload avatar
        const response = await dispatch(uploadAvatar({
          file: {
            uri: asset.uri,
            type: asset.type || 'image/jpeg',
            name: asset.fileName || 'avatar.jpg',
          },
        })).unwrap();

        // Set avatar URL in form
        setFieldValue('avatar', response.avatar);
        setAvatarUri(response.avatar);
   
        Toast.show({
          type: 'success',
          props: {
            title: 'Success',
            message: 'Avatar uploaded successfully',
          },
        });
      } catch (error: any) {
        Toast.show({
          type: 'error',
          props: {
            title: 'Error',
            message: error?.msg || 'Failed to upload avatar',
          },
        });
      } finally {
        setUploadingAvatar(false);
      }
    }
  };


  const scrollViewRef = React.useRef<ScrollView>(null);
  const { owner } = useLocalSearchParams();

  const isOwner = owner === 'true';

  const handleInputFocus = (yPosition: number) => {
    scrollViewRef.current?.scrollTo({ y: yPosition, animated: true });
  };

  const [isDatePickerVisible, setDatePickerVisible] = React.useState(false);
  const [isPositionPickerVisible, setPositionPickerVisible] = React.useState(false);

  const handleConfirmDate = (date: Date, setFieldValue: (field: string, value: any) => void) => {
    setDatePickerVisible(false);
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
    setFieldValue('dob', formattedDate);
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    nickname: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    position: '',
    height: '',
    dateOfBirth: '',
    avatar: ''
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    nickname: Yup.string().required('Nickname is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(/^.*(?=.{6,})/, 'Minimum 6 characters'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    position: Yup.string().required('Position is required'),
    height: Yup.number()
      .typeError('Height must be a number')
      .required('Height is required'),
    dateOfBirth: Yup.string().required('Date of Birth is required'),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    // Check if terms are accepted
    if (!acceptedTerms) {
      Toast.show({
        type: 'error',
        props: {
          title: 'Error',
          message: 'Please accept the Terms and Conditions to proceed.',
        },
      });
      return;
    }

    // Check if coordinates are set (if you need location)
    if (coordinates[0] === 0 && coordinates[1] === 0) {
      Toast.show({
        type: 'error',
        props: {
          title: 'Error',
          message: 'Please get your location coordinates first',
        },
      });
      return;
    }

    const payload = {
      ...values,
      isOwner, // or get from navigation state if needed
      location: {
        type: 'Point',
        coordinates,
      },
      height: Number(values.height),


    };
    console.log(payload);

    setLoading(true);
    dispatch(register(payload))
      .unwrap()
      .then((response) => {
        setLoading(false);
        console.log('res', response);

        Toast.show({
          type: 'success',
          props: {
            title: 'Success',
            message: response.message || 'Account created successfully',
          },
        });
        router.push("/(onboarding)/signin");
      })
      .catch((err) => {
        setLoading(false);
        console.log('error is', err);
        const message = err?.msg?.message || err?.msg;
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
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ handleChange, handleSubmit, values, errors, touched, handleBlur, setFieldValue, setFieldTouched }) => (
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
                  className="mb-2 text-center text-[20px] font-[500]">
                  Create An Account
                </ThemedText>
              </View>

              {/* Form Fields */}
              <View className="flex flex-col gap-[20px]">
                <View className="mb-6 items-center">
                  <TouchableWithoutFeedback onPress={() => handlePickAvatar(setFieldValue)}>
                    <View className="items-center">
                      <View className="h-24 w-24 rounded-full  items-center justify-center border-2 border-gray-300 overflow-hidden">
                        {avatarUri ? (
                          <Image source={{ uri: avatarUri }} style={{height:'100%',width: '100%'}} className="h-full w-full" />
                        ) : (
                          <ThemedText className="text-gray-400 text-xs text-center px-2">
                            Tap to upload avatar
                          </ThemedText>
                        )}
                      </View>
                      {uploadingAvatar && (
                        <ThemedText className="text-xs text-gray-500 mt-2">Uploading...</ThemedText>
                      )}
                      {!uploadingAvatar && avatarUri && (
                        <ThemedText className="text-xs text-green-500 mt-2">Avatar uploaded ✓</ThemedText>
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View className="flex w-full flex-row justify-between gap-[27px]">
                  <View className="flex-1">
                    <InputField
                      required
                      label="First Name"
                      placeholder="Enter first name"
                      value={values.firstName}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      onFocus={() => handleInputFocus(0)}
                      errorMessage={touched.firstName && errors.firstName ? errors.firstName : ''}
                    />
                  </View>
                  <View className="flex-1">
                    <InputField
                      required
                      label="Last Name"
                      placeholder="Enter last name"
                      value={values.lastName}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      onFocus={() => handleInputFocus(0)}
                      errorMessage={touched.lastName && errors.lastName ? errors.lastName : ''}
                    />
                  </View>
                </View>

                <View className="flex w-full flex-row justify-between gap-[27px]">
                  <View className="flex-1">
                    <InputField
                      required
                      label="Nickname"
                      placeholder="Enter Nickname"
                      value={values.nickname}
                      onChangeText={handleChange('nickname')}
                      onBlur={handleBlur('nickname')}
                      onFocus={() => handleInputFocus(0)}
                      errorMessage={touched.nickname && errors.nickname ? errors.nickname : ''}
                    />
                  </View>
                  <View className="flex-1">
                    <ThemedText className="text-base font-medium text-gray-700 mb-2">
                      Position <ThemedText className="text-red-500">*</ThemedText>
                    </ThemedText>
                    <TouchableWithoutFeedback onPress={() => { setPositionPickerVisible(true); setFieldTouched('position', true); }}>
                      <View
                        className={`border rounded-md px-4 py-[16px] ${touched.position && errors.position ? 'border-red-500' : 'border-gray-300'
                          }`}
                      >
                        <ThemedText className={`${values.position ? 'text-black' : 'text-gray-400'}`}>
                          {values.position || 'Select Position'}
                        </ThemedText>
                      </View>
                    </TouchableWithoutFeedback>
                    {touched.position && errors.position && (
                      <ThemedText className="text-xs text-red-500 mt-1">{errors.position}</ThemedText>
                    )}
                  </View>
                </View>

                <View className="flex-1">
                  <InputField
                    required
                    label="Address"
                    placeholder="N0 11, Trinity Estate, Awoyaya"
                    value={values.address}
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    onFocus={() => handleInputFocus(0)}
                    errorMessage={touched.address && errors.address ? errors.address : ''}
                  />
                  <GeolocationComponent setCoordinates={setCoordinates} />
                </View>

                {/* Height + DOB Row */}
                <View className="flex w-full flex-row justify-between gap-[27px]">
                  {/* Height Field */}
                  <View className="flex-1">
                    <InputField
                      required
                      label="Height (cm)"
                      placeholder="Enter your height"
                      keyboardType="numeric"
                      value={values.height}
                      onChangeText={handleChange('height')}
                      onBlur={handleBlur('height')}
                      onFocus={() => handleInputFocus(170)}
                      errorMessage={touched.height && errors.height ? errors.height : ''}
                    />
                  </View>

                  <View className="flex-1 flex fled-col gap-2">
                    <ThemedText className="text-base font-medium text-gray-700">
                      Date of Birth <ThemedText className="text-red-500 ">*</ThemedText>
                    </ThemedText>
                    <TouchableWithoutFeedback onPress={() => setDatePickerVisible(true)}>
                      <View
                        className={`border rounded-md px-4 py-[16px] ${touched.dateOfBirth && errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                          }`}
                      >
                        <ThemedText className={`${values.dateOfBirth ? 'text-black text-xs' : 'text-gray-400 text-xs'}`}>
                          {values.dateOfBirth ? values.dateOfBirth : 'Select date of birth'}
                        </ThemedText>
                      </View>
                    </TouchableWithoutFeedback>
                    {touched.dateOfBirth && errors.dateOfBirth && (
                      <ThemedText className="text-xs text-red-500 mt-1">{errors.dateOfBirth}</ThemedText>
                    )}
                  </View>

                  <CustomDatePicker
                    isVisible={isDatePickerVisible}
                    date={values.dateOfBirth ? new Date(values.dateOfBirth) : new Date()}
                    onChange={(date: Date) => {
                      setDatePickerVisible(false);
                      setFieldValue('dateOfBirth', date.toISOString().split('T')[0]); // YYYY-MM-DD
                    }}
                    onClose={() => setDatePickerVisible(false)}
                    maximumDate={new Date()} // Prevent future dates
                  />

                  <Modal
                    visible={isPositionPickerVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setPositionPickerVisible(false)}
                  >
                    <View className="flex-1 justify-end bg-transparent">
                      <View className="bg-white rounded-t-lg p-4">
                        <ThemedText className="text-lg font-bold mb-4">Select Position</ThemedText>
                        <TouchableWithoutFeedback onPress={() => { setFieldValue('position', 'MF'); setPositionPickerVisible(false); }}>
                          <View className="py-3 border-b border-gray-200">
                            <ThemedText>MF</ThemedText>
                          </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => { setFieldValue('position', 'ST'); setPositionPickerVisible(false); }}>
                          <View className="py-3 border-b border-gray-200">
                            <ThemedText>ST</ThemedText>
                          </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => { setFieldValue('position', 'DF'); setPositionPickerVisible(false); }}>
                          <View className="py-3">
                            <ThemedText>DF</ThemedText>
                          </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => setPositionPickerVisible(false)}>
                          <View className="py-3 mt-4 bg-gray-200 rounded">
                            <ThemedText className="text-center">Cancel</ThemedText>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    </View>
                  </Modal>
                </View>


                <View className="w-full">
                  <InputField
                    required
                    label="Email Address"
                    placeholder="Enter email address"
                    keyboardType="email-address"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    onFocus={() => handleInputFocus(100)}
                    errorMessage={touched.email && errors.email ? errors.email : ''}
                  />
                </View>

                <View className="w-full">
                  <InputField
                    required
                    label="Phone Number"
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    value={values.phoneNumber}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    onFocus={() => handleInputFocus(150)}
                    errorMessage={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : ''}
                  />
                </View>

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
                    onFocus={() => handleInputFocus(200)}
                    errorMessage={touched.password && errors.password ? errors.password : ''}
                  />
                </View>

                {/* Checkboxes Section */}
                <View className="flex flex-col gap-4">
                  {/* Terms and Conditions - Required */}
                  <View className="rounded-lg">
                    <TermsCheckbox
                      checked={acceptedTerms}
                      onToggle={() => setAcceptedTerms(!acceptedTerms)}
                    />
                  </View>

                  {/* Newsletter Subscription - Optional */}
                  <View className="rtl:ounded-lg">
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
                <CustomButton
                  primary
                  title={loading ? 'Creating Account...' : 'Create An Account'}
                  onPress={() => handleSubmit()}
                  disabled={loading}
                />
              </View>
            </ScrollView>
          )}
        </Formik>
      </KeyboardAvoidingView>
      <Loader visible={loading} />
    </SafeAreaScreen>
  );
}