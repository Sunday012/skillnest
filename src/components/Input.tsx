import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <View className={`mb-4 ${className}`}>
      <Text className="mb-2 font-bold text-ink">{label}</Text>
      <TextInput
        className={`h-12 rounded-[10px] border px-4 text-[15px] text-ink bg-white ${
          error ? 'border-pink' : 'border-border focus:border-pink'
        }`}
        placeholderTextColor="#93A0B4"
        {...props}
      />
      {error && <Text className="mt-1 text-sm text-pink">{error}</Text>}
    </View>
  );
}
