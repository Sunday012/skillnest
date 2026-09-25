import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AppIcon } from '../../src/components/AppIcon';
import { AuthField, AuthShell } from '../../src/components/auth/AuthShell';
import { Button } from '../../src/components/Button';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const getStrengthLevel = (val: string) => {
    if (!val) return 0;
    const hasNumberOrSymbol = /[0-9!@#$%^&*(),.?":{}|<>]/.test(val);
    if (val.length >= 10 && hasNumberOrSymbol) return 3;
    if (val.length >= 6) return 2;
    return 1;
  };

  const strengthLevel = getStrengthLevel(password);
  const strengthText =
    strengthLevel === 3
      ? 'Strong password'
      : strengthLevel === 2
        ? 'Medium password'
        : strengthLevel === 1
          ? 'Weak password'
          : '';

  const handleResetPassword = () => {
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <AuthShell
        eyebrow="All set"
        title="Password reset"
        mobilePanelVariant="glass"
      >
        <View className="items-center py-2 text-center">
          <View className="mb-4 h-14 w-14 items-center justify-center rounded-full bg-green">
            <AppIcon name="checkmark-outline" size={28} color="#FFFFFF" />
          </View>

          <Text className="mb-2 text-center font-manrope-extraBold text-[24px] text-white md:text-ink">
            Password reset
          </Text>

          <Text className="mb-6 text-center text-[14.5px] leading-6 text-white/80 md:text-gray-body">
            Your password has been changed successfully. You can now log in with your new password.
          </Text>

          <Button
            title="Continue to Log In"
            onPress={() => router.push('/login')}
            className="h-[54px] w-full rounded-[14px]"
          />
        </View>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="Almost done"
      title="Set a new password"
      subtitle="Choose a strong password for your NavoNext account."
      mobilePanelVariant="glass"
    >
      <View>
        <AuthField
          label="New Password"
          icon="lock-closed-outline"
          placeholder="Create a strong password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          mobileGlass
        />

        {/* Live Password Strength Indicator */}
        <View className="-mt-2 mb-4">
          <View className="mb-1.5 flex-row gap-1.5">
            <View
              className={`h-1.5 flex-1 rounded-full ${
                strengthLevel >= 1
                  ? strengthLevel === 1
                    ? 'bg-red-500'
                    : strengthLevel === 2
                      ? 'bg-amber-500'
                      : 'bg-green'
                  : 'bg-white/20 md:bg-border'
              }`}
            />
            <View
              className={`h-1.5 flex-1 rounded-full ${
                strengthLevel >= 2
                  ? strengthLevel === 2
                    ? 'bg-amber-500'
                    : 'bg-green'
                  : 'bg-white/20 md:bg-border'
              }`}
            />
            <View
              className={`h-1.5 flex-1 rounded-full ${
                strengthLevel >= 3 ? 'bg-green' : 'bg-white/20 md:bg-border'
              }`}
            />
          </View>
          <Text className="text-[12px] text-white/70 md:text-gray-muted">
            {strengthText ? `${strengthText} — ` : ''}Use at least 8 characters, including a number and a symbol.
          </Text>
        </View>

        <AuthField
          label="Confirm New Password"
          icon="lock-closed-outline"
          placeholder="Re-enter your password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          mobileGlass
        />

        <Button
          title="Reset Password"
          onPress={handleResetPassword}
          className="mb-5 h-[54px] rounded-[14px]"
        />

        <Link href="/login" className="py-2 self-center">
          <Text className="text-center text-[13.5px] font-inter-bold text-white md:text-gray-body hover:text-pink">
            ← Back to Log In
          </Text>
        </Link>
      </View>
    </AuthShell>
  );
}
