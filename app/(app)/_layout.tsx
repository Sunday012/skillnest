import React, { useState, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { TopNav } from '../../src/components/discovery/TopNav';
import { Platform, useWindowDimensions } from 'react-native';
import { AppIcon } from '../../src/components/AppIcon';

const BREAKPOINT = 880;

function useIsWide() {
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

export default function AppLayout() {
  const isWide = useIsWide();
  return (
    <>
      <TopNav />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#10172A',
          tabBarInactiveTintColor: '#5B6472',
          tabBarStyle: isWide
            ? { display: 'none' }  // Wide: header nav handles navigation
            : {
                borderTopColor: '#E7E9F1',
                elevation: 0,       // Android shadow
                shadowOpacity: 0,   // iOS shadow
              },
          tabBarLabelStyle: {
            fontFamily: 'Inter_600SemiBold',
            fontSize: 11,
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <AppIcon name="home-outline" size={20} color={color} />,
          }}
        />
        <Tabs.Screen
          name="browse"
          options={{
            title: 'Talent',
            tabBarIcon: ({ color }) => <AppIcon name="compass-outline" size={20} color={color} />,
          }}
        />
        <Tabs.Screen
          name="orders/index"
          options={{
            title: 'Orders',
            tabBarIcon: ({ color }) => <AppIcon name="receipt-outline" size={20} color={color} />,
          }}
        />
        <Tabs.Screen
          name="orders/checkout"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="orders/confirmation"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="orders/[id]"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: 'Messages',
            tabBarIcon: ({ color }) => <AppIcon name="chatbubbles-outline" size={20} color={color} />,
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            href: null, // Hidden from bottom tab bar — accessible via TopNav bell icon
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            href: null, // Hidden from bottom tab bar — accessible via TopNav heart icon
          }}
        />
        <Tabs.Screen
          name="my-gigs"
          options={{
            href: null, // Hidden from bottom tab bar — accessible via TopNav / Account menu
          }}
        />
        <Tabs.Screen
          name="jobs/index"
          options={{
            href: null, // Hidden from bottom tab bar — accessible via TopNav / Account menu
          }}
        />
        <Tabs.Screen
          name="jobs/create"
          options={{
            href: null, // Hidden from bottom tab bar
          }}
        />
        <Tabs.Screen
          name="jobs/[id]"
          options={{
            href: null, // Hidden from bottom tab bar
          }}
        />
        <Tabs.Screen
          name="talent/[id]"
          options={{
            href: null, // Dynamic profile — hidden from tab bar
          }}
        />
        <Tabs.Screen
          name="gigs/create"
          options={{
            href: null, // Create gig screen — hidden from tab bar
          }}
        />
        <Tabs.Screen
          name="gig/[id]"
          options={{
            href: null, // Gig detail page — hidden from tab bar
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            href: null, // Settings page — hidden from tab bar, accessible via TopNav / Account menu
          }}
        />
      </Tabs>
    </>
  );
}
