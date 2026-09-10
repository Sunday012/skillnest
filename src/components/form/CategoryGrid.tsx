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
  singleSelect?: boolean;
}

export function CategoryGrid({ options, selected, onChange, singleSelect = false }: CategoryGridProps) {
  const toggleOption = (label: string) => {
    if (singleSelect) {
      // For single select, if it's already selected, we don't allow deselecting (or we can allow it by passing empty array). Let's allow replacing.
      if (!selected.includes(label)) {
        onChange([label]);
      }
    } else {
      if (selected.includes(label)) {
        onChange(selected.filter(item => item !== label));
      } else {
        onChange([...selected, label]);
      }
    }
  };

  return (
    <View className="flex-row flex-wrap -mx-1.5 w-full">
      {options.map((option) => {
        const isSelected = selected.includes(option.label);

        return (
          <View key={option.label} className="w-1/3 lg:w-1/5 p-1.5">
            <Pressable
              onPress={() => toggleOption(option.label)}
              className={`border-[1.5px] rounded-[14px] px-2 py-4 items-center justify-center min-h-[120px] w-full bg-white transition-all active:scale-95 ${
                isSelected ? 'border-pink bg-pink-tint' : 'border-border'
              }`}
            >
              {isSelected && (
                <View className="absolute top-2 right-2 w-[18px] h-[18px] rounded-full bg-pink items-center justify-center z-10">
                  <Text className="text-white text-[11px] font-extrabold leading-none mt-[-1px]">✓</Text>
                </View>
              )}
              
              <Text 
                className="text-[24px] mb-2 leading-none"
              >
                {option.icon}
              </Text>
              <Text 
                className="text-[12.5px] font-semibold text-ink text-center leading-tight w-full"
                style={{ flexShrink: 1 }}
                numberOfLines={2}
              >
                {option.label}
              </Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}
