import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { AdminApprovalItem, AdminDisputeItem } from '../../constants/adminData';

interface DocumentModalProps {
  visible: boolean;
  item: AdminApprovalItem | null;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentModalProps> = ({ visible, item, onClose }) => {
  if (!item) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Verification Documents — {item.name}</Text>
          <Text style={styles.modalSub}>{item.category} · Submitted {item.submittedDate}</Text>

          <ScrollView style={styles.modalBody}>
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>🆔 Identity Verification Document</Text>
              <View style={styles.docItem}>
                <Text style={styles.docName}>{item.documents.idFileName}</Text>
                <Text style={styles.docMeta}>Type: {item.documents.idType} · Status: Verified Genuine</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>📁 Submitted Portfolio Samples ({item.documents.portfolioCount})</Text>
              {item.documents.samples.map((sample, i) => (
                <View key={i} style={styles.docItem}>
                  <Text style={styles.docName}>Sample #{i + 1}: {sample}</Text>
                  <Text style={styles.docMeta}>Format: Video / Digital Asset · High Resolution</Text>
                </View>
              ))}
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                ✓ Identity matches submitted details. Portfolio samples verified original.
              </Text>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>Close Document Viewer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

interface RejectModalProps {
  visible: boolean;
  item: AdminApprovalItem | null;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export const RejectionReasonModal: React.FC<RejectModalProps> = ({ visible, item, onClose, onConfirm }) => {
  const [reason, setReason] = useState('');

  if (!item) return null;

  const handleConfirm = () => {
    onConfirm(reason || 'Portfolio or identity document did not meet verification criteria.');
    setReason('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={[styles.modalTitle, { color: '#DC2626' }]}>Reject Freelancer Application</Text>
          <Text style={styles.modalSub}>Applicant: {item.name} ({item.category})</Text>

          <View style={{ marginVertical: 14 }}>
            <Text style={styles.inputLabel}>Reason for Rejection (sent to applicant):</Text>
            <TextInput
              style={styles.textArea}
              value={reason}
              onChangeText={setReason}
              placeholder="e.g. Identity document unreadable or portfolio sample unverified..."
              placeholderTextColor="#93A0B4"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dangerBtn} onPress={handleConfirm}>
              <Text style={styles.dangerBtnText}>Confirm Rejection</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

interface DisputeModalProps {
  visible: boolean;
  dispute: AdminDisputeItem | null;
  onClose: () => void;
  onResolve: (action: 'release' | 'refund' | 'split') => void;
}

export const DisputeEvidenceModal: React.FC<DisputeModalProps> = ({ visible, dispute, onClose, onResolve }) => {
  if (!dispute) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modalCard, { maxWidth: 600 }]}>
          <Text style={styles.modalTitle}>Dispute Audit — {dispute.orderId}</Text>
          <Text style={styles.modalSub}>
            Client: {dispute.clientName} | Freelancer: {dispute.freelancerName} | Frozen: ${dispute.frozenAmount}
          </Text>

          <ScrollView style={[styles.modalBody, { maxHeight: 320 }]}>
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>📋 Milestone & Issue</Text>
              <Text style={styles.bodyText}>Milestone: {dispute.milestoneTitle}</Text>
              <Text style={styles.bodyText}>{dispute.disputeReason}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>💬 Order Message History</Text>
              {dispute.chatHistory.map((chat, idx) => (
                <View key={idx} style={styles.chatBubble}>
                  <Text style={styles.chatSender}>{chat.sender} <Text style={styles.chatTime}>· {chat.time}</Text></Text>
                  <Text style={styles.chatText}>{chat.text}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <Text style={[styles.inputLabel, { marginTop: 12, marginBottom: 8 }]}>Mediator Decision:</Text>
          <View style={styles.resolutionRow}>
            <TouchableOpacity
              style={styles.approveBtnSmall}
              onPress={() => {
                onResolve('release');
                onClose();
              }}
            >
              <Text style={styles.btnTextWhite}>Release Funds</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.refundBtnSmall}
              onPress={() => {
                onResolve('refund');
                onClose();
              }}
            >
              <Text style={styles.dangerBtnText}>Refund Client</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.splitBtnSmall}
              onPress={() => {
                onResolve('split');
                onClose();
              }}
            >
              <Text style={styles.btnTextInk}>Split 50/50</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.closeBtn, { marginTop: 12 }]} onPress={onClose}>
            <Text style={styles.closeBtnText}>Close Audit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  isDanger?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ActionConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  isDanger = false,
  onClose,
  onConfirm,
}) => {
  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={[styles.modalTitle, isDanger && { color: '#DC2626' }]}>{title}</Text>
          <Text style={styles.bodyText}>{message}</Text>

          <View style={[styles.btnRow, { marginTop: 20 }]}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isDanger ? styles.dangerBtn : styles.approveBtnSmall}
              onPress={() => {
                onConfirm();
                onClose();
              }}
            >
              <Text style={isDanger ? styles.dangerBtnText : styles.btnTextWhite}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 18, 32, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 520,
    maxHeight: '90%',
  },
  modalTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    color: '#10172A',
    marginBottom: 4,
  },
  modalSub: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: '#5B6472',
    marginBottom: 16,
  },
  modalBody: {
    maxHeight: 360,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: '#10172A',
    marginBottom: 8,
  },
  docItem: {
    backgroundColor: '#F6F7FB',
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E7E9F1',
  },
  docName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: '#10172A',
  },
  docMeta: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11.5,
    color: '#5B6472',
    marginTop: 2,
  },
  infoBox: {
    backgroundColor: '#DCFCE7',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  infoText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#166534',
  },
  bodyText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13.5,
    color: '#5B6472',
    lineHeight: 20,
  },
  inputLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: '#10172A',
    marginBottom: 6,
  },
  textArea: {
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    borderRadius: 10,
    padding: 12,
    fontSize: 13.5,
    fontFamily: 'Inter_400Regular',
    color: '#10172A',
    textAlignVertical: 'top',
    minHeight: 80,
  },
  chatBubble: {
    backgroundColor: '#F6F7FB',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#EC1257',
  },
  chatSender: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#10172A',
  },
  chatTime: {
    fontFamily: 'Inter_400Regular',
    color: '#93A0B4',
    fontSize: 11,
  },
  chatText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12.5,
    color: '#5B6472',
    marginTop: 4,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  resolutionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
  },
  cancelBtnText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: '#5B6472',
  },
  dangerBtn: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#DC2626',
  },
  dangerBtnText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
    color: '#DC2626',
  },
  closeBtn: {
    backgroundColor: '#10172A',
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  closeBtnText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
    color: '#FFFFFF',
  },
  approveBtnSmall: {
    backgroundColor: '#17A34A',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  refundBtnSmall: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  splitBtnSmall: {
    backgroundColor: '#F6F7FB',
    borderColor: '#E7E9F1',
    borderWidth: 1.5,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  btnTextWhite: {
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 12.5,
  },
  btnTextInk: {
    color: '#10172A',
    fontFamily: 'Inter_700Bold',
    fontSize: 12.5,
  },
});
