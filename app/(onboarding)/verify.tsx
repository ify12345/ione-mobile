/* eslint-disable react/no-unescaped-entities */
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
  TextInput,
} from 'react-native';
import * as React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import Loader from '@/components/loader';
import { ThemedText } from '@/components/ThemedText';
import CustomButton from '@/components/ui/CustomButton';
import SafeAreaScreen from '@/components/SafeAreaScreen';
import { Colors } from '@/constants/Colors';
import { Icon } from '@/components/ui/Icon';

const { width } = Dimensions.get('screen');

export default function Verify() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { bottom } = useSafeAreaInsets();
  const [loading, setLoading] = React.useState(false);
  const [code, setCode] = React.useState(['', '', '', '', '']);
  const inputRefs = React.useRef<(TextInput | null)[]>([]);
  const router = useRouter();

  // ✅ Updated working auto-focus handler
  const handleCodeChange = (text: string, index: number) => {
    const numericText = text.replace(/[^0-9]/g, '');

    const newCode = [...code];
    newCode[index] = numericText;
    setCode(newCode);

    if (numericText && index < 4) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 10);
    }
  };

  // ✅ Backspace logic
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ✅ Clear Code
  const clearCode = () => {
    setCode(['', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <SafeAreaScreen className="mt-[52px]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 21,
          paddingBottom: 40,
          flexGrow: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <View className="mb-8 items-center">
            <Icon />
          </View>

          {/* Header */}
          <View className="mb-8 flex flex-col items-center gap-[5px]">
            <ThemedText
              lightColor={theme.text}
              darkColor={theme.text}
              className="mb-2 text-center text-[20px] font-[600]">
              Enter Verification Code
            </ThemedText>

            <ThemedText
              lightColor="#6C757D"
              darkColor="#9BA1A6"
              className="px-4 text-center text-base leading-6">
              A code has been sent to abc***@gmail.com
            </ThemedText>
          </View>

          {/* ✅ FIXED OTP INPUTS */}
          <View className="mb-8 mt-6 flex flex-row justify-between px-4">
            {[0, 1, 2, 3, 4].map((index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={{
                  height: 60,
                  width: 60,
                  borderWidth: 1,
                  borderRadius: 10,
                  textAlign: 'center',
                  fontSize: 24,
                  fontWeight: '700',
                  borderColor: code[index] ? '#00FF94' : '#D1D5DB',
                  backgroundColor: code[index] ? '#F0FFF4' : '#FFFFFF',
                  color: code[index] ? '#00FF94' : '#333',
                }}
                value={code[index]}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                editable={true}
                focusable={true}
                selectTextOnFocus
                blurOnSubmit={false}
              />
            ))}
          </View>
        </View>
        {/* Buttons */}
        <View className="">
          <View className="flex-1">
            <View className="flex flex-col gap-[10px]">
              <CustomButton
                primary
                title="Verify Code"
                onPress={() => router.push('/resetpassword')}
              />

              <View className="mt-3 items-center">
                <TouchableWithoutFeedback onPress={() => router.push('/(onboarding)')}>
                  <View className="flex-row items-center">
                    <ThemedText lightColor="#6C757D" darkColor="#9BA1A6" className="text-base">
                      Didn't receive any code?
                    </ThemedText>

                    <ThemedText
                      lightColor="#46BB1C"
                      darkColor="#46BB1C"
                      className="ml-1 text-base font-semibold">
                      Resend code
                    </ThemedText>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Loader visible={loading} />
    </SafeAreaScreen>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 130,
    height: 60,
  },
});
