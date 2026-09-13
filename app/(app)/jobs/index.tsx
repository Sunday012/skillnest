import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MOCK_JOBS, JobItem } from '../../../src/constants/buyingData';

export default function MyJobsScreen() {
  const router = useRouter();

  const getStatusStyle = (status: JobItem['status']) => {
    switch (status) {
      case 'Active':
        return { bg: '#DCFCE7', text: '#166534' };
      case 'In Progress':
        return { bg: '#FDE8EF', text: '#C10E48' };
      case 'Draft':
        return { bg: '#FEF3C7', text: '#92400E' };
      default:
        return { bg: '#F6F7FB', text: '#5B6472' };
    }
  };

  return (
    <ScrollView className="flex-1 bg-bg-alt" contentContainerStyle={{ paddingBottom: 64 }}>
      <View className="px-6 py-9 max-w-[1180px] w-full self-center">
        
        {/* Header */}
        <View style={styles.jobsHead}>
          <View>
            <Text style={styles.title}>My Jobs</Text>
            <Text style={styles.subtitle}>Posted briefs and the proposals they've attracted.</Text>
          </View>
          <Pressable style={styles.btnPink} onPress={() => router.push('/jobs/create')}>
            <Text style={styles.btnPinkText}>+ Post a Job</Text>
          </Pressable>
        </View>

        {/* Jobs List */}
        {MOCK_JOBS.map((job) => {
          const statusStyle = getStatusStyle(job.status);
          return (
            <Pressable
              key={job.id}
              style={styles.jobPostCard}
              onPress={() => router.push(`/jobs/${job.id}` as any)}
            >
              <View style={styles.cardLeft}>
                <Text style={styles.metaTop}>
                  {job.metaCode} · {job.category} · {job.postedTime}
                </Text>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobDescription}>{job.description}</Text>
                <Text style={styles.proposalsCount}>
                  {job.proposalsCount} proposal{job.proposalsCount === 1 ? '' : 's'} received
                </Text>
              </View>

              <View style={styles.cardRight}>
                <View style={[styles.statusPill, { backgroundColor: statusStyle.bg }]}>
                  <Text style={[styles.statusPillText, { color: statusStyle.text }]}>
                    {job.status}
                  </Text>
                </View>
                <Text style={styles.jobBudget}>{job.budget}</Text>
              </View>
            </Pressable>
          );
        })}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  jobsHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 28,
    flexWrap: 'wrap',
    gap: 16,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
  },
  btnPink: {
    backgroundColor: '#EC1257',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  btnPinkText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 14.5,
  },
  jobPostCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 22,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 16,
  },
  cardLeft: {
    flex: 1,
    minWidth: 280,
  },
  cardRight: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  metaTop: {
    fontSize: 12.5,
    color: '#93A0B4',
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 17,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
    marginBottom: 8,
  },
  jobDescription: {
    fontSize: 13.5,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
    maxWidth: 560,
    marginBottom: 14,
    lineHeight: 20,
  },
  proposalsCount: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    color: '#10172A',
  },
  statusPill: {
    paddingHorizontal: 11,
    paddingVertical: 4,
    borderRadius: 100,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  statusPillText: {
    fontSize: 11.5,
    fontFamily: 'Inter_700Bold',
  },
  jobBudget: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 18,
    color: '#10172A',
  },
});
