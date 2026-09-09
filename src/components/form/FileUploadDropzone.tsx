import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface FileUploadDropzoneProps {
  label: string;
  helperText?: string;
  onPress?: () => void;
  className?: string;
}

export function FileUploadDropzone({ label, helperText, onPress, className = '' }: FileUploadDropzoneProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`border-2 border-dashed border-border rounded-xl p-8 items-center justify-center bg-bg-alt active:bg-white ${className}`}
    >
      <View className="h-12 w-12 rounded-full bg-pink-tint items-center justify-center mb-3">
        {/* Simple plus icon placeholder */}
        <Text className="text-pink font-bold text-2xl leading-none mt-[-2px]">+</Text>
      </View>
      <Text className="font-bold text-ink mb-1">{label}</Text>
      {helperText && (
        <Text className="text-sm text-gray-body text-center">{helperText}</Text>
      )}
    </Pressable>
  );
}
