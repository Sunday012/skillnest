import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { OFFICIAL_CATEGORIES } from '../../../src/constants/categories';
import { LiveMilestoneBox } from '../../../src/components/buying/LiveMilestoneBox';

interface MilestoneRow {
  id: string;
  title: string;
  amount: string;
}

export default function PostJobScreen() {
  const router = useRouter();

  // Form state
  const [jobTitle, setJobTitle] = useState('');
  const [category, setCategory] = useState(OFFICIAL_CATEGORIES[3].label); // Graphic Design
  const [experienceLevel, setExperienceLevel] = useState('Intermediate');
  const [description, setDescription] = useState('');
  const [timeline, setTimeline] = useState('1–3 months');
  const [locationPref, setLocationPref] = useState('');
  const [skills, setSkills] = useState('');
  const [hasFile, setHasFile] = useState(false);

  // Milestones state with default values from HTML mockup
  const [milestones, setMilestones] = useState<MilestoneRow[]>([
    { id: '1', title: 'Discovery & strategy session', amount: '600' },
    { id: '2', title: 'Concept directions', amount: '1400' },
    { id: '3', title: 'Final files & handover', amount: '900' },
  ]);

  // Handle milestone edits
  const updateMilestone = (id: string, field: 'title' | 'amount', value: string) => {
    setMilestones(prev =>
      prev.map(m => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const addMilestone = () => {
    const nextId = (milestones.length + 1).toString();
    setMilestones(prev => [
      ...prev,
      { id: Date.now().toString(), title: `Milestone ${nextId}`, amount: '500' },
    ]);
  };

  const removeMilestone = (id: string) => {
    if (milestones.length <= 1) return; // Keep at least one row
    setMilestones(prev => prev.filter(m => m.id !== id));
  };

  // Calculate live totals
  const milestonesTotal = milestones.reduce((sum, m) => {
    // Strip non-numeric characters like '$' or commas
    const num = parseFloat(m.amount.replace(/[^0-9.]/g, '')) || 0;
    return sum + num;
  }, 0);

  const handlePostJob = () => {
    router.push('/jobs');
  };

  return (
    <ScrollView className="flex-1 bg-bg-alt" contentContainerStyle={{ paddingBottom: 64 }}>
      <View className="px-6 py-9 max-w-[1180px] w-full self-center">
        
        {/* Page Head */}
        <View style={styles.postHead}>
          <Text style={styles.title}>Post a Job</Text>
          <Text style={styles.subtitle}>
            Write the brief, then break the budget into milestones. Freelancers bid against the plan, not a vague number.
          </Text>
        </View>

        {/* Layout Grid */}
        <View style={styles.postLayout}>
          
          {/* Form Left Side */}
          <View style={styles.formCol}>
            
            {/* Job Details Card */}
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Job Details</Text>

              {/* Title */}
              <View style={styles.field}>
                <Text style={styles.label}>Job Title</Text>
                <TextInput
                  style={styles.input}
                  value={jobTitle}
                  onChangeText={setJobTitle}
                  placeholder="Rebrand for a specialty coffee roaster"
                  placeholderTextColor="#93A0B4"
                />
                <Text style={styles.hint}>
                  Be specific — "Rebrand for a specialty coffee roaster" beats "Need a logo".
                </Text>
              </View>

              {/* Category & Experience Level */}
              <View style={styles.twoCol}>
                <View style={[styles.field, { flex: 1 }]}>
                  <Text style={styles.label}>Category</Text>
                  {Platform.OS === 'web' ? (
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      style={styles.webSelect as any}
                    >
                      {OFFICIAL_CATEGORIES.map(c => (
                        <option key={c.label} value={c.label}>
                          {c.icon} {c.label}
                        </option>
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
                  <Text style={styles.label}>Experience Level</Text>
                  {Platform.OS === 'web' ? (
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      style={styles.webSelect as any}
                    >
                      <option value="Entry">Entry</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                  ) : (
                    <TextInput
                      style={styles.input}
                      value={experienceLevel}
                      onChangeText={setExperienceLevel}
                    />
                  )}
                </View>
              </View>

              {/* Description */}
              <View style={styles.field}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.multiline]}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                  placeholder="Context, deliverables, and what success looks like."
                  placeholderTextColor="#93A0B4"
                />
              </View>

              {/* Timeline & Location */}
              <View style={styles.twoCol}>
                <View style={[styles.field, { flex: 1 }]}>
                  <Text style={styles.label}>Timeline</Text>
                  {Platform.OS === 'web' ? (
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      style={styles.webSelect as any}
                    >
                      <option value="Less than 1 month">Less than 1 month</option>
                      <option value="1–3 months">1–3 months</option>
                      <option value="3+ months">3+ months</option>
                    </select>
                  ) : (
                    <TextInput
                      style={styles.input}
                      value={timeline}
                      onChangeText={setTimeline}
                    />
                  )}
                </View>

                <View style={[styles.field, { flex: 1 }]}>
                  <Text style={styles.label}>Location Preference</Text>
                  <TextInput
                    style={styles.input}
                    value={locationPref}
                    onChangeText={setLocationPref}
                    placeholder="Anywhere"
                    placeholderTextColor="#93A0B4"
                  />
                </View>
              </View>

              {/* Skills Required */}
              <View style={styles.field}>
                <Text style={styles.label}>Skills Required</Text>
                <TextInput
                  style={styles.input}
                  value={skills}
                  onChangeText={setSkills}
                  placeholder="Brand identity, packaging, art direction"
                  placeholderTextColor="#93A0B4"
                />
              </View>

              {/* Attachments */}
              <View style={styles.field}>
                <Text style={styles.label}>Attachments</Text>
                <Pressable
                  style={[styles.dropzone, hasFile && styles.dropzoneFilled]}
                  onPress={() => setHasFile(!hasFile)}
                >
                  <Text style={styles.dropzoneText}>
                    {hasFile ? '✓ Brief_CoffeeRoaster_v2.pdf attached' : '⬆ Drop briefs, references, or brand files'}
                  </Text>
                </Pressable>
              </View>

            </View>

            {/* Milestone Builder Card */}
            <View style={styles.milestoneBuilder}>
              <Text style={styles.sectionTitle}>Milestone Builder</Text>
              <Text style={styles.builderHint}>
                Add stages and amounts — the budget totals as you type.
              </Text>

              {milestones.map((item, idx) => (
                <View key={item.id} style={styles.mInputRow}>
                  <View style={styles.mNum}>
                    <Text style={styles.mNumText}>{idx + 1}</Text>
                  </View>
                  
                  <View style={{ flex: 1 }}>
                    <TextInput
                      style={styles.mInput}
                      value={item.title}
                      onChangeText={(val) => updateMilestone(item.id, 'title', val)}
                      placeholder="Milestone title"
                      placeholderTextColor="#93A0B4"
                    />
                  </View>

                  <View style={{ width: 110 }}>
                    <TextInput
                      style={styles.mInput}
                      value={item.amount.startsWith('$') ? item.amount : `$${item.amount}`}
                      onChangeText={(val) => updateMilestone(item.id, 'amount', val.replace('$', ''))}
                      keyboardType="numeric"
                      placeholder="$0"
                      placeholderTextColor="#93A0B4"
                    />
                  </View>

                  <Pressable style={styles.mRemove} onPress={() => removeMilestone(item.id)}>
                    <Text style={styles.mRemoveText}>✕</Text>
                  </Pressable>
                </View>
              ))}

              <Pressable onPress={addMilestone} style={styles.addMilestoneBtn}>
                <Text style={styles.addMilestoneText}>+ Add milestone</Text>
              </Pressable>
            </View>

          </View>

          {/* Tips & Budget Right Side */}
          <View style={styles.sideCol}>
            
            {/* Tips Card */}
            <View style={styles.tipsCard}>
              <Text style={styles.tipsTitle}>Before You Post</Text>
              
              <View style={styles.tipItem}>
                <Text style={styles.tick}>✓</Text>
                <Text style={styles.tipText}>Jobs with milestones get 3× more proposals.</Text>
              </View>

              <View style={styles.tipItem}>
                <Text style={styles.tick}>✓</Text>
                <Text style={styles.tipText}>Escrow funds are refundable until a milestone is approved.</Text>
              </View>

              <View style={styles.tipItem}>
                <Text style={styles.tick}>✓</Text>
                <Text style={styles.tipText}>You can invite specific freelancers after posting.</Text>
              </View>
            </View>

            {/* Live Milestone Budget Box */}
            <LiveMilestoneBox
              milestoneCount={milestones.length}
              milestonesTotal={milestonesTotal}
              onPost={handlePostJob}
              onSaveDraft={() => router.push('/jobs')}
            />

          </View>

        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  postHead: {
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
  postLayout: {
    flexDirection: 'row',
    gap: 36,
    flexWrap: 'wrap',
  },
  formCol: {
    flex: 1,
    minWidth: 320,
  },
  sideCol: {
    width: 320,
    minWidth: 280,
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 26,
    marginBottom: 20,
  },
  sectionTitle: {
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
    minHeight: 110,
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
  twoCol: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  dropzone: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#E7E9F1',
    borderRadius: 12,
    padding: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F7FB',
  },
  dropzoneFilled: {
    borderStyle: 'solid',
    borderColor: '#EC1257',
    backgroundColor: '#FDE8EF',
  },
  dropzoneText: {
    fontSize: 13.5,
    fontFamily: 'Inter_500Medium',
    color: '#5B6472',
    textAlign: 'center',
  },
  milestoneBuilder: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 26,
  },
  builderHint: {
    fontSize: 12,
    color: '#93A0B4',
    fontFamily: 'Inter_400Regular',
    marginBottom: 18,
    marginTop: -12,
  },
  mInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  mNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F6F7FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mNumText: {
    color: '#5B6472',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  mInput: {
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13.5,
    fontFamily: 'Inter_400Regular',
    color: '#10172A',
    backgroundColor: '#FFFFFF',
  },
  mRemove: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mRemoveText: {
    color: '#93A0B4',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  addMilestoneBtn: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  addMilestoneText: {
    color: '#EC1257',
    fontFamily: 'Inter_700Bold',
    fontSize: 13.5,
  },
  tipsCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 22,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 14,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
    marginBottom: 14,
  },
  tipItem: {
    flexDirection: 'row',
    gap: 9,
    marginBottom: 12,
  },
  tick: {
    color: '#EC1257',
    fontFamily: 'Inter_800ExtraBold',
  },
  tipText: {
    fontSize: 13,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
    flex: 1,
    lineHeight: 18,
  },
});
