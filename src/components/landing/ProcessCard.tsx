import { View, Text } from 'react-native';

export function ProcessCard({ number, icon, title, description }: { number: string; icon: string; title: string; description: string }) {
  return (
    <View className="bg-white border border-border rounded-[14px] p-7 overflow-hidden relative flex-1 min-w-[280px] max-w-md w-full mb-6 lg:mb-0">
      <Text className="absolute top-3 right-5 font-manrope font-extrabold text-[56px] text-pink-tint leading-none">
        {number}
      </Text>
      <View className="w-12 h-12 rounded-xl bg-pink items-center justify-center mb-5">
        <Text className="text-white text-xl">{icon}</Text>
      </View>
      <Text className="font-manrope text-xl font-bold text-ink mb-2">{title}</Text>
      <Text className="text-[15px] text-gray-body leading-relaxed">{description}</Text>
    </View>
  );
}
