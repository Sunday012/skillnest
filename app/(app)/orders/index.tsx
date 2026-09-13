import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MOCK_ORDERS, OrderItem } from '../../../src/constants/ordersData';

type FilterStatus = 'All' | 'In Progress' | 'Delivered' | 'Disputed';

export default function MyOrdersScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('All');

  const filteredOrders = MOCK_ORDERS.filter(o => {
    if (activeFilter === 'All') return true;
    return o.status === activeFilter;
  });

  const getStatusStyle = (status: OrderItem['status']) => {
    switch (status) {
      case 'In Progress':
        return { bg: '#FDE8EF', text: '#C10E48' };
      case 'Delivered':
        return { bg: '#DBEAFE', text: '#1E40AF' };
      case 'Completed':
        return { bg: '#DCFCE7', text: '#166534' };
      case 'Disputed':
        return { bg: '#FEF3C7', text: '#D97706' };
      default:
        return { bg: '#F6F7FB', text: '#5B6472' };
    }
  };

  return (
    <ScrollView className="flex-1 bg-bg-alt" contentContainerStyle={{ paddingBottom: 64 }}>
      <View className="px-6 py-9 max-w-[1080px] w-full self-center">
        
        {/* Orders Head */}
        <View style={styles.ordersHead}>
          <Text style={styles.title}>My Orders</Text>
          <Text style={styles.subtitle}>
            Every order is milestone-funded — nothing releases without approval.
          </Text>
        </View>

        {/* Filter Pills */}
        <View style={styles.filterRow}>
          {(['All', 'In Progress', 'Delivered', 'Disputed'] as FilterStatus[]).map((filter) => {
            const isOn = activeFilter === filter;
            return (
              <Pressable
                key={filter}
                style={[styles.filterPill, isOn && styles.filterPillOn]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[styles.filterPillText, isOn && styles.filterPillTextOn]}>
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Orders List */}
        {filteredOrders.map((order) => {
          const statusStyle = getStatusStyle(order.status);
          
          // Calculate progress percentage
          const approvedCount = order.milestones.filter(m => m.status === 'done').length;
          const totalMilestones = order.milestones.length;
          const percent = Math.round((approvedCount / totalMilestones) * 100);

          return (
            <Pressable
              key={order.id}
              style={styles.orderCard}
              onPress={() => router.push(`/orders/${order.id}` as any)}
            >
              <View style={styles.orderTop}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.orderMeta}>
                    {order.metaCode} · Placed {order.placedDate}
                  </Text>
                  <Text style={styles.orderTitle}>{order.title}</Text>
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                  <View style={[styles.statusPill, { backgroundColor: statusStyle.bg }]}>
                    <Text style={[styles.statusPillText, { color: statusStyle.text }]}>
                      {order.status}
                    </Text>
                  </View>
                  <Text style={styles.orderAmt}>${order.totalAmount.toLocaleString()}</Text>
                </View>
              </View>

              <View style={styles.orderPeople}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>{order.freelancerAvatar}</Text>
                </View>
                <Text style={styles.freelancerName}>{order.freelancerName}</Text>
                {order.freelancerVerified && (
                  <Text style={styles.kycTag}>✓ KYC</Text>
                )}
              </View>

              <View style={styles.progressLine}>
                <Text style={styles.progressText}>
                  {approvedCount} of {totalMilestones} milestone{totalMilestones === 1 ? '' : 's'} approved
                </Text>
                <Text style={styles.progressText}>{percent}%</Text>
              </View>

              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${percent}%` }]} />
              </View>

            </Pressable>
          );
        })}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ordersHead: {
    marginBottom: 20,
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
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  filterPill: {
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
  },
  filterPillOn: {
    backgroundColor: '#EC1257',
    borderColor: '#EC1257',
  },
  filterPillText: {
    fontSize: 13.5,
    fontFamily: 'Inter_700Bold',
    color: '#10172A',
  },
  filterPillTextOn: {
    color: '#FFFFFF',
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 22,
    marginBottom: 16,
  },
  orderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 12,
  },
  orderMeta: {
    fontSize: 12.5,
    color: '#93A0B4',
    fontFamily: 'Inter_400Regular',
  },
  orderTitle: {
    fontSize: 17,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
    marginTop: 6,
    marginBottom: 10,
  },
  statusPill: {
    paddingHorizontal: 11,
    paddingVertical: 4,
    borderRadius: 100,
    marginBottom: 6,
  },
  statusPillText: {
    fontSize: 11.5,
    fontFamily: 'Inter_700Bold',
  },
  orderAmt: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 18,
    color: '#10172A',
  },
  orderPeople: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  avatarCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#0B1220',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
  },
  freelancerName: {
    fontSize: 13.5,
    fontFamily: 'Inter_600SemiBold',
    color: '#10172A',
  },
  kycTag: {
    color: '#EC1257',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  progressLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressText: {
    fontSize: 12.5,
    color: '#5B6472',
    fontFamily: 'Inter_500Medium',
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#F6F7FB',
    borderRadius: 100,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#EC1257',
    borderRadius: 100,
  },
});
