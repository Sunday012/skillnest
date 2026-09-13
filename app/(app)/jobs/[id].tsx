import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getJobById } from '../../../src/constants/buyingData';

interface ConfirmModalState {
  proposalId: string;
  freelancerName: string;
  action: 'accept' | 'decline';
}

export default function JobProposalsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Map of proposalId -> 'accepted' | 'declined'
  const [statuses, setStatuses] = useState<Record<string, 'accepted' | 'declined'>>({});
  const [confirmModal, setConfirmModal] = useState<ConfirmModalState | null>(null);

  const job = getJobById(id || 'JB-201');

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Active':
        return { bg: '#DCFCE7', text: '#166534' };
      case 'In Progress':
        return { bg: '#FDE8EF', text: '#C10E48' };
      case 'Draft':
        return { bg: '#FEF3C7', text: '#92400E' };
      default:
        return { bg: '#F6F7FB', text: '#5B6472' };
    }
  };

  const statusStyle = getStatusStyle(job.status);

  const handleConfirmAction = () => {
    if (!confirmModal) return;
    const { proposalId, action, freelancerName } = confirmModal;
    setStatuses(prev => ({
      ...prev,
      [proposalId]: action === 'accept' ? 'accepted' : 'declined',
    }));
    setConfirmModal(null);

    if (action === 'accept') {
      router.push(
        `/orders/checkout?orderId=SN-4823&title=${encodeURIComponent(job.title)}&price=2900&sellerName=${encodeURIComponent(freelancerName)}` as any
      );
    }
  };

  return (
    <ScrollView className="flex-1 bg-bg-alt" contentContainerStyle={{ paddingBottom: 64 }}>
      <View className="px-6 py-9 max-w-[1180px] w-full self-center">
        
        {/* Breadcrumb */}
        <Pressable onPress={() => router.push('/jobs')} style={styles.crumbBtn}>
          <Text style={styles.crumbText}>
            My Jobs / <Text style={styles.crumbSpan}>{job.metaCode}</Text>
          </Text>
        </Pressable>

        {/* Job Card Overview */}
        <View style={styles.propJobCard}>
          <View style={styles.jobInfoLeft}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.jobDesc}>{job.description}</Text>
          </View>

          <View style={styles.jobInfoRight}>
            <View style={[styles.statusPill, { backgroundColor: statusStyle.bg }]}>
              <Text style={[styles.statusPillText, { color: statusStyle.text }]}>
                {job.status}
              </Text>
            </View>
            <Text style={styles.jobBudget}>{job.budget}</Text>
          </View>
        </View>

        {/* Count Label */}
        <Text style={styles.propCount}>
          {job.proposalsCount} freelancer{job.proposalsCount === 1 ? '' : 's'} applied to this job
        </Text>

        {/* Proposals List */}
        {job.proposals.map((prop) => {
          const terminalStatus = statuses[prop.id];

          return (
            <View key={prop.id} style={styles.proposalCard}>
              
              {/* Avatar */}
              <View style={styles.pAvatar}>
                <Text style={styles.pAvatarText}>{prop.freelancerAvatar}</Text>
              </View>

              {/* Body */}
              <View style={styles.pBody}>
                <View style={styles.pNameRow}>
                  <Text style={styles.pName}>{prop.freelancerName}</Text>
                  {prop.freelancerVerified && (
                    <Text style={styles.verifiedBadge}>✓ Verified</Text>
                  )}
                </View>

                <Text style={styles.pRole}>
                  {prop.freelancerRole} · ★ {prop.freelancerRating} ({prop.freelancerReviewsCount})
                </Text>

                <Text style={styles.pPitch}>{prop.pitch}</Text>

                <View style={styles.pActions}>
                  <Pressable
                    style={styles.miniBtn}
                    onPress={() => router.push(`/talent/${prop.freelancerId}` as any)}
                  >
                    <Text style={styles.miniBtnText}>View Profile</Text>
                  </Pressable>

                  {terminalStatus === 'accepted' ? (
                    <View style={styles.terminalAcceptedPill}>
                      <Text style={styles.terminalAcceptedText}>✓ Proposal Accepted</Text>
                    </View>
                  ) : terminalStatus === 'declined' ? (
                    <View style={styles.terminalDeclinedPill}>
                      <Text style={styles.terminalDeclinedText}>Declined</Text>
                    </View>
                  ) : (
                    <>
                      <Pressable
                        style={styles.miniBtnDecline}
                        onPress={() =>
                          setConfirmModal({
                            proposalId: prop.id,
                            freelancerName: prop.freelancerName,
                            action: 'decline',
                          })
                        }
                      >
                        <Text style={styles.miniBtnDeclineText}>Decline</Text>
                      </Pressable>

                      <Pressable
                        style={styles.miniBtnPink}
                        onPress={() =>
                          setConfirmModal({
                            proposalId: prop.id,
                            freelancerName: prop.freelancerName,
                            action: 'accept',
                          })
                        }
                      >
                        <Text style={styles.miniBtnPinkText}>Accept Proposal</Text>
                      </Pressable>
                    </>
                  )}
                </View>
              </View>

              {/* Right Side Bid info */}
              <View style={styles.pRight}>
                <Text style={styles.pBid}>{prop.bid}</Text>
                <Text style={styles.pDelivery}>{prop.delivery}</Text>
              </View>

            </View>
          );
        })}

        {/* Pagination / Empty State Note */}
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            {job.showingText || 'End of proposals.'}
          </Text>
        </View>

        {/* Confirmation Modal */}
        {confirmModal && (
          <Modal transparent animationType="fade" visible={!!confirmModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>
                  {confirmModal.action === 'accept' ? 'Accept Proposal?' : 'Decline Proposal?'}
                </Text>

                <Text style={styles.modalMessage}>
                  {confirmModal.action === 'accept'
                    ? `Accept ${confirmModal.freelancerName}'s proposal? This can't be undone.`
                    : `Decline ${confirmModal.freelancerName}'s proposal? This can't be undone.`}
                </Text>

                <View style={styles.modalActions}>
                  <Pressable
                    style={styles.modalCancelBtn}
                    onPress={() => setConfirmModal(null)}
                  >
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.modalConfirmBtn,
                      confirmModal.action === 'decline' && styles.modalDeclineConfirmBtn,
                    ]}
                    onPress={handleConfirmAction}
                  >
                    <Text style={styles.modalConfirmText}>
                      {confirmModal.action === 'accept' ? 'Confirm Accept' : 'Confirm Decline'}
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
  propJobCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 24,
    marginBottom: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 16,
  },
  jobInfoLeft: {
    flex: 1,
    minWidth: 280,
  },
  jobInfoRight: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  jobTitle: {
    fontSize: 20,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
    marginBottom: 8,
  },
  jobDesc: {
    fontSize: 13.5,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
    maxWidth: 600,
    lineHeight: 20,
  },
  statusPill: {
    paddingHorizontal: 11,
    paddingVertical: 4,
    borderRadius: 100,
    marginBottom: 8,
  },
  statusPillText: {
    fontSize: 11.5,
    fontFamily: 'Inter_700Bold',
  },
  jobBudget: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 18,
    color: '#10172A',
  },
  propCount: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: '#10172A',
    marginBottom: 18,
  },
  proposalCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 20,
    marginBottom: 14,
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  pAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#0B1220',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pAvatarText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
  },
  pBody: {
    flex: 1,
    minWidth: 260,
  },
  pNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  pName: {
    fontSize: 15,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
  },
  verifiedBadge: {
    color: '#EC1257',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  pRole: {
    fontSize: 12.5,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
    marginBottom: 10,
  },
  pPitch: {
    fontSize: 13.5,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
    marginBottom: 14,
    lineHeight: 20,
  },
  pActions: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  miniBtn: {
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  miniBtnText: {
    fontSize: 12.5,
    fontFamily: 'Inter_700Bold',
    color: '#10172A',
  },
  miniBtnDecline: {
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  miniBtnDeclineText: {
    fontSize: 12.5,
    fontFamily: 'Inter_700Bold',
    color: '#5B6472',
  },
  miniBtnPink: {
    backgroundColor: '#EC1257',
    borderWidth: 1.5,
    borderColor: '#EC1257',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  miniBtnPinkText: {
    fontSize: 12.5,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
  },
  terminalAcceptedPill: {
    backgroundColor: '#DCFCE7',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  terminalAcceptedText: {
    fontSize: 12.5,
    fontFamily: 'Inter_700Bold',
    color: '#166534',
  },
  terminalDeclinedPill: {
    backgroundColor: '#F6F7FB',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  terminalDeclinedText: {
    fontSize: 12.5,
    fontFamily: 'Inter_700Bold',
    color: '#5B6472',
  },
  pRight: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  pBid: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 18,
    color: '#10172A',
    marginBottom: 4,
  },
  pDelivery: {
    fontSize: 12,
    color: '#93A0B4',
    fontFamily: 'Inter_400Regular',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  emptyStateText: {
    color: '#5B6472',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
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
  modalDeclineConfirmBtn: {
    backgroundColor: '#5B6472',
  },
  modalConfirmText: {
    fontSize: 13.5,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
  },
});
