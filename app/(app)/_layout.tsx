import React from 'react';
import { Tabs } from 'expo-router';
import { TopNav } from '../../src/components/discovery/TopNav';
import { Text, Platform } from 'react-native';

export default function AppLayout() {
  return (
    <>
      <TopNav />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#10172A',
          tabBarInactiveTintColor: '#5B6472',
          tabBarStyle: Platform.OS === 'web'
            ? { display: 'none' }  // Header nav handles web navigation
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
