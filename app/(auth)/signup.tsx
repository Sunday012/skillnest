import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AppIcon, type AppIconName } from '../../src/components/AppIcon';
import { AuthField, AuthShell } from '../../src/components/auth/AuthShell';
import { Button } from '../../src/components/Button';
import { useUser } from '../../src/context/UserContext';

export default function SignupScreen() {
  const router = useRouter();
  const { signupUser } = useUser();
  const [role, setRole] = useState<'client' | 'freelancer'>('client');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    signupUser({
      name: fullName || 'Mira Vance',
      email: email || 'mira.vance@studio.com',
      role: role === 'freelancer' ? 'Freelancer' : 'Client',
    });
    router.push(`/onboarding/${role}`);
  };

  return (
    <AuthShell
      eyebrow="Join SkillNest"
      title="Create your account"
      subtitle="Start hiring vetted specialists or selling your craft with protected payments from day one."
    >
      <View className="mb-6 flex-row gap-3">
        <RoleCard
          icon="briefcase-outline"
          title="I'm a Client"
          body="Hire experts"
          isSelected={role === 'client'}
          onPress={() => setRole('client')}
        />
        <RoleCard
          icon="sparkles-outline"
          title="I'm a Freelancer"
          body="Sell skills"
          isSelected={role === 'freelancer'}
          onPress={() => setRole('freelancer')}
        />
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

      <View className="mb-7 rounded-[16px] bg-pink-tint px-4 py-3">
        <View className="flex-row items-start gap-2.5">
          <AppIcon name="shield-checkmark-outline" size={18} color="#EC1257" />
          <Text className="flex-1 text-[12.5px] leading-5 text-pink-dark">
            Your identity and payments stay protected with verification, escrow milestones,
            and human review for disputes.
          </Text>
        </View>
      </View>

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

function RoleCard({
  icon,
  title,
  body,
  isSelected,
  onPress,
}: {
  icon: AppIconName;
  title: string;
  body: string;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-1 rounded-[18px] border p-4 active:scale-95 ${
        isSelected ? 'border-pink bg-pink-tint' : 'border-border bg-white'
      }`}
    >
      <View className="mb-3 h-10 w-10 items-center justify-center rounded-[12px] bg-white">
        <AppIcon name={icon} size={20} color={isSelected ? '#EC1257' : '#5B6472'} />
      </View>
      <Text className={`font-inter-bold text-[13.5px] ${isSelected ? 'text-pink-dark' : 'text-ink'}`}>
        {title}
      </Text>
      <Text className="mt-1 text-[12px] text-gray-body">{body}</Text>
    </Pressable>
  );
}
