import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useRouter, Redirect } from 'expo-router';
import { useAdminAuth } from '../../src/context/AdminAuthContext';
import {
  INITIAL_ADMIN_STATS,
  RECENT_ACTIVITIES,
  INITIAL_ADMIN_USERS,
  INITIAL_APPROVALS,
  INITIAL_DISPUTES,
  INITIAL_TRANSACTIONS,
  REVENUE_METRICS,
  INITIAL_MODERATION_ITEMS,
  AdminUserItem,
  AdminApprovalItem,
  AdminDisputeItem,
  AdminTransactionItem,
  AdminModerationItem,
} from '../../src/constants/adminData';
import {
  DocumentViewerModal,
  RejectionReasonModal,
  DisputeEvidenceModal,
  ActionConfirmModal,
} from '../../src/components/admin/AdminModals';

type AdminTab = 'dashboard' | 'users' | 'approvals' | 'disputes' | 'transactions' | 'revenue' | 'moderation';

export default function AdminDashboardScreen() {
  const router = useRouter();
  const { isAdminLoggedIn, logoutAdmin } = useAdminAuth();
  const dims = useWindowDimensions();
  const isWide = (Platform.OS === 'web' && typeof window !== 'undefined' ? window.innerWidth : dims.width) >= 1000;

  // Active sub-view tab
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // State management for interactive actions
  const [users, setUsers] = useState<AdminUserItem[]>(INITIAL_ADMIN_USERS);
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'All' | 'Client' | 'Freelancer' | 'Suspended'>('All');

  const [approvals, setApprovals] = useState<AdminApprovalItem[]>(INITIAL_APPROVALS);
  const [disputes, setDisputes] = useState<AdminDisputeItem[]>(INITIAL_DISPUTES);

  const [transactions, setTransactions] = useState<AdminTransactionItem[]>(INITIAL_TRANSACTIONS);
  const [txSearch, setTxSearch] = useState('');
  const [txTypeFilter, setTxTypeFilter] = useState<'All' | 'Escrow Hold' | 'Release' | 'Flagged'>('All');

  const [moderations, setModerations] = useState<AdminModerationItem[]>(INITIAL_MODERATION_ITEMS);

  // Modal States
  const [docModalItem, setDocModalItem] = useState<AdminApprovalItem | null>(null);
  const [rejectModalItem, setRejectModalItem] = useState<AdminApprovalItem | null>(null);
  const [disputeModalItem, setDisputeModalItem] = useState<AdminDisputeItem | null>(null);

  const [confirmState, setConfirmState] = useState<{
    visible: boolean;
    title: string;
    message: string;
    confirmText?: string;
    isDanger?: boolean;
    action?: () => void;
  }>({ visible: false, title: '', message: '' });

  // Calculated Badges
  const pendingApprovalsCount = approvals.filter(a => a.status === 'Pending Review').length;
  const openDisputesCount = disputes.filter(d => d.status === 'Disputed').length;
  const pendingModerationsCount = moderations.filter(m => m.status === 'Pending').length;

  const handleSignOut = () => {
    logoutAdmin();
    router.replace('/admin/login');
  };

  // User Actions
  const toggleSuspendUser = (user: AdminUserItem) => {
    const isSuspending = user.status === 'Active';
    setConfirmState({
      visible: true,
      title: isSuspending ? `Suspend User ${user.name}` : `Reinstate User ${user.name}`,
      message: isSuspending
        ? `Are you sure you want to suspend ${user.name}? They will be unable to access their account or post gigs.`
        : `Are you sure you want to reinstate ${user.name}? Account access will be restored immediately.`,
      confirmText: isSuspending ? 'Suspend User' : 'Reinstate User',
      isDanger: isSuspending,
      action: () => {
        setUsers(prev =>
          prev.map(u => (u.id === user.id ? { ...u, status: isSuspending ? 'Suspended' : 'Active' } : u))
        );
      },
    });
  };

  // Approval Actions
  const handleApproveFreelancer = (item: AdminApprovalItem) => {
    setConfirmState({
      visible: true,
      title: `Approve ${item.name}`,
      message: `Approve identity and portfolio for ${item.name}? Their profile status will change to Active.`,
      confirmText: 'Approve Profile',
      action: () => {
        setApprovals(prev => prev.map(a => (a.id === item.id ? { ...a, status: 'Approved' } : a)));
      },
    });
  };

  const handleConfirmRejectFreelancer = (reason: string) => {
    if (!rejectModalItem) return;
    setApprovals(prev => prev.map(a => (a.id === rejectModalItem.id ? { ...a, status: 'Rejected' } : a)));
  };

  // Dispute Resolution Actions
  const handleResolveDispute = (disputeId: string, actionType: 'release' | 'refund' | 'split') => {
    const statusMap = {
      release: 'Resolved_Freelancer' as const,
      refund: 'Resolved_Client' as const,
      split: 'Resolved_Split' as const,
    };
    setDisputes(prev => prev.map(d => (d.id === disputeId ? { ...d, status: statusMap[actionType] } : d)));
  };

  // Moderation Actions
  const handleRemoveContent = (mod: AdminModerationItem) => {
    setConfirmState({
      visible: true,
      title: `Remove Flagged ${mod.targetType.toUpperCase()}`,
      message: `Are you sure you want to remove "${mod.title}"? This action takes down the content.`,
      confirmText: 'Remove Content',
      isDanger: true,
      action: () => {
        setModerations(prev => prev.map(m => (m.id === mod.id ? { ...m, status: 'Removed' } : m)));
      },
    });
  };

  const handleDismissReport = (mod: AdminModerationItem) => {
    setModerations(prev => prev.map(m => (m.id === mod.id ? { ...m, status: 'Dismissed' } : m)));
  };

  // Filtered Lists
  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase());
    if (!matchesSearch) return false;
    if (userRoleFilter === 'All') return true;
    if (userRoleFilter === 'Suspended') return u.status === 'Suspended';
    return u.role === userRoleFilter;
  });

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch =
      t.id.toLowerCase().includes(txSearch.toLowerCase()) ||
      t.orderId.toLowerCase().includes(txSearch.toLowerCase());
    if (!matchesSearch) return false;
    if (txTypeFilter === 'All') return true;
    if (txTypeFilter === 'Flagged') return t.status === 'Flagged';
    return t.type === txTypeFilter;
  });

  // ROUTE GUARD CHECK: Redirect to /admin/login if not authenticated
  if (!isAdminLoggedIn) {
    return <Redirect href="/admin/login" />;
  }

  return (
    <View style={styles.shell}>
      {/* SIDEBAR / TOPNAV HEADER */}
      <View style={isWide ? styles.sidebar : styles.mobileNav}>
        <View style={styles.sbLogoRow}>
          <View style={styles.sbMark}>
            <Text style={styles.sbMarkText}>S</Text>
          </View>
          <Text style={styles.sbLogoTitle}>SkillNest Admin</Text>
        </View>

        <ScrollView
          horizontal={!isWide}
          showsHorizontalScrollIndicator={false}
          style={isWide ? styles.sbListVertical : styles.sbListHorizontal}
          contentContainerStyle={!isWide && styles.sbHorizontalContent}
        >
          <TouchableOpacity
            style={[styles.sbItem, activeTab === 'dashboard' && styles.sbItemActive]}
            onPress={() => setActiveTab('dashboard')}
          >
            <Text style={[styles.sbItemText, activeTab === 'dashboard' && styles.sbItemTextActive]}>
              📊 Dashboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sbItem, activeTab === 'users' && styles.sbItemActive]}
            onPress={() => setActiveTab('users')}
          >
            <Text style={[styles.sbItemText, activeTab === 'users' && styles.sbItemTextActive]}>
              👥 Users
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sbItem, activeTab === 'approvals' && styles.sbItemActive]}
            onPress={() => setActiveTab('approvals')}
          >
            <Text style={[styles.sbItemText, activeTab === 'approvals' && styles.sbItemTextActive]}>
              ✅ Approvals
            </Text>
            {pendingApprovalsCount > 0 && (
              <View style={styles.sbBadge}>
                <Text style={styles.sbBadgeText}>{pendingApprovalsCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sbItem, activeTab === 'disputes' && styles.sbItemActive]}
            onPress={() => setActiveTab('disputes')}
          >
            <Text style={[styles.sbItemText, activeTab === 'disputes' && styles.sbItemTextActive]}>
              ⚠️ Disputes
            </Text>
            {openDisputesCount > 0 && (
              <View style={styles.sbBadge}>
                <Text style={styles.sbBadgeText}>{openDisputesCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sbItem, activeTab === 'transactions' && styles.sbItemActive]}
            onPress={() => setActiveTab('transactions')}
          >
            <Text style={[styles.sbItemText, activeTab === 'transactions' && styles.sbItemTextActive]}>
              💳 Transactions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sbItem, activeTab === 'revenue' && styles.sbItemActive]}
            onPress={() => setActiveTab('revenue')}
          >
            <Text style={[styles.sbItemText, activeTab === 'revenue' && styles.sbItemTextActive]}>
              📈 Revenue
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sbItem, activeTab === 'moderation' && styles.sbItemActive]}
            onPress={() => setActiveTab('moderation')}
          >
            <Text style={[styles.sbItemText, activeTab === 'moderation' && styles.sbItemTextActive]}>
              🚩 Moderation
            </Text>
            {pendingModerationsCount > 0 && (
              <View style={styles.sbBadge}>
                <Text style={styles.sbBadgeText}>{pendingModerationsCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </ScrollView>

        {isWide && (
          <View style={styles.sbFoot}>
            <View style={styles.sbAvatar}>
              <Text style={styles.sbAvatarText}>A</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sbName}>Admin User</Text>
              <Text style={styles.sbRole}>Super Admin</Text>
            </View>
            <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* MAIN CONTENT AREA */}
      <ScrollView style={styles.mainContent} contentContainerStyle={styles.mainContentContainer}>
        {/* VIEW 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <View>
            <Text style={styles.pageTitle}>Dashboard</Text>
            <Text style={styles.pageSub}>Platform health at a glance.</Text>

            {/* 5 STAT CARDS */}
            <View style={isWide ? styles.statCardsGrid : styles.statCardsGridMobile}>
              <View style={styles.statCard}>
                <Text style={styles.statVal}>{INITIAL_ADMIN_STATS.totalUsers}</Text>
                <Text style={styles.statLbl}>Total Users</Text>
                <Text style={[styles.statDelta, styles.deltaUp]}>{INITIAL_ADMIN_STATS.totalUsersDelta}</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statVal}>{INITIAL_ADMIN_STATS.activeGigs}</Text>
                <Text style={styles.statLbl}>Active Gigs & Jobs</Text>
                <Text style={[styles.statDelta, styles.deltaUp]}>{INITIAL_ADMIN_STATS.activeGigsDelta}</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statVal}>{INITIAL_ADMIN_STATS.gmvMonth}</Text>
                <Text style={styles.statLbl}>GMV This Month</Text>
                <Text style={[styles.statDelta, styles.deltaUp]}>{INITIAL_ADMIN_STATS.gmvDelta}</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statVal}>{openDisputesCount}</Text>
                <Text style={styles.statLbl}>Disputes Open</Text>
                <Text style={[styles.statDelta, styles.deltaWarn]}>{INITIAL_ADMIN_STATS.disputesDelta}</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statVal}>{pendingApprovalsCount}</Text>
                <Text style={styles.statLbl}>Pending Approvals</Text>
                <Text style={[styles.statDelta, styles.deltaWarn]}>{INITIAL_ADMIN_STATS.pendingApprovalsDelta}</Text>
              </View>
            </View>

            {/* CHART & ACTIVITY GRID */}
            <View style={isWide ? styles.grid2 : styles.grid1}>
              <View style={styles.card}>
                <Text style={styles.cardHeaderTitle}>Revenue — Last 6 Months</Text>
                <View style={styles.chartBarsContainer}>
                  {REVENUE_METRICS.monthlyTrend.map((item, i) => (
                    <View key={i} style={styles.barCol}>
                      <View style={[styles.barFill, { height: `${(item.total / 24000) * 100}%` }]} />
                      <Text style={styles.barLbl}>{item.month}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardHeaderTitle}>Recent Activity</Text>
                {RECENT_ACTIVITIES.map(act => (
                  <View key={act.id} style={styles.activityRow}>
                    <View style={styles.activityIc}>
                      <Text style={{ fontSize: 14 }}>{act.icon}</Text>
                    </View>
                    <Text style={styles.activityText}>{act.text}</Text>
                    <Text style={styles.activityTime}>{act.time}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* VIEW 2: USER MANAGEMENT */}
        {activeTab === 'users' && (
          <View>
            <Text style={styles.pageTitle}>User Management</Text>
            <Text style={styles.pageSub}>12,480 registered users across clients & freelancers.</Text>

            <View style={styles.toolbar}>
              <TextInput
                style={styles.searchInput}
                value={userSearch}
                onChangeText={setUserSearch}
                placeholder="Search by name or email"
                placeholderTextColor="#93A0B4"
              />
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                {(['All', 'Clients', 'Freelancers', 'Suspended'] as const).map(role => {
                  const filterKey = role === 'Clients' ? 'Client' : role === 'Freelancers' ? 'Freelancer' : role;
                  const active = userRoleFilter === filterKey;
                  return (
                    <TouchableOpacity
                      key={role}
                      style={[styles.filterPill, active && styles.filterPillActive]}
                      onPress={() => setUserRoleFilter(filterKey as any)}
                    >
                      <Text style={[styles.filterPillText, active && styles.filterPillTextActive]}>{role}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            <View style={styles.tableCard}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.thCell, { flex: 2 }]}>User</Text>
                <Text style={[styles.thCell, { flex: 2 }]}>Email</Text>
                <Text style={[styles.thCell, { flex: 1 }]}>Role</Text>
                <Text style={[styles.thCell, { flex: 1 }]}>Status</Text>
                <Text style={[styles.thCell, { flex: 1 }]}>Actions</Text>
              </View>

              {filteredUsers.map(u => (
                <View key={u.id} style={styles.tableRow}>
                  <View style={[styles.userCell, { flex: 2 }]}>
                    <View style={styles.userAv}>
                      <Text style={styles.userAvText}>{u.avatar}</Text>
                    </View>
                    <Text style={styles.userName}>{u.name}</Text>
                  </View>
                  <Text style={[styles.tdText, { flex: 2, color: '#5B6472' }]}>{u.email}</Text>
                  <View style={[{ flex: 1 }]}>
                    <View style={u.role === 'Freelancer' ? styles.pillPink : styles.pillBlue}>
                      <Text style={u.role === 'Freelancer' ? styles.pillPinkText : styles.pillBlueText}>
                        {u.role}
                      </Text>
                    </View>
                  </View>
                  <View style={[{ flex: 1 }]}>
                    <View style={u.status === 'Active' ? styles.pillGreen : styles.pillAmber}>
                      <Text style={u.status === 'Active' ? styles.pillGreenText : styles.pillAmberText}>
                        {u.status}
                      </Text>
                    </View>
                  </View>
                  <View style={[{ flex: 1, flexDirection: 'row', gap: 6 }]}>
                    <TouchableOpacity
                      style={[styles.miniBtn, u.status === 'Active' && styles.miniBtnDanger]}
                      onPress={() => toggleSuspendUser(u)}
                    >
                      <Text style={u.status === 'Active' ? styles.miniBtnTextDanger : styles.miniBtnText}>
                        {u.status === 'Active' ? 'Suspend' : 'Reinstate'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* VIEW 3: FREELANCER APPROVALS */}
        {activeTab === 'approvals' && (
          <View>
            <Text style={styles.pageTitle}>Freelancer Approvals</Text>
            <Text style={styles.pageSub}>
              {pendingApprovalsCount} profiles awaiting identity & portfolio review.
            </Text>

            {approvals.map(item => (
              <View key={item.id} style={styles.queueCard}>
                <View style={styles.queueAv}>
                  <Text style={styles.queueAvText}>{item.avatar}</Text>
                </View>
                <View style={styles.queueBody}>
                  <View style={styles.queueTitleRow}>
                    <Text style={styles.queueTitle}>{item.name}</Text>
                    <View
                      style={
                        item.status === 'Approved'
                          ? styles.pillGreen
                          : item.status === 'Rejected'
                          ? styles.pillRed
                          : styles.pillAmber
                      }
                    >
                      <Text
                        style={
                          item.status === 'Approved'
                            ? styles.pillGreenText
                            : item.status === 'Rejected'
                            ? styles.pillRedText
                            : styles.pillAmberText
                        }
                      >
                        {item.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.queueMeta}>
                    Applying as: {item.category} · Submitted {item.submittedDaysAgo}
                  </Text>
                  <Text style={styles.queueDesc}>{item.description}</Text>

                  {item.status === 'Pending Review' && (
                    <View style={styles.queueActionRow}>
                      <TouchableOpacity style={styles.btnViewDoc} onPress={() => setDocModalItem(item)}>
                        <Text style={styles.btnViewDocText}>View Documents</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btnApprove} onPress={() => handleApproveFreelancer(item)}>
                        <Text style={styles.btnApproveText}>Approve</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btnReject} onPress={() => setRejectModalItem(item)}>
                        <Text style={styles.btnRejectText}>Reject</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <Text style={styles.queueRightDate}>Submitted{'\n'}{item.submittedDate}</Text>
              </View>
            ))}
          </View>
        )}

        {/* VIEW 4: DISPUTE HANDLING */}
        {activeTab === 'disputes' && (
          <View>
            <Text style={styles.pageTitle}>Dispute Handling</Text>
            <Text style={styles.pageSub}>
              {openDisputesCount} orders currently under mediator review.
            </Text>

            {disputes.map(d => (
              <View key={d.id} style={styles.queueCard}>
                <View style={[styles.queueAv, { backgroundColor: '#EC1257' }]}>
                  <Text style={styles.queueAvText}>⚖️</Text>
                </View>
                <View style={styles.queueBody}>
                  <View style={styles.queueTitleRow}>
                    <Text style={styles.queueTitle}>Order {d.orderId} — {d.title}</Text>
                    <View style={d.status === 'Disputed' ? styles.pillRed : styles.pillGreen}>
                      <Text style={d.status === 'Disputed' ? styles.pillRedText : styles.pillGreenText}>
                        {d.status.replace('Resolved_', 'Resolved: ')}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.queueMeta}>
                    Client: {d.clientName} · Freelancer: {d.freelancerName} · Milestone: "{d.milestoneTitle}"
                  </Text>
                  <Text style={styles.queueDesc}>{d.disputeReason}</Text>

                  {d.status === 'Disputed' && (
                    <View style={styles.queueActionRow}>
                      <TouchableOpacity style={styles.btnViewDoc} onPress={() => setDisputeModalItem(d)}>
                        <Text style={styles.btnViewDocText}>View Evidence & Messages</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btnApprove}
                        onPress={() => handleResolveDispute(d.id, 'release')}
                      >
                        <Text style={styles.btnApproveText}>Release to Freelancer</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btnReject}
                        onPress={() => handleResolveDispute(d.id, 'refund')}
                      >
                        <Text style={styles.btnRejectText}>Refund Client</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.miniBtn}
                        onPress={() => handleResolveDispute(d.id, 'split')}
                      >
                        <Text style={styles.miniBtnText}>Split 50/50</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <Text style={styles.queueRightDate}>Opened{'\n'}{d.openedAgo}</Text>
              </View>
            ))}
          </View>
        )}

        {/* VIEW 5: TRANSACTION MONITORING */}
        {activeTab === 'transactions' && (
          <View>
            <Text style={styles.pageTitle}>Transaction Monitoring</Text>
            <Text style={styles.pageSub}>Escrow holds, releases, and payouts across the platform.</Text>

            <View style={styles.toolbar}>
              <TextInput
                style={styles.searchInput}
                value={txSearch}
                onChangeText={setTxSearch}
                placeholder="Search by order ID or Tx ID"
                placeholderTextColor="#93A0B4"
              />
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                {(['All', 'Escrow Hold', 'Release', 'Flagged'] as const).map(type => {
                  const active = txTypeFilter === type;
                  return (
                    <TouchableOpacity
                      key={type}
                      style={[styles.filterPill, active && styles.filterPillActive]}
                      onPress={() => setTxTypeFilter(type)}
                    >
                      <Text style={[styles.filterPillText, active && styles.filterPillTextActive]}>{type}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            <View style={styles.tableCard}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.thCell, { flex: 1 }]}>Tx ID</Text>
                <Text style={[styles.thCell, { flex: 1.5 }]}>Order ID</Text>
                <Text style={[styles.thCell, { flex: 1 }]}>Amount</Text>
                <Text style={[styles.thCell, { flex: 1.5 }]}>Type</Text>
                <Text style={[styles.thCell, { flex: 1 }]}>Status</Text>
                <Text style={[styles.thCell, { flex: 1 }]}>Date</Text>
              </View>

              {filteredTransactions.map(tx => (
                <View key={tx.id} style={styles.tableRow}>
                  <Text style={[styles.tdText, { flex: 1, fontFamily: 'Inter_600SemiBold' }]}>{tx.id}</Text>
                  <Text style={[styles.tdText, { flex: 1.5, color: '#5B6472' }]}>{tx.orderId}</Text>
                  <Text style={[styles.tdText, { flex: 1, fontFamily: 'Manrope_700Bold', color: '#10172A' }]}>
                    ${tx.amount}
                  </Text>
                  <View style={[{ flex: 1.5 }]}>
                    <View
                      style={
                        tx.type === 'Release' || tx.type === 'Payout'
                          ? styles.pillGreen
                          : tx.type === 'Escrow Hold'
                          ? styles.pillBlue
                          : styles.pillAmber
                      }
                    >
                      <Text
                        style={
                          tx.type === 'Release' || tx.type === 'Payout'
                            ? styles.pillGreenText
                            : tx.type === 'Escrow Hold'
                            ? styles.pillBlueText
                            : styles.pillAmberText
                        }
                      >
                        {tx.type}
                      </Text>
                    </View>
                  </View>
                  <View style={[{ flex: 1 }]}>
                    <View style={tx.status === 'Cleared' ? styles.pillGreen : styles.pillRed}>
                      <Text style={tx.status === 'Cleared' ? styles.pillGreenText : styles.pillRedText}>
                        {tx.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.tdText, { flex: 1, color: '#93A0B4', fontSize: 12 }]}>{tx.date}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* VIEW 6: REVENUE ANALYTICS */}
        {activeTab === 'revenue' && (
          <View>
            <Text style={styles.pageTitle}>Revenue Analytics</Text>
            <Text style={styles.pageSub}>
              Hybrid monetization breakdown — commissions, subscriptions, and ads.
            </Text>

            <View style={isWide ? styles.revGrid : styles.revGridMobile}>
              <View style={styles.revCard}>
                <Text style={styles.revVal}>${REVENUE_METRICS.commission.toLocaleString()}</Text>
                <Text style={styles.revLbl}>Commission Revenue ({REVENUE_METRICS.commissionPercent})</Text>
              </View>

              <View style={styles.revCard}>
                <Text style={styles.revVal}>${REVENUE_METRICS.subscriptions.toLocaleString()}</Text>
                <Text style={styles.revLbl}>Premium Subscriptions</Text>
              </View>

              <View style={styles.revCard}>
                <Text style={styles.revVal}>${REVENUE_METRICS.admobAds.toLocaleString()}</Text>
                <Text style={styles.revLbl}>AdMob Rewarded Ads</Text>
              </View>

              <View style={[styles.revCard, styles.revCardTotal]}>
                <Text style={[styles.revVal, { color: '#FFFFFF' }]}>
                  ${REVENUE_METRICS.totalMonth.toLocaleString()}
                </Text>
                <Text style={[styles.revLbl, { color: '#93A0B4' }]}>Total Revenue (This Month)</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardHeaderTitle}>Revenue by Source — Last 6 Months</Text>
              <View style={styles.chartBarsContainer}>
                {REVENUE_METRICS.monthlyTrend.map((item, i) => (
                  <View key={i} style={styles.barCol}>
                    <View style={[styles.barFillNavy, { height: `${(item.total / 25000) * 100}%` }]} />
                    <Text style={styles.barLbl}>{item.month}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* VIEW 7: CONTENT MODERATION */}
        {activeTab === 'moderation' && (
          <View>
            <Text style={styles.pageTitle}>Content Moderation</Text>
            <Text style={styles.pageSub}>
              {pendingModerationsCount} items flagged by users awaiting review.
            </Text>

            {moderations.map(mod => (
              <View key={mod.id} style={styles.queueCard}>
                <View style={[styles.queueAv, { backgroundColor: '#D97706' }]}>
                  <Text style={styles.queueAvText}>🚩</Text>
                </View>
                <View style={styles.queueBody}>
                  <View style={styles.queueTitleRow}>
                    <Text style={styles.queueTitle}>{mod.title}</Text>
                    <View
                      style={
                        mod.status === 'Pending'
                          ? styles.pillAmber
                          : mod.status === 'Removed'
                          ? styles.pillRed
                          : styles.pillGreen
                      }
                    >
                      <Text
                        style={
                          mod.status === 'Pending'
                            ? styles.pillAmberText
                            : mod.status === 'Removed'
                            ? styles.pillRedText
                            : styles.pillGreenText
                        }
                      >
                        {mod.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.queueMeta}>
                    Reported by: {mod.reportedByCount} users · Reason: {mod.reason}
                  </Text>
                  <Text style={styles.queueDesc}>{mod.description}</Text>

                  {mod.status === 'Pending' && (
                    <View style={styles.queueActionRow}>
                      <TouchableOpacity style={styles.btnReject} onPress={() => handleRemoveContent(mod)}>
                        <Text style={styles.btnRejectText}>Remove Content</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.miniBtn} onPress={() => handleDismissReport(mod)}>
                        <Text style={styles.miniBtnText}>Dismiss Report</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <Text style={styles.queueRightDate}>Flagged{'\n'}{mod.flaggedAgo}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* MODALS */}
      <DocumentViewerModal
        visible={!!docModalItem}
        item={docModalItem}
        onClose={() => setDocModalItem(null)}
      />
      <RejectionReasonModal
        visible={!!rejectModalItem}
        item={rejectModalItem}
        onClose={() => setRejectModalItem(null)}
        onConfirm={handleConfirmRejectFreelancer}
      />
      <DisputeEvidenceModal
        visible={!!disputeModalItem}
        dispute={disputeModalItem}
        onClose={() => setDisputeModalItem(null)}
        onResolve={actionType => {
          if (disputeModalItem) {
            handleResolveDispute(disputeModalItem.id, actionType);
          }
        }}
      />
      <ActionConfirmModal
        visible={confirmState.visible}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        isDanger={confirmState.isDanger}
        onClose={() => setConfirmState(prev => ({ ...prev, visible: false }))}
        onConfirm={() => {
          if (confirmState.action) confirmState.action();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    backgroundColor: '#F6F7FB',
    minHeight: '100%',
  },

  // SIDEBAR (WIDE DESKTOP)
  sidebar: {
    width: 240,
    backgroundColor: '#0B1220',
    paddingVertical: 22,
    paddingHorizontal: 14,
    justifyContent: 'space-between',
  },
  sbLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  sbMark: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#EC1257',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sbMarkText: {
    color: '#FFFFFF',
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 16,
  },
  sbLogoTitle: {
    color: '#FFFFFF',
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 16,
  },
  sbListVertical: {
    flex: 1,
  },
  sbItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 4,
  },
  sbItemActive: {
    backgroundColor: 'rgba(236,18,87,0.16)',
  },
  sbItemText: {
    color: '#93A0B4',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13.5,
  },
  sbItemTextActive: {
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
  },
  sbBadge: {
    backgroundColor: '#EC1257',
    borderRadius: 100,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  sbBadgeText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 10.5,
  },
  sbFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  sbAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EC1257',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sbAvatarText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
  },
  sbName: {
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
  },
  sbRole: {
    color: '#93A0B4',
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
  },
  signOutBtn: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  signOutText: {
    color: '#EC1257',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
  },

  // MOBILE NAV (HEADER SCROLL BAR)
  mobileNav: {
    backgroundColor: '#0B1220',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sbListHorizontal: {
    flexDirection: 'row',
    marginTop: 10,
  },
  sbHorizontalContent: {
    gap: 8,
    alignItems: 'center',
  },

  // MAIN CONTENT
  mainContent: {
    flex: 1,
  },
  mainContentContainer: {
    padding: 32,
  },
  pageTitle: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 24,
    color: '#10172A',
    marginBottom: 4,
  },
  pageSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13.5,
    color: '#5B6472',
    marginBottom: 24,
  },

  // STAT CARDS
  statCardsGrid: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 24,
  },
  statCardsGridMobile: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 16,
  },
  statVal: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 22,
    color: '#10172A',
  },
  statLbl: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: '#93A0B4',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 4,
  },
  statDelta: {
    fontFamily: 'Inter_700Bold',
    fontSize: 11.5,
    marginTop: 6,
  },
  deltaUp: { color: '#17A34A' },
  deltaWarn: { color: '#D97706' },

  // GRID LAYOUTS
  grid2: {
    flexDirection: 'row',
    gap: 20,
  },
  grid1: {
    flexDirection: 'column',
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
  },
  cardHeaderTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15.5,
    color: '#10172A',
    marginBottom: 16,
  },

  // CHART BARS
  chartBarsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 140,
    gap: 10,
    paddingTop: 10,
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    backgroundColor: '#EC1257',
    borderRadius: 4,
  },
  barFillNavy: {
    width: '100%',
    backgroundColor: '#0B1220',
    borderRadius: 4,
  },
  barLbl: {
    fontFamily: 'Inter_400Regular',
    fontSize: 10.5,
    color: '#93A0B4',
    marginTop: 6,
  },

  // ACTIVITY ROWS
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E9F1',
    gap: 10,
  },
  activityIc: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F6F7FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityText: {
    flex: 1,
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: '#10172A',
  },
  activityTime: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11.5,
    color: '#93A0B4',
  },

  // TOOLBAR & TABLES
  toolbar: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: 'Inter_400Regular',
    fontSize: 13.5,
    color: '#10172A',
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    backgroundColor: '#FFFFFF',
  },
  filterPillActive: {
    backgroundColor: '#0B1220',
    borderColor: '#0B1220',
  },
  filterPillText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12.5,
    color: '#5B6472',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },
  tableCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E9F1',
  },
  tableHeader: {
    backgroundColor: '#F6F7FB',
  },
  thCell: {
    fontFamily: 'Inter_700Bold',
    fontSize: 11,
    color: '#93A0B4',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tdCell: {
    flex: 1,
  },
  tdText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#10172A',
  },
  userCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userAv: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0B1220',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 11,
  },
  userName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: '#10172A',
  },

  // QUEUE CARDS
  queueCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  queueAv: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#0B1220',
    alignItems: 'center',
    justifyContent: 'center',
  },
  queueAvText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 15,
  },
  queueBody: {
    flex: 1,
  },
  queueTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  queueTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
    color: '#10172A',
  },
  queueMeta: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12.5,
    color: '#5B6472',
    marginBottom: 8,
  },
  queueDesc: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#5B6472',
    marginBottom: 12,
  },
  queueActionRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  queueRightDate: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11.5,
    color: '#93A0B4',
    textAlign: 'right',
  },

  // BUTTON STYLES
  btnApprove: {
    backgroundColor: '#17A34A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnApproveText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 12.5,
  },
  btnReject: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FEE2E2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnRejectText: {
    color: '#DC2626',
    fontFamily: 'Inter_700Bold',
    fontSize: 12.5,
  },
  btnViewDoc: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnViewDocText: {
    color: '#10172A',
    fontFamily: 'Inter_700Bold',
    fontSize: 12.5,
  },
  miniBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  miniBtnText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    color: '#10172A',
  },
  miniBtnDanger: {
    borderColor: '#FEE2E2',
  },
  miniBtnTextDanger: {
    color: '#DC2626',
  },

  // PILLS
  pillGreen: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  pillGreenText: { color: '#166534', fontFamily: 'Inter_700Bold', fontSize: 11 },
  pillRed: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  pillRedText: { color: '#DC2626', fontFamily: 'Inter_700Bold', fontSize: 11 },
  pillAmber: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  pillAmberText: { color: '#D97706', fontFamily: 'Inter_700Bold', fontSize: 11 },
  pillBlue: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  pillBlueText: { color: '#1E40AF', fontFamily: 'Inter_700Bold', fontSize: 11 },
  pillPink: {
    backgroundColor: '#FDE8EF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  pillPinkText: { color: '#C10E48', fontFamily: 'Inter_700Bold', fontSize: 11 },

  // REVENUE GRID
  revGrid: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 24,
  },
  revGridMobile: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 24,
  },
  revCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 18,
  },
  revCardTotal: {
    backgroundColor: '#0B1220',
    borderColor: '#0B1220',
  },
  revVal: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 24,
    color: '#10172A',
  },
  revLbl: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: '#93A0B4',
    marginTop: 4,
  },
});
