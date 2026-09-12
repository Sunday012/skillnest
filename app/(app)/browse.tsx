import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import { FEATURED_TALENT } from '../../src/constants/discoveryData';
import { TalentCard } from '../../src/components/discovery/TalentCard';

export default function BrowseScreen() {
  const [availableNow, setAvailableNow] = useState(true);
  const [kycVerified, setKycVerified] = useState(false);

  return (
    <ScrollView className="flex-1 bg-bg-alt" contentContainerStyle={{ paddingBottom: 64 }}>
      <View className="px-6 py-9 max-w-[1180px] w-full self-center">
        
        <View className="mb-7">
          <Text className="font-manrope-extraBold text-[28px] text-ink mb-2">Browse Talent</Text>
          <Text className="text-[14.5px] text-gray-body">Every freelancer below has completed identity checks or is in review.</Text>
        </View>

        <View className="flex-col md:flex-row gap-8">
          {/* Mobile top filter bar / Desktop Sidebar */}
          <View className="md:w-[260px] bg-white border border-border rounded-[14px] p-5 self-start w-full">
            <Text className="text-[13px] uppercase tracking-wider text-gray-muted font-inter-bold mb-3.5">Search</Text>
            <TextInput 
              placeholder="Search by skill or name"
              className="border-[1.5px] border-border rounded-[10px] py-2.5 px-3 text-[13.5px] mb-5"
            />

            <Text className="text-[13px] uppercase tracking-wider text-gray-muted font-inter-bold mb-3.5">Preferences</Text>
            
            <View className="flex-row justify-between items-center mb-3.5">
              <Text className="text-[13.5px] font-inter-semiBold text-ink">Available now</Text>
              <Pressable 
                onPress={() => setAvailableNow(!availableNow)}
                className={`w-[38px] h-[22px] rounded-full justify-center px-[3px] transition-colors ${availableNow ? 'bg-pink' : 'bg-border'}`}
              >
                <View className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${availableNow ? 'translate-x-4' : 'translate-x-0'}`} />
              </Pressable>
            </View>
            
            <View className="flex-row justify-between items-center">
              <Text className="text-[13.5px] font-inter-semiBold text-ink">KYC-verified only</Text>
              <Pressable 
                onPress={() => setKycVerified(!kycVerified)}
                className={`w-[38px] h-[22px] rounded-full justify-center px-[3px] transition-colors ${kycVerified ? 'bg-pink' : 'bg-border'}`}
              >
                <View className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${kycVerified ? 'translate-x-4' : 'translate-x-0'}`} />
              </Pressable>
            </View>
          </View>

          {/* List */}
          <View className="flex-1 flex-col gap-4">
            {FEATURED_TALENT.map(talent => (
              <TalentCard key={talent.id} talent={talent} layout="row" />
            ))}
          </View>
        </View>

      </View>
    </ScrollView>
  );
}
