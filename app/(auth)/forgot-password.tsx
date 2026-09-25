import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AppIcon } from '../../src/components/AppIcon';
import { AuthField, AuthShell } from '../../src/components/auth/AuthShell';
import { Button } from '../../src/components/Button';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSendLink = () => {
    setIsSent(true);
  };

  if (isSent) {
    return (
      <AuthShell
        eyebrow="Welcome back"
        title="Check your email"
        mobilePanelVariant="glass"
      >
        <View className="items-center py-2 text-center">
          <View className="mb-4 h-14 w-14 items-center justify-center rounded-full bg-green">
            <AppIcon name="checkmark-outline" size={28} color="#FFFFFF" />
          </View>
          <Text className="mb-2 text-center font-manrope-extraBold text-[24px] text-white md:text-ink">
            Check your email
          </Text>
          <Text className="mb-6 text-center text-[14.5px] leading-6 text-white/80 md:text-gray-body">
            We've sent a password reset link to{' '}
            <Text className="font-bold text-white md:text-ink">{email || 'you@example.com'}</Text>.
            It expires in 30 minutes.
          </Text>

          <Pressable onPress={() => setIsSent(false)} className="mb-6">
            <Text className="text-center text-[13.5px] text-white/80 md:text-gray-muted">
              Didn't get it? Check spam, or{' '}
              <Text className="font-bold text-pink">resend the email</Text>.
            </Text>
          </Pressable>

          <Button
            title="Proceed to Reset Password (Dev Test) →"
            onPress={() => router.push('/reset-password')}
            className="mb-5 h-[50px] w-full rounded-[14px]"
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

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Forgot your password?"
      subtitle="Enter the email linked to your account and we'll send you a reset link."
      mobilePanelVariant="glass"
    >
      <AuthField
        label="Email address"
        icon="mail-outline"
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        mobileGlass
      />

      <Button
        title="Send Reset Link"
        onPress={handleSendLink}
        className="mb-5 h-[54px] rounded-[14px]"
      />

      <Link href="/login" className="py-2 self-center">
        <Text className="text-center text-[13.5px] font-inter-bold text-white md:text-gray-body hover:text-pink">
          ← Back to Log In
        </Text>
      </Link>
    </AuthShell>
  );
}
