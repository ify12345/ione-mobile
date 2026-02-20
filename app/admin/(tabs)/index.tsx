import LocationIcon from "@/assets/svg/LocationIcon";
import SettingsIcon from "@/assets/svg/SettingsIcon";
import Recent from "@/components/Recent";
import SafeAreaScreen from "@/components/SafeAreaScreen";
import { ThemedText } from "@/components/ThemedText";
import { ImageBackground } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const matches = [
  {
    id: 1,
    date: "2/7/25",
    type: "Friendly Match",
    home: "TN",
    homeName: "Team Name",
    away: "TN",
    awayName: "Team Name",
    homeScore: 1,
    awayScore: 4,
  },
  {
    id: 2,
    date: "15/3/25",
    type: "Kings League",
    home: "TN",
    homeName: "Team Name",
    away: "TN",
    awayName: "Team Name",
    homeScore: 1,
    awayScore: 4,
  },
  {
    id: 3,
    date: "2/7/25",
    type: "Friendly Match",
    home: "TN",
    homeName: "Team Name",
    away: "TN",
    awayName: "Team Name",
    homeScore: 1,
    awayScore: 4,
  },
];

export default function AdminHomeScreen() {
  return (
    <View className="flex-1">
      <ImageBackground source={require("@/assets/images/adminHeader.png")}>
        <SafeAreaView edges={["top"]}>
          <StatusBar style="auto" />
          <View className="px-[35px] pt-5 pb-6">
            <View className="flex flex-row items-center justify-between">
              <Text
                style={{ fontFamily: "Poppins_600SemiBold" }}
                className="text-white text-xs bg-[#FFFFFF33] rounded-[10px] p-[10px]"
              >
                Pitch Condition: Excellent
              </Text>
              <View className="flex flex-row items-center gap-2">
                <TouchableOpacity className="bg-[#FFFFFF33] py-2 px-2 rounded-[10px]">
                  <SettingsIcon width={16} height={16} color="#2D264B" />
                </TouchableOpacity>

                <TouchableOpacity className="bg-[#FFFFFF33] py-2 px-2 rounded-[10px]">
                  <Text>🌤️</Text>
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
        </SafeAreaView>
      </ImageBackground>
      <SafeAreaScreen className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 35 }}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText
            style={{ fontFamily: "Poppins_600SemiBold" }}
            className="text-black text-[15px] mb-5"
          >
            Recents
          </ThemedText>

          <View className="gap-4">
            {matches.map((match) => (
              <Recent
                key={match.id}
                date={match.date}
                type={match.type}
                homeTeam={match.home}
                awayTeam={match.away}
                awayTeamName={match.awayName}
                homeTeamName={match.homeName}
                homeScore={match.homeScore}
                awayScore={match.awayScore}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaScreen>
    </View>
  );
}
