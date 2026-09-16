import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  Modal,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useUser, AvailabilityStatus, PayoutMethod } from '../../src/context/UserContext';
import { AppIcon, type AppIconName } from '../../src/components/AppIcon';

const BREAKPOINT = 880;

function useBreakpoint() {
  const dims = useWindowDimensions();

  const getWidth = () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return dims.width;
  };

  const [width, setWidth] = useState(getWidth);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    setWidth(window.innerWidth);
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const currentWidth = Platform.OS === 'web' ? width : dims.width;
  return currentWidth >= BREAKPOINT;
}

type SettingsPanel = 'profile' | 'security' | 'notifs' | 'payments' | 'availability' | 'danger';

interface DangerModalState {
  type: 'logout' | 'deactivate' | 'delete';
}

export default function AccountSettingsScreen() {
  const router = useRouter();
  const isWide = useBreakpoint();

  const {
    user,
    updateProfile,
    setAvailabilityStatus,
    updatePayoutInfo,
    updateNotifications,
    logout,
    deactivateAccount,
    deleteAccount,
  } = useUser();

  const [activePanel, setActivePanel] = useState<SettingsPanel>('profile');
  const [dangerModal, setDangerModal] = useState<DangerModalState | null>(null);

  // Profile Form State
  const [name, setName] = useState(user.name);
  const [location, setLocation] = useState(user.location);
  const [headline, setHeadline] = useState(user.headline);
  const [bio, setBio] = useState(user.bio);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [profileSavedMsg, setProfileSavedMsg] = useState(false);

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSavedMsg, setPasswordSavedMsg] = useState(false);

  // Payout Form State
  const [accountHolder, setAccountHolder] = useState(user.accountHolder || user.name);
  const [iban, setIban] = useState(user.iban);
  const [payoutSavedMsg, setPayoutSavedMsg] = useState(false);

  const getInitials = (fullName: string) => {
    if (!fullName) return '?';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const handleSaveProfile = () => {
    updateProfile({
      name,
      location,
      headline,
      bio,
      email,
      phone,
    });
    setProfileSavedMsg(true);
    setTimeout(() => setProfileSavedMsg(false), 3000);
  };

  const handleUpdatePassword = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordSavedMsg(true);
    setTimeout(() => setPasswordSavedMsg(false), 3000);
  };

  const handleSavePayout = () => {
    updatePayoutInfo({
      accountHolder,
      iban,
    });
    setPayoutSavedMsg(true);
    setTimeout(() => setPayoutSavedMsg(false), 3000);
  };

  const handleConfirmDangerAction = () => {
    if (!dangerModal) return;
    const actionType = dangerModal.type;
    setDangerModal(null);

    if (actionType === 'logout') {
      logout();
      router.replace('/(auth)/login');
    } else if (actionType === 'deactivate') {
      deactivateAccount();
      router.replace('/(auth)/login');
    } else if (actionType === 'delete') {
      deleteAccount();
      router.replace('/(auth)/signup');
    }
  };

  const navItems: { id: SettingsPanel; label: string; icon: AppIconName; danger?: boolean }[] = [
    { id: 'profile', label: 'Profile Info', icon: 'person-outline' },
    { id: 'security', label: 'Security', icon: 'lock-closed-outline' },
    { id: 'notifs', label: 'Notifications', icon: 'notifications-outline' },
    { id: 'payments', label: 'Payments & Payouts', icon: 'card-outline' },
    { id: 'availability', label: 'Availability', icon: 'radio-button-on-outline' },
    { id: 'danger', label: 'Danger Zone', icon: 'warning-outline', danger: true },
  ];

  return (
    <ScrollView className="flex-1 bg-bg-alt" contentContainerStyle={{ paddingBottom: 64 }}>
      <View className="px-6 py-8 max-w-[1080px] w-full self-center">
        
        {/* Profile Summary Header Banner */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarLg}>
            <Text style={styles.avatarText}>{getInitials(user.name || name)}</Text>
            <View style={styles.avatarEdit}>
              <AppIcon name="create-outline" size={12} color="#FFFFFF" />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerName}>{user.name || name || 'Your Name'}</Text>
            <Text style={styles.headerEmail}>{user.email || email || 'you@example.com'}</Text>
            <View style={styles.rolePill}>
              <Text style={styles.rolePillText}>{user.role || 'Freelancer'}</Text>
            </View>
          </View>
        </View>

        {/* Main Settings Layout */}
        <View style={[styles.settingsLayout, !isWide && { flexDirection: 'column' }]}>
          
          {/* Settings Nav Sidebar / Mobile Horizontal Bar */}
          {!isWide ? (
            <View style={styles.mobileNavContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.mobileNavContent}
              >
                {navItems.map((item) => {
                  const isActive = activePanel === item.id;
                  return (
                    <Pressable
                      key={item.id}
                      onPress={() => setActivePanel(item.id)}
                      style={[
                        styles.navItemHorizontal,
                        isActive && styles.navItemActive,
                        item.danger && styles.navItemDanger,
                        item.danger && isActive && styles.navItemDangerActive,
                      ]}
                    >
                      <View style={styles.navIcon}>
                        <AppIcon
                          name={item.icon}
                          size={16}
                          color={item.danger ? '#DC2626' : isActive ? '#EC1257' : '#5B6472'}
                        />
                      </View>
                      <Text
                        style={[
                          styles.navLabelHorizontal,
                          isActive && styles.navLabelActive,
                          item.danger && styles.navLabelDanger,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          ) : (
            <View style={styles.settingsNavSidebar}>
              {navItems.map((item) => {
                const isActive = activePanel === item.id;
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => setActivePanel(item.id)}
                    style={[
                      styles.navItem,
                      isActive && styles.navItemActive,
                      item.danger && styles.navItemDanger,
                      item.danger && isActive && styles.navItemDangerActive,
                    ]}
                  >
                    <View style={styles.navIcon}>
                      <AppIcon
                        name={item.icon}
                        size={16}
                        color={item.danger ? '#DC2626' : isActive ? '#EC1257' : '#5B6472'}
                      />
                    </View>
                    <Text
                      style={[
                        styles.navLabel,
                        isActive && styles.navLabelActive,
                        item.danger && styles.navLabelDanger,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}

          {/* Right Panel Content */}
          <View style={{ flex: 1, width: '100%' }}>
            
            {/* 1. PROFILE INFO PANEL */}
            {activePanel === 'profile' && (
              <View style={styles.settingsCard}>
                <Text style={styles.cardTitle}>Profile Info</Text>
                <Text style={styles.cardDesc}>This is what clients see on your public profile.</Text>

                <View style={styles.twoCol}>
                  <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Display Name</Text>
                    <TextInput
                      style={styles.input}
                      value={name}
                      onChangeText={setName}
                      placeholder="Mira Vance"
                    />
                  </View>
                  <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Location</Text>
                    <TextInput
                      style={styles.input}
                      value={location}
                      onChangeText={setLocation}
                      placeholder="Lisbon, PT"
                    />
                  </View>
                </View>

                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Professional Headline</Text>
                  <TextInput
                    style={styles.input}
                    value={headline}
                    onChangeText={setHeadline}
                    placeholder="Brand Designer & Identity Systems"
                  />
                </View>

                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Bio</Text>
                  <TextInput
                    style={[styles.input, styles.textarea]}
                    multiline
                    textAlignVertical="top"
                    value={bio}
                    onChangeText={setBio}
                    placeholder="Short bio describing your craft..."
                  />
                </View>

                <View style={styles.twoCol}>
                  <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Email</Text>
                    <TextInput
                      style={styles.input}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                  <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Phone</Text>
                    <TextInput
                      style={styles.input}
                      value={phone}
                      onChangeText={setPhone}
                      placeholder="Optional"
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 }}>
                  <Pressable style={styles.btnPink} onPress={handleSaveProfile}>
                    <Text style={styles.btnPinkText}>Save Changes</Text>
                  </Pressable>
                  {profileSavedMsg && (
                    <Text style={{ color: '#17A34A', fontSize: 13.5, fontFamily: 'Inter_700Bold' }}>
                      ✓ Saved successfully
                    </Text>
                  )}
                </View>
              </View>
            )}

            {/* 2. SECURITY PANEL */}
            {activePanel === 'security' && (
              <>
                <View style={styles.settingsCard}>
                  <Text style={styles.cardTitle}>Change Password</Text>
                  <Text style={styles.cardDesc}>Use at least 8 characters, including a number.</Text>

                  <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Current Password</Text>
                    <TextInput
                      style={styles.input}
                      secureTextEntry
                      placeholder="••••••••"
                      value={currentPassword}
                      onChangeText={setCurrentPassword}
                    />
                  </View>

                  <View style={styles.twoCol}>
                    <View style={styles.field}>
                      <Text style={styles.fieldLabel}>New Password</Text>
                      <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="••••••••"
                        value={newPassword}
                        onChangeText={setNewPassword}
                      />
                    </View>
                    <View style={styles.field}>
                      <Text style={styles.fieldLabel}>Confirm New Password</Text>
                      <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                      />
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 }}>
                    <Pressable style={styles.btnPink} onPress={handleUpdatePassword}>
                      <Text style={styles.btnPinkText}>Update Password</Text>
                    </Pressable>
                    {passwordSavedMsg && (
                      <Text style={{ color: '#17A34A', fontSize: 13.5, fontFamily: 'Inter_700Bold' }}>
                        ✓ Password updated
                      </Text>
                    )}
                  </View>
                </View>

                {/* 2FA Toggle - Visually Disabled / Inert Placeholder */}
                <View style={styles.settingsCard}>
                  <Text style={styles.cardTitle}>Two-Factor Authentication</Text>
                  <View style={styles.toggleRowInert}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.tLabel}>Require a code at login</Text>
                      <Text style={styles.tSubDisabled}>Coming soon</Text>
                    </View>
                    <View style={styles.toggleDisabled}>
                      <View style={styles.knobDisabled} />
                    </View>
                  </View>
                </View>

                {/* Active Sessions */}
                <View style={styles.settingsCard}>
                  <Text style={styles.cardTitle}>Active Sessions</Text>
                  
                  <View style={styles.sessionRow}>
                    <View>
                      <Text style={styles.deviceText}>MacBook Pro · Chrome</Text>
                      <Text style={styles.metaText}>Lisbon, PT · Active now</Text>
                    </View>
                    <View style={styles.badgeThisDevice}>
                      <Text style={styles.badgeThisDeviceText}>This device</Text>
                    </View>
                  </View>

                  <View style={styles.sessionRow}>
                    <View>
                      <Text style={styles.deviceText}>iPhone 15 · SkillNest App</Text>
                      <Text style={styles.metaText}>Lisbon, PT · 2 hours ago</Text>
                    </View>
                    <Pressable
                      style={styles.btnOutlineSm}
                      onPress={() => setDangerModal({ type: 'logout' })}
                    >
                      <Text style={styles.btnOutlineSmText}>Log out</Text>
                    </Pressable>
                  </View>
                </View>
              </>
            )}

            {/* 3. NOTIFICATIONS PANEL */}
            {activePanel === 'notifs' && (
              <>
                <View style={styles.settingsCard}>
                  <Text style={styles.cardTitle}>Email Notifications</Text>

                  <View style={styles.toggleRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.tLabel}>Order updates</Text>
                      <Text style={styles.tSub}>Milestone deliveries, approvals, disputes</Text>
                    </View>
                    <Pressable
                      style={[styles.toggle, user.notifications.emailOrderUpdates && styles.toggleOn]}
                      onPress={() =>
                        updateNotifications({ emailOrderUpdates: !user.notifications.emailOrderUpdates })
                      }
                    >
                      <View style={[styles.knob, user.notifications.emailOrderUpdates && styles.knobOn]} />
                    </Pressable>
                  </View>

                  <View style={styles.toggleRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.tLabel}>New messages</Text>
                    </View>
                    <Pressable
                      style={[styles.toggle, user.notifications.emailNewMessages && styles.toggleOn]}
                      onPress={() =>
                        updateNotifications({ emailNewMessages: !user.notifications.emailNewMessages })
                      }
                    >
                      <View style={[styles.knob, user.notifications.emailNewMessages && styles.knobOn]} />
                    </Pressable>
                  </View>

                  <View style={styles.toggleRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.tLabel}>New proposals</Text>
                    </View>
                    <Pressable
                      style={[styles.toggle, user.notifications.emailNewProposals && styles.toggleOn]}
                      onPress={() =>
                        updateNotifications({ emailNewProposals: !user.notifications.emailNewProposals })
                      }
                    >
                      <View style={[styles.knob, user.notifications.emailNewProposals && styles.knobOn]} />
                    </Pressable>
                  </View>

                  <View style={styles.toggleRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.tLabel}>Marketing &amp; tips</Text>
                    </View>
                    <Pressable
                      style={[styles.toggle, user.notifications.emailMarketing && styles.toggleOn]}
                      onPress={() =>
                        updateNotifications({ emailMarketing: !user.notifications.emailMarketing })
                      }
                    >
                      <View style={[styles.knob, user.notifications.emailMarketing && styles.knobOn]} />
                    </Pressable>
                  </View>
                </View>

                <View style={styles.settingsCard}>
                  <Text style={styles.cardTitle}>Push Notifications</Text>

                  <View style={styles.toggleRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.tLabel}>Milestone approvals</Text>
                    </View>
                    <Pressable
                      style={[styles.toggle, user.notifications.pushMilestones && styles.toggleOn]}
                      onPress={() =>
                        updateNotifications({ pushMilestones: !user.notifications.pushMilestones })
                      }
                    >
                      <View style={[styles.knob, user.notifications.pushMilestones && styles.knobOn]} />
                    </Pressable>
                  </View>

                  <View style={styles.toggleRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.tLabel}>Messages</Text>
                    </View>
                    <Pressable
                      style={[styles.toggle, user.notifications.pushMessages && styles.toggleOn]}
                      onPress={() =>
                        updateNotifications({ pushMessages: !user.notifications.pushMessages })
                      }
                    >
                      <View style={[styles.knob, user.notifications.pushMessages && styles.knobOn]} />
                    </Pressable>
                  </View>
                </View>
              </>
            )}

            {/* 4. PAYMENTS & PAYOUTS PANEL */}
            {activePanel === 'payments' && (
              <>
                {/* Total Earnings Stat Banner */}
                <View style={styles.earnStatBanner}>
                  <View>
                    <Text style={styles.earnLbl}>Total Earnings</Text>
                    <Text style={styles.earnVal}>$14,280</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.earnLbl}>This Month</Text>
                    <Text style={styles.earnVal}>$1,860</Text>
                  </View>
                </View>

                <View style={styles.settingsCard}>
                  <Text style={styles.cardTitle}>Payout Method</Text>

                  <View style={[styles.radioGrid, !isWide && { flexDirection: 'column' }]}>
                    <Pressable
                      style={[
                        styles.radioCard,
                        user.payoutMethod === 'Bank Transfer' && styles.radioCardSelected,
                      ]}
                      onPress={() => updatePayoutInfo({ payoutMethod: 'Bank Transfer' })}
                    >
                      <View style={styles.radioTitleRow}>
                        <AppIcon name="business-outline" size={17} color="#5B6472" />
                        <Text style={styles.radioTitle}>Bank Transfer</Text>
                      </View>
                      <Text style={styles.radioSub}>2–3 business days</Text>
                    </Pressable>

                    <Pressable
                      style={[
                        styles.radioCard,
                        user.payoutMethod === 'PayPal' && styles.radioCardSelected,
                      ]}
                      onPress={() => updatePayoutInfo({ payoutMethod: 'PayPal' })}
                    >
                      <View style={styles.radioTitleRow}>
                        <AppIcon name="card-outline" size={17} color="#5B6472" />
                        <Text style={styles.radioTitle}>PayPal</Text>
                      </View>
                      <Text style={styles.radioSub}>Instant</Text>
                    </Pressable>

                    <Pressable
                      style={[
                        styles.radioCard,
                        user.payoutMethod === 'Wise' && styles.radioCardSelected,
                      ]}
                      onPress={() => updatePayoutInfo({ payoutMethod: 'Wise' })}
                    >
                      <View style={styles.radioTitleRow}>
                        <AppIcon name="globe-outline" size={17} color="#5B6472" />
                        <Text style={styles.radioTitle}>Wise</Text>
                      </View>
                      <Text style={styles.radioSub}>1–2 business days</Text>
                    </Pressable>
                  </View>

                  <View style={[styles.twoCol, { marginTop: 16 }]}>
                    <View style={styles.field}>
                      <Text style={styles.fieldLabel}>Account Holder</Text>
                      <TextInput
                        style={styles.input}
                        value={accountHolder}
                        onChangeText={setAccountHolder}
                        placeholder="Mira Vance"
                      />
                    </View>
                    <View style={styles.field}>
                      <Text style={styles.fieldLabel}>IBAN</Text>
                      <TextInput
                        style={styles.input}
                        value={iban}
                        onChangeText={setIban}
                        placeholder="PT50 •••• •••• 4417"
                      />
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 }}>
                    <Pressable style={styles.btnPink} onPress={handleSavePayout}>
                      <Text style={styles.btnPinkText}>Save Payout Info</Text>
                    </Pressable>
                    {payoutSavedMsg && (
                      <Text style={{ color: '#17A34A', fontSize: 13.5, fontFamily: 'Inter_700Bold' }}>
                        ✓ Payout info saved
                      </Text>
                    )}
                  </View>
                </View>

                {/* Identity Verification KYC Card */}
                <View style={styles.settingsCard}>
                  <View style={styles.kycBanner}>
                    <View style={styles.kycCheckBadge}>
                      <Text style={styles.kycCheckText}>✓</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.kycTitle}>Identity Verified</Text>
                      <Text style={styles.kycSub}>Your KYC check passed on 12 Aug 2026.</Text>
                    </View>
                  </View>
                </View>
              </>
            )}

            {/* 5. AVAILABILITY PANEL */}
            {activePanel === 'availability' && (
              <View style={styles.settingsCard}>
                <Text style={styles.cardTitle}>Availability Status</Text>
                <Text style={styles.cardDesc}>This shows on your profile and talent cards across the marketplace.</Text>

                <View style={[styles.radioGrid, !isWide && { flexDirection: 'column' }]}>
                  <Pressable
                    style={[
                      styles.radioCard,
                      user.availabilityStatus === 'Available' && styles.radioCardSelected,
                    ]}
                    onPress={() => setAvailabilityStatus('Available')}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <View style={[styles.dotStatus, { backgroundColor: '#17A34A' }]} />
                      <Text style={styles.radioTitle}>Available</Text>
                    </View>
                    <Text style={styles.radioSub}>Ready for new work</Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.radioCard,
                      user.availabilityStatus === 'Busy' && styles.radioCardSelected,
                    ]}
                    onPress={() => setAvailabilityStatus('Busy')}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <View style={[styles.dotStatus, { backgroundColor: '#F5A623' }]} />
                      <Text style={styles.radioTitle}>Busy</Text>
                    </View>
                    <Text style={styles.radioSub}>Limited capacity</Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.radioCard,
                      user.availabilityStatus === 'Not Available' && styles.radioCardSelected,
                    ]}
                    onPress={() => setAvailabilityStatus('Not Available')}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <View style={[styles.dotStatus, { backgroundColor: '#94A3B8' }]} />
                      <Text style={styles.radioTitle}>Not Available</Text>
                    </View>
                    <Text style={styles.radioSub}>Not taking work</Text>
                  </Pressable>
                </View>
              </View>
            )}

            {/* 6. DANGER ZONE PANEL */}
            {activePanel === 'danger' && (
              <View style={styles.settingsCard}>
                <Text style={[styles.cardTitle, { color: '#DC2626' }]}>Danger Zone</Text>

                {/* Log Out */}
                <View style={styles.dangerRow}>
                  <View style={{ flex: 1, paddingRight: 12 }}>
                    <Text style={styles.dangerHead}>Log Out</Text>
                    <Text style={styles.dangerSub}>End your session on this device.</Text>
                  </View>
                  <Pressable
                    style={styles.btnOutline}
                    onPress={() => setDangerModal({ type: 'logout' })}
                  >
                    <Text style={styles.btnOutlineText}>Log Out</Text>
                  </Pressable>
                </View>

                {/* Deactivate Account */}
                <View style={styles.dangerRow}>
                  <View style={{ flex: 1, paddingRight: 12 }}>
                    <Text style={styles.dangerHead}>Deactivate Account</Text>
                    <Text style={styles.dangerSub}>Hide your profile temporarily. You can reactivate anytime.</Text>
                  </View>
                  <Pressable
                    style={styles.btnRedOutline}
                    onPress={() => setDangerModal({ type: 'deactivate' })}
                  >
                    <Text style={styles.btnRedOutlineText}>Deactivate</Text>
                  </Pressable>
                </View>

                {/* Delete Account */}
                <View style={styles.dangerRow}>
                  <View style={{ flex: 1, paddingRight: 12 }}>
                    <Text style={styles.dangerHead}>Delete Account</Text>
                    <Text style={styles.dangerSub}>Permanently delete your account and all data. This can't be undone.</Text>
                  </View>
                  <Pressable
                    style={styles.btnRed}
                    onPress={() => setDangerModal({ type: 'delete' })}
                  >
                    <Text style={styles.btnRedText}>Delete Account</Text>
                  </Pressable>
                </View>
              </View>
            )}

          </View>
        </View>

        {/* Confirmation Modal for Danger Zone Actions */}
        {dangerModal && (
          <Modal transparent animationType="fade" visible={!!dangerModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>
                  {dangerModal.type === 'logout'
                    ? 'Log Out?'
                    : dangerModal.type === 'deactivate'
                    ? 'Deactivate Account?'
                    : 'Delete Account?'}
                </Text>

                <Text style={styles.modalMessage}>
                  {dangerModal.type === 'logout'
                    ? 'Are you sure you want to log out of your session on this device?'
                    : dangerModal.type === 'deactivate'
                    ? 'This will temporarily hide your profile from search and marketplace listings. You can reactivate anytime by logging back in.'
                    : 'This action is permanent and cannot be undone. All your profile data, active gigs, proposal history, and earnings stats will be permanently erased.'}
                </Text>

                <View style={styles.modalActions}>
                  <Pressable
                    style={styles.modalCancelBtn}
                    onPress={() => setDangerModal(null)}
                  >
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.modalConfirmBtn,
                      dangerModal.type === 'deactivate' && styles.modalDeactivateBtn,
                      dangerModal.type === 'delete' && styles.modalDeleteBtn,
                    ]}
                    onPress={handleConfirmDangerAction}
                  >
                    <Text style={styles.modalConfirmText}>
                      {dangerModal.type === 'logout'
                        ? 'Confirm Log Out'
                        : dangerModal.type === 'deactivate'
                        ? 'Confirm Deactivate'
                        : 'Delete Account Forever'}
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginBottom: 32,
  },
  avatarLg: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#0B1220',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexShrink: 0,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontFamily: 'Manrope_800ExtraBold',
  },
  avatarEdit: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#EC1257',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  headerName: {
    fontSize: 22,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
    marginBottom: 2,
  },
  headerEmail: {
    fontSize: 13.5,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
  },
  rolePill: {
    alignSelf: 'flex-start',
    backgroundColor: '#FDE8EF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    marginTop: 6,
  },
  rolePillText: {
    color: '#C10E48',
    fontSize: 11.5,
    fontFamily: 'Inter_700Bold',
  },
  settingsLayout: {
    flexDirection: 'row',
    gap: 32,
    alignItems: 'flex-start',
  },
  settingsNavSidebar: {
    width: 220,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 10,
    flexShrink: 0,
  },
  mobileNavContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 6,
    marginBottom: 20,
    width: '100%',
  },
  mobileNavContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  navItemHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
  },
  navLabelHorizontal: {
    fontSize: 13.5,
    fontFamily: 'Inter_600SemiBold',
    color: '#5B6472',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 2,
  },
  navItemActive: {
    backgroundColor: '#FDE8EF',
  },
  navItemDanger: {},
  navItemDangerActive: {
    backgroundColor: '#FEE2E2',
  },
  navIcon: {
    width: 18,
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#5B6472',
  },
  navLabelActive: {
    color: '#C10E48',
    fontFamily: 'Inter_700Bold',
  },
  navLabelDanger: {
    color: '#DC2626',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 28,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 17,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
    marginBottom: 22,
  },
  twoCol: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  field: {
    flex: 1,
    minWidth: 220,
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    color: '#10172A',
    marginBottom: 7,
  },
  input: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14.5,
    fontFamily: 'Inter_400Regular',
    color: '#10172A',
    backgroundColor: '#FFFFFF',
  },
  textarea: {
    minHeight: 90,
  },
  btnPink: {
    backgroundColor: '#EC1257',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  btnPinkText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontFamily: 'Inter_700Bold',
  },
  btnOutline: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  btnOutlineText: {
    color: '#10172A',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  btnRedOutline: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FEE2E2',
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  btnRedOutlineText: {
    color: '#DC2626',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  btnRed: {
    backgroundColor: '#DC2626',
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  btnRedText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E9F1',
  },
  toggleRowInert: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    opacity: 0.6,
  },
  tLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#10172A',
  },
  tSub: {
    fontSize: 12.5,
    color: '#93A0B4',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  tSubDisabled: {
    fontSize: 12.5,
    color: '#DC2626',
    fontFamily: 'Inter_600SemiBold',
    marginTop: 2,
  },
  toggle: {
    width: 40,
    height: 23,
    borderRadius: 100,
    backgroundColor: '#E7E9F1',
    position: 'relative',
    justifyContent: 'center',
  },
  toggleOn: {
    backgroundColor: '#EC1257',
  },
  toggleDisabled: {
    width: 40,
    height: 23,
    borderRadius: 100,
    backgroundColor: '#E7E9F1',
    position: 'relative',
    justifyContent: 'center',
  },
  knob: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    left: 3,
  },
  knobOn: {
    left: 20,
  },
  knobDisabled: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    backgroundColor: '#93A0B4',
    position: 'absolute',
    left: 3,
  },
  sessionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E9F1',
  },
  deviceText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#10172A',
  },
  metaText: {
    fontSize: 12,
    color: '#93A0B4',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  badgeThisDevice: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeThisDeviceText: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: '#DC2626',
  },
  btnOutlineSm: {
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  btnOutlineSmText: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: '#10172A',
  },
  earnStatBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0B1220',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 22,
    marginBottom: 20,
  },
  earnLbl: {
    fontSize: 12,
    color: '#93A0B4',
    fontFamily: 'Inter_500Medium',
    marginBottom: 2,
  },
  earnVal: {
    fontSize: 24,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#FFFFFF',
  },
  radioGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  radioCard: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  radioCardSelected: {
    borderColor: '#EC1257',
    backgroundColor: '#FDE8EF',
  },
  radioTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 3,
  },
  radioTitle: {
    fontSize: 14,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
  },
  radioSub: {
    fontSize: 12,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
  },
  dotStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  kycBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
  },
  kycCheckBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#166534',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kycCheckText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  kycTitle: {
    fontSize: 13.5,
    fontFamily: 'Manrope_700Bold',
    color: '#166534',
    marginBottom: 2,
  },
  kycSub: {
    fontSize: 12,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
  },
  dangerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E9F1',
  },
  dangerHead: {
    fontSize: 14.5,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
    marginBottom: 3,
  },
  dangerSub: {
    fontSize: 12.5,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
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
  modalDeactivateBtn: {
    backgroundColor: '#DC2626',
  },
  modalDeleteBtn: {
    backgroundColor: '#DC2626',
  },
  modalConfirmText: {
    fontSize: 13.5,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
  },
});
