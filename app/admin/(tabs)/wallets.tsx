import React from "react";
import AdminNotificationIcon from "@/assets/svg/AdminNotificationIcon";
import { ThemedText } from "@/components/ThemedText";
import { SettingsHeader } from "@/components/admin/settings/SettingsHeader";
import { WalletsHeader } from "@/components/admin/wallets/wallets-header";
import { SettingsRow } from "@/components/admin/settings/SettingsRow";
import { SettingsSection } from "@/components/admin/settings/SettingsSection";
import { logout } from "@/redux/reducers/auth";
import { persistor, useAppDispatch, useAppSelector } from "@/redux/store";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";

import {
  Alert,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

export default function AdminWalletScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const { location } = useAppSelector((state) => state.ownerDashboard);
  const { user } = useAppSelector((state) => state.auth);

  const openHours =
    location?.openingHour && location?.closingHour
      ? `${location.openingHour} – ${location.closingHour}`
      : "8am – 10pm";

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            try {
              dispatch(logout());
              router.replace("/(onboarding)/signin");
              SecureStore.deleteItemAsync("i-one").catch(() => {});
              SecureStore.deleteItemAsync("user-data").catch(() => {});
              persistor.purge().catch(() => {});
              Toast.show({
                type: "success",
                text1: "Logged out",
                text2: "See you soon!",
              });
            } catch {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "Please try again.",
              });
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This is permanent and cannot be undone. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {} },
      ],
      { cancelable: false },
    );
  };

  const paddingTop = Platform.OS === "ios" ? insets.top + 12 : 52;
  const paddingBottom = insets.bottom + 100;

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? "#000" : "#f5f5f5" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop,
          paddingBottom,
          paddingHorizontal: 20,
        }}
      >
        {/* Top bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <ThemedText
            style={{ fontFamily: "Poppins_600SemiBold", fontSize: 22 }}
            lightColor="#000"
            darkColor="#fff"
          >
            Wallets
          </ThemedText>

          <TouchableOpacity
            onPress={() => router.navigate("/admin/notification")}
            style={{
              backgroundColor: "#00FF943B",
              borderRadius: 10,
              width: 38,
              height: 38,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AdminNotificationIcon
              color={isDark ? "#FFFFFF" : "#2D264B"}
              dotColor="#03EA89"
            />
          </TouchableOpacity>
        </View>

        {/* Wallet card */}

        <WalletsHeader availableBalance={"60,000"} ledgerBalance={"60,000"} />

        {/* Wallet Management */}
        <SettingsSection title="Wallet details">
          <SettingsRow
            icon="grass"
            iconColor="#4CAF50"
            label="Bank Accounts"
            onPress={() => router.push("/admin/pitchcondition")}
          />
          <SettingsRow
            icon="attach-money"
            iconColor="#FF9800"
            label="Withdraw"
            onPress={() => router.push("/admin/pricingoption")}
          />
          <SettingsRow
            icon="attach-money"
            iconColor="#FF9800"
            label="Fund Wallet"
            onPress={() => router.push("/admin/pricingoption")}
          />
        </SettingsSection>
      </ScrollView>
    </View>
  );
}
