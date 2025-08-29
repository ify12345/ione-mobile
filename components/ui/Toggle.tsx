import React, { useState } from 'react';
import { TouchableOpacity, View, Animated } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface ToggleProps {
  isOn: boolean;
  onToggle: (value: boolean) => void;
  size?: 'small' | 'medium' | 'large';
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
  disabled?: boolean;
  label?: string;
  labelPosition?: 'left' | 'right';
}

export function Toggle({
  isOn,
  onToggle,
  size = 'medium',
  activeColor = '#46BB1C', 
  inactiveColor = '#D9D9D9', 
  thumbColor = '#ffffff',
  disabled = false,
  label,
  labelPosition = 'right'
}: ToggleProps) {
  const [animation] = useState(new Animated.Value(isOn ? 1 : 0));

  const handleToggle = () => {
    if (disabled) return;
    
    const newValue = !isOn;
    onToggle(newValue);
    
    Animated.timing(animation, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  // Size configurations
  const sizeConfig = {
    small: {
      width: 38,
      height: 18,
      thumbSize: 14,
      padding: 2,
    },
    medium: {
      width: 52,
      height: 28,
      thumbSize: 24,
      padding: 2,
    },
    large: {
      width: 60,
      height: 32,
      thumbSize: 28,
      padding: 2,
    }
  };

  const config = sizeConfig[size];
  const thumbTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [config.padding, config.width - config.thumbSize - config.padding],
  });

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  const ToggleComponent = (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleToggle}
      disabled={disabled}
      className={`rounded-full justify-center ${disabled ? 'opacity-50' : ''}`}
      style={{
        width: config.width,
        height: config.height,
      }}
    >
      <Animated.View
        className="rounded-full justify-center"
        style={{
          backgroundColor,
          width: config.width,
          height: config.height,
        }}
      >
        <Animated.View
          className="rounded-full shadow-sm"
          style={{
            width: config.thumbSize,
            height: config.thumbSize,
            backgroundColor: thumbColor,
            transform: [{ translateX: thumbTranslateX }],
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );

  if (!label) {
    return ToggleComponent;
  }

  return (
    <View className={`flex-row items-center gap-3 ${labelPosition === 'right' ? '' : 'flex-row-reverse'}`}>
      {ToggleComponent}
      <ThemedText className={`${disabled ? 'opacity-50' : ''}`}>
        {label}
      </ThemedText>
    </View>
  );
}

// Example usage component
export function ToggleExample() {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(true);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(true);

  return (
    <View className="p-6 gap-6">
      <ThemedText className="text-xl font-bold mb-4">Toggle Examples</ThemedText>
      
      {/* Basic toggles */}
      <Toggle
        isOn={toggle1}
        onToggle={setToggle1}
      />
      
      {/* With label */}
      <Toggle
        isOn={toggle2}
        onToggle={setToggle2}
        label="Enable notifications"
      />
      
      {/* Different sizes */}
      <View className="gap-3">
        <Toggle
          isOn={toggle3}
          onToggle={setToggle3}
          size="small"
          label="Small toggle"
        />
        
        <Toggle
          isOn={toggle4}
          onToggle={setToggle4}
          size="large"
          label="Large toggle"
        />
      </View>
      
      {/* Custom colors */}
      <Toggle
        isOn={toggle1}
        onToggle={setToggle1}
        activeColor="#3b82f6" // blue
        label="Custom blue toggle"
      />
      
      {/* Disabled state */}
      <Toggle
        isOn={true}
        onToggle={() => {}}
        disabled={true}
        label="Disabled toggle"
      />
      
      {/* Label on left */}
      <Toggle
        isOn={toggle2}
        onToggle={setToggle2}
        label="Label on left"
        labelPosition="left"
      />
    </View>
  );
}