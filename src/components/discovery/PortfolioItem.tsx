import React from 'react';
import { View, Text } from 'react-native';

interface PortfolioItemProps {
  item: any;
}

export function PortfolioItem({ item }: PortfolioItemProps) {
  const isVideo = item.type === 'video';
  
  return (
    <View className="aspect-square rounded-xl bg-bg-alt relative overflow-hidden items-center justify-center">
      <Text className="text-[22px] text-gray-muted">{item.icon}</Text>
      
      {isVideo && (
        <>
          <View className="absolute bottom-2 left-2 w-6 h-6 rounded-full bg-black/60 items-center justify-center">
            <Text className="text-white text-[10px] ml-0.5">▶</Text>
          </View>
          <View className="absolute bottom-2 right-2 bg-black/60 px-1.5 py-0.5 rounded">
            <Text className="text-white text-[10px]">{item.duration}</Text>
          </View>
        </>
      )}
    </View>
  );
}
