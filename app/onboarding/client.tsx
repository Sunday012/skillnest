import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { WizardLayout } from '../../src/components/onboarding/WizardLayout';
import { CategoryGrid, CategoryOption } from '../../src/components/form/CategoryGrid';
import { HeroVisual } from '../../src/components/landing/HeroVisual';

const CATEGORIES: CategoryOption[] = [
  { icon: '🎥', label: 'Videography' },
  { icon: '✂️', label: 'Video Editing' },
  { icon: '📷', label: 'Photography' },
  { icon: '🎨', label: 'Graphic Design' },
  { icon: '🖥️', label: 'Web Design' },
  { icon: '💻', label: 'Software Development' },
  { icon: '✍️', label: 'Script Writing' },
  { icon: '📝', label: 'Copywriting' },
  { icon: '📱', label: 'UGC Creation' },
  { icon: '🎬', label: 'Animation' },
  { icon: '🎙️', label: 'Voice Over' },
  { icon: '📣', label: 'Social Media Management' },
  { icon: '📈', label: 'Digital Marketing' },
  { icon: '🗂️', label: 'Virtual Assistance' },
  { icon: '✨', label: 'Other Digital Skills' }
];

export default function ClientOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  // Step 2 State
  const [needs, setNeeds] = useState<string[]>([]);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      router.push('/home');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const renderStep1 = () => (
    <View className="flex-col md:flex-row gap-10 md:gap-14 items-center">
      <View className="flex-1">
        <View className="self-start bg-pink-tint px-4 py-2 rounded-full flex-row items-center gap-2 mb-5">
          <Text className="text-pink-dark font-bold text-[13px]">👋 You're in</Text>
        </View>
        <Text className="font-manrope font-extrabold text-[30px] md:text-[40px] leading-[1.12] text-ink mb-4">
          Welcome to <Text className="text-pink">SkillNest.</Text>
        </Text>
        <Text className="text-[16.5px] text-gray-body leading-relaxed mb-8 max-w-[440px]">
          You're joining a global marketplace of vetted freelancers. Here's what makes hiring here different.
        </Text>

        <View className="flex-col gap-5">
          <View className="flex-row items-start gap-3.5">
            <View className="w-[38px] h-[38px] rounded-[10px] bg-pink-tint items-center justify-center">
              <Text className="text-[17px]">📝</Text>
            </View>
            <View className="flex-1">
              <Text className="font-bold text-[15.5px] text-ink mb-0.5">Post a job in minutes</Text>
              <Text className="text-[14px] text-gray-body leading-relaxed">Describe what you need — freelancers apply, or we recommend a match.</Text>
            </View>
          </View>

          <View className="flex-row items-start gap-3.5">
            <View className="w-[38px] h-[38px] rounded-[10px] bg-pink-tint items-center justify-center">
              <Text className="text-[17px]">🔒</Text>
            </View>
            <View className="flex-1">
              <Text className="font-bold text-[15.5px] text-ink mb-0.5">Escrow-protected payments</Text>
              <Text className="text-[14px] text-gray-body leading-relaxed">Funds release only when you approve each milestone. No surprises.</Text>
            </View>
          </View>

          <View className="flex-row items-start gap-3.5">
            <View className="w-[38px] h-[38px] rounded-[10px] bg-pink-tint items-center justify-center">
              <Text className="text-[17px]">✅</Text>
            </View>
            <View className="flex-1">
              <Text className="font-bold text-[15.5px] text-ink mb-0.5">Verified freelancers only</Text>
              <Text className="text-[14px] text-gray-body leading-relaxed">Every professional completes identity verification before taking a job.</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="flex-1 h-[280px] md:h-[400px] w-full mt-6 md:mt-0 items-center justify-center">
        <HeroVisual 
          variant="job"
          topPillText="Escrow funded"
          topPillIcon="dot"
          tagOrStat="Design"
          title="Rebrand for a coffee roaster"
          subtitle="Posted 2 min ago · Remote"
          avatarStack={['M', 'D', '+9']}
          price="$3,400"
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View>
      <View className="self-center md:self-start bg-pink-tint px-4 py-2 rounded-full mb-4">
        <Text className="text-pink-dark font-bold text-[13px]">Personalize your feed</Text>
      </View>
      <Text className="text-3xl font-manrope font-extrabold text-ink mb-2.5 text-center md:text-left">
        What are you looking to hire for?
      </Text>
      <Text className="text-gray-body text-base mb-10 leading-relaxed text-center md:text-left max-w-xl">
        Select all that apply — we'll use this to tailor your homepage. You can change this anytime.
      </Text>

      <CategoryGrid 
        options={CATEGORIES} 
        selected={needs} 
        onChange={setNeeds} 
      />

      <Pressable onPress={() => router.push('/home')} className="mt-8 items-center">
        <Text className="text-[14px] font-bold text-gray-body hover:text-pink">Skip for now</Text>
      </Pressable>
    </View>
  );

  return (
    <WizardLayout
      currentStep={step}
      totalSteps={totalSteps}
      title=""
      onNext={handleNext}
      onBack={handleBack}
      nextLabel={step === totalSteps ? "Finish" : "Continue"}
    >
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
    </WizardLayout>
  );
}
