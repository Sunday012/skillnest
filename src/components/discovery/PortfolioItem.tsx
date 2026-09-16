import React from 'react';
import { View, Text } from 'react-native';
import { AppIcon } from '../AppIcon';

interface PortfolioItemProps {
  item: any;
}

export function PortfolioItem({ item }: PortfolioItemProps) {
  const isVideo = item.type === 'video';
  
  return (
    <View className="aspect-square rounded-xl bg-bg-alt relative overflow-hidden items-center justify-center">
      <AppIcon name={item.icon} size={24} color="#93A0B4" />
      
      {isVideo && (
        <>
          <View className="absolute bottom-2 left-2 w-6 h-6 rounded-full bg-black/60 items-center justify-center">
            <AppIcon name="play" size={12} color="#FFFFFF" />
          </View>
          <View className="absolute bottom-2 right-2 bg-black/60 px-1.5 py-0.5 rounded">
            <Text className="text-white text-[10px]">{item.duration}</Text>
          </View>
        </>
      )}
    </View>
  );
}
