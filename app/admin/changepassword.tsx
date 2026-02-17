import AdminNotificationIcon from "@/assets/svg/AdminNotificationIcon";
import InputField from "@/components/InputField";
import SafeAreaScreen from "@/components/SafeAreaScreen";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function AdminChangePasswordScreen() {
  return (
    <SafeAreaScreen className="flex-1">
      <View className="py-6 px-[35px] flex-1">
        <View>
          <View className="flex flex-row items-center justify-between">
            <ThemedText className="text-black text-xl font-semibold">
              Change Password
            </ThemedText>
            <TouchableOpacity className="bg-[#00FF943B] rounded-[10px] w-[30px] h-[32px] items-center justify-center">
              <AdminNotificationIcon />
            </TouchableOpacity>
          </View>

          <View className="mt-12">
            <InputField
              password
              required
              label=""
              autoCapitalize="none"
              placeholder="New Password"
            />
          </View>
        </View>

        <View className="mt-auto mb-[42px]">
          <TouchableOpacity>
            <ThemedText className="text-[#000000] text-center py-5 font-medium text-[15px] bg-[#00FF94]">
              Confirm Password
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaScreen>
  );
}
