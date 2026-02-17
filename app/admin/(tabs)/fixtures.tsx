import SafeAreaScreen from "@/components/SafeAreaScreen";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { View } from "react-native";

export default function AdminFixturesScreen() {
  return (
   <SafeAreaScreen className="flex-1">
    <View className="py-6 px-[35px]">
       <ThemedText className="text-black text-3xl">Fixtures!!!!!!!!!</ThemedText>
    </View>
   </SafeAreaScreen>
  )
}
