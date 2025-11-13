import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Pressable,
  Modal,
} from 'react-native';
import SafeAreaScreen from '@/components/SafeAreaScreen';
import { ThemedText } from '@/components/ThemedText';
import CustomButton from '@/components/ui/CustomButton';
import { push } from 'expo-router/build/global-state/routing';
import { Colors } from '@/constants/Colors';
import InputField from '@/components/InputField';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function NewSession() {
  const [selectedOptions, setSelectedOptions] = useState({
    duration: '1',
    players: '2',
    rounds: '3',
  });

  const [showPicker, setShowPicker] = useState({
    duration: false,
    players: false,
    rounds: false,
  });

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  // Options for each select input
  const options = {
    duration: Array.from({ length: 10 }, (_, i) => ({ value: (i + 1).toString() })),
    players: Array.from({ length: 8 }, (_, i) => ({ value: (i + 2).toString() })), // 2-9 players
    rounds: Array.from({ length: 5 }, (_, i) => ({ value: (i + 1).toString() })), // 1-5 rounds
  };

  // Custom right icon component for each input
  const CustomRightIcon: React.FC<{ value: string }> = ({ value }) => (
    <View className="absolute right-2 flex-row items-center gap-2">
      <View className="rounded-md border border-[#00000080] px-[10px] py-[7px]">
        <Text className="text-[11px] font-medium text-black">{value}</Text>
      </View>
      <Ionicons name="chevron-down" size={16} color="gray" />
    </View>
  );

  type PickerField = 'duration' | 'players' | 'rounds';

  const handleOptionSelect = (field: PickerField, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [field]: value,
    }));
    setShowPicker((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const togglePicker = (field: PickerField) => {
    setShowPicker((prev) => ({
      duration: false,
      players: false,
      rounds: false,
      [field]: !prev[field],
    }));
  };

  return (
    <SafeAreaScreen>
      <ScrollView
        className="mb-[40px] h-full flex-1 py-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          paddingHorizontal: 32,
          flexGrow: 1,
        }}>
        <View className="flex flex-row items-center justify-between">
          <Pressable onPress={() => router.back()}>
            <ThemedText
              lightColor={theme.text}
              darkColor={theme.text}
              className="text-[16px] font-[500] text-black">
              Back
            </ThemedText>
          </Pressable>

          <ThemedText
            lightColor={theme.text}
            darkColor={theme.text}
            className="text-[20px] font-[600] text-black">
            New Session
          </ThemedText>
          <Text className="text-[16px] font-[500] text-[#0C4D2E]">Next</Text>
        </View>
        <View className="mt-[19px] flex w-full flex-col items-center gap-2 rounded-[4px] bg-[#03EA8926] px-[17px] py-[21px] text-center ">
          <ThemedText darkColor={theme.text} className="text-[14px] text-[#0C4D2E]">
            You are officially the captain of this ball session!
          </ThemedText>
          <ThemedText darkColor={theme.text} className="text-[11px] text-[#0C4D2E]">
            You have [timer] before your Session is cancelled
          </ThemedText>
          <ThemedText darkColor={theme.text} className="text-[11px] text-[#0C4D2E]">
            Team Names Will Be Assigned Randomly
          </ThemedText>
        </View>
        <View className="mt-[29px]">
          <InputField
            required
            label="Location"
            autoCapitalize="none"
            placeholder="Location"
            value=""
          />
          <InputField
            required
            label="Tournament Name"
            autoCapitalize="none"
            placeholder="Tournament Name"
            value=""
          />

          {/* Duration Select Input */}
          <View className=" relative">
            <InputField
              selectPicker
              required
              label="Total Minutes per Match"
              autoCapitalize="none"
              placeholder=" Total Minutes per Match"
              value=""
              pickerPressed={() => togglePicker('duration')}
              rightIcon={<CustomRightIcon value={selectedOptions.duration} />}
            />

            {showPicker.duration && (
              <View className="absolute right-[30px] top-[50%] z-10 mt-7 max-h-40 w-[40px] rounded-lg border border-gray-300 bg-white shadow-lg">
                <ScrollView className="max-h-40">
                  {options.duration.map((option, index) => (
                    <TouchableOpacity
                      key={option.value}
                      className={`px-2 py-2 ${
                        index !== options.duration.length - 1 ? 'border-b border-gray-200' : ''
                      } ${selectedOptions.duration === option.value ? 'bg-blue-50' : ''}`}
                      onPress={() => handleOptionSelect('duration', option.value)}>
                      <Text
                        className={`text-center ${
                          selectedOptions.duration === option.value
                            ? 'font-medium text-blue-600'
                            : 'text-gray-700'
                        }`}>
                        {option.value}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Players Select Input */}
          <View className=" relative">
            <InputField
              selectPicker
              required
              label="Number Of Players per Team"
              autoCapitalize="none"
              placeholder="Number Of Players per Team"
              value=""
              pickerPressed={() => togglePicker('players')}
              rightIcon={<CustomRightIcon value={selectedOptions.players} />}
            />

            {showPicker.players && (
              <View className="absolute right-[30px] top-[50%] z-10 mt-7 max-h-40 w-[40px] rounded-lg border border-gray-300 bg-white shadow-lg">
                <ScrollView className="max-h-40">
                  {options.players.map((option, index) => (
                    <TouchableOpacity
                      key={option.value}
                      className={`px-2 py-2 ${
                        index !== options.players.length - 1 ? 'border-b border-gray-200' : ''
                      } ${selectedOptions.players === option.value ? 'bg-blue-50' : ''}`}
                      onPress={() => handleOptionSelect('players', option.value)}>
                      <Text
                        className={`text-center ${
                          selectedOptions.players === option.value
                            ? 'font-medium text-blue-600'
                            : 'text-gray-700'
                        }`}>
                        {option.value}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Rounds Select Input */}
          <View className=" relative">
            <InputField
              selectPicker
              required
              label="Number Of Teams"
              autoCapitalize="none"
              placeholder="Number Of Teams"
              value=""
              pickerPressed={() => togglePicker('rounds')}
              rightIcon={<CustomRightIcon value={selectedOptions.rounds} />}
            />

            {showPicker.rounds && (
              <View className="absolute right-[30px] top-[50%] z-10 mt-7 max-h-40 w-[40px] rounded-lg border border-gray-300 bg-white shadow-lg">
                <ScrollView className="max-h-40">
                  {options.rounds.map((option, index) => (
                    <TouchableOpacity
                      key={option.value}
                      className={`px-2 py-2 ${
                        index !== options.rounds.length - 1 ? 'border-b border-gray-200' : ''
                      } ${selectedOptions.rounds === option.value ? 'bg-blue-50' : ''}`}
                      onPress={() => handleOptionSelect('rounds', option.value)}>
                      <Text
                        className={`text-center ${
                          selectedOptions.rounds === option.value
                            ? 'font-medium text-blue-600'
                            : 'text-gray-700'
                        }`}>
                        {option.value}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
        {/* Display selected values for testing */}
      </ScrollView>
    </SafeAreaScreen>
  );
}
