import React, { useState } from 'react';
import { View, Text, Pressable, LayoutAnimation, Platform, UIManager } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function FAQItem({ question, answer, isFirst = false }: { question: string; answer: string; isFirst?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View className={`py-6 border-b border-border ${isFirst ? 'border-t' : ''}`}>
      <Pressable onPress={toggleOpen} className="flex-row justify-between items-center">
        <Text className="font-bold text-[17px] text-ink pr-4 flex-1">{question}</Text>
        <Text className="text-[22px] text-gray-muted font-normal">
          {isOpen ? '–' : '+'}
        </Text>
      </Pressable>
      {isOpen && (
        <Text className="text-[15px] text-gray-body mt-3 max-w-[640px] leading-relaxed">
          {answer}
        </Text>
      )}
    </View>
  );
}
