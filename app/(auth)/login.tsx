import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { AuthField, AuthShell } from '../../src/components/auth/AuthShell';
import { Button } from '../../src/components/Button';

export default function LoginScreen() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Log in to SkillNest"
      subtitle="Pick up projects, messages, milestones, and payouts right where you left them."
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
          <Text className="text-[13px] text-white/75 md:text-gray-body">Remember me</Text>
        </View>
        <Pressable>
          <Text className="text-[13px] font-inter-bold text-pink">Forgot password?</Text>
        </Pressable>
      </View>

      <Button title="Log In" onPress={() => {}} className="mb-6 h-[54px] rounded-[14px]" />

      <View className="flex-row justify-center">
        <Text className="text-white/75 md:text-gray-body">Don't have an account? </Text>
        <Link href="/signup">
          <Text className="font-inter-bold text-pink">Sign up</Text>
        </Link>
      </View>
    </AuthShell>
  );
}
