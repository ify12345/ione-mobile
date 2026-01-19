import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons'; 

interface CustomCheckboxProps {
  checked: boolean;
  onToggle: () => void;
  label: string;
  required?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onToggle,
  label,
  required = false,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onToggle}>
      <View className="flex flex-row items-start gap-3">
        {/* Checkbox container */}
        <View
          className={`h-6 w-6 rounded-md border-2 items-center justify-center ${
            checked 
              ? 'bg-[#00FF94] border-[#00FF94]' 
              : 'bg-white border-gray-400'
          }`}>
          {/* Checkmark icon */}
          {checked && (
            <Ionicons name="checkmark" size={16} color="white" />
          )}
        </View>
        
        {/* Label */}
        <View className="flex-1">
          <ThemedText className="text-sm">
            {required && <ThemedText className="text-red-500">* </ThemedText>}
            {label}
          </ThemedText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomCheckbox;