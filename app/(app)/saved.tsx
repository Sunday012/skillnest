import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSaved, SavedGig, SavedTalent } from '../../src/context/SavedContext';
import { AppIcon } from '../../src/components/AppIcon';

export default function SavedScreen() {
  const router = useRouter();
  const { savedGigs, savedTalents, toggleSaveGig, toggleSaveTalent, clearSaved } = useSaved();
  const [activeTab, setActiveTab] = useState<'gigs' | 'talent'>('gigs');

  const handleClearAll = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Clear all saved items? This cannot be undone.')) {
        clearSaved();
      }
    } else {
      Alert.alert(
        'Clear all saved items?',
        'This cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Clear All', style: 'destructive', onPress: clearSaved },
        ]
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 64 }}>
      <View style={styles.wrapper}>
        
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.pageTitle}>Saved & Favorites</Text>
            <Text style={styles.subtitle}>Your bookmarked talent profiles & gig packages</Text>
          </View>

          {(savedGigs.length > 0 || savedTalents.length > 0) && (
            <Pressable style={styles.clearBtn} onPress={handleClearAll}>
              <Text style={styles.clearText}>Clear all</Text>
            </Pressable>
          )}
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabBar}>
          <Pressable
            style={[styles.tabItem, activeTab === 'gigs' && styles.tabItemActive]}
            onPress={() => setActiveTab('gigs')}
          >
            <Text style={[styles.tabText, activeTab === 'gigs' && styles.tabTextActive]}>
              Saved Gigs ({savedGigs.length})
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tabItem, activeTab === 'talent' && styles.tabItemActive]}
            onPress={() => setActiveTab('talent')}
          >
            <Text style={[styles.tabText, activeTab === 'talent' && styles.tabTextActive]}>
              Saved Talent ({savedTalents.length})
            </Text>
          </Pressable>
        </View>

        {/* Tab Content */}
        {activeTab === 'gigs' ? (
          <View style={styles.listSection}>
            {savedGigs.length === 0 ? (
              <View style={styles.emptyCard}>
                <AppIcon name="heart-outline" size={34} color="#93A0B4" />
                <Text style={styles.emptyTitle}>No saved gigs yet</Text>
                <Text style={styles.emptySubtitle}>
                  Bookmark packages while browsing to compare services later.
                </Text>
                <Pressable
                  style={styles.ctaBtn}
                  onPress={() => router.push('/home' as any)}
                >
                  <Text style={styles.ctaText}>Browse Marketplace</Text>
                </Pressable>
              </View>
            ) : (
              savedGigs.map(gig => (
                <View key={gig.id} style={styles.savedGigCard}>
                  <View style={styles.gigMainInfo}>
                    <View style={styles.gigTitleRow}>
                      <Text style={styles.gigTitle} numberOfLines={1}>
                        {gig.title}
                      </Text>
                      <Pressable
                        onPress={() => toggleSaveGig(gig)}
                        hitSlop={8}
                        style={{ padding: 4 }}
                      >
                        <AppIcon name="heart" size={19} color="#EC1257" />
                      </Pressable>
                    </View>

                    <Text style={styles.sellerName}>by {gig.sellerName}</Text>

                    <View style={styles.metaRow}>
                      <Text style={styles.ratingText}>★ {gig.sellerRating || gig.rating || 5.0}</Text>
                      <Text style={styles.dotSep}>·</Text>
                      <Text style={styles.metaText}>{gig.deliveryTime || '3 days'} delivery</Text>
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.priceText}>${gig.price}</Text>
                    <Pressable
                      style={styles.viewBtn}
                      onPress={() => router.push(`/gig/${gig.id}` as any)}
                    >
                      <Text style={styles.viewBtnText}>View Gig</Text>
                    </Pressable>
                  </View>
                </View>
              ))
            )}
          </View>
        ) : (
          <View style={styles.listSection}>
            {savedTalents.length === 0 ? (
              <View style={styles.emptyCard}>
                <AppIcon name="heart-outline" size={34} color="#93A0B4" />
                <Text style={styles.emptyTitle}>No saved talent yet</Text>
                <Text style={styles.emptySubtitle}>
                  Save talent profiles to build your roster for upcoming projects.
                </Text>
                <Pressable
                  style={styles.ctaBtn}
                  onPress={() => router.push('/browse' as any)}
                >
                  <Text style={styles.ctaText}>Browse Talent</Text>
                </Pressable>
              </View>
            ) : (
              savedTalents.map(talent => (
                <View key={talent.id} style={styles.savedTalentCard}>
                  <View style={styles.talentTopRow}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{talent.initial}</Text>
                    </View>

                    <View style={styles.talentMeta}>
                      <View style={styles.talentNameRow}>
                        <Text style={styles.talentName}>{talent.name}</Text>
                        {talent.isVerified && <AppIcon name="checkmark-circle" size={14} color="#EC1257" />}
                      </View>
                      <Text style={styles.talentRole}>{talent.role}</Text>
                      <Text style={styles.talentStats}>
                        ★ {talent.rating} ({talent.reviews} reviews)
                      </Text>
                    </View>

                    <Pressable
                      onPress={() => toggleSaveTalent(talent)}
                      hitSlop={8}
                      style={{ padding: 4 }}
                    >
                      <AppIcon name="heart" size={19} color="#EC1257" />
                    </Pressable>
                  </View>

                  <View style={styles.talentCardFooter}>
                    <Text style={styles.talentPrice}>${talent.price}/hr</Text>
                    <Pressable
                      style={styles.viewBtn}
                      onPress={() => router.push(`/talent/${talent.id}` as any)}
                    >
                      <Text style={styles.viewBtnText}>View Profile</Text>
                    </Pressable>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  wrapper: {
    maxWidth: 880,
    width: '100%',
    alignSelf: 'center',
    padding: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 12,
  },
  pageTitle: {
    fontSize: 28,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
  },
  subtitle: {
    fontSize: 13.5,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  clearBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  clearText: {
    color: '#EC1257',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#E7E9F1',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabItemActive: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 13.5,
    fontFamily: 'Inter_600SemiBold',
    color: '#5B6472',
  },
  tabTextActive: {
    color: '#10172A',
  },
  listSection: {
    gap: 16,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 32,
    color: '#93A0B4',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13.5,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaBtn: {
    backgroundColor: '#10172A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontFamily: 'Inter_600SemiBold',
  },
  savedGigCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  gigMainInfo: {
    gap: 4,
  },
  gigTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  gigTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
  },
  sellerName: {
    fontSize: 13,
    color: '#5B6472',
    fontFamily: 'Inter_500Medium',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  ratingText: {
    fontSize: 12.5,
    fontFamily: 'Inter_600SemiBold',
    color: '#10172A',
  },
  dotSep: {
    color: '#93A0B4',
  },
  metaText: {
    fontSize: 12.5,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F6F7FB',
    paddingTop: 12,
  },
  priceText: {
    fontSize: 18,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
  },
  viewBtn: {
    backgroundColor: '#10172A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewBtnText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontFamily: 'Inter_600SemiBold',
  },
  savedTalentCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  talentTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0B1220',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
  },
  talentMeta: {
    flex: 1,
  },
  talentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  talentName: {
    fontSize: 16,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
  },
  verifiedTag: {
    color: '#EC1257',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  talentRole: {
    fontSize: 13,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  talentStats: {
    fontSize: 12.5,
    color: '#10172A',
    fontFamily: 'Inter_500Medium',
    marginTop: 4,
  },
  talentCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F6F7FB',
    paddingTop: 12,
  },
  talentPrice: {
    fontSize: 17,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
  },
});
