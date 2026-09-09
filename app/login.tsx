import { View, Text, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '../src/components/Button';
import { Input } from '../src/components/Input';

export default function LoginScreen() {
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
            <Text className="text-2xl font-manrope font-bold text-ink mb-1 mt-4">Welcome back</Text>
            <Text className="text-gray-body">Log in to your account</Text>
          </View>
          
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
          
          <View className="items-end mb-6">
            <Text className="text-pink text-sm font-bold">Forgot password?</Text>
          </View>
          
          <Button title="Log In" onPress={() => {}} className="mb-6" />
          
          <View className="flex-row justify-center">
            <Text className="text-gray-body">Don't have an account? </Text>
            <Link href="/signup">
              <Text className="text-pink font-bold">Sign up</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
