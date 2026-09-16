import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { AppIcon } from '../../src/components/AppIcon';
import { MOCK_NOTIFICATIONS, NotificationItem } from '../../src/constants/notificationsData';

type FilterType = 'All' | 'Orders' | 'Payouts' | 'System';

export default function NotificationsScreen() {
  const [items, setItems] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filteredItems = items.filter(
    item => activeFilter === 'All' || item.type === activeFilter
  );

  const unreadCount = items.filter(i => i.isUnread).length;

  const handleMarkAllRead = () => {
    setItems(prev => prev.map(i => ({ ...i, isUnread: false })));
  };

  const handleMarkItemRead = (id: string) => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, isUnread: false } : i))
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 64 }}>
      <View style={styles.wrapper}>
        
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <View style={styles.titleWithBadge}>
              <Text style={styles.pageTitle}>Notifications</Text>
              {unreadCount > 0 && (
                <View style={styles.unreadCountBadge}>
                  <Text style={styles.unreadCountText}>{unreadCount} new</Text>
                </View>
              )}
            </View>
            <Text style={styles.subtitle}>Activity & system updates</Text>
          </View>

          <Pressable
            style={[styles.markAllBtn, unreadCount === 0 && styles.markAllBtnDisabled]}
            onPress={handleMarkAllRead}
            disabled={unreadCount === 0}
          >
            <Text style={[styles.markAllText, unreadCount === 0 && styles.markAllTextDisabled]}>
              Mark all as read
            </Text>
          </Pressable>
        </View>

        {/* Filter Pills */}
        <View style={styles.filterRow}>
          {(['All', 'Orders', 'Payouts', 'System'] as FilterType[]).map(filter => {
            const isActive = activeFilter === filter;
            return (
              <Pressable
                key={filter}
                style={[styles.filterPill, isActive && styles.filterPillActive]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Notification Cards */}
        <View style={styles.cardList}>
          {filteredItems.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No notifications found in {activeFilter}.</Text>
            </View>
          ) : (
            filteredItems.map(item => (
              <Pressable
                key={item.id}
                onPress={() => handleMarkItemRead(item.id)}
                style={[styles.notifCard, item.isUnread && styles.notifCardUnread]}
              >
                <View style={styles.iconBox}>
                  <AppIcon name={item.icon} size={20} color="#EC1257" />
                </View>

                <View style={styles.notifBody}>
                  <View style={styles.notifTopRow}>
                    <Text style={styles.notifTitle}>{item.title}</Text>
                    <Text style={styles.notifTime}>{item.time}</Text>
                  </View>
                  <Text style={styles.notifDesc}>{item.description}</Text>
                </View>

                {item.isUnread && <View style={styles.unreadDot} />}
              </Pressable>
            ))
          )}
        </View>

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
  titleWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pageTitle: {
    fontSize: 28,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
  },
  unreadCountBadge: {
    backgroundColor: '#FDE8EF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  unreadCountText: {
    color: '#EC1257',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  subtitle: {
    fontSize: 13.5,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  markAllBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  markAllBtnDisabled: {
    opacity: 0.5,
  },
  markAllText: {
    color: '#10172A',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  markAllTextDisabled: {
    color: '#93A0B4',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  filterPill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  filterPillActive: {
    backgroundColor: '#10172A',
    borderColor: '#10172A',
  },
  filterText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: '#5B6472',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  cardList: {
    gap: 12,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#5B6472',
    fontFamily: 'Inter_500Medium',
  },
  notifCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 16,
    padding: 18,
    gap: 16,
  },
  notifCardUnread: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FDE8EF',
    borderLeftWidth: 4,
    borderLeftColor: '#EC1257',
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F6F7FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBody: {
    flex: 1,
  },
  notifTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notifTitle: {
    fontSize: 14.5,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
  },
  notifTime: {
    fontSize: 12,
    color: '#93A0B4',
    fontFamily: 'Inter_400Regular',
  },
  notifDesc: {
    fontSize: 13.5,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
    lineHeight: 19,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EC1257',
  },
});
