import React, { useState } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { Toast } from 'toastify-react-native';
import { ThemedText } from './ThemedText';

interface GeolocationComponentProps {
  setCoordinates: (coords: [number, number]) => void;
}

const GeolocationComponent: React.FC<GeolocationComponentProps> = ({ setCoordinates }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const getLocation = async (): Promise<void> => {
    setLoading(true);

    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Permission denied',
          text2: 'Please allow location access in your device settings',

        });
        setLoading(false);
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { longitude, latitude } = location.coords;

      // Note: API expects [longitude, latitude] format for GeoJSON points
      setCoordinates([longitude, latitude]);


      Toast.show({
        type: 'success',
        text1: 'Location retrieved successfully',
      });

      setLoading(false);
    } catch (error: any) {
      console.error('Location error:', error);

      let errorMessage = 'An unknown error occurred';

      if (error.code === 'E_LOCATION_UNAVAILABLE') {
        errorMessage = 'Location information is unavailable';
      } else if (error.code === 'E_LOCATION_TIMEOUT') {
        errorMessage = 'The request to get location timed out';
      } else if (error.message) {
        errorMessage = error.message;
      }

      Toast.show({
        type: 'error',
        text1: 'Location Error',
        text2: errorMessage,
      });

      setLoading(false);
    }
  };

  return (
    <View className="w-full">
      <TouchableOpacity
        onPress={getLocation}
        disabled={loading}
        className={`bg-[#00FF94] w-full p-3 rounded-md items-center justify-center ${loading ? 'opacity-50' : ''
          }`}
        activeOpacity={0.7}>
        {loading ? (
          <View className="flex-row items-center gap-2">
            <ActivityIndicator size="small" color="#007745" />
            <ThemedText className="text-[#007745] text-sm font-medium">
              Getting location...
            </ThemedText>
          </View>
        ) : (
          <ThemedText className="text-[#007745] text-sm font-medium">
            Get Location
          </ThemedText>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default GeolocationComponent;