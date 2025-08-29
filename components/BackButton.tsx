import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { useRouter } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  spacer: {
    width: 40, // Same width as button to center the title
  }
});

type Props = {
  title?: string;
  showTitle?: boolean;
};

export default function BackButton({ title, showTitle = true }: Props) {
  const router = useRouter();
  
  const onPress = () => {
    router.back();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        className='bg-white size-7 justify-center items-center shadow-md dark:bg-primary'
        activeOpacity={0.7}
      >
        <AntDesign name="arrowleft" size={20} color="#333333" />
      </TouchableOpacity>

      {showTitle && title && (
        <View style={styles.titleContainer}>
          <ThemedText type="defaultSemiBold" className='font-bold text-lg'>
            {title}
          </ThemedText>
        </View>
      )}

      <View style={styles.spacer} />
    </View>
  );
}