import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MOCK_GIGS, MOCK_GIG_STATS } from '../../src/constants/sellingData';
import { GigTableRow } from '../../src/components/selling/GigTableRow';

export default function MyGigsScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-bg-alt" contentContainerStyle={{ paddingBottom: 64 }}>
      <View className="px-6 py-9 max-w-[1180px] w-full self-center">
        
        {/* Header */}
        <View style={styles.dashHead}>
          <View style={styles.headTextWrap}>
            <Text style={styles.title}>My Gigs</Text>
            <Text style={styles.subtitle}>
              Four listings, two categories. Pause anything you can't take on right now.
            </Text>
          </View>
          <Pressable
            style={styles.btnPink}
            onPress={() => router.push('/(app)/gigs/create')}
          >
            <Text style={styles.btnPinkText}>+ Create a Gig</Text>
          </Pressable>
        </View>

        {/* Gig Table */}
        <View style={styles.tableCard}>
          <GigTableRow isHeader gig={MOCK_GIGS[0]} onPress={() => {}} />
          {MOCK_GIGS.map(gig => (
            <GigTableRow
              key={gig.id}
              gig={gig}
              onPress={() => router.push(`/(app)/gig/${gig.id}` as any)}
            />
          ))}
        </View>

        {/* Performance Stat Cards */}
        <View style={styles.statsGrid}>
          {MOCK_GIG_STATS.map(stat => (
            <View key={stat.id} style={styles.statCard}>
              <Text style={styles.statVal}>{stat.val}</Text>
              <Text style={styles.statLbl}>{stat.lbl}</Text>
              <Text style={styles.statDelta}>{stat.delta}</Text>
            </View>
          ))}
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dashHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 28,
    flexWrap: 'wrap',
    gap: 16,
  },
  headTextWrap: {
    flex: 1,
    minWidth: 260,
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
  tableCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
  },
  statCard: {
    flex: 1,
    minWidth: 240,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 20,
  },
  statVal: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 26,
    color: '#10172A',
  },
  statLbl: {
    fontSize: 12.5,
    color: '#93A0B4',
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 4,
  },
  statDelta: {
    fontSize: 12,
    color: '#17A34A',
    fontFamily: 'Inter_700Bold',
    marginTop: 6,
  },
});
