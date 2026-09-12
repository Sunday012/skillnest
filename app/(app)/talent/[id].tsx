import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FEATURED_TALENT, PORTFOLIO_ITEMS, REVIEWS } from '../../../src/constants/discoveryData';
import { PortfolioItem } from '../../../src/components/discovery/PortfolioItem';

export default function TalentProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  // Look up the talent by id from the mock data
  const talent = FEATURED_TALENT.find(t => t.id === id);

  if (!talent) {
    return (
      <View className="flex-1 items-center justify-center bg-bg-alt">
        <Text className="text-[18px] font-manrope-bold text-ink mb-2">Profile not found</Text>
        <Text className="text-gray-body mb-6">No talent with id "{id}" exists in mock data.</Text>
        <Pressable onPress={() => router.back()} className="bg-pink px-6 py-3 rounded-[10px]">
          <Text className="text-white font-inter-bold text-[14px]">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const statusColor =
    talent.status === 'available' ? 'bg-green' :
    talent.status === 'busy' ? 'bg-[#F5A623]' : 'bg-gray-muted';

  return (
    <ScrollView className="flex-1 bg-bg-alt" contentContainerStyle={{ paddingBottom: 64 }}>
      <View className="px-6 py-9 max-w-[1180px] w-full self-center">

        {/* Back button */}
        <Pressable onPress={() => router.back()} className="mb-4 self-start">
          <Text className="text-[14px] font-inter-bold text-gray-body">← Back</Text>
        </Pressable>

        {/* Banner */}
        <View className="h-[150px] rounded-[18px] bg-pink -mb-[46px] overflow-hidden">
          <View className="absolute inset-0 opacity-80" style={{ backgroundColor: '#0B1220' }} />
        </View>

        {/* Header */}
        <View className="flex-col md:flex-row md:items-end gap-5 px-2 mb-6">
          <View className="w-[92px] h-[92px] rounded-full bg-navy border-[4px] border-white items-center justify-center shrink-0">
            <Text className="text-white text-[30px] font-manrope-extraBold">{talent.initial}</Text>
          </View>

          <View className="flex-1 pb-1.5">
            <View className="flex-row items-center gap-2 mb-1">
              <Text className="font-manrope-bold text-[24px] text-ink">{talent.name}</Text>
              {talent.isVerified && <Text className="text-pink text-[16px]">✓</Text>}
            </View>
            <Text className="text-[14px] text-gray-body">{talent.role} · {talent.location}</Text>
          </View>

          <View className="flex-row gap-2.5 pb-1.5">
            <Pressable className="bg-white border-[1.5px] border-border px-5 py-2.5 rounded-[10px]">
              <Text className="font-inter-bold text-[14px] text-ink">Message</Text>
            </Pressable>
            <Pressable className="bg-pink px-[22px] py-2.5 rounded-[10px]">
              <Text className="font-inter-bold text-[14px] text-white">Hire {talent.name.split(' ')[0]}</Text>
            </Pressable>
          </View>
        </View>

        {/* Stat Bar */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-9">
          <View className="flex-row bg-white border border-border rounded-[14px] py-5 px-2 min-w-full">
            <View className="flex-1 items-center justify-center px-4">
              <Text className="font-manrope-extraBold text-[19px] text-ink">{talent.rating}</Text>
              <Text className="text-[11.5px] uppercase tracking-wider text-gray-muted mt-1">Rating</Text>
            </View>
            <View className="flex-1 items-center justify-center px-4 border-l border-border">
              <Text className="font-manrope-extraBold text-[19px] text-ink">{talent.completion}%</Text>
              <Text className="text-[11.5px] uppercase tracking-wider text-gray-muted mt-1">Completion</Text>
            </View>
            <View className="flex-1 items-center justify-center px-4 border-l border-border">
              <Text className="font-manrope-extraBold text-[19px] text-ink">${talent.price}/hr</Text>
              <Text className="text-[11.5px] uppercase tracking-wider text-gray-muted mt-1">Rate</Text>
            </View>
            <View className="flex-1 items-center justify-center px-4 border-l border-border">
              <View className="flex-row items-center gap-1.5">
                <View className={`w-1.5 h-1.5 rounded-full ${statusColor}`} />
                <Text className="font-manrope-extraBold text-[19px] text-ink capitalize">{talent.status}</Text>
              </View>
              <Text className="text-[11.5px] uppercase tracking-wider text-gray-muted mt-1">Status</Text>
            </View>
            <View className="flex-1 items-center justify-center px-4 border-l border-border">
              <Text className="font-manrope-extraBold text-[19px] text-ink">
                {talent.isVerified ? '✓ Verified' : '— '}
              </Text>
              <Text className="text-[11.5px] uppercase tracking-wider text-gray-muted mt-1">Identity</Text>
            </View>
          </View>
        </ScrollView>

        <View className="flex-col md:flex-row gap-8">
          {/* Main Content */}
          <View className="flex-1">
            <View className="mb-9">
              <Text className="font-manrope-bold text-[18px] text-ink mb-3">About</Text>
              <Text className="text-[14.5px] text-gray-body mb-4 leading-relaxed">{talent.about}</Text>

              <View className="flex-row flex-wrap gap-1.5 mb-5">
                {talent.tags.map(tag => (
                  <View key={tag} className="bg-pink-tint px-2.5 py-1 rounded-full">
                    <Text className="text-pink-dark text-[11px] font-inter-bold">{tag}</Text>
                  </View>
                ))}
              </View>

              <View className="flex-row flex-wrap gap-2.5">
                <Pressable className="flex-row items-center gap-1.5 bg-bg-alt border border-border px-3.5 py-2 rounded-full">
                  <Text className="text-[13px] font-inter-semiBold">▶ YouTube</Text>
                </Pressable>
                <Pressable className="flex-row items-center gap-1.5 bg-bg-alt border border-border px-3.5 py-2 rounded-full">
                  <Text className="text-[13px] font-inter-semiBold">🎨 Behance</Text>
                </Pressable>
                <Pressable className="flex-row items-center gap-1.5 bg-bg-alt border border-border px-3.5 py-2 rounded-full">
                  <Text className="text-[13px] font-inter-semiBold">🌐 Portfolio Site</Text>
                </Pressable>
              </View>
            </View>

            <View className="mb-9">
              <Text className="font-manrope-bold text-[18px] text-ink mb-3">Portfolio</Text>
              <View className="flex-row flex-wrap gap-3">
                {PORTFOLIO_ITEMS.map(item => (
                  <View key={item.id} className="w-[calc(33.33%-8px)] min-w-[100px] flex-1">
                    <PortfolioItem item={item} />
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Sidebar */}
          <View className="md:w-[300px]">
            <View className="bg-white border border-border rounded-[14px] p-5 mb-5">
              <Text className="font-manrope-bold text-[14px] text-ink mb-3.5">Services</Text>
              <Text className="text-[13.5px] font-inter-bold text-ink mb-1">Complete brand identity & logo system</Text>
              <Text className="text-[12.5px] text-gray-body mb-2.5">★ {talent.rating} ({talent.reviews}) · 3-day delivery</Text>
              <Text className="font-manrope-extraBold text-[14px] text-ink">Starting at $450</Text>
            </View>

            <View className="bg-white border border-border rounded-[14px] p-5">
              <Text className="font-manrope-bold text-[14px] text-ink mb-3.5">Reviews ({talent.reviews})</Text>
              {REVIEWS.map((review, i) => (
                <View key={review.id} className={`${i !== REVIEWS.length - 1 ? 'border-b border-border pb-3.5 mb-3.5' : ''}`}>
                  <Text className="text-[13px] font-inter-bold text-ink">{review.who}</Text>
                  <Text className="text-[#F5A623] text-[12px] mb-1.5">{review.stars}</Text>
                  <Text className="text-[12.5px] text-gray-body">{review.text}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}
