import React, { useState, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { TopNav } from '../../src/components/discovery/TopNav';
import { Text, Platform, useWindowDimensions } from 'react-native';

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
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🏠</Text>,
          }}
        />
        <Tabs.Screen
          name="browse"
          options={{
            title: 'Talent',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🔎</Text>,
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: 'Orders',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>📋</Text>,
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: 'Messages',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>💬</Text>,
          }}
        />
        <Tabs.Screen
          name="talent/[id]"
          options={{
            href: null, // Dynamic profile — hidden from tab bar
          }}
        />
      </Tabs>
    </>
  );
}
