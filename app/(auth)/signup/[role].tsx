import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AppIcon } from '../../../src/components/AppIcon';
import { AuthField, AuthShell } from '../../../src/components/auth/AuthShell';
import { Button } from '../../../src/components/Button';
import { useUser } from '../../../src/context/UserContext';

type SignupRole = 'client' | 'freelancer';

export default function SignupDetailsScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: string }>();
  const { signupUser } = useUser();
  const selectedRole: SignupRole = role === 'freelancer' ? 'freelancer' : 'client';
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFreelancer = selectedRole === 'freelancer';

  const completeSignup = (name: string, signupEmail: string) => {
    signupUser({
      name,
      email: signupEmail,
      role: isFreelancer ? 'Freelancer' : 'Client',
    });
    router.push(`/onboarding/${selectedRole}`);
  };

  const handleSignup = () => {
    completeSignup(fullName || 'Mira Vance', email || 'mira.vance@studio.com');
  };

  const handleGoogleSignup = () => {
    completeSignup('Google User', 'google.user@example.com');
  };

  return (
    <AuthShell
      eyebrow={isFreelancer ? 'Freelancer setup' : 'Client setup'}
      title={isFreelancer ? 'Create your seller profile' : 'Create your client account'}
      subtitle={
        isFreelancer
          ? 'Add your details so clients can discover and hire you.'
          : 'Add your details so you can post jobs and hire verified talent.'
      }
      mobileHeadingInPanel
      hideMobileSubtitle
      mobilePanelVariant="glass"
      onMobileEyebrowPress={() => router.replace('/signup')}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Sign up as a ${selectedRole} with Google`}
        onPress={handleGoogleSignup}
        className="h-[54px] flex-row items-center justify-center gap-3 rounded-[14px] border border-white/25 bg-white/10 active:bg-white/15 md:border-border md:bg-white md:active:bg-bg-alt"
      >
        <AppIcon name="logo-google" size={21} color="#4285F4" />
        <Text className="font-inter-bold text-[14.5px] text-white md:text-ink">
          Continue with Google
        </Text>
      </Pressable>

      <View className="my-5 flex-row items-center gap-3">
        <View className="h-px flex-1 bg-white/25 md:bg-border" />
        <Text className="text-[12px] text-white/70 md:text-gray-muted">or continue with email</Text>
        <View className="h-px flex-1 bg-white/25 md:bg-border" />
      </View>

      <AuthField
        label="Full name"
        icon="person-outline"
        placeholder="Ada Lovelace"
        value={fullName}
        onChangeText={setFullName}
        mobileGlass
      />

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

      <AuthField
        label="Password"
        icon="lock-closed-outline"
        placeholder="Create a strong password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        mobileGlass
      />

      <Button title="Create Account" onPress={handleSignup} className="mb-5 h-[54px] rounded-[14px]" />

      <View className="flex-row justify-center">
        <Text className="text-white/75 md:text-gray-body">Already have an account? </Text>
        <Link href="/login">
          <Text className="font-inter-bold text-pink">Log in</Text>
        </Link>
      </View>
    </AuthShell>
  );
}
