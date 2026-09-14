import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAdminAuth } from '../../src/context/AdminAuthContext';

export default function AdminLoginScreen() {
  const router = useRouter();
  const { loginAdmin } = useAdminAuth();
  const [email, setEmail] = useState('you@skillnest.com');
  const [password, setPassword] = useState('••••••••');

  const handleSignIn = () => {
    loginAdmin(email, password);
    router.replace('/admin');
  };

  const handleReturnToConsumer = () => {
    router.replace('/');
  };

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <View style={styles.card}>
        <View style={styles.markContainer}>
          <Text style={styles.markText}>S</Text>
        </View>

        <Text style={styles.title}>SkillNest Admin</Text>
        <Text style={styles.sub}>Restricted access — staff sign-in only.</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Admin Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="you@skillnest.com"
            placeholderTextColor="rgba(255,255,255,0.35)"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="rgba(255,255,255,0.35)"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.signInBtn} onPress={handleSignIn} activeOpacity={0.85}>
          <Text style={styles.signInBtnText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            🔒 This portal is for authorized SkillNest staff only. Unauthorized access attempts are logged.
          </Text>
        </View>

        <View style={styles.footRow}>
          <Text style={styles.footText}>Not staff? </Text>
          <TouchableOpacity onPress={handleReturnToConsumer}>
            <Text style={styles.footLink}>Return to SkillNest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: '#0B1220',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#141F35',
    borderColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderRadius: 18,
    padding: 36,
    width: '100%',
    maxWidth: 420,
  },
  markContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EC1257',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 18,
  },
  markText: {
    color: '#FFFFFF',
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 20,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 6,
  },
  sub: {
    color: '#93A0B4',
    fontFamily: 'Inter_400Regular',
    fontSize: 13.5,
    textAlign: 'center',
    marginBottom: 28,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    color: 'rgba(255,255,255,0.85)',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1.5,
    borderRadius: 10,
    color: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
  signInBtn: {
    backgroundColor: '#EC1257',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  signInBtnText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 15,
  },
  noteBox: {
    backgroundColor: 'rgba(236,18,87,0.1)',
    borderRadius: 10,
    padding: 12,
    marginTop: 22,
  },
  noteText: {
    color: 'rgba(255,255,255,0.75)',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  footRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  footText: {
    color: '#93A0B4',
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
  },
  footLink: {
    color: '#EC1257',
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
  },
});
