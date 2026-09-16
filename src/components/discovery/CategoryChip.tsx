import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { AppIcon } from '../AppIcon';

interface CategoryChipProps {
  category: any;
}

export function CategoryChip({ category }: CategoryChipProps) {
  return (
    <Pressable className="bg-white border border-border rounded-[12px] p-4 items-center justify-center active:border-pink active:scale-95 transition-all w-[140px] md:w-auto">
      <View className="mb-2">
        <AppIcon name={category.icon} size={22} color="#EC1257" />
      </View>
      <Text className="text-[12.5px] font-inter-bold text-ink mb-1 text-center">{category.title}</Text>
      <Text className="text-[11px] text-gray-muted">{category.count}</Text>
    </Pressable>
  );
}
