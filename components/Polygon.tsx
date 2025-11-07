'use client';

import React from 'react';
import { ImageBackground } from 'react-native';
import { ThemedText } from './ThemedText';

type PolygonProps = {
  teamCode: string;
  size?: number;
};

const Polygon: React.FC<PolygonProps> = ({ teamCode, size = 48 }) => {
    const imageSource = require('@/assets/images/polygon.png')
  return (
    <ImageBackground
      source={imageSource}
      resizeMode="contain"
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ThemedText className="text-white font-bold text-base">
        {teamCode}
      </ThemedText>
    </ImageBackground>
  );
};

export default Polygon;
