import { View, Text } from 'react-native';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

export default function NativeIndex() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Artificial delay to show the branded splash before redirecting
    const timer = setTimeout(() => {
      setReady(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (ready) {
    return <Redirect href="/login" />;
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="flex-row items-center gap-2">
        <View className="h-10 w-10 items-center justify-center rounded-xl bg-pink">
          <Text className="font-manrope text-lg font-extrabold text-white">S</Text>
        </View>
        <Text className="font-manrope text-2xl font-extrabold text-ink">SkillNest</Text>
      </View>
    </View>
  );
}
