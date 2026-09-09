import { View, Text, ScrollView, Platform, KeyboardAvoidingView, Pressable } from 'react-native';
import { Button } from '../src/components/Button';
import { Input } from '../src/components/Input';
import { Link } from 'expo-router';
import { useState } from 'react';

export default function SignupScreen() {
  const [role, setRole] = useState<'client' | 'freelancer'>('client');

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-bg-alt"
    >
      <ScrollView contentContainerClassName="flex-grow justify-center px-6 py-12">
        <View className="mx-auto w-full max-w-md bg-white p-8 rounded-2xl border border-border">
          <View className="mb-8 items-center">
            <View className="flex-row items-center gap-2 mb-2">
              <View className="h-8 w-8 items-center justify-center rounded-lg bg-pink">
                <Text className="font-manrope text-base font-extrabold text-white">S</Text>
              </View>
              <Text className="font-manrope text-xl font-extrabold text-ink">SkillNest</Text>
            </View>
            <Text className="text-2xl font-manrope font-bold text-ink mb-1 mt-4">Create an account</Text>
            <Text className="text-gray-body">Join the micro-skill marketplace</Text>
          </View>

          {/* Role Toggle */}
          <View className="mb-6 flex-row rounded-xl bg-bg-alt p-1">
            <Pressable 
              onPress={() => setRole('client')}
              className={`flex-1 items-center justify-center rounded-lg py-3 ${role === 'client' ? 'bg-white shadow-sm border border-border/50' : ''}`}
            >
              <Text className={`font-bold ${role === 'client' ? 'text-ink' : 'text-gray-body'}`}>I'm a Client</Text>
            </Pressable>
            <Pressable 
              onPress={() => setRole('freelancer')}
              className={`flex-1 items-center justify-center rounded-lg py-3 ${role === 'freelancer' ? 'bg-white shadow-sm border border-border/50' : ''}`}
            >
              <Text className={`font-bold ${role === 'freelancer' ? 'text-ink' : 'text-gray-body'}`}>I'm a Freelancer</Text>
            </Pressable>
          </View>
          
          <Input 
            label="Full Name" 
            placeholder="Ada Lovelace" 
          />
          
          <Input 
            label="Email Address" 
            placeholder="you@example.com" 
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Input 
            label="Password" 
            placeholder="••••••••" 
            secureTextEntry 
          />
          
          <Button title="Create Account" onPress={() => {}} className="mb-6 mt-2" />
          
          <View className="flex-row justify-center">
            <Text className="text-gray-body">Already have an account? </Text>
            <Link href="/login">
              <Text className="text-pink font-bold">Log in</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
