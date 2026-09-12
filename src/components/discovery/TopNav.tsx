import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Platform, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

const WEB_NAV_LINKS = [
  { label: 'Discover', href: '/home' },
  { label: 'Talent',   href: '/browse' },
  { label: 'My Gigs',  href: '/my-gigs' },
  { label: 'Orders',   href: '/orders' },
  { label: 'Messages', href: '/messages' },
];

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

export function TopNav() {
  const router = useRouter();
  const pathname = usePathname();
  const isWide = useBreakpoint();

  return (
    <View className="bg-white border-b border-border z-50">
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 72,
          paddingHorizontal: isWide ? 24 : 12,
          maxWidth: 1180,
          width: '100%',
          alignSelf: 'center',
          gap: isWide ? 20 : 10,
        }}
      >
        {/* Logo */}
        <View className="flex-row items-center gap-[8px] shrink-0">
          <View className="w-[32px] h-[32px] rounded-[9px] bg-pink items-center justify-center">
            <Text className="text-white font-manrope-extraBold text-[14px]">S</Text>
          </View>
          <Text className="font-manrope-extraBold text-[18px] text-ink">SkillNest</Text>
        </View>

        {/* Search pill — flex-1 absorbs space, pill itself capped at 420px (wide) / 280px (narrow) */}
        <View className="flex-1 items-center">
          <View
            style={{ maxWidth: isWide ? 420 : 280, width: '100%' }}
            className="flex-row items-center gap-2 bg-bg-alt rounded-full py-[8px] px-3.5"
          >
            <Text className="text-[13px]">🔍</Text>
            <TextInput
              placeholder={isWide ? "Search gigs, talent, or skills…" : "Search…"}
              className="flex-1 text-[13px] text-gray-muted p-0"
              style={{ height: 20, outlineStyle: 'none' } as any}
              placeholderTextColor="#93A0B4"
              editable={false}
            />
          </View>
        </View>

        {/* Nav links — wide screens only (≥880px) */}
        {isWide && (
          <View style={styles.navLinks}>
            {WEB_NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Pressable
                  key={label}
                  onPress={() => router.push(href as any)}
                  style={styles.navLink}
                >
                  <Text style={[styles.navLinkText, isActive && styles.navLinkActive]}>
                    {label}
                  </Text>
                  {isActive && <View style={styles.navLinkUnderline} />}
                </Pressable>
              );
            })}
          </View>
        )}

        {/* Icons */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: isWide ? 18 : 10,
            flexShrink: 0,
          }}
        >
          <Pressable>
            <Text className="text-[17px] text-gray-body">♡</Text>
          </Pressable>
          <Pressable className="relative">
            <Text className="text-[17px]">🔔</Text>
            <View className="absolute -top-[3px] -right-[4px] w-[7px] h-[7px] rounded-full bg-pink" />
          </Pressable>
          <View className="w-[32px] h-[32px] rounded-full bg-navy items-center justify-center">
            <Text className="text-white text-[12px] font-inter-bold">M</Text>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
  },
  navLink: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    position: 'relative',
  },
  navLinkText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#5B6472',
  },
  navLinkActive: {
    color: '#10172A',
  },
  navLinkUnderline: {
    position: 'absolute',
    bottom: -1,
    left: 12,
    right: 12,
    height: 2,
    borderRadius: 2,
    backgroundColor: '#EC1257',
  },
});



