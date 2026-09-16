import { View, Text } from 'react-native';
import { AppIcon, type AppIconName } from '../AppIcon';

export function ProcessCard({ number, icon, title, description }: { number: string; icon: AppIconName; title: string; description: string }) {
  return (
    <View className="bg-white border border-border rounded-[14px] p-7 overflow-hidden relative flex-1 min-w-[280px] max-w-md w-full mb-6 lg:mb-0">
      <Text className="absolute top-3 right-5 font-manrope font-extrabold text-[56px] text-pink-tint leading-none">
        {number}
      </Text>
      <View className="w-12 h-12 rounded-xl bg-pink items-center justify-center mb-5">
        <AppIcon name={icon} size={22} color="#FFFFFF" />
      </View>
      <Text className="font-manrope text-xl font-bold text-ink mb-2">{title}</Text>
      <Text className="text-[15px] text-gray-body leading-relaxed">{description}</Text>
    </View>
  );
}
