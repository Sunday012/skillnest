import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { WizardLayout } from '../../src/components/onboarding/WizardLayout';
import { Input } from '../../src/components/Input';
import { RadioCard } from '../../src/components/form/RadioCard';
import { MultiSelectChip } from '../../src/components/form/MultiSelectChip';
import { FileUploadDropzone } from '../../src/components/form/FileUploadDropzone';

const CATEGORIES = [
  'Videography', 'Video Editing', 'Photography', 'Graphic Design', 
  'Web Design', 'Software Development', 'Script Writing', 'Copywriting', 
  'UGC Creation', 'Animation', 'Voice Over', 'Social Media Management', 
  'Digital Marketing', 'Virtual Assistance', 'Other Digital Skills'
];

const SKILLS_MOCK = [
  'Premiere Pro', 'DaVinci Resolve', 'After Effects', 'Photoshop', 
  'Illustrator', 'Figma', 'React', 'Node.js', 'SEO', 'Copywriting'
];

export default function FreelancerOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Step 1 State
  const [displayName, setDisplayName] = useState('');
  const [headline, setHeadline] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [availability, setAvailability] = useState('');

  // Step 2 State
  const [category, setCategory] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [hourlyRate, setHourlyRate] = useState('');

  // Step 3 State
  const [portfolioLinks, setPortfolioLinks] = useState('');

  // Step 4 State
  const [payoutMethod, setPayoutMethod] = useState('');
  const [accountDetails, setAccountDetails] = useState('');
  const [taxCountry, setTaxCountry] = useState('');

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

  const handleSkip = () => {
    if (step === 3) {
      setStep(4);
    }
  };

  const renderStep1 = () => (
    <View>
      <Input label="Display Name" placeholder="e.g. David O." value={displayName} onChangeText={setDisplayName} />
      <Input label="Professional Headline" placeholder="e.g. Senior Video Editor" value={headline} onChangeText={setHeadline} />
      <Input label="Location" placeholder="e.g. London, UK" value={location} onChangeText={setLocation} />
      <Input label="Short Bio" placeholder="Tell clients about your experience..." multiline numberOfLines={4} className="h-32" value={bio} onChangeText={setBio} />
      
      <Text className="font-bold text-ink mb-3 mt-4">Availability Status</Text>
      <RadioCard title="Available" description="Open to new jobs and gigs." isSelected={availability === 'Available'} onSelect={() => setAvailability('Available')} />
      <RadioCard title="Busy" description="Currently working, but open to future projects." isSelected={availability === 'Busy'} onSelect={() => setAvailability('Busy')} />
      <RadioCard title="Not Available" description="Not taking any new work right now." isSelected={availability === 'Not Available'} onSelect={() => setAvailability('Not Available')} />
    </View>
  );

  const renderStep2 = () => (
    <View>
      <Text className="font-bold text-ink mb-3">Primary Category</Text>
      <View className="mb-6">
        {CATEGORIES.map(cat => (
          <RadioCard key={cat} title={cat} isSelected={category === cat} onSelect={() => setCategory(cat)} />
        ))}
      </View>
      
      <Text className="font-bold text-ink mb-3">Skills (Max 8)</Text>
      <MultiSelectChip 
        options={SKILLS_MOCK} 
        selected={skills} 
        onChange={setSkills} 
        maxSelection={8}
        className="mb-6"
      />

      <Input label="Hourly Rate ($)" placeholder="e.g. 50" keyboardType="numeric" value={hourlyRate} onChangeText={setHourlyRate} />
    </View>
  );

  const renderStep3 = () => (
    <View>
      <Text className="text-gray-body mb-6">
        Showcase your best work. You can add images, a video showreel, or link to external platforms. 
        Different skills need different formats — use what works best for you.
      </Text>

      <Text className="font-bold text-ink mb-3">Images / Screenshots</Text>
      <FileUploadDropzone label="Upload Images" helperText="JPG, PNG up to 10MB" className="mb-6" />

      <Text className="font-bold text-ink mb-3">Showcase Video</Text>
      <FileUploadDropzone label="Upload Video" helperText="MP4, MOV up to 60 seconds (Max 50MB)" className="mb-6" />

      <Input 
        label="External Portfolio Links" 
        placeholder="YouTube, Vimeo, Behance, GitHub..." 
        multiline 
        className="h-24"
        value={portfolioLinks}
        onChangeText={setPortfolioLinks}
      />
    </View>
  );

  const renderStep4 = () => (
    <View>
      <View className="bg-pink-tint rounded-xl p-4 mb-8 flex-row items-center">
        <View className="h-10 w-10 bg-pink rounded-full items-center justify-center mr-4">
          <Text className="text-white font-extrabold text-lg">✓</Text>
        </View>
        <View className="flex-1">
          <Text className="font-bold text-ink">KYC Verification</Text>
          <Text className="text-sm text-gray-body">You'll need to verify your identity before withdrawing funds. We'll handle this later.</Text>
        </View>
      </View>

      <Text className="font-bold text-ink mb-3">Payout Method</Text>
      <RadioCard title="Bank Transfer" isSelected={payoutMethod === 'Bank Transfer'} onSelect={() => setPayoutMethod('Bank Transfer')} />
      <RadioCard title="PayPal" isSelected={payoutMethod === 'PayPal'} onSelect={() => setPayoutMethod('PayPal')} />
      <RadioCard title="Crypto (USDT)" isSelected={payoutMethod === 'Crypto'} onSelect={() => setPayoutMethod('Crypto')} />

      <View className="mt-4">
        <Input label="Account Details / Email" placeholder="Enter details..." value={accountDetails} onChangeText={setAccountDetails} />
        <Input label="Tax Country" placeholder="e.g. United Kingdom" value={taxCountry} onChangeText={setTaxCountry} />
      </View>
    </View>
  );

  const stepTitles = [
    "Let's set up your profile",
    "What's your main skill?",
    "Show your work",
    "How do you want to get paid?"
  ];

  return (
    <WizardLayout
      currentStep={step}
      totalSteps={totalSteps}
      title={stepTitles[step - 1]}
      onNext={handleNext}
      onBack={handleBack}
      nextLabel={step === totalSteps ? "Complete Setup" : "Continue"}
      onSkip={step === 3 ? handleSkip : undefined}
    >
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
    </WizardLayout>
  );
}
