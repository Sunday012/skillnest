import { View, Image } from 'react-native';
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
      <Image
        source={require('../assets/logo.png')}
        style={{ width: 150, height: 45, resizeMode: 'contain' }}
      />
    </View>
  );
}
