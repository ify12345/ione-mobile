import BackIcon from "@/assets/svg/BackIcon";
import DocumentIcon from "@/assets/svg/DocumentIcon";
import OpenIcon from "@/assets/svg/OpenIcon";
import SafeAreaScreen from "@/components/SafeAreaScreen";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Player = {
  id: number;
  name: string;
  number: number;
};

export default function SetofLegends() {
  const players: Player[] = [
    { id: 1, name: "Player Name", number: 7 },
    { id: 2, name: "Player Name", number: 10 },
    { id: 3, name: "Player Name", number: 4 },
    { id: 4, name: "Player Name", number: 11 },
    { id: 5, name: "Player Name", number: 9 },
    { id: 6, name: "Player Name", number: 3 },
    { id: 7, name: "Player Name", number: 6 },
    { id: 8, name: "Player Name", number: 2 },
  ];

  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "lineups" | "squad list" | "queue"
  >("lineups");

  const PlayerRow = ({ player }: { player: Player }) => {
    return (
      <View className="flex-row items-center gap-2 py-4 border-b border-[#6BF8BD] bg-[#EDFFF8] pl-4">
        <View className="flex-row items-center gap-4">
          <Text
            style={{ fontFamily: "Poppins_600SemiBold" }}
            className="text-base text-black"
          >
            {player.number}
          </Text>
          <View className="h-[43px] w-[43px] rounded-full bg-black items-center justify-center">
            <Text className="text-white text-lg">--</Text>
          </View>
        </View>

        <View>
          <Text
            style={{ fontFamily: "Poppins_400Regular" }}
            className="text-sm text-black"
          >
            {player.name}
          </Text>
        </View>
      </View>
    );
  };

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
          <View className="flex flex-row items-center justify-between">
            <TouchableOpacity onPress={() => router.push("/admin")}>
              <BackIcon />
            </TouchableOpacity>
            <Text
              style={{ fontFamily: "Poppins_600SemiBold" }}
              className="text-xl items-center text-black"
            >
              Set Of Legends
            </Text>
            <OpenIcon />
          </View>
          <View className="items-center">
            <Text>Tiger Sports Sangotedo, Lagos</Text>
            <Text>Tue, Mar 19</Text>
          </View>
          <View className="items-center mt-2 gap-2">
            <TouchableOpacity className="bg-[#00FF94] rounded-[5px] px-2 py-[10px]">
              <Text
                style={{ fontFamily: "Poppins_400Regular" }}
                className="text-black"
              >
                Copy Session Link
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/admin/joinsession")}
              className="bg-[#00FF94] rounded-[5px] px-2 py-[10px]"
            >
              <Text
                style={{ fontFamily: "Poppins_400Regular" }}
                className="text-black"
              >
                Join Session
              </Text>
            </TouchableOpacity>
          </View>

          <View className="border-[#EDEDED] border-t border-b py-5 flex flex-row justify-between items-center mt-[25px] mb-5">
            <View className="flex-row gap-[17px]">
              {(["lineups", "squad list", "queue"] as const).map((tab) => (
                <TouchableWithoutFeedback
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                >
                  <View>
                    <Text
                      style={{ fontFamily: "Poppins_600SemiBold" }}
                      className={`text-[15px] pb-2 ${activeTab === tab ? "text-black border-b-[2px] border-[#00FF94]" : "text-[#929292]"}`}
                    >
                      {tab
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
            <DocumentIcon />
          </View>
          {activeTab === "squad list" && (
            <View className="mt-7">
              {players.map((player) => (
                <PlayerRow key={player.id} player={player} />
              ))}
            </View>
          )}
          {activeTab === "queue" && (
            <View className="mt-7">
              {players.map((player) => (
                <PlayerRow key={player.id} player={player} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaScreen>
  );
}
