/// <reference types="nativewind/types" />
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { WizardLayout } from '../../src/components/onboarding/WizardLayout';
import { CategoryGrid, CategoryOption } from '../../src/components/form/CategoryGrid';
import { MultiSelectChip } from '../../src/components/form/MultiSelectChip';
import { RadioCard } from '../../src/components/form/RadioCard';
import { FileUploadDropzone } from '../../src/components/form/FileUploadDropzone';
import { OFFICIAL_CATEGORIES } from '../../src/constants/categories';
import { SKILLS_BY_CATEGORY } from '../../src/constants/skills';

const CATEGORIES: CategoryOption[] = OFFICIAL_CATEGORIES;

export default function FreelancerOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Form State
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [status, setStatus] = useState('Available');
  
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [hourlyRate, setHourlyRate] = useState('');

  const [payoutMethod, setPayoutMethod] = useState('Bank Transfer');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [taxCountry, setTaxCountry] = useState('');

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      router.replace('/home'); // Navigate to the main app home
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const getInitials = (fullName: string) => {
    if (!fullName) return '?';
    return fullName.trim().split(/\s+/).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  };

  const currentCategoryLabel = selectedCategory.length > 0 ? selectedCategory[0] : '';
  const availableSkillsForCategory = currentCategoryLabel && SKILLS_BY_CATEGORY[currentCategoryLabel] 
    ? SKILLS_BY_CATEGORY[currentCategoryLabel] 
    : [];

  const handleCategoryChange = (newCategory: string[]) => {
    setSelectedCategory(newCategory);
    setSelectedSkills([]); // Reset skills when category changes
  };

  const renderLivePreview = () => (
    <View className="bg-white border border-border rounded-2xl p-6 shadow-sm">
      <View className="w-14 h-14 rounded-full bg-navy items-center justify-center mb-3">
        <Text className="text-white font-extrabold text-lg">{getInitials(name || 'Your Name')}</Text>
      </View>
      <Text className="text-[17px] font-bold text-ink mb-1">{name || 'Your Name'}</Text>
      <Text className="text-[13px] text-gray-body mb-3">{headline || 'Your headline goes here'}</Text>
      
      <View className="flex-row items-center bg-bg-alt self-start px-2.5 py-1.5 rounded-full mb-4">
        <View className={`w-2 h-2 rounded-full mr-2 ${status === 'Available' ? 'bg-green' : status === 'Busy' ? 'bg-[#F5A623]' : 'bg-gray-muted'}`} />
        <Text className="text-[12px] font-bold text-ink">{status}</Text>
      </View>

      <View className="flex-row flex-wrap gap-1.5 mb-4">
        {currentCategoryLabel ? (
          <View className="bg-pink-tint px-2.5 py-1 rounded-full">
            <Text className="text-pink-dark text-[11.5px] font-bold">{currentCategoryLabel}</Text>
          </View>
        ) : null}
        {selectedSkills.slice(0, 3).map((skill, index) => (
          <View key={index} className="bg-pink-tint px-2.5 py-1 rounded-full">
            <Text className="text-pink-dark text-[11.5px] font-bold">{skill}</Text>
          </View>
        ))}
      </View>

      <View className="flex-row justify-between border-t border-border pt-3">
        <Text className="text-[13px] text-gray-body">Rate</Text>
        <Text className="text-[16px] font-bold text-ink">{hourlyRate ? `$${hourlyRate}/hr` : '—'}</Text>
      </View>
      
      {step === 3 && (
        <View className="flex-row gap-1.5 mt-3">
          <View className="flex-1 aspect-square rounded-lg bg-bg-alt border border-dashed border-border items-center justify-center">
            <Text className="text-lg">🖼️</Text>
          </View>
          <View className="flex-1 aspect-square rounded-lg bg-bg-alt border border-dashed border-border items-center justify-center">
            <Text className="text-lg">🎬</Text>
          </View>
          <View className="flex-1 aspect-square rounded-lg bg-bg-alt border border-dashed border-border items-center justify-center">
            <Text className="text-gray-muted text-lg">+</Text>
          </View>
        </View>
      )}
    </View>
  );

  const renderStep1 = () => (
    <View className="flex-col-reverse lg:flex-row gap-10 lg:gap-14 items-start w-full">
      <View className="flex-1 w-full">
        <Text className="text-pink font-bold text-[13px] tracking-wider uppercase mb-2">Basic Info</Text>
        <Text className="text-[28px] font-manrope font-extrabold text-ink mb-2">Tell clients who you are</Text>
        <Text className="text-[15px] text-gray-body mb-8">This shows up at the top of your public profile.</Text>

        <View className="flex-col lg:flex-row gap-5 mb-5 w-full">
          <View className="flex-1">
            <Text className="text-[13px] font-bold text-ink mb-2">Display Name</Text>
            <TextInput 
              className="border-[1.5px] border-border rounded-[10px] px-4 py-3 text-[14.5px] text-ink focus:border-pink bg-white"
              placeholder="e.g. Mira Vance"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View className="flex-1">
            <Text className="text-[13px] font-bold text-ink mb-2">Location</Text>
            <TextInput 
              className="border-[1.5px] border-border rounded-[10px] px-4 py-3 text-[14.5px] text-ink focus:border-pink bg-white"
              placeholder="e.g. Lisbon, PT"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-[13px] font-bold text-ink mb-2">Professional Headline</Text>
          <TextInput 
            className="border-[1.5px] border-border rounded-[10px] px-4 py-3 text-[14.5px] text-ink focus:border-pink bg-white"
            placeholder="e.g. Brand Designer & Identity Systems"
            value={headline}
            onChangeText={setHeadline}
          />
        </View>

        <View className="mb-5">
          <Text className="text-[13px] font-bold text-ink mb-2">Short Bio</Text>
          <TextInput 
            className="border-[1.5px] border-border rounded-[10px] px-4 py-3 text-[14.5px] text-ink focus:border-pink bg-white h-24"
            placeholder="A short paragraph — what you do and who you do it for."
            multiline
            textAlignVertical="top"
            value={bio}
            onChangeText={setBio}
          />
        </View>

        <View className="mb-5">
          <Text className="text-[13px] font-bold text-ink mb-2">Availability Status</Text>
          <View className="flex-col lg:flex-row gap-3 w-full">
            <View className="flex-1">
              <RadioCard 
                title="Available"
                description="Ready for new work"
                isSelected={status === 'Available'}
                onSelect={() => setStatus('Available')}
                className="w-full h-full mb-0"
              />
            </View>
            <View className="flex-1">
              <RadioCard 
                title="Busy"
                description="Limited capacity"
                isSelected={status === 'Busy'}
                onSelect={() => setStatus('Busy')}
                className="w-full h-full mb-0"
              />
            </View>
            <View className="flex-1">
              <RadioCard 
                title="Not Available"
                description="Not taking work"
                isSelected={status === 'Not Available'}
                onSelect={() => setStatus('Not Available')}
                className="w-full h-full mb-0"
              />
            </View>
          </View>
        </View>
      </View>

      <View className="w-full lg:w-[320px] mb-8 lg:mb-0 lg:sticky lg:top-6">
        <Text className="text-[12px] font-bold text-gray-muted uppercase tracking-wider mb-2.5">Live Preview</Text>
        {renderLivePreview()}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View className="flex-col-reverse lg:flex-row gap-10 lg:gap-14 items-start w-full">
      <View className="flex-1 w-full">
        <Text className="text-pink font-bold text-[13px] tracking-wider uppercase mb-2">Skills & Category</Text>
        <Text className="text-[28px] font-manrope font-extrabold text-ink mb-2">What do you do best?</Text>
        <Text className="text-[15px] text-gray-body mb-8">Pick one primary category — this is how clients will find you.</Text>

        <View className="mb-7">
          <CategoryGrid 
            options={CATEGORIES} 
            selected={selectedCategory} 
            onChange={handleCategoryChange} 
            singleSelect
          />
        </View>

        <View className="mb-5">
          <Text className="text-[13px] font-bold text-ink mb-2">
            Skills <Text className="font-normal text-gray-muted">— pick up to 8</Text>
          </Text>
          {availableSkillsForCategory.length > 0 ? (
            <MultiSelectChip 
              options={availableSkillsForCategory}
              selected={selectedSkills}
              onChange={setSelectedSkills}
              maxSelection={8}
            />
          ) : (
            <Text className="text-[13.5px] text-gray-muted italic mb-4">Please select a category above to view skills.</Text>
          )}
        </View>

        <View className="mb-5 max-w-[220px]">
          <Text className="text-[13px] font-bold text-ink mb-2">Hourly Rate (USD)</Text>
          <TextInput 
            className="border-[1.5px] border-border rounded-[10px] px-4 py-3 text-[14.5px] text-ink focus:border-pink bg-white"
            placeholder="e.g. 85"
            keyboardType="numeric"
            value={hourlyRate}
            onChangeText={setHourlyRate}
          />
        </View>
      </View>

      <View className="w-full lg:w-[320px] mb-8 lg:mb-0 lg:sticky lg:top-6">
        <Text className="text-[12px] font-bold text-gray-muted uppercase tracking-wider mb-2.5">Live Preview</Text>
        {renderLivePreview()}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View className="flex-col-reverse lg:flex-row gap-10 lg:gap-14 items-start w-full">
      <View className="flex-1 w-full">
        <Text className="text-pink font-bold text-[13px] tracking-wider uppercase mb-2">Portfolio</Text>
        <Text className="text-[28px] font-manrope font-extrabold text-ink mb-2">Show your best work</Text>
        <Text className="text-[15px] text-gray-body mb-8">Add whatever format fits your craft — images, a short video, or links. All optional.</Text>

        <View className="flex-col lg:flex-row gap-5 mb-5 w-full">
          <View className="flex-1">
            <FileUploadDropzone 
              label="Upload Images"
              helperText="PNG or JPG, up to 6 images"
              className="w-full h-full"
            />
          </View>
          <View className="flex-1">
            <FileUploadDropzone 
              label="Upload Showcase Video"
              helperText="Up to 60 seconds, max 100MB"
              className="w-full h-full"
            />
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-[13px] font-bold text-ink mb-2">External Links</Text>
          <TextInput 
            className="border-[1.5px] border-border rounded-[10px] px-4 py-3 text-[14.5px] text-ink focus:border-pink bg-white mb-3"
            placeholder="e.g. YouTube, Behance, GitHub, personal site — https://"
          />
          <Text className="text-pink font-bold text-[13.5px] mb-6">+ Add another link</Text>
          
          <Pressable onPress={handleNext}>
            <Text className="text-[14px] font-semibold text-gray-body">Skip for now →</Text>
          </Pressable>
        </View>
      </View>

      <View className="w-full lg:w-[320px] mb-8 lg:mb-0 lg:sticky lg:top-6">
        <Text className="text-[12px] font-bold text-gray-muted uppercase tracking-wider mb-2.5">Live Preview</Text>
        {renderLivePreview()}
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View className="flex-col-reverse lg:flex-row gap-10 lg:gap-14 items-start w-full">
      <View className="flex-1 w-full">
        <Text className="text-pink font-bold text-[13px] tracking-wider uppercase mb-2">Payout Setup</Text>
        <Text className="text-[28px] font-manrope font-extrabold text-ink mb-2">Where should we send the money?</Text>
        <Text className="text-[15px] text-gray-body mb-8">Set up how you'll get paid once orders start coming in.</Text>

        <View className="flex-row items-start bg-pink-tint rounded-xl p-4 mb-7 gap-3">
          <Text className="text-lg">🛡️</Text>
          <View className="flex-1">
            <Text className="font-bold text-[13.5px] text-ink mb-1">Identity verification unlocks payouts and the verified badge</Text>
            <Text className="text-[12.5px] text-gray-body">This is a mocked step for now — no real KYC integration yet.</Text>
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-[13px] font-bold text-ink mb-2">Payout Method</Text>
          <View className="flex-col lg:flex-row gap-3 w-full">
            <View className="flex-1">
              <RadioCard 
                title="🏦 Bank Transfer"
                description="2–3 business days"
                isSelected={payoutMethod === 'Bank Transfer'}
                onSelect={() => setPayoutMethod('Bank Transfer')}
                className="w-full h-full mb-0"
              />
            </View>
            <View className="flex-1">
              <RadioCard 
                title="💳 PayPal"
                description="Instant"
                isSelected={payoutMethod === 'PayPal'}
                onSelect={() => setPayoutMethod('PayPal')}
                className="w-full h-full mb-0"
              />
            </View>
            <View className="flex-1">
              <RadioCard 
                title="🌐 Wise"
                description="1–2 business days"
                isSelected={payoutMethod === 'Wise'}
                onSelect={() => setPayoutMethod('Wise')}
                className="w-full h-full mb-0"
              />
            </View>
          </View>
        </View>

        <View className="flex-col lg:flex-row gap-5 mb-5 w-full">
          <View className="flex-1">
            <Text className="text-[13px] font-bold text-ink mb-2">Account Holder Name</Text>
            <TextInput 
              className="border-[1.5px] border-border rounded-[10px] px-4 py-3 text-[14.5px] text-ink focus:border-pink bg-white"
              placeholder="Full legal name"
              value={accountName}
              onChangeText={setAccountName}
            />
          </View>
          <View className="flex-1">
            <Text className="text-[13px] font-bold text-ink mb-2">IBAN / Account Number</Text>
            <TextInput 
              className="border-[1.5px] border-border rounded-[10px] px-4 py-3 text-[14.5px] text-ink focus:border-pink bg-white"
              placeholder="PT50 •••• •••• 4417"
              value={accountNumber}
              onChangeText={setAccountNumber}
            />
          </View>
        </View>
        
        <View className="mb-5 max-w-[280px]">
          <Text className="text-[13px] font-bold text-ink mb-2">Tax Country</Text>
          <TextInput 
            className="border-[1.5px] border-border rounded-[10px] px-4 py-3 text-[14.5px] text-ink focus:border-pink bg-white"
            placeholder="e.g. Portugal"
            value={taxCountry}
            onChangeText={setTaxCountry}
          />
        </View>
      </View>

      <View className="w-full lg:w-[320px] mb-8 lg:mb-0 lg:sticky lg:top-6">
        <Text className="text-[12px] font-bold text-gray-muted uppercase tracking-wider mb-2.5">Live Preview</Text>
        {renderLivePreview()}
      </View>
    </View>
  );

  return (
    <WizardLayout
      currentStep={step}
      totalSteps={totalSteps}
      title=""
      onNext={handleNext}
      onBack={handleBack}
      nextLabel={step === totalSteps ? "Finish Setup →" : "Continue →"}
    >
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
    </WizardLayout>
  );
}
