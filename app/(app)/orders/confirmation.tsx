import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function PaymentConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ orderId?: string; title?: string; total?: string }>();

  const orderId = params.orderId || 'SN-4822';
  const title = params.title || 'Complete brand identity & logo system';
  const total = params.total ? `$${parseFloat(params.total).toLocaleString()}` : '$1,050';

  return (
    <ScrollView className="flex-1 bg-bg-alt" contentContainerStyle={{ paddingBottom: 64 }}>
      <View style={styles.confirmWrap}>
        
        {/* Checkmark Circle */}
        <View style={styles.confirmCheck}>
          <Text style={styles.checkText}>✓</Text>
        </View>

        {/* Header & Subtitle */}
        <Text style={styles.title}>Payment Successful</Text>
        <Text style={styles.subtitle}>
          {total} has been placed in escrow for <Text style={{ fontFamily: 'Inter_700Bold' }}>{title}</Text>.
        </Text>
        <Text style={styles.confirmId}>Order ID: {orderId}</Text>

        {/* Buttons */}
        <View style={styles.confirmActions}>
          <Pressable style={styles.btnOutline} onPress={() => router.push('/home')}>
            <Text style={styles.btnOutlineText}>Back to Discover</Text>
          </Pressable>

          <Pressable style={styles.btnPink} onPress={() => router.push(`/orders/${orderId}` as any)}>
            <Text style={styles.btnPinkText}>View Order</Text>
          </Pressable>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  confirmWrap: {
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 80,
    paddingHorizontal: 24,
  },
  confirmCheck: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#17A34A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: 34,
    fontFamily: 'Inter_800ExtraBold',
  },
  title: {
    fontSize: 26,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  confirmId: {
    fontSize: 13,
    color: '#93A0B4',
    fontFamily: 'Inter_500Medium',
    marginBottom: 32,
  },
  confirmActions: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  btnOutline: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  btnOutlineText: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: '#10172A',
  },
  btnPink: {
    backgroundColor: '#EC1257',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  btnPinkText: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
  },
});
