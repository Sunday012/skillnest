import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface LiveMilestoneBoxProps {
  milestoneCount: number;
  milestonesTotal: number;
  onPost?: () => void;
  onSaveDraft?: () => void;
}

export function LiveMilestoneBox({
  milestoneCount,
  milestonesTotal,
  onPost,
  onSaveDraft,
}: LiveMilestoneBoxProps) {
  const fee = Math.round(milestonesTotal * 0.05);
  const escrowTotal = milestonesTotal + fee;

  const formatCurrency = (val: number) => {
    return '$' + val.toLocaleString('en-US');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Project Budget</Text>

      <View style={styles.row}>
        <Text style={styles.rowLabel}>Milestones ({milestoneCount})</Text>
        <Text style={styles.rowValue}>{formatCurrency(milestonesTotal)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowLabel}>NavoNext fee (5%)</Text>
        <Text style={styles.rowValue}>{formatCurrency(fee)}</Text>
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Held in escrow</Text>
        <Text style={styles.totalAmount}>{formatCurrency(escrowTotal)}</Text>
      </View>

      <Pressable style={styles.postBtn} onPress={onPost}>
        <Text style={styles.postBtnText}>Post &amp; Invite Bids</Text>
      </Pressable>

      <Pressable style={styles.draftBtn} onPress={onSaveDraft}>
        <Text style={styles.draftBtnText}>Save as draft</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0B1220',
    borderRadius: 16,
    padding: 22,
  },
  header: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    color: '#93A0B4',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.12)',
  },
  rowLabel: {
    fontSize: 13.5,
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular',
  },
  rowValue: {
    fontSize: 13.5,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 18,
  },
  totalLabel: {
    fontSize: 12.5,
    color: '#93A0B4',
    fontFamily: 'Inter_500Medium',
  },
  totalAmount: {
    fontSize: 26,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#FFFFFF',
  },
  postBtn: {
    backgroundColor: '#EC1257',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  postBtnText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontFamily: 'Inter_700Bold',
  },
  draftBtn: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  draftBtnText: {
    fontSize: 13,
    color: '#93A0B4',
    fontFamily: 'Inter_500Medium',
  },
});
