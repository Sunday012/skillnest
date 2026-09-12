import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface JobCardProps {
  job: any;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Pressable className="bg-white border border-border rounded-[16px] p-[22px] w-[280px] md:w-auto md:flex-1">
      <View className="self-start bg-pink-tint px-2.5 py-1 rounded-full mb-3">
        <Text className="text-pink-dark text-[11px] font-inter-bold">{job.tag}</Text>
      </View>
      <Text className="font-manrope-bold text-[16px] text-ink mb-2" numberOfLines={2}>{job.title}</Text>
      <Text className="text-[12.5px] text-gray-body mb-4">{job.meta}</Text>
      <View className="flex-row justify-between items-center border-t border-border pt-3.5">
        <Text className="text-[13px] text-ink">{job.proposals} proposals</Text>
        <Text className="font-manrope-extraBold text-[16px] text-ink">{job.budget}</Text>
      </View>
    </Pressable>
  );
}
