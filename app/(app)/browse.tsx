import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, Platform } from 'react-native';
import { FEATURED_TALENT } from '../../src/constants/discoveryData';
import { CATEGORY_LABELS } from '../../src/constants/categories';
import { TalentCard } from '../../src/components/discovery/TalentCard';

const FILTER_CATEGORIES = CATEGORY_LABELS;
const MIN_RATE = 20;
const MAX_RATE = 150;

// ------------------------------------------------------------------
// Web-only styled range slider (uses a CSS custom property trick to
// colour the filled portion of the track in pink).
// ------------------------------------------------------------------
function RateSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const pct = ((value - MIN_RATE) / (MAX_RATE - MIN_RATE)) * 100;

  if (Platform.OS !== 'web') {
    // Native fallback — plain pressable strip (full slider library not needed for now)
    return (
      <View style={{ height: 4, backgroundColor: '#E7E9F1', borderRadius: 2, marginVertical: 8 }}>
        <View style={{ width: `${pct}%` as any, height: 4, backgroundColor: '#EC1257', borderRadius: 2 }} />
      </View>
    );
  }

  return (
    <View>
      <style>{`
        .rate-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 2px;
          outline: none;
          background: linear-gradient(
            to right,
            #EC1257 0%,
            #EC1257 ${pct}%,
            #E7E9F1 ${pct}%,
            #E7E9F1 100%
          );
          cursor: pointer;
        }
        .rate-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #EC1257;
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.18);
          cursor: pointer;
        }
        .rate-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #EC1257;
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.18);
          cursor: pointer;
        }
      `}</style>
      {/* @ts-ignore — input[type=range] is valid on web */}
      <input
        type="range"
        className="rate-slider"
        min={MIN_RATE}
        max={MAX_RATE}
        step={5}
        value={value}
        onChange={(e: any) => onChange(Number(e.target.value))}
      />
    </View>
  );
}

// ------------------------------------------------------------------
// Checkbox row
// ------------------------------------------------------------------
function CheckboxRow({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable
      onPress={onToggle}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 5,
      }}
    >
      {/* Box */}
      <View
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          borderWidth: 1.5,
          borderColor: checked ? '#EC1257' : '#C8CFDA',
          backgroundColor: checked ? '#EC1257' : '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {checked && (
          <Text style={{ color: '#fff', fontSize: 10, lineHeight: 12, fontFamily: 'Inter_700Bold' }}>
            ✓
          </Text>
        )}
      </View>
      <Text style={{ fontSize: 13.5, fontFamily: 'Inter_500Medium', color: '#10172A' }}>
        {label}
      </Text>
    </Pressable>
  );
}

// ------------------------------------------------------------------
// Toggle switch (already existed — extracted to keep browse.tsx clean)
// ------------------------------------------------------------------
function Toggle({ value, onToggle }: { value: boolean; onToggle: () => void }) {
  return (
    <Pressable
      onPress={onToggle}
      style={{
        width: 38,
        height: 22,
        borderRadius: 11,
        backgroundColor: value ? '#EC1257' : '#E7E9F1',
        justifyContent: 'center',
        paddingHorizontal: 3,
      }}
    >
      <View
        style={{
          width: 16,
          height: 16,
          borderRadius: 8,
          backgroundColor: '#fff',
          transform: [{ translateX: value ? 16 : 0 }],
          shadowColor: '#000',
          shadowOpacity: 0.12,
          shadowRadius: 2,
          elevation: 1,
        }}
      />
    </Pressable>
  );
}

// ------------------------------------------------------------------
// Section label
// ------------------------------------------------------------------
function SectionLabel({ children }: { children: string }) {
  return (
    <Text
      style={{
        fontSize: 11,
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        color: '#93A0B4',
        fontFamily: 'Inter_700Bold',
        marginBottom: 12,
      }}
    >
      {children}
    </Text>
  );
}

// ------------------------------------------------------------------
// Main Screen
// ------------------------------------------------------------------
export default function BrowseScreen() {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [maxRate, setMaxRate] = useState(MAX_RATE);
  const [availableNow, setAvailableNow] = useState(false);
  const [kycVerified, setKycVerified] = useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return FEATURED_TALENT.filter(t => {
      if (search && !t.name.toLowerCase().includes(search.toLowerCase()) &&
          !t.tags.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase()))) {
        return false;
      }
      if (selectedCategories.size > 0 && !selectedCategories.has(t.category)) {
        return false;
      }
      if (t.price > maxRate) return false;
      if (availableNow && t.status !== 'available') return false;
      if (kycVerified && !t.isVerified) return false;
      return true;
    });
  }, [search, selectedCategories, maxRate, availableNow, kycVerified]);

  return (
    <ScrollView className="flex-1 bg-bg-alt" contentContainerStyle={{ paddingBottom: 64 }}>
      <View className="px-6 py-9 max-w-[1180px] w-full self-center">

        <View className="mb-7">
          <Text className="font-manrope-extraBold text-[28px] text-ink mb-2">Browse Talent</Text>
          <Text className="text-[14.5px] text-gray-body">Every freelancer below has completed identity checks or is in review.</Text>
        </View>

        <View className="flex-col md:flex-row gap-8">

          {/* ── Sidebar ── */}
          <View style={{ gap: 24 }} className="md:w-[260px] bg-white border border-border rounded-[14px] p-5 self-start w-full">

            {/* Search */}
            <View>
              <SectionLabel>Search</SectionLabel>
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search by skill or name"
                placeholderTextColor="#93A0B4"
                style={{
                  borderWidth: 1.5,
                  borderColor: '#E7E9F1',
                  borderRadius: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  fontSize: 13.5,
                  fontFamily: 'Inter_400Regular',
                  color: '#10172A',
                  ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}),
                }}
              />
            </View>

            {/* Category checkboxes */}
            <View>
              <SectionLabel>Category</SectionLabel>
              <View style={{ gap: 2 }}>
                {FILTER_CATEGORIES.map(cat => (
                  <CheckboxRow
                    key={cat}
                    label={cat}
                    checked={selectedCategories.has(cat)}
                    onToggle={() => toggleCategory(cat)}
                  />
                ))}
              </View>
            </View>

            {/* Max Hourly Rate slider */}
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                <SectionLabel>Max Hourly Rate</SectionLabel>
                <Text style={{ fontSize: 13, fontFamily: 'Inter_700Bold', color: '#EC1257' }}>
                  ${maxRate}{maxRate === MAX_RATE ? '+' : ''}
                </Text>
              </View>
              <RateSlider value={maxRate} onChange={setMaxRate} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                <Text style={{ fontSize: 11, color: '#93A0B4', fontFamily: 'Inter_400Regular' }}>${MIN_RATE}/hr</Text>
                <Text style={{ fontSize: 11, color: '#93A0B4', fontFamily: 'Inter_400Regular' }}>${MAX_RATE}+/hr</Text>
              </View>
            </View>

            {/* Preferences */}
            <View>
              <SectionLabel>Preferences</SectionLabel>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <Text style={{ fontSize: 13.5, fontFamily: 'Inter_600SemiBold', color: '#10172A' }}>Available now</Text>
                <Toggle value={availableNow} onToggle={() => setAvailableNow(v => !v)} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 13.5, fontFamily: 'Inter_600SemiBold', color: '#10172A' }}>KYC-verified only</Text>
                <Toggle value={kycVerified} onToggle={() => setKycVerified(v => !v)} />
              </View>
            </View>

          </View>

          {/* ── Results list ── */}
          <View className="flex-1 flex-col gap-4">
            {filtered.length === 0 ? (
              <View style={{ paddingVertical: 48, alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontFamily: 'Manrope_700Bold', color: '#10172A', marginBottom: 8 }}>
                  No results
                </Text>
                <Text style={{ fontSize: 14, color: '#5B6472', fontFamily: 'Inter_400Regular' }}>
                  Try adjusting your filters
                </Text>
              </View>
            ) : (
              filtered.map(talent => (
                <TalentCard key={talent.id} talent={talent} layout="row" />
              ))
            )}
          </View>

        </View>
      </View>
    </ScrollView>
  );
}
