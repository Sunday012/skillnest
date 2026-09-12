import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { PackageTier } from '../../constants/sellingData';

interface PackageCardProps {
  packageTier: PackageTier;
  onSelect?: () => void;
  isSelected?: boolean;
}

export function PackageCard({ packageTier, onSelect, isSelected }: PackageCardProps) {
  const isPop = packageTier.isPopular || isSelected;

  return (
    <View style={[styles.card, isPop && styles.cardPopular]}>
      <Text style={styles.tierName}>{packageTier.name}</Text>
      <Text style={styles.price}>${packageTier.price}</Text>
      <Text style={styles.delivery}>{packageTier.delivery}</Text>

      <View style={styles.featureList}>
        {packageTier.features.map((feat, idx) => (
          <View key={idx} style={styles.featureItem}>
            <Text style={styles.tick}>✓</Text>
            <Text style={styles.featureText}>{feat}</Text>
          </View>
        ))}
      </View>

      <Pressable
        onPress={onSelect}
        style={[styles.btn, isPop ? styles.btnPink : styles.btnOutline]}
      >
        <Text style={[styles.btnText, isPop ? styles.btnTextPink : styles.btnTextOutline]}>
          Select
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 20,
    backgroundColor: '#FFFFFF',
    justify: 'space-between',
  },
  cardPopular: {
    borderColor: '#EC1257',
  },
  tierName: {
    fontSize: 11.5,
    fontFamily: 'Inter_700Bold',
    color: '#EC1257',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  price: {
    fontSize: 26,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
    marginBottom: 4,
  },
  delivery: {
    fontSize: 12.5,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
    marginBottom: 16,
  },
  featureList: {
    marginBottom: 20,
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tick: {
    color: '#17A34A',
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
  },
  featureText: {
    fontSize: 13,
    color: '#10172A',
    fontFamily: 'Inter_400Regular',
  },
  btn: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPink: {
    backgroundColor: '#EC1257',
  },
  btnOutline: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
  },
  btnText: {
    fontSize: 13.5,
    fontFamily: 'Inter_700Bold',
  },
  btnTextPink: {
    color: '#FFFFFF',
  },
  btnTextOutline: {
    color: '#10172A',
  },
});
