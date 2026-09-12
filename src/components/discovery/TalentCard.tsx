import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

interface TalentCardProps {
  talent: any;
  layout?: 'grid' | 'row';
}

const STATUS_DOT: Record<string, string> = {
  available: '#17A34A',
  busy: '#F5A623',
  away: '#93A0B4',
};

const STATUS_LABEL: Record<string, string> = {
  available: 'Available',
  busy: 'Busy',
  away: 'Not Available',
};

export function TalentCard({ talent, layout = 'grid' }: TalentCardProps) {
  const router = useRouter();
  const isRow = layout === 'row';

  const handlePress = () => {
    router.push(`/talent/${talent.id}`);
  };

  const dotColor = STATUS_DOT[talent.status] ?? '#93A0B4';
  const statusLabel = STATUS_LABEL[talent.status] ?? 'Unknown';

  const StatusBadge = () => (
    <View style={styles.statusBadge}>
      <View style={[styles.statusDot, { backgroundColor: dotColor }]} />
      <Text style={styles.statusText}>{statusLabel}</Text>
    </View>
  );

  return (
    <Pressable
      onPress={handlePress}
      className={`bg-white border border-border rounded-[16px] p-[22px] ${isRow ? 'flex-row gap-4 items-start' : 'flex-col'}`}
    >
      <View className={`${isRow ? 'flex-1 flex-row gap-4' : ''}`}>
        {/* Avatar */}
        <View
          style={[styles.avatar, isRow ? styles.avatarRow : styles.avatarGrid]}
        >
          <Text className="text-white font-inter-bold">{talent.initial}</Text>
        </View>

        {/* Info */}
        <View className={`${isRow ? 'flex-1' : 'mt-3 mb-3'}`}>
          <View className="flex-row items-center gap-1.5 flex-wrap">
            <Text className="font-manrope-extraBold text-[15.5px] text-ink">{talent.name}</Text>
            {talent.isVerified && <Text className="text-pink text-[12px]">✓</Text>}
            {isRow && <StatusBadge />}
          </View>
          <Text className="text-[12.5px] text-gray-body mt-1">{talent.role} · {talent.location}</Text>

          {!isRow && (
            <View style={styles.statusBadgeTop}>
              <StatusBadge />
            </View>
          )}

          {isRow && talent.about && (
            <Text className="text-[13px] text-gray-body mt-2 mb-2">{talent.about}</Text>
          )}

          {/* Tags — always pink-tint, never status-dependent */}
          <View className={`flex-row flex-wrap gap-1.5 ${isRow ? '' : 'mt-3 mb-3.5'}`}>
            {talent.tags.map((tag: string) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Grid portfolio strip */}
      {!isRow && (
        <View className="flex-row gap-1.5 mb-3.5">
          <View className="flex-1 aspect-[1.4] rounded-lg bg-bg-alt" />
          <View className="flex-1 aspect-[1.4] rounded-lg bg-bg-alt" />
          <View className="flex-1 aspect-[1.4] rounded-lg bg-bg-alt" />
        </View>
      )}

      {/* Footer */}
      <View className={`${isRow ? 'items-end shrink-0 pl-2' : 'flex-row justify-between items-center border-t border-border pt-3.5'}`}>
        {isRow ? (
          <>
            <Text className="font-manrope-extraBold text-[18px] text-ink">${talent.price}/hr</Text>
            <Text className="text-[12px] text-gray-body mt-1">★ {talent.rating} ({talent.reviews})</Text>
            <View className="bg-navy px-4 py-2 rounded-lg mt-2.5">
              <Text className="text-white text-[12.5px] font-inter-bold">View Profile</Text>
            </View>
          </>
        ) : (
          <>
            <Text className="text-[12.5px] text-gray-body font-inter-medium">★ {talent.rating} ({talent.reviews})</Text>
            <Text className="font-manrope-extraBold text-[16px] text-ink">${talent.price}/hr</Text>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 999,
    backgroundColor: '#0B1220',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarGrid: { width: 46, height: 46 },
  avatarRow: { width: 52, height: 52 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F6F7FB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusBadgeTop: { marginTop: 8, alignSelf: 'flex-start' },
  statusDot: { width: 6, height: 6, borderRadius: 999 },
  statusText: { fontSize: 11, fontFamily: 'Inter_600SemiBold', color: '#10172A' },
  tag: {
    backgroundColor: '#FDE8EF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagText: { color: '#C10E48', fontSize: 11, fontFamily: 'Inter_600SemiBold' },
});

