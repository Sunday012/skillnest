import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-bg-alt items-center justify-center p-6">
      <View className="h-16 w-16 items-center justify-center rounded-2xl bg-pink mb-6">
        <Text className="font-manrope text-3xl font-extrabold text-white">S</Text>
      </View>
      <Text className="text-3xl font-manrope font-bold text-ink mb-2">Welcome to SkillNest</Text>
      <Text className="text-gray-body text-center mb-8">
        Phase 3 (Home Feed) is not built yet. This is a placeholder screen.
      </Text>
      <Link href="/">
        <Text className="text-pink font-bold">Go back to Landing Page</Text>
      </Link>
    </View>
  );
}
