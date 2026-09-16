import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getOrderById, MilestoneItem } from '../../../src/constants/ordersData';
import { LeaveReviewCard } from '../../../src/components/transactions/LeaveReviewCard';

interface ActionModalState {
  milestoneId: string;
  milestoneTitle: string;
  amount: number;
  action: 'approve' | 'revision' | 'dispute';
}

export default function OrderDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Fetch initial order
  const initialOrder = getOrderById(id || 'SN-4821');

  // Interactive milestone state
  const [milestones, setMilestones] = useState<MilestoneItem[]>(initialOrder.milestones);
  const [actionModal, setActionModal] = useState<ActionModalState | null>(null);

  const getStatusStyle = (status: string) => {
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

  const statusStyle = getStatusStyle(initialOrder.status);

  // Recalculate released amount dynamically as user approves milestones
  const releasedAmount = milestones
    .filter(m => m.status === 'done')
    .reduce((sum, m) => sum + m.amount, 0);

  // Check if all milestones are completed
  const isAllDone = milestones.every(m => m.status === 'done');

  const handleConfirmAction = () => {
    if (!actionModal) return;

    const { milestoneId, action } = actionModal;

    setMilestones(prev =>
      prev.map(m => {
        if (m.id !== milestoneId) return m;

        if (action === 'approve') {
          return {
            ...m,
            status: 'done',
            note: `Released to ${initialOrder.freelancerName.split(' ')[0]}.`,
          };
        } else if (action === 'revision') {
          return {
            ...m,
            status: 'pending',
            note: `Revision requested - awaiting freelancer update.`,
          };
        } else if (action === 'dispute') {
          return {
            ...m,
            status: 'disputed',
            note: `Under dispute review by SkillNest support.`,
          };
        }

        return m;
      })
    );

    setActionModal(null);
  };

  return (
    <ScrollView className="flex-1 bg-bg-alt" contentContainerStyle={{ paddingBottom: 64 }}>
      <View className="px-6 py-9 max-w-[1080px] w-full self-center">
        
        {/* Breadcrumb */}
        <Pressable onPress={() => router.push('/orders')} style={styles.crumbBtn}>
          <Text style={styles.crumbText}>
            My Orders / <Text style={styles.crumbSpan}>{initialOrder.metaCode}</Text>
          </Text>
        </Pressable>

        {/* Detail Top Header */}
        <View style={styles.detailTop}>
          <Text style={styles.title}>{initialOrder.title}</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <View style={[styles.statusPill, { backgroundColor: statusStyle.bg }]}>
              <Text style={[styles.statusPillText, { color: statusStyle.text }]}>
                {isAllDone ? 'Completed' : initialOrder.status}
              </Text>
            </View>
            <Text style={styles.orderAmt}>${initialOrder.totalAmount.toLocaleString()}</Text>
          </View>
        </View>

        <Text style={styles.detailSub}>
          {initialOrder.freelancerName} ✓ Verified · Placed {initialOrder.placedDate} · Due {initialOrder.dueDate}
        </Text>

        {/* Main Grid Layout */}
        <View style={styles.orderLayout}>
          
          {/* Timeline Col Left */}
          <View style={styles.timelineCol}>
            <View style={styles.timelineHead}>
              <Text style={styles.timelineTitle}>Milestone Timeline</Text>
              <Text style={styles.timelineSubtitle}>Funds release per milestone, only on your approval.</Text>
            </View>

            {/* Milestones list */}
            {milestones.map((m, idx) => {
              const isLast = idx === milestones.length - 1;

              return (
                <View key={m.id} style={styles.mItem}>
                  {/* Line & Dot */}
                  <View style={styles.mLine}>
                    <View
                      style={[
                        styles.mDot,
                        m.status === 'done' && styles.mDotDone,
                        m.status === 'pending' && styles.mDotPending,
                        m.status === 'disputed' && styles.mDotDisputed,
                        m.status === 'future' && styles.mDotFuture,
                      ]}
                    >
                      <Text
                        style={[
                          styles.mDotText,
                          m.status === 'future' && styles.mDotTextFuture,
                        ]}
                      >
                        {m.status === 'done' ? '✓' : m.number}
                      </Text>
                    </View>

                    {!isLast && <View style={styles.mConnector} />}
                  </View>

                  {/* Body Content */}
                  <View style={styles.mBody}>
                    <View style={styles.mBodyTop}>
                      <Text style={styles.mTitle}>{m.title}</Text>
                      <Text style={styles.mAmt}>${m.amount.toLocaleString()}</Text>
                    </View>

                    <Text style={styles.mDesc}>{m.description}</Text>

                    {/* Milestone Note */}
                    {m.note && (
                      <View
                        style={[
                          styles.mNote,
                          m.status === 'done' && styles.mNoteReleased,
                          (m.status === 'pending' || m.status === 'disputed') && styles.mNoteFrozen,
                        ]}
                      >
                        <Text
                          style={[
                            styles.mNoteText,
                            m.status === 'done' && styles.mNoteTextReleased,
                            (m.status === 'pending' || m.status === 'disputed') && styles.mNoteTextFrozen,
                          ]}
                        >
                          {m.note}
                        </Text>
                      </View>
                    )}

                    {/* Review Actions: ONLY shown when milestone status is 'pending' */}
                    {m.status === 'pending' && (
                      <View style={styles.mActions}>
                        <Pressable
                          style={styles.btnApprove}
                          onPress={() =>
                            setActionModal({
                              milestoneId: m.id,
                              milestoneTitle: m.title,
                              amount: m.amount,
                              action: 'approve',
                            })
                          }
                        >
                          <Text style={styles.btnApproveText}>Approve &amp; Release</Text>
                        </Pressable>

                        <Pressable
                          style={styles.btnRevision}
                          onPress={() =>
                            setActionModal({
                              milestoneId: m.id,
                              milestoneTitle: m.title,
                              amount: m.amount,
                              action: 'revision',
                            })
                          }
                        >
                          <Text style={styles.btnRevisionText}>Request Revision</Text>
                        </Pressable>

                        <Pressable
                          style={styles.btnDispute}
                          onPress={() =>
                            setActionModal({
                              milestoneId: m.id,
                              milestoneTitle: m.title,
                              amount: m.amount,
                              action: 'dispute',
                            })
                          }
                        >
                          <Text style={styles.btnDisputeText}>Open a dispute</Text>
                        </Pressable>
                      </View>
                    )}

                  </View>
                </View>
              );
            })}

            {/* Leave a Review Component: Rendered ONLY when all milestones are done */}
            {isAllDone && (
              <LeaveReviewCard
                freelancerFirstName={initialOrder.freelancerName.split(' ')[0]}
              />
            )}

          </View>

          {/* Summary Sidebar Right */}
          <View style={styles.summaryCol}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Order Summary</Text>

              <View style={styles.sRow}>
                <Text style={styles.sLabel}>Order ID</Text>
                <Text style={styles.sValueBold}>{initialOrder.metaCode}</Text>
              </View>

              <View style={styles.sRow}>
                <Text style={styles.sLabel}>Milestones</Text>
                <Text style={styles.sValueBold}>{milestones.length}</Text>
              </View>

              <View style={styles.sRow}>
                <Text style={styles.sLabel}>Released</Text>
                <Text style={styles.sValueGreen}>${releasedAmount.toLocaleString()}</Text>
              </View>

              <View style={[styles.sRow, styles.sRowTotal]}>
                <Text style={styles.sLabel}>Total</Text>
                <Text style={styles.sTotalValue}>${initialOrder.totalAmount.toLocaleString()}</Text>
              </View>

              <Pressable
                style={styles.btnMessage}
                onPress={() => router.push('/messages')}
              >
                <Text style={styles.btnMessageText}>
                  Message {initialOrder.freelancerName.split(' ')[0]}
                </Text>
              </Pressable>
            </View>
          </View>

        </View>

        {/* Action Confirmation Modal */}
        {actionModal && (
          <Modal transparent animationType="fade" visible={!!actionModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>
                  {actionModal.action === 'approve'
                    ? 'Approve & Release Funds?'
                    : actionModal.action === 'revision'
                    ? 'Request Revision?'
                    : 'Open a Dispute?'}
                </Text>

                <Text style={styles.modalMessage}>
                  {actionModal.action === 'approve'
                    ? `Approve and release $${actionModal.amount} to ${initialOrder.freelancerName}? This action can't be undone.`
                    : actionModal.action === 'revision'
                    ? `Request a revision for "${actionModal.milestoneTitle}"? ${initialOrder.freelancerName.split(' ')[0]} will be notified.`
                    : `Open a dispute for "${actionModal.milestoneTitle}"? SkillNest support team will review the case.`}
                </Text>

                <View style={styles.modalActions}>
                  <Pressable
                    style={styles.modalCancelBtn}
                    onPress={() => setActionModal(null)}
                  >
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.modalConfirmBtn,
                      actionModal.action === 'dispute' && styles.modalDisputeBtn,
                    ]}
                    onPress={handleConfirmAction}
                  >
                    <Text style={styles.modalConfirmText}>
                      {actionModal.action === 'approve'
                        ? 'Confirm & Release'
                        : actionModal.action === 'revision'
                        ? 'Confirm Revision'
                        : 'Confirm Dispute'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  crumbBtn: {
    marginBottom: 14,
    alignSelf: 'flex-start',
  },
  crumbText: {
    fontSize: 13,
    color: '#93A0B4',
    fontFamily: 'Inter_500Medium',
  },
  crumbSpan: {
    color: '#EC1257',
    fontFamily: 'Inter_600SemiBold',
  },
  detailTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
    flexWrap: 'wrap',
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
    flex: 1,
    minWidth: 260,
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
  detailSub: {
    fontSize: 13.5,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
    marginBottom: 28,
  },
  orderLayout: {
    flexDirection: 'row',
    gap: 36,
    flexWrap: 'wrap',
  },
  timelineCol: {
    flex: 1,
    minWidth: 320,
  },
  summaryCol: {
    width: 300,
    minWidth: 280,
  },
  timelineHead: {
    marginBottom: 20,
  },
  timelineTitle: {
    fontSize: 18,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
    marginBottom: 4,
  },
  timelineSubtitle: {
    fontSize: 13,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
  },
  mItem: {
    flexDirection: 'row',
    gap: 16,
  },
  mLine: {
    alignItems: 'center',
  },
  mDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mDotDone: {
    backgroundColor: '#17A34A',
  },
  mDotPending: {
    backgroundColor: '#EC1257',
  },
  mDotDisputed: {
    backgroundColor: '#D97706',
  },
  mDotFuture: {
    backgroundColor: '#F6F7FB',
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
  },
  mDotText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Inter_800ExtraBold',
  },
  mDotTextFuture: {
    color: '#93A0B4',
  },
  mConnector: {
    width: 2,
    flex: 1,
    backgroundColor: '#E7E9F1',
    marginVertical: 4,
    minHeight: 36,
  },
  mBody: {
    flex: 1,
    paddingBottom: 28,
  },
  mBodyTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  mTitle: {
    fontSize: 15.5,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
  },
  mAmt: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 16,
    color: '#10172A',
  },
  mDesc: {
    fontSize: 13,
    color: '#93A0B4',
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  mNote: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  mNoteReleased: {
    backgroundColor: '#F0FDF4',
  },
  mNoteFrozen: {
    backgroundColor: '#FEF3C7',
  },
  mNoteText: {
    fontSize: 12.5,
    fontFamily: 'Inter_600SemiBold',
  },
  mNoteTextReleased: {
    color: '#17A34A',
  },
  mNoteTextFrozen: {
    color: '#D97706',
  },
  mActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  btnApprove: {
    backgroundColor: '#EC1257',
    borderWidth: 1.5,
    borderColor: '#EC1257',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnApproveText: {
    fontSize: 12.5,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
  },
  btnRevision: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnRevisionText: {
    fontSize: 12.5,
    fontFamily: 'Inter_700Bold',
    color: '#10172A',
  },
  btnDispute: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  btnDisputeText: {
    fontSize: 13.5,
    fontFamily: 'Inter_700Bold',
    color: '#DC2626',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 22,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 15,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
    marginBottom: 16,
  },
  sRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E9F1',
  },
  sRowTotal: {
    borderBottomWidth: 0,
    marginTop: 6,
  },
  sLabel: {
    fontSize: 13.5,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
  },
  sValueBold: {
    fontSize: 13.5,
    fontFamily: 'Inter_700Bold',
    color: '#10172A',
  },
  sValueGreen: {
    fontSize: 13.5,
    fontFamily: 'Inter_700Bold',
    color: '#17A34A',
  },
  sTotalValue: {
    fontSize: 17,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
  },
  btnMessage: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 14,
  },
  btnMessageText: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: '#10172A',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 18, 32, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    maxWidth: 420,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#5B6472',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalCancelBtn: {
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  modalCancelText: {
    fontSize: 13.5,
    fontFamily: 'Inter_700Bold',
    color: '#10172A',
  },
  modalConfirmBtn: {
    backgroundColor: '#EC1257',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  modalDisputeBtn: {
    backgroundColor: '#DC2626',
  },
  modalConfirmText: {
    fontSize: 13.5,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
  },
});
