/* eslint-disable react-hooks/exhaustive-deps */
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '@/globals.css';
import FlashMessage from "react-native-flash-message";
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useEffect } from 'react';
import store, { persistor, useAppSelector } from '@/redux/store';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { setupAxiosInterceptors } from '@/utils/SetUpAxiosInterceptors';
import toastConfig from '@/utils/toast';

setupAxiosInterceptors();

function AppNavigator() {
  const router = useRouter();
  const { isAuthenticated, user, isRegistered, isVerified } = useAppSelector(
    (state) => state.auth
  );
  // console.log('user',user.locationInfo.location.coordinates)
  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace('/(tabs)');
    } else if (isRegistered && !isVerified) {
      router.replace("/(onboarding)/verify");
    } else if (isVerified && !isAuthenticated) {
      router.replace('/(onboarding)/signin');
    } else {
      router.replace('/(onboarding)');
    }
  }, [isAuthenticated, user, isRegistered, isVerified]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(onboarding)" />
    </Stack>
  );
}
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }



  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <AppNavigator />
      
              <StatusBar style="auto" />
           <Toast 
            config={toastConfig}
            position="top"
            topOffset={50}
            visibilityTime={4000}
            autoHide
          />
          
            </ThemeProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>

      </PersistGate>
    </Provider>
  );
}