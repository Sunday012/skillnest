import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LivePreviewCardProps {
  title?: string;
  price?: string;
}

export function LivePreviewCard({ title, price }: LivePreviewCardProps) {
  const displayTitle = title?.trim() || 'I will design a complete brand identity system';
  const displayPrice = price?.trim() ? `$${price.replace(/^\$/, '')}` : '$450';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Live Preview</Text>
      <View style={styles.card}>
        <View style={styles.imgCover} />
        <View style={styles.body}>
          <Text style={styles.title} numberOfLines={2}>{displayTitle}</Text>
          
          <View style={styles.sellerRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>M</Text>
            </View>
            <Text style={styles.sellerText}>Mira Vance · ★ 4.9 (212)</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.startingLbl}>Starting at</Text>
            <Text style={styles.priceAmt}>{displayPrice}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: '#93A0B4',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#10172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 3,
  },
  imgCover: {
    height: 150,
    backgroundColor: '#FDE8EF',
  },
  body: {
    padding: 18,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: '#10172A',
    lineHeight: 20,
    marginBottom: 10,
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0B1220',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontFamily: 'Inter_700Bold',
  },
  sellerText: {
    fontSize: 12.5,
    color: '#5B6472',
    fontFamily: 'Inter_500Medium',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E7E9F1',
    paddingTop: 12,
  },
  startingLbl: {
    fontSize: 11.5,
    color: '#93A0B4',
    fontFamily: 'Inter_400Regular',
  },
  priceAmt: {
    fontSize: 17,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
  },
});
