import React from 'react';
import { View, Text, ScrollView, Platform, KeyboardAvoidingView, Pressable } from 'react-native';
import { Button } from '../Button';
import { LinearGradient } from 'expo-linear-gradient';

interface WizardLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  isLoading?: boolean;
  isNextDisabled?: boolean;
  onSkip?: () => void;
}

export function WizardLayout({
  children,
  currentStep,
  totalSteps,
  title,
  subtitle,
  onNext,
  onBack,
  nextLabel = 'Continue',
  isLoading = false,
  isNextDisabled = false,
  onSkip
}: WizardLayoutProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-bg-alt"
    >
      <View className="bg-white border-b border-border pt-12 pb-4 px-6 z-10">
        {/* Progress Bar & Header */}
        <View className="flex-row items-center justify-between mb-4">
          {onBack ? (
            <Pressable onPress={onBack} className="p-2 -ml-2">
              <Text className="text-gray-body font-medium">← Back</Text>
            </Pressable>
          ) : (
            <View className="w-10" />
          )}
          <Text className="text-sm font-bold text-gray-muted">
            Step {currentStep} of {totalSteps}
          </Text>
          <View className="w-10">
            {onSkip && (
              <Pressable onPress={onSkip} className="p-2 -mr-2 items-end">
                <Text className="text-gray-body font-medium">Skip</Text>
              </Pressable>
            )}
          </View>
        </View>

        <View className="h-1.5 w-full bg-border rounded-full overflow-hidden">
          <View style={{ width: `${progress}%`, height: '100%' }}>
            <LinearGradient
              colors={['#EC1257', '#C10E48']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerClassName="flex-grow px-6 py-8 pb-32">
        <View className="mx-auto w-full max-w-5xl">
          <Text className="text-3xl font-manrope font-extrabold text-ink mb-2">
            {title}
          </Text>
          {Boolean(subtitle) && (
            <Text className="text-gray-body text-base mb-8 leading-relaxed">
              {subtitle}
            </Text>
          )}

          {children}
        </View>
      </ScrollView>

      {/* Bottom Fixed Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-border p-6 pb-8 z-20">
        <View className="mx-auto w-full max-w-5xl flex-row items-center gap-4">
          <Button
            title={nextLabel}
            onPress={onNext}
            disabled={isNextDisabled}
            isLoading={isLoading}
            className="flex-1"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}


