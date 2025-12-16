/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import SafeAreaScreen from '@/components/SafeAreaScreen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomButton from '@/components/ui/CustomButton';
import { Toggle } from '@/components/ui/Toggle';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState, useMemo } from 'react';
import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
  useColorScheme,
  Alert
} from 'react-native';
import { Image } from 'expo-image';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { logout } from '@/redux/reducers/auth';
import { persistor, useAppDispatch, useAppSelector } from '@/redux/store';

// Helper function to format date
const formatDate = (dateString: string) => {
  if (!dateString) return 'Not set';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: '2-digit', 
    day: '2-digit',
    year: 'numeric'
  });
};

// Helper function to convert height from cm to feet/inches
const convertHeightToFeet = (cm: number) => {
  if (!cm) return 'Not set';
  const inches = cm * 0.393701;
  const feet = Math.floor(inches / 12);
  const remainingInches = Math.round(inches % 12);
  return `${feet}ft ${remainingInches}in`;
};

// Helper function to get position name
const getPositionName = (positionCode: string) => {
  const positions: { [key: string]: string } = {
    'GK': 'Goalkeeper',
    'DF': 'Defender',
    'MF': 'Midfielder',
    'FW': 'Forward',
    'ST': 'Striker',
    'CM': 'Central Midfielder',
    'CDM': 'Defensive Midfielder',
    'CAM': 'Attacking Midfielder',
    'LW': 'Left Winger',
    'RW': 'Right Winger',
    'CB': 'Center Back',
    'LB': 'Left Back',
    'RB': 'Right Back',
  };
  return positions[positionCode] || positionCode || 'Not set';
};

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const { width, height } = Dimensions.get('window');
  const iconColor = colorScheme === 'dark' ? '#F5FFF2BA' : '#1C1C1C';
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  console.log(user)
  // Memoized user data formatting
  const formattedUserData = useMemo(() => {
    if (!user) return null;
    
    return {
      firstName: user.firstName || 'Not set',
      lastName: user.lastName || 'Not set',
      nickname: user.nickname || 'Not set',
      dateOfBirth: formatDate(user.dateOfBirth || ''),
      height: convertHeightToFeet(user.height || 0),
      placeOfBirth: user.placeOfBirth || 'Not set',
      position: getPositionName(user.position || ''),
      email: user.email || 'Not set',
      phoneNumber: user.phoneNumber || 'Not set',
      address: user.locationInfo?.address || 'Not set',
      isCaptain: user.isCaptain ? 'Yes' : 'No',
      isAdmin: user.isAdmin ? 'Yes' : 'No',
    };
  }, [user]);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);

              // Retrieve token for API logout if needed
              const token = await SecureStore.getItemAsync('i-one');

              // Dispatch Redux logout to reset auth slice
              dispatch(logout());

              // Remove tokens from SecureStore
              await SecureStore.deleteItemAsync('i-one');
              await SecureStore.deleteItemAsync('user-data');

              // Clear Redux persist storage
              await persistor.purge();

              // Navigate back to onboarding or login
              router.replace('/(onboarding)/signin');

              Toast.show({
                type: 'success',
                props: {
                  title: 'Success',
                  message: 'You have been logged out successfully.',
                },
              });
            } catch (error) {
              console.log('Logout error:', error);
              Toast.show({
                type: 'error',
                props: {
                  title: 'Error',
                  message: 'Please try again.',
                },
              });
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (!user || !formattedUserData) {
    return (
      <SafeAreaScreen>
        <View className="flex-1 justify-center items-center">
          <ThemedText>Loading profile...</ThemedText>
        </View>
      </SafeAreaScreen>
    );
  }

  return (
    <SafeAreaScreen className="py-6 px-4 gap-5">
      <View className='w-full px-[35px] gap-4'>
        <View className='flex-row justify-between flex items-center w-full'>
          <ThemedText className='text-2xl font-semibold'>Profile</ThemedText>
          <View className='flex-row gap-4 items-center'>
            <TouchableOpacity onPress={() => router.push('/stats')}>
              <ThemedText className='text-sm font-medium'>
                Stats<Feather name="arrow-up-right" size={14} color={iconColor} />
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogout}
              disabled={isLoading}
              className='flex-row items-center gap-1'>
              <MaterialIcons name="logout" size={20} color="#DC2626" />
              <ThemedText className='text-sm font-medium text-red-600'>
                {isLoading ? 'Logging out...' : 'Logout'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <Image
          source={require('@/assets/images/profile.png')}
          resizeMode='cover'
          style={{ width: width - 70, height: height * 0.4, alignSelf: 'center' }}
        />

        {/* Use nickname or full name as the display name */}
        <ThemedText className='text-2xl font-semibold'>
          {user.nickname || `${user.firstName} ${user.lastName}`}
        </ThemedText>

        <ScrollView className='border-t border-black/19 dark:border-gray-400 py-8 flex gap-5'>
          {/* Personal Information */}
          <View className='flex flex-row gap-[44px] items-center mb-4 justify-between'>
            <View className='flex flex-row gap-2 items-center'>
              <ThemedText className='text-xs'>First Name:</ThemedText>
              <ThemedText className='text-sm font-medium'>{formattedUserData.firstName}</ThemedText>
            </View>

            <View className='flex flex-row gap-2 items-center'>
              <ThemedText className='text-xs'>Last Name:</ThemedText>
              <ThemedText className='text-sm font-medium'>{formattedUserData.lastName}</ThemedText>
            </View>
          </View>

          <View className='flex flex-row gap-[44px] items-center mb-4 justify-between'>
            <View className='flex flex-row gap-2 items-center'>
              <ThemedText className='text-xs'>Nickname:</ThemedText>
              <ThemedText className='text-sm font-medium'>{formattedUserData.nickname}</ThemedText>
            </View>

            <View className='flex flex-row gap-2 items-center'>
              <ThemedText className='text-xs'>Date of Birth:</ThemedText>
              <ThemedText className='text-sm font-medium'>{formattedUserData.dateOfBirth}</ThemedText>
            </View>
          </View>

          <View className='flex flex-row gap-[44px] items-center mb-4 justify-between'>
            <View className='flex flex-row gap-2 items-center'>
              <ThemedText className='text-xs'>Height:</ThemedText>
              <ThemedText className='text-sm font-medium'>{formattedUserData.height}</ThemedText>
            </View>

            <View className='flex flex-row gap-2 items-center'>
              <ThemedText className='text-xs'>Place of Birth:</ThemedText>
              <ThemedText className='text-sm font-medium'>{formattedUserData.placeOfBirth}</ThemedText>
            </View>
          </View>

          {/* Football Information */}
          <View className='flex flex-row gap-[44px] items-center mb-4 justify-between'>
            <View className='flex flex-row gap-42items-center'>
              <ThemedText className='text-xs'>Position:</ThemedText>
              <ThemedText className='text-sm font-medium'>{formattedUserData.position}</ThemedText>
            </View>
            
            <View className='flex flex-row gap-2 items-center'>
              <ThemedText className='text-xs'>Captain:</ThemedText>
              <ThemedText className='text-sm font-medium'>{formattedUserData.isCaptain}</ThemedText>
            </View>
          </View>

          {/* Contact Information */}
          <View className='flex flex-row gap-[44px] items-center mb-4 justify-between'>
            <View className='flex flex-row gap-2 items-center'>
              <ThemedText className='text-xs'>Email:</ThemedText>
              <ThemedText className='text-sm font-medium'>{formattedUserData.email}</ThemedText>
            </View>

            <View className='flex flex-row gap-2 items-center'>
              <ThemedText className='text-xs'>Phone:</ThemedText>
              <ThemedText className='text-sm font-medium'>{formattedUserData.phoneNumber}</ThemedText>
            </View>
          </View>

          {/* Additional Information */}
          <View className='flex flex-row gap-[44px] items-center mb-4 justify-between'>
            <View className='flex flex-row gap-2 items-center'>
              <ThemedText className='text-xs'>Address:</ThemedText>
              <ThemedText className='text-sm font-medium'>{formattedUserData.address}</ThemedText>
            </View>

            <View className='flex flex-row gap-2 items-center'>
              <ThemedText className='text-xs'>Admin:</ThemedText>
              <ThemedText className='text-sm font-medium'>{formattedUserData.isAdmin}</ThemedText>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaScreen>
  );
}