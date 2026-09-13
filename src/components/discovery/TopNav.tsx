import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Platform, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

const WEB_NAV_LINKS = [
  { label: 'Discover', href: '/home' },
  { label: 'Talent',   href: '/browse' },
  { label: 'My Gigs',  href: '/my-gigs' },
  { label: 'My Jobs',  href: '/jobs' },
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
  const [showMenu, setShowMenu] = useState(false);

  const navigateTo = (path: string) => {
    setShowMenu(false);
    router.push(path as any);
  };

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
        <Pressable onPress={() => router.push('/home')} className="flex-row items-center gap-[8px] shrink-0">
          <View className="w-[32px] h-[32px] rounded-[9px] bg-pink items-center justify-center">
            <Text className="text-white font-manrope-extraBold text-[14px]">S</Text>
          </View>
          <Text className="font-manrope-extraBold text-[18px] text-ink">SkillNest</Text>
        </Pressable>

        {/* Search pill */}
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
              const isActive = pathname === href || (href === '/jobs' && pathname.startsWith('/jobs'));
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
            position: 'relative',
          }}
        >
          <Pressable onPress={() => router.push('/saved')}>
            <Text className="text-[17px] text-gray-body">♡</Text>
          </Pressable>
          <Pressable className="relative" onPress={() => router.push('/notifications')}>
            <Text className="text-[17px]">🔔</Text>
            <View className="absolute -top-[3px] -right-[4px] w-[7px] h-[7px] rounded-full bg-pink" />
          </Pressable>

          {/* Avatar with Dropdown Toggle */}
          <Pressable
            onPress={() => setShowMenu(!showMenu)}
            className="w-[32px] h-[32px] rounded-full bg-navy items-center justify-center cursor-pointer"
          >
            <Text className="text-white text-[12px] font-inter-bold">M</Text>
          </Pressable>

          {/* Account Menu Popover */}
          {showMenu && (
            <View style={styles.menuPopover}>
              <Text style={styles.menuHeader}>Mira Vance (Client / Seller)</Text>
              
              <Pressable style={styles.menuItem} onPress={() => navigateTo('/jobs')}>
                <Text style={styles.menuItemIcon}>📋</Text>
                <Text style={styles.menuItemText}>My Jobs (Client)</Text>
              </Pressable>

              <Pressable style={styles.menuItem} onPress={() => navigateTo('/my-gigs')}>
                <Text style={styles.menuItemIcon}>💼</Text>
                <Text style={styles.menuItemText}>My Gigs (Freelancer)</Text>
              </Pressable>

              <View style={styles.menuDivider} />

              <Pressable style={styles.menuItem} onPress={() => navigateTo('/jobs/create')}>
                <Text style={styles.menuItemIcon}>➕</Text>
                <Text style={styles.menuItemText}>Post a Job</Text>
              </Pressable>

              <Pressable style={styles.menuItem} onPress={() => navigateTo('/gigs/create')}>
                <Text style={styles.menuItemIcon}>✨</Text>
                <Text style={styles.menuItemText}>Create a Gig</Text>
              </Pressable>
            </View>
          )}
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
  menuPopover: {
    position: 'absolute',
    top: 42,
    right: 0,
    width: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E7E9F1',
    padding: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    zIndex: 100,
  },
  menuHeader: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
    color: '#93A0B4',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 8,
  },
  menuItemIcon: {
    fontSize: 14,
  },
  menuItemText: {
    fontSize: 13.5,
    fontFamily: 'Inter_600SemiBold',
    color: '#10172A',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#E7E9F1',
    marginVertical: 6,
  },
});



