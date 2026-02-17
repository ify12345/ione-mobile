import LocationIcon from "@/assets/svg/LocationIcon";
import SettingsIcon from "@/assets/svg/SettingsIcon";
import FixtureList from "@/components/FixtureList";
import SafeAreaScreen from "@/components/SafeAreaScreen";
import { ThemedText } from "@/components/ThemedText";
import { ImageBackground } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function AdminHomeScreen() {
  return (
    <SafeAreaScreen className="flex-1">
      <ImageBackground source={require("@/assets/images/adminHeader.png")}>
        <View className="px-[35px] pt-5 pb-6">
          <View className="flex flex-row items-center justify-between">
            <Text
              style={{ fontFamily: "Poppins_600SemiBold" }}
              className="text-white text-xs bg-[#FFFFFF33] rounded-[10px] p-[10px]"
            >
              Pitch Condition: Excellent
            </Text>
            <View className="flex flex-row gap-2">
              <TouchableOpacity className="bg-[#FFFFFF33]  py-2 px-2 rounded-[10px]">
                <SettingsIcon width={14} height={14} color="#2D264B" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-[#FFFFFF33]  py-2 px-2 rounded-[10px]">
                <SettingsIcon width={14} height={14} color="#2D264B" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="mt-[105px]">
            <View className="flex flex-row items-center gap-2 bg-[#FFFFFF33] w-[210px] rounded-[10px] pl-[5px] py-[10px]">
              <LocationIcon />
              <Text
                style={{ fontFamily: "Poppins_600SemiBold" }}
                className="text-white text-xs "
              >
                Lakowe Lakes, Lakowe, Lagos
              </Text>
            </View>
            <Text
              style={{ fontFamily: "PlayfairDisplay_700Bold" }}
              className="text-white text-[50px] uppercase"
            >
              Ant Sports
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View className="px-[35px] mt-7">
        <ThemedText
          style={{ fontFamily: "Poppins_600SemiBold" }}
          className="text-black text-[15px] mb-5"
        >
          Recents
        </ThemedText>
        <FixtureList />
      </View>
    </SafeAreaScreen>
  );
}
