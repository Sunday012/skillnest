import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { GigItem } from '../../constants/sellingData';

interface GigTableRowProps {
  gig: GigItem;
  onPress: () => void;
  isHeader?: boolean;
}

export function GigTableRow({ gig, onPress, isHeader }: GigTableRowProps) {
  if (isHeader) {
    return (
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.gigCell, styles.headerText]}>GIG</Text>
        <Text style={[styles.cell, styles.numCell, styles.headerText, styles.hideMobile]}>IMPRESSIONS</Text>
        <Text style={[styles.cell, styles.numCell, styles.headerText, styles.hideMobile]}>ORDERS</Text>
        <Text style={[styles.cell, styles.numCell, styles.headerText, styles.hideMobile]}>RATING</Text>
        <Text style={[styles.cell, styles.numCell, styles.headerText]}>PRICE</Text>
        <Text style={[styles.cell, styles.statusCell, styles.headerText]}>STATUS</Text>
      </View>
    );
  }

  const getStatusStyle = (status: GigItem['status']) => {
    switch (status) {
      case 'Active':
        return styles.statusActive;
      case 'Paused':
        return styles.statusPaused;
      case 'Draft':
        return styles.statusDraft;
      default:
        return styles.statusActive;
    }
  };

  const getStatusTextStyle = (status: GigItem['status']) => {
    switch (status) {
      case 'Active':
        return styles.statusActiveText;
      case 'Paused':
        return styles.statusPausedText;
      case 'Draft':
        return styles.statusDraftText;
      default:
        return styles.statusActiveText;
    }
  };

  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={[styles.cell, styles.gigCell]}>
        <View style={styles.gigInfo}>
          <View style={styles.thumb} />
          <View style={styles.textWrap}>
            <Text style={styles.title} numberOfLines={1}>{gig.title}</Text>
            <Text style={styles.category}>{gig.category}</Text>
          </View>
        </View>
      </View>
      <Text style={[styles.cell, styles.numCell, styles.hideMobile]}>{gig.impressions}</Text>
      <Text style={[styles.cell, styles.numCell, styles.hideMobile]}>{gig.orders || '—'}</Text>
      <Text style={[styles.cell, styles.numCell, styles.hideMobile]}>{gig.rating}</Text>
      <Text style={[styles.cell, styles.numCell, styles.priceText]}>${gig.price}</Text>
      <View style={[styles.cell, styles.statusCell]}>
        <View style={[styles.statusPill, getStatusStyle(gig.status)]}>
          <Text style={[styles.statusText, getStatusTextStyle(gig.status)]}>{gig.status}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E9F1',
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    backgroundColor: '#F6F7FB',
    paddingVertical: 12,
  },
  headerText: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
    color: '#93A0B4',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  cell: {
    fontSize: 14,
    color: '#10172A',
    fontFamily: 'Inter_500Medium',
  },
  gigCell: {
    flex: 2.2,
  },
  numCell: {
    flex: 0.8,
  },
  priceText: {
    fontFamily: 'Inter_700Bold',
    color: '#10172A',
  },
  statusCell: {
    flex: 0.8,
    alignItems: 'flex-start',
  },
  hideMobile: {
    // Hidden on small viewports handled via breakpoint or default layout
  },
  gigInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  thumb: {
    width: 48,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#F6F7FB',
    borderWidth: 1,
    borderColor: '#E7E9F1',
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#10172A',
    marginBottom: 2,
  },
  category: {
    fontSize: 12,
    color: '#93A0B4',
    fontFamily: 'Inter_400Regular',
  },
  statusPill: {
    paddingHorizontal: 11,
    paddingVertical: 4,
    borderRadius: 100,
  },
  statusText: {
    fontSize: 11.5,
    fontFamily: 'Inter_700Bold',
  },
  statusActive: {
    backgroundColor: '#DCFCE7',
  },
  statusActiveText: {
    color: '#166534',
  },
  statusPaused: {
    backgroundColor: '#F6F7FB',
  },
  statusPausedText: {
    color: '#5B6472',
  },
  statusDraft: {
    backgroundColor: '#FEF3C7',
  },
  statusDraftText: {
    color: '#92400E',
  },
});
