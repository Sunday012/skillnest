import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

export function TopNav() {
  return (
    <View className="bg-white border-b border-border z-50">
      <View className="flex-row items-center h-[72px] px-6 max-w-[1180px] w-full self-center gap-5">

        {/* Logo */}
        <View className="flex-row items-center gap-[9px] shrink-0">
          <View className="w-[32px] h-[32px] rounded-[9px] bg-pink items-center justify-center">
            <Text className="text-white font-manrope-extraBold text-[14px]">S</Text>
          </View>
          <Text className="font-manrope-extraBold text-[19px] text-ink">SkillNest</Text>
        </View>

        {/* Search pill — flex-1 absorbs space but pill itself is capped at 420px */}
        <View className="flex-1 items-center">
          <View
            style={{ maxWidth: 420, width: '100%' }}
            className="flex-row items-center gap-2 bg-bg-alt rounded-full py-[10px] px-4"
          >
            <Text className="text-[14px]">🔍</Text>
            <TextInput
              placeholder="Search gigs, talent, or skills…"
              className="flex-1 text-[14px] text-gray-muted p-0"
              style={{ height: 20, outlineStyle: 'none' } as any}
              placeholderTextColor="#93A0B4"
              editable={false}
            />
          </View>
        </View>

        {/* Icons */}
        <View className="flex-row items-center gap-[18px] shrink-0">
          <Pressable>
            <Text className="text-[18px] text-gray-body">♡</Text>
          </Pressable>
          <Pressable className="relative">
            <Text className="text-[18px]">🔔</Text>
            <View className="absolute -top-[4px] -right-[5px] w-[8px] h-[8px] rounded-full bg-pink" />
          </Pressable>
          <View className="w-[34px] h-[34px] rounded-full bg-navy items-center justify-center">
            <Text className="text-white text-[12px] font-inter-bold">M</Text>
          </View>
        </View>

      </View>
    </View>
  );
}

