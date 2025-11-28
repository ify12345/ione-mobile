import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import SafeAreaScreen from '@/components/SafeAreaScreen';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

import RightArrrow from '@/assets/svg/RightArrow';
import OpenIcon from '@/assets/svg/OpenIcon';
import PitchIcon from '@/assets/svg/PitchSvg';
import PlayerInfoCard from './playerinfocard';
import BackIcon from '@/assets/svg/BackIcon';

export default function JoinSession() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [showDetails, setShowDetails] = useState(false);

  return (
    <SafeAreaScreen>
      <ScrollView
        className="mb-[40px] h-full flex-1 py-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          flexGrow: 1,
        }}>
        <View className="flex flex-col gap-[31px]  ">
          <View className="mx-[32px] flex flex-col gap-[31px]">
            <View className="w-full rounded-[10px] border-[1px] border-[#43B75D] bg-[#ECF8EF] p-[16px]">
              <View className="flex flex-col gap-[4px]">
                <ThemedText
                  lightColor="#6C757D"
                  darkColor="#9BA1A6"
                  className="text-[14px] font-[600] leading-[24px]  text-black">
                  Waiting For Captain
                </ThemedText>
                <Text className="text-[11px] text-[#6D717F]">
                  {' '}
                  [Player Name] has joined your session
                </Text>
              </View>
            </View>

            <View>
              <View className="flex flex-row items-center justify-between">
                <View>
                  <BackIcon />
                </View>

                <View>
                  <ThemedText
                    lightColor={theme.text}
                    darkColor={theme.text}
                    className="text-[20px]  font-[600]">
                    Set Of Legends
                  </ThemedText>
                </View>

                {/* 👇 ONLY THIS ICON OPENS DROPDOWN */}
                <TouchableOpacity
                  onPress={() => setShowDetails(true)}
                  activeOpacity={0.6}
                >
                  <OpenIcon />
                </TouchableOpacity>
              </View>

              <View className="mt-[5px] flex w-full flex-col items-center justify-center gap-[2px] text-center">
                <ThemedText
                  lightColor={theme.text}
                  darkColor={theme.text}
                  className="text-[13px] font-[400]  text-black">
                  Tiger Sports Sangotedo, Lagos
                </ThemedText>
                <ThemedText
                  lightColor={theme.text}
                  darkColor={theme.text}
                  className="text-[13px] font-[400]  text-black">
                  Tue, Mar 19
                </ThemedText>
              </View>

              <View className="mx-auto mt-[45px]">
                <TouchableOpacity className="flex w-[100px]  items-center justify-center rounded-[5px] bg-[#00FF94] p-[10px] text-[10px] font-[400]">
                  <Text>Join session</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="flex flex-row items-center justify-between border-b-[1px] border-t-[1px] border-[#5c5a5a8a] px-[31px] py-[21px]">
            <View className="flex flex-row gap-[17px]">
              <ThemedText
                lightColor={theme.text}
                darkColor={theme.text}
                className="text-[15px] font-[500]  text-black">
                Lineups
              </ThemedText>
              <ThemedText
                lightColor={theme.text}
                darkColor={theme.text}
                className="text-[15px] font-[500]  text-black">
                Squad List
              </ThemedText>
            </View>
            <View><PitchIcon/></View>
          </View>

          {/* 👇 PLAYER CARDS */}
          <PlayerInfoCard name="David" />
          <PlayerInfoCard name="Ayo" />
          <PlayerInfoCard name="Bola" />
          <PlayerInfoCard name="Bola" />
        </View>
      </ScrollView>

     
      {showDetails && (
        <>
        
          <Pressable
            onPress={() => setShowDetails(false)}
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
             
            }}
          />

          {/* DROPDOWN PANEL */}
          <View
            style={{
              position: "absolute",
              top: 250, // adjust if needed
              left: 0,
              right: 0,
              zIndex: 300,
            }}
            className="rounded-[10px]  bg-[#F2F2F2] px-[31px] py-[40px] shadow-lg"
          >
            <View className="mb-[17px] flex flex-row justify-between">
              <Text className="text-[14px] text-[#2A2A2A]"> Duration: </Text>
              <Text className="text-[14px] font-[600] text-black">2 hours</Text>
            </View>

            <View className="mb-[17px] flex flex-row justify-between">
              <Text className="text-[14px] text-[#2A2A2A]"> Duration per match:</Text>
              <Text className="text-[14px] font-[600] text-black">Golden Goal</Text>
            </View>

            <View className="flex  flex-row justify-between">
              <Text className="text-[14px] text-[#2A2A2A]"> Winning decider:</Text>
              <Text className="text-[14px] font-[600] text-black">Shootout</Text>
            </View>
          </View>
        </>
      )}
    </SafeAreaScreen>
  );
}
