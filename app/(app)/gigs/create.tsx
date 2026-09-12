import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { OFFICIAL_CATEGORIES } from '../../../src/constants/categories';
import { LivePreviewCard } from '../../../src/components/selling/LivePreviewCard';

export default function CreateGigScreen() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(OFFICIAL_CATEGORIES[3].label); // Graphic Design
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [isThreeTiers, setIsThreeTiers] = useState(false);
  const [price, setPrice] = useState('450');
  const [deliveryTime, setDeliveryTime] = useState('3 days');
  const [revisions, setRevisions] = useState('2');
  const [tags, setTags] = useState('');
  const [dropzones, setDropzones] = useState([false, false, false]);

  const toggleDropzone = (index: number) => {
    const updated = [...dropzones];
    updated[index] = !updated[index];
    setDropzones(updated);
  };

  return (
    <ScrollView className="flex-1 bg-bg-alt" contentContainerStyle={{ paddingBottom: 64 }}>
      <View className="px-6 py-9 max-w-[1180px] w-full self-center">
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Create a Gig</Text>
          <Text style={styles.subtitle}>
            Clients scan gigs in about six seconds. Lead with the outcome, not the process.
          </Text>
        </View>

        {/* Main Grid: Form Left, Sticky Live Preview Right */}
        <View style={styles.layoutGrid}>
          
          {/* Form Side */}
          <View style={styles.formCol}>
            
            {/* Basic Info */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Basic Info</Text>
              
              <View style={styles.field}>
                <Text style={styles.label}>Gig Title</Text>
                <TextInput
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="I will design a complete brand identity system"
                  placeholderTextColor="#93A0B4"
                />
                <Text style={styles.hint}>Start with "I will…" — 80 characters max.</Text>
              </View>

              <View style={styles.rowTwo}>
                <View style={[styles.field, { flex: 1 }]}>
                  <Text style={styles.label}>Category</Text>
                  {Platform.OS === 'web' ? (
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      style={styles.webSelect as any}
                    >
                      {OFFICIAL_CATEGORIES.map(c => (
                        <option key={c.label} value={c.label}>{c.icon} {c.label}</option>
                      ))}
                    </select>
                  ) : (
                    <TextInput
                      style={styles.input}
                      value={category}
                      onChangeText={setCategory}
                    />
                  )}
                </View>

                <View style={[styles.field, { flex: 1 }]}>
                  <Text style={styles.label}>Subcategory</Text>
                  <TextInput
                    style={styles.input}
                    value={subcategory}
                    onChangeText={setSubcategory}
                    placeholder="e.g. Brand identity"
                    placeholderTextColor="#93A0B4"
                  />
                </View>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.multiline]}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                  placeholder="This is a full-service engagement, not a template drop…"
                  placeholderTextColor="#93A0B4"
                />
              </View>
            </View>

            {/* Pricing & Delivery */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Pricing &amp; Delivery</Text>
              
              {/* Tier Toggle */}
              <View style={styles.tierToggleRow}>
                <Pressable
                  style={[styles.tierBtn, !isThreeTiers && styles.tierBtnActive]}
                  onPress={() => setIsThreeTiers(false)}
                >
                  <Text style={[styles.tierBtnText, !isThreeTiers && styles.tierBtnTextActive]}>
                    Essential Only
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.tierBtn, isThreeTiers && styles.tierBtnActive]}
                  onPress={() => setIsThreeTiers(true)}
                >
                  <Text style={[styles.tierBtnText, isThreeTiers && styles.tierBtnTextActive]}>
                    + Add 3 Package Tiers
                  </Text>
                </Pressable>
              </View>

              {!isThreeTiers ? (
                <View style={styles.rowThree}>
                  <View style={[styles.field, { flex: 1 }]}>
                    <Text style={styles.label}>Starting Price (USD)</Text>
                    <TextInput
                      style={styles.input}
                      value={price}
                      onChangeText={setPrice}
                      keyboardType="numeric"
                      placeholder="450"
                      placeholderTextColor="#93A0B4"
                    />
                  </View>

                  <View style={[styles.field, { flex: 1 }]}>
                    <Text style={styles.label}>Delivery Time</Text>
                    <TextInput
                      style={styles.input}
                      value={deliveryTime}
                      onChangeText={setDeliveryTime}
                      placeholder="3 days"
                      placeholderTextColor="#93A0B4"
                    />
                  </View>

                  <View style={[styles.field, { flex: 1 }]}>
                    <Text style={styles.label}>Revisions</Text>
                    <TextInput
                      style={styles.input}
                      value={revisions}
                      onChangeText={setRevisions}
                      placeholder="2"
                      placeholderTextColor="#93A0B4"
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.threeTiersNotice}>
                  <Text style={styles.threeTiersTitle}>3 Package Tiers Active</Text>
                  <Text style={styles.threeTiersSub}>
                    Essential ($450), Studio ($990), and Full System ($1,800) tiers will be generated for client selection.
                  </Text>
                </View>
              )}
            </View>

            {/* Gallery */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Gallery</Text>
              <View style={styles.dropzoneRow}>
                {dropzones.map((filled, idx) => (
                  <Pressable
                    key={idx}
                    style={[styles.dropzone, filled && styles.dropzoneFilled]}
                    onPress={() => toggleDropzone(idx)}
                  >
                    <Text style={styles.dzIcon}>{idx === 2 ? '🎬' : '🖼️'}</Text>
                    <Text style={styles.dzText}>
                      {filled ? '✓ Uploaded' : idx === 2 ? 'Upload video' : 'Upload image'}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <Text style={styles.hint}>
                First image becomes the card cover. Three minimum. Video optional — up to 60 seconds.
              </Text>
            </View>

            {/* Tags */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Tags</Text>
              <TextInput
                style={styles.input}
                value={tags}
                onChangeText={setTags}
                placeholder="logo, brand system, packaging"
                placeholderTextColor="#93A0B4"
              />
            </View>

            {/* Actions */}
            <View style={styles.bottomActions}>
              <Pressable style={styles.btnOutline} onPress={() => router.push('/(app)/my-gigs')}>
                <Text style={styles.btnOutlineText}>Save Draft</Text>
              </Pressable>
              <Pressable style={styles.btnPink} onPress={() => router.push('/(app)/my-gigs')}>
                <Text style={styles.btnPinkText}>Publish Gig</Text>
              </Pressable>
            </View>

          </View>

          {/* Right Live Preview Side */}
          <View style={styles.previewCol}>
            <LivePreviewCard title={title} price={price} />
          </View>

        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 32,
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
  layoutGrid: {
    flexDirection: 'row',
    gap: 36,
    flexWrap: 'wrap',
  },
  formCol: {
    flex: 1,
    minWidth: 320,
  },
  previewCol: {
    width: 320,
    minWidth: 280,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 24,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
    marginBottom: 18,
  },
  field: {
    marginBottom: 20,
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
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  webSelect: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    borderStyle: 'solid',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 14.5,
    fontFamily: 'Inter',
    color: '#10172A',
    backgroundColor: '#FFFFFF',
    outlineStyle: 'none',
  } as any,
  hint: {
    fontSize: 12,
    color: '#93A0B4',
    fontFamily: 'Inter_400Regular',
    marginTop: 6,
  },
  rowTwo: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  rowThree: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  tierToggleRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  tierBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  tierBtnActive: {
    borderColor: '#EC1257',
    backgroundColor: '#FDE8EF',
  },
  tierBtnText: {
    fontSize: 13.5,
    fontFamily: 'Inter_700Bold',
    color: '#10172A',
  },
  tierBtnTextActive: {
    color: '#C10E48',
  },
  threeTiersNotice: {
    backgroundColor: '#FDE8EF',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EC1257',
  },
  threeTiersTitle: {
    fontFamily: 'Inter_700Bold',
    color: '#C10E48',
    fontSize: 14,
    marginBottom: 4,
  },
  threeTiersSub: {
    fontSize: 13,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
  },
  dropzoneRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  dropzone: {
    flex: 1,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#E7E9F1',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F7FB',
  },
  dropzoneFilled: {
    borderStyle: 'solid',
    borderColor: '#EC1257',
    backgroundColor: '#FDE8EF',
  },
  dzIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  dzText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#5B6472',
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 12,
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
    color: '#10172A',
    fontFamily: 'Inter_700Bold',
    fontSize: 14.5,
  },
  btnPink: {
    backgroundColor: '#EC1257',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  btnPinkText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 14.5,
  },
});
