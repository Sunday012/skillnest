import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { AppIcon, type AppIconName } from '../AppIcon';

interface RadioCardProps {
  title: string;
  description?: string;
  isSelected: boolean;
  onSelect: () => void;
  className?: string;
  icon?: AppIconName;
}

export function RadioCard({ title, description, isSelected, onSelect, className = '', icon }: RadioCardProps) {
  return (
    <Pressable
      onPress={onSelect}
      className={`p-4 rounded-xl border-2 mb-3 ${
        isSelected ? 'border-pink bg-pink-tint' : 'border-border bg-white'
      } ${className}`}
      style={className.includes('flex-1') ? { flex: 1 } : undefined}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 min-w-0 pr-4">
          <View className="flex-row items-center gap-2 mb-1">
            {icon && <AppIcon name={icon} size={17} color={isSelected ? '#C10E48' : '#5B6472'} />}
            <Text className={`font-bold text-[15px] ${isSelected ? 'text-pink-dark' : 'text-ink'}`}>
              {title}
            </Text>
          </View>
          {description && (
            <Text className="text-sm text-gray-body leading-snug">
              {description}
            </Text>
          )}
        </View>
        <View 
          className={`h-5 w-5 rounded-full border-2 items-center justify-center ${
            isSelected ? 'border-pink' : 'border-border'
          }`}
        >
          {isSelected && <View className="h-2.5 w-2.5 rounded-full bg-pink" />}
        </View>
      </View>
    </Pressable>
  );
}
