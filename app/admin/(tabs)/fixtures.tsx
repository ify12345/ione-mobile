import CalendarIcon from "@/assets/svg/CalendarIcon";
import CloseIcon from "@/assets/svg/CloseIcon";
import OpenIcon from "@/assets/svg/OpenIcon";
import PlusIcon from "@/assets/svg/PlusIcon";
import Approved from "@/components/Approved";
import Pending from "@/components/Pending";
import Polygon from "@/components/Polygon";
import SafeAreaScreen from "@/components/SafeAreaScreen";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";

type DateItem = {
  id: number;
  dateNumber: string;
  dayName: string;
  isToday: boolean;
};

type Team = {
  name: string;
  code: string;
};

type Match = {
  id: string;
  time: string;
  teams: Team[];
  minute?: string;
  scores: [number | string, number | string];
};

type Competition = {
  id: string;
  title: string;
  code: string;
  matches: Match[];
};

export default function AdminFixturesScreen() {
  const [dates, setDates] = useState<DateItem[]>([]);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved">(
    "all",
  );
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newDates: DateItem[] = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dayNum = date.getDate();
      const isToday = date.getTime() === today.getTime();

      newDates.push({
        id: date.getTime(),
        dateNumber: `${dayNum}`,
        dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
        isToday,
      });
    }

    setDates(newDates);
  }, []);

  const DropdownIcon = ({ isExpanded }: { isExpanded: boolean }) => (
    <View className="p-1">
      <Text className="text-base text-gray-500">
        {isExpanded ? <CloseIcon /> : <OpenIcon />}
      </Text>
    </View>
  );

  const toggleCompetition = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const competitions: Competition[] = [
    {
      id: "vi",
      title: "Victoria Island Cup",
      code: "VI",
      matches: [
        {
          id: "1",
          time: "14:00",
          teams: [
            { name: "Team Name", code: "TN" },
            { name: "Team Name", code: "TN" },
          ],
          minute: "85'",
          scores: [2, 0],
        },
        {
          id: "2",
          time: "16:30",
          teams: [
            { name: "Team Name", code: "TN" },
            { name: "Team Name", code: "TN" },
          ],
          scores: ["?", "?"],
        },
        {
          id: "3",
          time: "18:00",
          teams: [
            { name: "Team Name", code: "TN" },
            { name: "Team Name", code: "TN" },
          ],
          //   minute: "85'",
          scores: ["?", "?"],
        },
      ],
    },
    {
      id: "ogidan",
      title: "Ogidan Friendlies",
      code: "VI",
      matches: [
        {
          id: "4",
          time: "12:00",
          teams: [
            { name: "Alpha FC", code: "AF" },
            { name: "Beta FC", code: "BF" },
          ],
          minute: "45'",
          scores: [1, 1],
        },
        {
          id: "5",
          time: "15:00",
          teams: [
            { name: "Gamma FC", code: "GF" },
            { name: "Delta FC", code: "DF" },
          ],
          minute: "60'",
          scores: [0, 3],
        },
        {
          id: "6",
          time: "18:00",
          teams: [
            { name: "Epsilon FC", code: "EF" },
            { name: "Zeta FC", code: "ZF" },
          ],
          scores: ["?", "?"],
        },
      ],
    },
    {
      id: "lekki",
      title: "Lekki Phase 2 Cup",
      code: "VI",
      matches: [
        {
          id: "4",
          time: "12:00",
          teams: [
            { name: "Alpha FC", code: "AF" },
            { name: "Beta FC", code: "BF" },
          ],
          minute: "45'",
          scores: [1, 1],
        },
        {
          id: "5",
          time: "15:00",
          teams: [
            { name: "Gamma FC", code: "GF" },
            { name: "Delta FC", code: "DF" },
          ],
          minute: "60'",
          scores: [0, 3],
        },
        {
          id: "6",
          time: "18:00",
          teams: [
            { name: "Epsilon FC", code: "EF" },
            { name: "Zeta FC", code: "ZF" },
          ],
          scores: ["?", "?"],
        },
      ],
    },
  ];

  const CalendarPolygon = ({
    date,
    day,
    isActive,
    isToday,
  }: {
    date: string;
    day: string;
    isActive: boolean;
    isToday: boolean;
  }) => (
    <TouchableOpacity className="items-center gap-1">
      <View className="h-[51px] w-[51px] items-center justify-center">
        {isActive ? (
          <View className="relative h-full w-full">
            <Image
              source={require("@/assets/images/activepolygon.png")}
              resizeMode="contain"
              className="h-full w-full"
            />
            <View className="absolute inset-0 items-center justify-center">
              <Text className="text-base font-semibold text-black">{date}</Text>
            </View>
          </View>
        ) : (
          <View className="relative h-full w-full">
            <Image
              source={require("@/assets/images/inactivepolygon.png")}
              resizeMode="contain"
              className="h-full w-full"
            />
            <View className="absolute inset-0 items-center justify-center">
              <Text className="text-base font-semibold text-[#929292]">
                {date}
              </Text>
            </View>
          </View>
        )}
      </View>
      <ThemedText
        lightColor={theme.text}
        darkColor={theme.text}
        className="px-4 text-center text-base leading-6 text-black"
      >
        {day}
      </ThemedText>
      {isToday && (
        <Text className="text-xs font-medium text-[#00FF94]">Today</Text>
      )}
    </TouchableOpacity>
  );

  const MatchRow = ({
    match,
    showTopBorder,
  }: {
    match: Match;
    showTopBorder?: boolean;
  }) => {
    return (
      <View
        className={`flex flex-row justify-between py-4 items-center ${
          showTopBorder ? "border-t border-[#DFDFDF]" : ""
        }`}
      >
        {/* Time */}
        <View className="px-2 border-r border-[#DFDFDF] self-stretch justify-center">
          <Text className="-rotate-90">{match.time}</Text>
        </View>

        {/* Teams */}
        <View className="flex flex-col gap-[3px] pl-5">
          {match.teams.map((team, index) => (
            <View key={index} className="flex flex-row gap-2 items-center">
              <Polygon size={30} teamCode={team.code} />
              <Text
                style={{ fontFamily: "Poppins_400Regular" }}
                className="text-sm"
              >
                {team.name}
              </Text>
            </View>
          ))}
        </View>

        {/* Minute */}
        {match.minute && (
          <Text
            className="text-xs"
            style={{ fontFamily: "Poppins_400Regular" }}
          >
            {match.minute}
          </Text>
        )}

        {/* Score */}
        <View className="flex flex-col gap-[14px] border-l border-[#DFDFDF] px-8 self-stretch justify-center">
          <Text>{match.scores[0]}</Text>
          <Text>{match.scores[1]}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaScreen className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          flexGrow: 1,
        }}
      >
        <View className="py-6 px-[35px]">
          <View className="mb-6 flex-row items-center justify-between">
            <ThemedText
              style={{ fontFamily: "Poppins_600SemiBold" }}
              className="text-xl text-black"
            >
              Match schedule
            </ThemedText>
            <CalendarIcon />
          </View>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-2 pb-2"
          >
            <View className="flex-row gap-3">
              {dates.map((item) => (
                <CalendarPolygon
                  key={item.id}
                  date={item.dateNumber}
                  day={item.dayName}
                  isActive={item.isToday}
                  isToday={item.isToday}
                />
              ))}
            </View>
          </ScrollView>
        </View>
        <View className="w-full border-t-[1px] border-[#EDEDED]"></View>

        <View className="mt-[18px] px-[32px]">
          <TouchableOpacity className="flex w-full flex-row items-center justify-between rounded-[5px] border border-[#7D7D7D] px-[21px] py-[15px]">
            <Text className="text-base text-[#696969]">New game? </Text>
            <PlusIcon />
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-[6px] px-[35px] mt-[13px] mb-5">
          {(["all", "pending", "approved"] as const).map((tab) => (
            <TouchableWithoutFeedback
              key={tab}
              onPress={() => setActiveTab(tab)}
            >
              <View
                className={`
                          rounded px-4 py-[9px]
                          ${activeTab === tab ? "bg-[#00FF94]" : "bg-[#ECECEC]"}
                        `}
              >
                <Text
                  style={{ fontFamily: "Poppins_600SemiBold" }}
                  className={`
                            text-sm font-[600]
                            ${activeTab === tab ? "text-black" : "text-[#929292]"}
                          `}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>

        {activeTab === "all" && (
          <View className="mt-[33px] px-[35px] gap-4">
            {competitions.map((comp) => {
              const isExpanded = expanded[comp.id];

              return (
                <View
                  key={comp.id}
                  style={{
                    shadowColor: "#939393",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                  className="bg-[#F3FFFA] border border-[#DFDFDF] rounded-[5px]"
                >
                  {/* HEADER */}
                  <TouchableOpacity
                    onPress={() => toggleCompetition(comp.id)}
                    className={`flex flex-row justify-between items-center pl-7 pr-4 pt-[17px] pb-[20px] ${
                      isExpanded ? "border-b border-[#DFDFDF]" : ""
                    }`}
                  >
                    <View className="flex flex-row items-center gap-6">
                      <View className="relative h-10 w-10">
                        <Image
                          source={require("@/assets/images/activepolygon.png")}
                          resizeMode="contain"
                          className="h-10 w-10"
                        />
                        <View className="absolute inset-0 items-center justify-center">
                          <Text style={{ fontFamily: "Poppins_400Regular" }}>
                            {comp.code}
                          </Text>
                        </View>
                      </View>

                      <ThemedText
                        style={{ fontFamily: "Poppins_600SemiBold" }}
                        className="text-sm"
                      >
                        {comp.title}
                      </ThemedText>
                    </View>

                    <View className="relative justify-center self-stretch px-[16px]">
                      <View className="absolute bottom-[-20px] left-0 top-[-18px] border-l border-[#DFDFDF]" />
                      <DropdownIcon isExpanded={!!isExpanded} />
                    </View>
                  </TouchableOpacity>

                  {/* BODY */}
                  {isExpanded &&
                    comp.matches.map((match, index) => (
                      <MatchRow
                        key={match.id}
                        match={match}
                        showTopBorder={index !== 0}
                      />
                    ))}
                </View>
              );
            })}
          </View>
        )}
        {activeTab === "pending" && <Pending />}
        {activeTab === "approved" && <Approved />}
      </ScrollView>
    </SafeAreaScreen>
  );
}
