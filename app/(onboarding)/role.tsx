/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/order */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-dynamic-require */
import {
  Dimensions,
  View,
  TouchableWithoutFeedback,
  useColorScheme,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import CustomButton from '@/components/ui/CustomButton';
import { useRouter } from 'expo-router';
import SafeAreaScreen from '@/components/SafeAreaScreen';
import { Colors } from '@/constants/Colors';
import BallIcon from '@/assets/svg/BallIcon';
import { Icon } from '@/components/ui/Icon';

const { width } = Dimensions.get('screen');

export default function Role() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  return (
    <SafeAreaScreen className="flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 21, paddingBottom: 40 }}>
        {/* Logo */}
        <View className="mb-8 mt-10 items-end">
         <Icon/>
        </View>

        {/* Header */}
        <View className="mb-8 items-start">
          <ThemedText
            lightColor={theme.text}
            darkColor={theme.text}
            type="defaultSemiBold"
            className="mb-2 text-center text-[17px] font-[300]">
            How Do You Want to Join?
          </ThemedText>
          <ThemedText
            lightColor={theme.text}
            darkColor={theme.text}
            // type="medium"
            className="mb-2 text-center text-[17px] font-[300]">
            Choose your role for the best experience in the app!
          </ThemedText>
        </View>
        <View className="mt-4 flex flex-col gap-[22px]">
          {/* Player Option */}
          <TouchableWithoutFeedback 
            onPress={() => handleRoleSelect('player')}
          >
            <View style={[
              styles.roleOption,
              { 
                borderColor: selectedRole === 'player' ? '#00FF94' : '#0C4D2E'
              }
            ]}>
              <View className='flex flex-row gap-[9px]'>
                <BallIcon />
                <View className='flex flex-col gap-[4px] flex-1'> 
                  <ThemedText
                    lightColor={theme.text}
                    darkColor={theme.text}
                    className="text-[16px] font-[600]">
                    As a player
                  </ThemedText>
                  <ThemedText
                    lightColor={theme.text}
                    darkColor={theme.text}
                    className="max-w-[280px] leading-[15px] text-[12px] font-[400] text-[#00000080]">
                    Perfect for those who just want to play and find teams without managing matches!
                  </ThemedText>
                </View>
                <View style={[
                  styles.radioCircle,
                  selectedRole === 'player' && styles.radioCircleSelected
                ]}>
                  {selectedRole === 'player' && <View style={styles.radioInnerCircle} />}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>

          {/* Organizer/Admin Option */}
          <TouchableWithoutFeedback 
            onPress={() => handleRoleSelect('organizer')}
          >
            <View style={[
              styles.roleOption,
              { 
                borderColor: selectedRole === 'organizer' ? '#00FF94' : '#0C4D2E'
              }
            ]}>
              <View className='flex flex-row gap-[9px]'>
                <BallIcon />
                <View className='flex flex-col gap-[4px] flex-1'> 
                  <ThemedText
                    lightColor={theme.text}
                    darkColor={theme.text}
                    className="text-[16px] font-[600]">
                    As an Organizer / Admin
                  </ThemedText>
                  <ThemedText
                    lightColor={theme.text}
                    darkColor={theme.text}
                    className="max-w-[280px] leading-[15px] text-[12px] font-[400] text-[#00000080]">
                    Ideal for those who want to organize games schedule and recruit players!
                  </ThemedText>
                </View>
                <View style={[
                  styles.radioCircle,
                  selectedRole === 'organizer' && styles.radioCircleSelected
                ]}>
                  {selectedRole === 'organizer' && <View style={styles.radioInnerCircle} />}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View className='mt-[300px]'>
   <CustomButton  primary title="Start Using the App " onPress={() => router.push('/signup')} />
    </View>
        {/* Continue Button (Optional) */}
      </ScrollView>
    </SafeAreaScreen>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 20,
  },
  roleOption: {
    height: 92,
    borderRadius: 10,
    borderWidth: 1,
    padding: 16,
    borderColor: '#0C4D2E',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0C4D2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: '#00FF94',
  },
  radioInnerCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00FF94',
  },
});

const styles2 = StyleSheet.create({
  man: {
    width: 412,
    height: 412,
  },
});