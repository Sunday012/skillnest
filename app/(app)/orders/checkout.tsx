import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ orderId?: string; title?: string; price?: string; sellerName?: string }>();

  const orderId = params.orderId || 'SN-4822';
  const title = params.title || 'Complete brand identity & logo system';
  const priceNum = parseFloat(params.price || '1000') || 1000;
  const fee = Math.round(priceNum * 0.05);
  const totalDue = priceNum + fee;

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'wallet'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handlePay = () => {
    router.push(
      `/orders/confirmation?orderId=${orderId}&title=${encodeURIComponent(title)}&total=${totalDue}` as any
    );
  };

  return (
    <ScrollView className="flex-1 bg-bg-alt" contentContainerStyle={{ paddingBottom: 64 }}>
      <View className="px-6 py-9 max-w-[1080px] w-full self-center">
        
        <Text style={styles.checkoutTitle}>Checkout</Text>

        <View style={styles.checkoutLayout}>
          
          {/* Form Col Left */}
          <View style={styles.formCol}>
            <View style={styles.coSection}>
              <Text style={styles.sectionTitle}>Payment Method</Text>

              {/* Card Method */}
              <Pressable
                style={[styles.payMethod, paymentMethod === 'card' && styles.payMethodSelected]}
                onPress={() => setPaymentMethod('card')}
              >
                <View style={[styles.radio, paymentMethod === 'card' && styles.radioSelected]} />
                <Text style={styles.payMethodText}>💳 Credit or Debit Card</Text>
              </Pressable>

              {/* Bank Transfer */}
              <Pressable
                style={[styles.payMethod, paymentMethod === 'bank' && styles.payMethodSelected]}
                onPress={() => setPaymentMethod('bank')}
              >
                <View style={[styles.radio, paymentMethod === 'bank' && styles.radioSelected]} />
                <Text style={styles.payMethodText}>🏦 Bank Transfer</Text>
              </Pressable>

              {/* Wallet */}
              <Pressable
                style={[styles.payMethod, paymentMethod === 'wallet' && styles.payMethodSelected]}
                onPress={() => setPaymentMethod('wallet')}
              >
                <View style={[styles.radio, paymentMethod === 'wallet' && styles.radioSelected]} />
                <Text style={styles.payMethodText}>👛 SkillNest Wallet — $0.00 available</Text>
              </Pressable>

              {/* Card Inputs */}
              {paymentMethod === 'card' && (
                <View style={styles.cardInputsBlock}>
                  <View style={styles.field}>
                    <Text style={styles.label}>Card Number</Text>
                    <TextInput
                      style={styles.input}
                      value={cardNumber}
                      onChangeText={setCardNumber}
                      placeholder="4242 4242 4242 4242"
                      placeholderTextColor="#93A0B4"
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={styles.twoCol}>
                    <View style={[styles.field, { flex: 1 }]}>
                      <Text style={styles.label}>Expiry</Text>
                      <TextInput
                        style={styles.input}
                        value={expiry}
                        onChangeText={setExpiry}
                        placeholder="MM / YY"
                        placeholderTextColor="#93A0B4"
                      />
                    </View>

                    <View style={[styles.field, { flex: 1 }]}>
                      <Text style={styles.label}>CVC</Text>
                      <TextInput
                        style={styles.input}
                        value={cvc}
                        onChangeText={setCvc}
                        placeholder="123"
                        placeholderTextColor="#93A0B4"
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                </View>
              )}

              {/* Escrow Notice */}
              <View style={styles.escrowNote}>
                <Text style={styles.escrowNoteText}>
                  🔒 Your payment isn't released to the freelancer immediately — it's held in escrow and only pays out per milestone, once you approve.
                </Text>
              </View>

            </View>
          </View>

          {/* Summary Sidebar Right */}
          <View style={styles.summaryCol}>
            <View style={styles.coSummary}>
              <Text style={styles.summaryTitle}>Order Summary</Text>

              <View style={styles.coItemTitle}>
                <Text style={styles.coItemTitleText}>{title}</Text>
              </View>

              <View style={styles.coItem}>
                <Text style={styles.coItemLabel}>Discovery &amp; strategy session</Text>
                <Text style={styles.coItemVal}>$200</Text>
              </View>

              <View style={styles.coItem}>
                <Text style={styles.coItemLabel}>Primary logo concepts</Text>
                <Text style={styles.coItemVal}>$400</Text>
              </View>

              <View style={styles.coItem}>
                <Text style={styles.coItemLabel}>Final files &amp; handover</Text>
                <Text style={styles.coItemVal}>$400</Text>
              </View>

              <View style={styles.coItem}>
                <Text style={styles.coItemLabel}>SkillNest fee (5%)</Text>
                <Text style={styles.coItemVal}>${fee}</Text>
              </View>

              <View style={styles.coTotal}>
                <Text style={styles.coTotalLabel}>Total due</Text>
                <Text style={styles.coTotalAmount}>${totalDue.toLocaleString()}</Text>
              </View>

              <Pressable style={styles.btnPink} onPress={handlePay}>
                <Text style={styles.btnPinkText}>Pay &amp; Fund Escrow</Text>
              </Pressable>

            </View>
          </View>

        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  checkoutTitle: {
    fontSize: 26,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
    marginBottom: 24,
  },
  checkoutLayout: {
    flexDirection: 'row',
    gap: 36,
    flexWrap: 'wrap',
  },
  formCol: {
    flex: 1,
    minWidth: 320,
  },
  summaryCol: {
    width: 340,
    minWidth: 280,
  },
  coSection: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15.5,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
    marginBottom: 16,
  },
  payMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  payMethodSelected: {
    borderColor: '#EC1257',
    backgroundColor: '#FDE8EF',
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#E7E9F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#EC1257',
    backgroundColor: '#EC1257',
  },
  payMethodText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#10172A',
  },
  cardInputsBlock: {
    marginTop: 16,
  },
  field: {
    marginBottom: 16,
  },
  label: {
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
  twoCol: {
    flexDirection: 'row',
    gap: 14,
  },
  escrowNote: {
    backgroundColor: '#FDE8EF',
    borderRadius: 10,
    padding: 14,
    marginTop: 12,
  },
  escrowNoteText: {
    fontSize: 12.5,
    color: '#C10E48',
    fontFamily: 'Inter_500Medium',
    lineHeight: 18,
  },
  coSummary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 24,
  },
  summaryTitle: {
    fontSize: 15,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
    marginBottom: 16,
  },
  coItemTitle: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E9F1',
    marginBottom: 4,
  },
  coItemTitleText: {
    fontSize: 13.5,
    fontFamily: 'Inter_700Bold',
    color: '#10172A',
  },
  coItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E9F1',
  },
  coItemLabel: {
    fontSize: 13,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
  },
  coItemVal: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: '#10172A',
  },
  coTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  coTotalLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#10172A',
  },
  coTotalAmount: {
    fontSize: 20,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
  },
  btnPink: {
    backgroundColor: '#EC1257',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnPinkText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 14.5,
  },
});
