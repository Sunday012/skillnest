import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getGigById, REVIEWS } from '../../../src/constants/sellingData';
import { PackageCard } from '../../../src/components/selling/PackageCard';

export default function GigDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { gig, isOwner } = getGigById(id || '1');

  return (
    <ScrollView className="flex-1 bg-bg-alt" contentContainerStyle={{ paddingBottom: 64 }}>
      <View className="px-6 py-9 max-w-[1180px] w-full self-center">
        
        {/* Breadcrumb */}
        <Text style={styles.crumb}>
          Discover / <Text style={styles.crumbSpan}>{gig.category}</Text>
        </Text>

        {/* Title */}
        <Text style={styles.detailTitle}>{gig.title}</Text>

        {/* Seller Row */}
        <View style={styles.sellerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>M</Text>
          </View>
          <Text style={styles.sellerName}>{gig.sellerName}</Text>
          <Text style={styles.verifiedTag}>✓ Verified</Text>
          <Text style={styles.sellerStats}>★ {gig.sellerRating} ({gig.sellerReviewsCount}) · {gig.sellerOrdersCount} orders completed</Text>
        </View>

        {/* Detail Layout Grid */}
        <View style={styles.detailGrid}>
          
          {/* Main Content Side */}
          <View style={styles.mainCol}>
            
            {/* Gallery Main */}
            <View style={styles.galleryMain} />

            {/* Gallery Thumb Strip */}
            <View style={styles.galleryStrip}>
              <View style={styles.thumbItem} />
              <View style={styles.thumbItem} />
              <View style={styles.thumbItem} />
              <View style={styles.thumbItem} />
            </View>

            {/* About this gig */}
            <View style={styles.aboutBlock}>
              <Text style={styles.sectionTitle}>About this gig</Text>
              <Text style={styles.paragraph}>{gig.description}</Text>
            </View>

            {/* Packages */}
            <View style={styles.aboutBlock}>
              <Text style={styles.sectionTitle}>Packages</Text>
              <View style={styles.pkgGrid}>
                {gig.packages.map(pkg => (
                  <PackageCard
                    key={pkg.id}
                    packageTier={pkg}
                    onSelect={() => {}}
                  />
                ))}
              </View>
            </View>

            {/* Reviews */}
            <View style={styles.aboutBlock}>
              <Text style={styles.sectionTitle}>Reviews ({gig.sellerReviewsCount})</Text>
              
              <View style={styles.reviewCard}>
                <Text style={styles.reviewWho}>Hannah Lloyd</Text>
                <Text style={styles.stars}>★★★★★</Text>
                <Text style={styles.reviewText}>
                  Mira reframed our whole positioning before touching a logo. The identity has held up through two product pivots.
                </Text>
              </View>

              <View style={styles.reviewCard}>
                <Text style={styles.reviewWho}>Marcus Reid</Text>
                <Text style={styles.stars}>★★★★★</Text>
                <Text style={styles.reviewText}>
                  Clear milestones, zero chasing. Delivered a day early and the handover pack was genuinely useful.
                </Text>
              </View>
            </View>

          </View>

          {/* Side Sticky Price Card */}
          <View style={styles.sideCol}>
            <View style={styles.priceCard}>
              <Text style={styles.priceAmt}>${gig.price}</Text>

              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Delivery</Text>
                <Text style={styles.priceVal}>{gig.deliveryTime}</Text>
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Revisions</Text>
                <Text style={styles.priceVal}>{gig.revisionsCount}</Text>
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Escrow</Text>
                <Text style={styles.escrowTag}>Milestone-protected</Text>
              </View>

              {/* Owner vs Client Affordances */}
              {isOwner ? (
                <>
                  <Pressable
                    style={styles.btnPink}
                    onPress={() => router.push('/(app)/gigs/create')}
                  >
                    <Text style={styles.btnPinkText}>Edit Gig</Text>
                  </Pressable>
                  <Pressable
                    style={styles.btnOutline}
                    onPress={() => router.push('/(app)/my-gigs')}
                  >
                    <Text style={styles.btnOutlineText}>View Dashboard Stats</Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <Pressable style={styles.btnPink}>
                    <Text style={styles.btnPinkText}>Continue (${gig.price})</Text>
                  </Pressable>
                  <Pressable style={styles.btnOutline}>
                    <Text style={styles.btnOutlineText}>Message {gig.sellerName}</Text>
                  </Pressable>
                  <Pressable style={styles.favBtn}>
                    <Text style={styles.favText}>♡ Save to favourites</Text>
                  </Pressable>
                </>
              )}

            </View>
          </View>

        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  crumb: {
    fontSize: 13,
    color: '#93A0B4',
    fontFamily: 'Inter_500Medium',
    marginBottom: 14,
  },
  crumbSpan: {
    color: '#EC1257',
    fontFamily: 'Inter_600SemiBold',
  },
  detailTitle: {
    fontSize: 28,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
    marginBottom: 14,
    lineHeight: 34,
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#0B1220',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
  },
  sellerName: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: '#10172A',
  },
  verifiedTag: {
    color: '#EC1257',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
  },
  sellerStats: {
    color: '#5B6472',
    fontSize: 13.5,
    fontFamily: 'Inter_400Regular',
  },
  detailGrid: {
    flexDirection: 'row',
    gap: 40,
    flexWrap: 'wrap',
  },
  mainCol: {
    flex: 1,
    minWidth: 320,
  },
  sideCol: {
    width: 320,
    minWidth: 280,
  },
  galleryMain: {
    height: 340,
    borderRadius: 16,
    backgroundColor: '#FDE8EF',
    marginBottom: 12,
  },
  galleryStrip: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 32,
  },
  thumbItem: {
    flex: 1,
    aspectRatio: 1.4,
    borderRadius: 10,
    backgroundColor: '#F6F7FB',
    borderWidth: 1,
    borderColor: '#E7E9F1',
  },
  aboutBlock: {
    marginBottom: 36,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
    marginBottom: 12,
  },
  paragraph: {
    color: '#5B6472',
    fontSize: 14.5,
    fontFamily: 'Inter_400Regular',
    lineHeight: 22,
    marginBottom: 14,
  },
  pkgGrid: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  reviewCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#E7E9F1',
    paddingBottom: 16,
    marginBottom: 16,
  },
  reviewWho: {
    fontSize: 13.5,
    fontFamily: 'Inter_700Bold',
    color: '#10172A',
  },
  stars: {
    color: '#F5A623',
    fontSize: 12.5,
    marginVertical: 4,
  },
  reviewText: {
    fontSize: 13.5,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
  priceCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
  },
  priceAmt: {
    fontSize: 28,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
    marginBottom: 14,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E9F1',
    marginBottom: 4,
  },
  priceLabel: {
    fontSize: 13.5,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
  },
  priceVal: {
    fontSize: 13.5,
    fontFamily: 'Inter_700Bold',
    color: '#10172A',
  },
  escrowTag: {
    fontSize: 13.5,
    fontFamily: 'Inter_700Bold',
    color: '#17A34A',
  },
  btnPink: {
    backgroundColor: '#EC1257',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
  },
  btnPinkText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 14.5,
  },
  btnOutline: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnOutlineText: {
    color: '#10172A',
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
  },
  favBtn: {
    alignItems: 'center',
    marginTop: 6,
  },
  favText: {
    fontSize: 13,
    color: '#5B6472',
    fontFamily: 'Inter_500Medium',
  },
});
