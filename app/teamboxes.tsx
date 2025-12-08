import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

export default function TeamBoxes() {
  const tags = ["T1", "T2", "T3", "T4", "T5"];
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <View className="px-[32px] flex flex-row w-full justify-between">
      {tags.map((item, index) => {
        const isActive = selected === index;

        return (
          <Pressable
            key={index}
            onPress={() => setSelected(isActive ? null : index)}
            className={`w-[30px] h-[30px]  items-center justify-center ${
              isActive ? "bg-[#00FF94]" : "bg-[#E4E4E4]"
            }`}
          >
            <Text className="text-[12px] font-[600]">{item}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
