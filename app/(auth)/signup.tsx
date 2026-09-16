import { Link, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { AppIcon, type AppIconName } from '../../src/components/AppIcon';
import { AuthShell } from '../../src/components/auth/AuthShell';

export default function SignupRoleScreen() {
  const router = useRouter();

  return (
    <AuthShell
      eyebrow="Join SkillNest"
      title="Freelance services. On demand."
      subtitle="Choose how you want to start. We will ask for your details next."
      mobilePanel={false}
    >
      <View className="flex-row gap-3">
        <RoleChoiceCard
          icon="briefcase-outline"
          title="I'm a Client"
          body="I need talent for a project"
          onPress={() => router.push('/signup/client')}
        />
        <RoleChoiceCard
          icon="create-outline"
          title="I'm a Freelancer"
          body="I want to sell my services"
          onPress={() => router.push('/signup/freelancer')}
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
  onPress,
}: {
  icon: AppIconName;
  title: string;
  body: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 rounded-[16px] border border-white/10 bg-black/55 p-4 active:scale-95"
    >
      <View className="mb-5 h-12 w-12 items-center justify-center rounded-[14px] border border-white/70 bg-white/10">
        <AppIcon name={icon} size={25} color="#FFFFFF" />
      </View>
      <Text className="font-inter-bold text-[15px] text-white">{title}</Text>
      <Text
        className="mt-2 text-[12.5px] leading-5"
        style={{ color: 'rgba(255,255,255,0.72)' }}
      >
        {body}
      </Text>
    </Pressable>
  );
}
