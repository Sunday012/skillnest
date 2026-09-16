import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { AppIcon } from '../../src/components/AppIcon';
import { AuthField, AuthShell } from '../../src/components/auth/AuthShell';
import { Button } from '../../src/components/Button';

export default function LoginScreen() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Log in to SkillNest"
      subtitle="Pick up projects, messages, milestones, and payouts right where you left them."
    >
      <View className="mb-6 rounded-[18px] border border-border bg-bg-alt p-4">
        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 items-center justify-center rounded-[12px] bg-pink-tint">
            <AppIcon name="sparkles-outline" size={20} color="#EC1257" />
          </View>
          <View className="flex-1">
            <Text className="font-inter-bold text-[13.5px] text-ink">Your work hub is ready</Text>
            <Text className="mt-0.5 text-[12.5px] leading-5 text-gray-body">
              Review proposals, fund milestones, and keep delivery moving.
            </Text>
          </View>
        </View>
      </View>

      <AuthField
        label="Email address"
        icon="mail-outline"
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <AuthField
        label="Password"
        icon="lock-closed-outline"
        placeholder="Enter your password"
        secureTextEntry
      />

      <View className="mb-7 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="h-[18px] w-[18px] rounded-[6px] border border-border bg-white" />
          <Text className="text-[13px] text-gray-body">Remember me</Text>
        </View>
        <Pressable>
          <Text className="text-[13px] font-inter-bold text-pink">Forgot password?</Text>
        </Pressable>
      </View>

      <Button title="Log In" onPress={() => {}} className="mb-6 h-[54px] rounded-[14px]" />

      <View className="flex-row justify-center">
        <Text className="text-gray-body">Don't have an account? </Text>
        <Link href="/signup">
          <Text className="font-inter-bold text-pink">Sign up</Text>
        </Link>
      </View>
    </AuthShell>
  );
}
