import React from 'react';
import { View, Text } from 'react-native';

export default function OrdersScreen() {
  return (
    <View className="flex-1 bg-bg-alt items-center justify-center p-6">
      <Text className="text-[24px] mb-4">📋</Text>
      <Text className="font-manrope-bold text-[20px] text-ink mb-2">Orders</Text>
      <Text className="text-gray-body text-center">Placeholder screen. Not part of Phase 3.</Text>
    </View>
  );
}
