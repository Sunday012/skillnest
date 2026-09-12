import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { CATEGORIES, FEATURED_TALENT, LATEST_JOBS } from '../../src/constants/discoveryData';
import { TalentCard } from '../../src/components/discovery/TalentCard';
import { CategoryChip } from '../../src/components/discovery/CategoryChip';
import { JobCard } from '../../src/components/discovery/JobCard';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-bg-alt" contentContainerStyle={{ paddingBottom: 64 }}>
      <View className="px-6 py-9 max-w-[1180px] w-full self-center">
        
        <Text className="text-[13.5px] text-gray-body mb-1">
          Good afternoon, <Text className="text-ink font-bold">Mira</Text> — here's what's happening today.
        </Text>

        {/* Split Cards */}
        <View className="flex-col md:flex-row gap-5 my-5 mb-11">
          <Pressable 
            className="flex-1 bg-navy rounded-[18px] p-8 min-h-[170px] justify-between"
            onPress={() => router.push('/(app)/browse')}
          >
            <View>
              <Text className="text-[26px] mb-3.5">🔎</Text>
              <Text className="text-white font-manrope-bold text-[22px] mb-1.5">Find Talent</Text>
              <Text className="text-white/80 text-[14px] max-w-[280px]">I need someone to do a job — browse vetted freelancers by category.</Text>
            </View>
            <Text className="text-white font-inter-bold text-[20px] self-end mt-4">→</Text>
          </Pressable>

          <Pressable className="flex-1 bg-pink-tint rounded-[18px] p-8 min-h-[170px] justify-between">
            <View>
              <Text className="text-[26px] mb-3.5">💼</Text>
              <Text className="text-ink font-manrope-bold text-[22px] mb-1.5">Find Work</Text>
              <Text className="text-ink/80 text-[14px] max-w-[280px]">I have a skill and I'm looking for opportunities — browse open jobs.</Text>
            </View>
            <Text className="text-ink font-inter-bold text-[20px] self-end mt-4">→</Text>
          </Pressable>
        </View>

        {/* Explore Skills */}
        <View className="mb-12">
          <View className="flex-row justify-between items-baseline mb-5">
            <Text className="font-manrope-extraBold text-[21px] text-ink">Explore Skills</Text>
            <Pressable>
              <Text className="font-inter-bold text-[13.5px] text-pink">View all →</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
            {CATEGORIES.map(cat => (
              <CategoryChip key={cat.id} category={cat} />
            ))}
          </ScrollView>
        </View>

        {/* Featured Talent */}
        <View className="mb-12">
          <View className="flex-row justify-between items-baseline mb-5">
            <Text className="font-manrope-extraBold text-[21px] text-ink">Featured Talent</Text>
            <Pressable onPress={() => router.push('/(app)/browse')}>
              <Text className="font-inter-bold text-[13.5px] text-pink">View all →</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
            {FEATURED_TALENT.map(talent => (
              <View key={talent.id} className="w-[300px]">
                <TalentCard talent={talent} layout="grid" />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Latest Jobs */}
        <View className="mb-12">
          <View className="flex-row justify-between items-baseline mb-5">
            <Text className="font-manrope-extraBold text-[21px] text-ink">Latest Jobs</Text>
            <Pressable>
              <Text className="font-inter-bold text-[13.5px] text-pink">View all →</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
            {LATEST_JOBS.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </ScrollView>
        </View>

      </View>
    </ScrollView>
  );
}
