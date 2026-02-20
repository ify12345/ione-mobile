import OpenIcon from "@/assets/svg/OpenIcon";
import SettingsIcon from "@/assets/svg/SettingsIcon";
import SafeAreaScreen from "@/components/SafeAreaScreen";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

type BarDataProps = {
  value: number;
  label: string;
  frontColor?: string;
};

export default function AdminStatisticsScreen() {
  const barData: BarDataProps[] = [
    { value: 20, label: "Jan", frontColor: "#7987FF" },
    { value: 60, label: "Feb", frontColor: "#7987FF" },
    { value: 20, label: "Mar", frontColor: "#7987FF" },
    { value: 20, label: "Apr", frontColor: "#7987FF" },
    { value: 10, label: "May", frontColor: "#7987FF" },
    { value: 22, label: "June", frontColor: "#7987FF" },
  ];
  return (
    <SafeAreaScreen className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
          flexGrow: 1,
        }}
      >
        <View className="py-6 px-[35px]">
          <LinearGradient
            colors={["#00492A", "#61C89D"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <View className="px-[18px] pt-6 pb-9">
              <View className="flex flex-row items-center justify-between">
                <View className="flex-row items-center gap-[3px] text-xs bg-[#FFFFFF33] rounded-[10px] p-[10px]">
                  <Text
                    style={{ fontFamily: "Poppins_600SemiBold" }}
                    className="text-white"
                  >
                    This Month
                  </Text>
                  <OpenIcon stroke="#fff" />
                </View>
                <TouchableOpacity className="bg-[#FFFFFF33]  py-2 px-2 rounded-[10px]">
                  <SettingsIcon width={14} height={14} color="#2D264B" />
                </TouchableOpacity>
              </View>

              <View className="mt-8">
                <Text
                  style={{ fontFamily: "Poppins_500Medium" }}
                  className="text-white text-sm"
                >
                  Revenue:
                </Text>
                <View className="flex flex-row items-center justify-between">
                  <Text
                    style={{ fontFamily: "PlayfairDisplay_700Bold" }}
                    className="text-[40px] text-white"
                  >
                    $200
                  </Text>
                  <TouchableOpacity className="bg-[#FFFFFF33] py-[9px] px-2 rounded-full">
                    <Ionicons name="eye-off" size={16} color="#2D264B" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View className="mt-7 px-[14px] flex flex-row gap-[10px]">
          <View className="border border-[#F1F1F1] rounded pt-4 pb-8 px-6">
            <View className="flex flex-row justify-between bg-white p-2">
              <Text
                style={{ fontFamily: "Poppins_400Regular" }}
                className="text-black text-base"
              >
                Number of Users
              </Text>
              <View className="flex-row items-center gap-2">
                <Text
                  style={{ fontFamily: "Poppins_500Medium" }}
                  className="text-black text-base"
                >
                  This Week
                </Text>
                <OpenIcon color="white" />
              </View>
            </View>

            <Text className="mt-3 font-normal text-[32px] text-[#165BAA]">
              25000
            </Text>
            <View className="mt-10">
              <BarChart
                barWidth={22}
                noOfSections={3}
                barBorderRadius={4}
                frontColor="lightgray"
                data={barData}
                yAxisThickness={0}
                xAxisThickness={0}
              />
            </View>
            <View className="flex flex-row gap-[5px] pl-4 items-center pt-6 pb-2">
              <View className="w-2 h-2 bg-[#7987FF] rounded-full" />
              <Text>Users</Text>
            </View>
          </View>
        </View>

        <View className="px-[31px] mt-[29px] flex flex-row gap-[10px]">
          <View className="px-[10px]">
            <ThemedText
              style={{ fontFamily: "Poppins_400Regular" }}
              className="text-black text-xs font-normal"
            >
              Ratings
            </ThemedText>
            <Text
              style={{ fontFamily: "PlayfairDisplay_700Bold" }}
              className="text-black mt-3 text-[40px]"
            >
              245
            </Text>
          </View>
          <View className="px-[10px]">
            <ThemedText
              style={{ fontFamily: "Poppins_400Regular" }}
              className="text-black text-xs"
            >
              Tournaments Hosted
            </ThemedText>
            <ThemedText
              style={{ fontFamily: "PlayfairDisplay_700Bold" }}
              className="text-black mt-3 text-[40px]"
            >
              12
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaScreen>
  );
}
