import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AppIcon, type AppIconName } from '../../src/components/AppIcon';
import { AuthShell } from '../../src/components/auth/AuthShell';

export default function SignupRoleScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'client' | 'freelancer' | null>(null);

  const handleRoleSelect = (role: 'client' | 'freelancer') => {
    setSelectedRole(role);
    setTimeout(() => {
      router.push(`/signup/${role}`);
    }, 180);
  };

  return (
    <AuthShell
      eyebrow="Join NavoNext"
      title="Freelance services. On demand."
      subtitle="Choose how you want to start. We will ask for your details next."
      mobilePanel={false}
    >
      <View className="flex-row gap-3">
        <RoleChoiceCard
          icon="briefcase-outline"
          title="I'm a Client"
          body="I need talent for a project"
          isSelected={selectedRole === 'client'}
          onPress={() => handleRoleSelect('client')}
        />
        <RoleChoiceCard
          icon="create-outline"
          title="I'm a Freelancer"
          body="I want to sell my services"
          isSelected={selectedRole === 'freelancer'}
          onPress={() => handleRoleSelect('freelancer')}
        />
      </View>

      <View className="mt-8 flex-row items-center justify-between">
        <Link href="/" asChild>
          <Pressable>
            <Text className="font-inter-bold text-[14px] text-white underline">Skip</Text>
          </Pressable>
        </Link>
        <Link href="/login">
          <Text className="font-inter-bold text-[14px] text-white underline">Sign In</Text>
        </Link>
      </View>
    </AuthShell>
  );
}

function RoleChoiceCard({
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
      className={`flex-1 rounded-[16px] border-2 p-4 active:scale-95 ${
        isSelected
          ? 'border-pink bg-pink-tint'
          : 'border-white/15 bg-black/55'
      }`}
    >
      <View
        className={`mb-5 h-12 w-12 items-center justify-center rounded-[14px] border ${
          isSelected
            ? 'border-pink bg-pink'
            : 'border-white/70 bg-white/10'
        }`}
      >
        <AppIcon name={icon} size={25} color="#FFFFFF" />
      </View>
      <Text
        className={`font-inter-bold text-[15px] ${
          isSelected ? 'text-ink' : 'text-white'
        }`}
      >
        {title}
      </Text>
      <Text
        className={`mt-2 text-[12.5px] leading-5 ${
          isSelected ? 'text-gray-body font-inter-medium' : 'text-white/75'
        }`}
      >
        {body}
      </Text>
    </Pressable>
  );
}
