import { Link, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { AppIcon } from '../../src/components/AppIcon';
import { AuthField, AuthShell } from '../../src/components/auth/AuthShell';
import { Button } from '../../src/components/Button';
import { useUser } from '../../src/context/UserContext';

export default function LoginScreen() {
  const router = useRouter();
  const { signupUser } = useUser();

  const handleLogin = () => {
    router.push('/home');
  };

  const handleGoogleLogin = () => {
    signupUser({ name: 'Google User', email: 'google.user@example.com', role: 'Client' });
    router.push('/home');
  };

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Log in to SkillNest"
      mobilePanelVariant="glass"
    >
      <AuthField
        label="Email address"
        icon="mail-outline"
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        mobileGlass
      />

      <AuthField
        label="Password"
        icon="lock-closed-outline"
        placeholder="Enter your password"
        secureTextEntry
        mobileGlass
      />

      <View className="mb-7 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="h-[18px] w-[18px] rounded-[6px] border border-white/30 bg-white/10 md:border-border md:bg-white" />
          <Text className="text-[13px] text-white md:text-gray-body">Remember me</Text>
        </View>
        <Pressable>
          <Text className="text-[13px] font-inter-bold text-pink">Forgot password?</Text>
        </Pressable>
      </View>

      <Button title="Log In" onPress={handleLogin} className="mb-4 h-[54px] rounded-[14px]" />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Sign in with Google"
        onPress={handleGoogleLogin}
        className="mb-6 h-[54px] flex-row items-center justify-center gap-3 rounded-[14px] border border-white/25 bg-white/10 active:bg-white/15 md:border-border md:bg-white md:active:bg-bg-alt"
      >
        <AppIcon name="logo-google" size={21} color="#4285F4" />
        <Text className="font-inter-bold text-[14.5px] text-white md:text-ink">
          Sign in with Google
        </Text>
      </Pressable>

      <View className="flex-row justify-center">
        <Text className="text-white md:text-gray-body">Don't have an account? </Text>
        <Link href="/signup">
          <Text className="font-inter-bold text-pink">Sign up</Text>
        </Link>
      </View>
    </AuthShell>
  );
}
