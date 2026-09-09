import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface MultiSelectChipProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  maxSelection?: number;
  className?: string;
}

export function MultiSelectChip({ options, selected, onChange, maxSelection, className = '' }: MultiSelectChipProps) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      if (maxSelection && selected.length >= maxSelection) {
        return; // Reach max limit
      }
      onChange([...selected, option]);
    }
  };

  return (
    <View className={`flex-row flex-wrap gap-2 ${className}`}>
      {options.map((option) => {
        const isSelected = selected.includes(option);
        const isDisabled = !isSelected && maxSelection !== undefined && selected.length >= maxSelection;

        return (
          <Pressable
            key={option}
            onPress={() => toggleOption(option)}
            disabled={isDisabled}
            className={`px-4 py-2 rounded-full border ${
              isSelected 
                ? 'bg-pink border-pink' 
                : isDisabled 
                  ? 'bg-bg-alt border-border opacity-50' 
                  : 'bg-white border-border'
            }`}
          >
            <Text 
              className={`font-medium text-sm ${
                isSelected ? 'text-white' : 'text-ink'
              }`}
            >
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
