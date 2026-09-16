import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
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

  const handleSignup = () => {
    signupUser({
      name: fullName || 'Mira Vance',
      email: email || 'mira.vance@studio.com',
      role: isFreelancer ? 'Freelancer' : 'Client',
    });
    router.push(`/onboarding/${selectedRole}`);
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
    >
      <View className="mb-5 flex-row items-center gap-3 rounded-[16px] bg-pink-tint px-4 py-3">
        <AppIcon
          name={isFreelancer ? 'sparkles-outline' : 'briefcase-outline'}
          size={19}
          color="#EC1257"
        />
        <View className="flex-1">
          <Text className="font-inter-bold text-[13.5px] text-pink-dark">
            {isFreelancer ? 'Selling services' : 'Finding services'}
          </Text>
          <Text className="mt-0.5 text-[12.5px] text-gray-body">
            {isFreelancer ? 'You can add portfolio details next.' : 'You can customize hiring needs next.'}
          </Text>
        </View>
      </View>

      <AuthField
        label="Full name"
        icon="person-outline"
        placeholder="Ada Lovelace"
        value={fullName}
        onChangeText={setFullName}
      />

      <AuthField
        label="Email address"
        icon="mail-outline"
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <AuthField
        label="Password"
        icon="lock-closed-outline"
        placeholder="Create a strong password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Create Account" onPress={handleSignup} className="mb-6 h-[54px] rounded-[14px]" />

      <View className="flex-row justify-center">
        <Text className="text-gray-body">Already have an account? </Text>
        <Link href="/login">
          <Text className="font-inter-bold text-pink">Log in</Text>
        </Link>
      </View>
    </AuthShell>
  );
}
