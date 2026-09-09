import React from 'react';
import { View, Text, Pressable } from 'react-native';

export interface CategoryOption {
  icon: string;
  label: string;
}

interface CategoryGridProps {
  options: CategoryOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function CategoryGrid({ options, selected, onChange }: CategoryGridProps) {
  const toggleOption = (label: string) => {
    if (selected.includes(label)) {
      onChange(selected.filter(item => item !== label));
    } else {
      onChange([...selected, label]);
    }
  };

  return (
    <View className="flex-row flex-wrap -mx-1.5">
      {options.map((option) => {
        const isSelected = selected.includes(option.label);

        return (
          <View key={option.label} className="w-1/2 md:w-1/5 p-1.5">
            <Pressable
              onPress={() => toggleOption(option.label)}
              className={`border-[1.5px] rounded-[14px] px-3 py-5 items-center justify-center min-h-[110px] w-full bg-white transition-all active:scale-95 ${
                isSelected ? 'border-pink bg-pink-tint' : 'border-border'
              }`}
            >
              {isSelected && (
                <View className="absolute top-2 right-2 w-[18px] h-[18px] rounded-full bg-pink items-center justify-center z-10">
                  <Text className="text-white text-[11px] font-extrabold leading-none mt-[-1px]">✓</Text>
                </View>
              )}
              
              <Text className="text-[24px] mb-2.5 leading-none">{option.icon}</Text>
              <Text className="text-[13px] font-semibold text-ink text-center leading-tight">
                {option.label}
              </Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}
