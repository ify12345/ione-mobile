import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function PlayerInfoCard({ name, image, role }: { name?: string; image?: string; role?: string }) {
  return (
    <TouchableOpacity className="mx-[31px] flex flex-row items-center justify-between border-b-[2px] border-[#6BF8BD] bg-[#EDFFF8] px-[16px] py-[13px]">
      {/* Left: Image + Name */}
      <View className="flex flex-row items-center gap-[12px]">
        <View className="flex flex-row gap-[15px] items-center">
          <View>
            {' '}
            <Text className='font-[600] text-[13px]'>1</Text>
          </View>
          <View className="h-[40px] w-[40px] rounded-full bg-black"> </View>
        </View>
        <ThemedText className="text-[15px] font-[500] text-black">{name}</ThemedText>
      </View>
    </TouchableOpacity>
  );
}
