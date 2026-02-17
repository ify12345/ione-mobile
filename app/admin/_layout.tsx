import { useColorScheme } from "@/hooks/useColorScheme";
import toastConfig from "@/utils/toast";
import { PlayfairDisplay_700Bold } from "@expo-google-fonts/playfair-display/700Bold";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import ToastManager from "toastify-react-native/components/ToastManager";

function AdminAppNavigator() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "#F3FFFA" },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="changepassword"
        options={{ title: "Change Password", headerShown: false }}
      />
    </Stack>
  );
}

export default function AdminLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    PlayfairDisplay_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AdminAppNavigator />

          <StatusBar style="auto" />
          <Toast
            config={toastConfig}
            position="top"
            topOffset={50}
            visibilityTime={4000}
            autoHide
          />
        </ThemeProvider>
        <ToastManager />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
