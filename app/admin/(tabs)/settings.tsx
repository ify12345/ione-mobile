import AdminNotificationIcon from "@/assets/svg/AdminNotificationIcon";
import ChevronRight from "@/assets/svg/ChevronRight";
import SafeAreaScreen from "@/components/SafeAreaScreen";
import { ThemedText } from "@/components/ThemedText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function AdminSettingsScreen() {
  const router = useRouter();
  return (
    <SafeAreaScreen className="flex-1">
      <View className="py-6 px-[35px] flex-1 justify-center">
        <View>
          <View className="flex flex-row items-center justify-between">
            <ThemedText
              style={{ fontFamily: "Poppins_600SemiBold" }}
              className="text-black text-xl"
            >
              Settings
            </ThemedText>
            <TouchableOpacity className="bg-[#00FF943B] rounded-[10px] w-[30px] h-[32px] items-center justify-center">
              <AdminNotificationIcon />
            </TouchableOpacity>
          </View>

          <View className="flex flex-row mt-12 py-5 items-center justify-between">
            <ThemedText
              style={{ fontFamily: "Poppins_500Medium" }}
              className="text-black text-[15px]"
            >
              Open Hours
            </ThemedText>
            <View className="flex flex-row gap-[9px]">
              <ThemedText
                style={{ fontFamily: "Poppins_400Regular" }}
                className="text-[#00000080] text-[15px]"
              >
                9am-10pm
              </ThemedText>
              <TouchableOpacity className="bg-[#00000033] rounded-[10px] p-[5px]">
                <ChevronRight />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/admin/changepassword")}
            className="flex flex-row mt-12 py-5 items-center justify-between"
          >
            <Text
              style={{ fontFamily: "Poppins_500Medium" }}
              className="text-black text-[15px]"
            >
              Change Password
            </Text>

            <View className="bg-[#00000033] rounded-[10px] p-[5px]">
              <ChevronRight />
            </View>
          </TouchableOpacity>
          <View className="flex flex-row mt-4 py-5 items-center justify-between">
            <ThemedText
              style={{ fontFamily: "Poppins_500Medium" }}
              className="text-black text-[15px]"
            >
              Change Account Number
            </ThemedText>
            <TouchableOpacity className="bg-[#00000033] rounded-[10px] p-[5px]">
              <ChevronRight />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex flex-row mt-auto items-center justify-between">
          <ThemedText
            style={{ fontFamily: "Poppins_500Medium" }}
            className="text-black text-[15px]"
          >
            Delete Account
          </ThemedText>
          <TouchableOpacity className="bg-[#FF00008C] rounded-[10px] p-3">
            <MaterialIcons name="logout" size={20} color="#2D264B" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaScreen>
  );
}
