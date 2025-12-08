import React from 'react';
import { View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width - 70;

const ShimmerCarousel = () => {
  return (
    <View className="flex-row">
      {[1, 2].map((_, i) => (
        <View
          key={i}
          style={{ width: CARD_WIDTH, height: height * 0.2 }}
          className="rounded-[8px] overflow-hidden mr-4 bg-gray-300/30"
        >
          <LinearGradient
            colors={['#d1d1d1', '#e6e6e6', '#d1d1d1']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ flex: 1 }}
          />
        </View>
      ))}
    </View>
  );
};

export default ShimmerCarousel;
