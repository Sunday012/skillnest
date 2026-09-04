import './global.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const services = [
  { title: 'Video editing', meta: '24h average delivery', price: '$35+', color: 'bg-coral' },
  { title: 'Thumbnail design', meta: 'Verified portfolios', price: '$18+', color: 'bg-mint' },
  { title: 'Caption writing', meta: 'AI draft assist', price: '$12+', color: 'bg-gold' },
]

const freelancers = [
  { name: 'Ada M.', role: 'Short-form video editor', rating: '4.9', fit: '94%' },
  { name: 'Miles C.', role: 'YouTube thumbnail designer', rating: '4.8', fit: '91%' },
  { name: 'Nora V.', role: 'Caption repurposing specialist', rating: '4.7', fit: '89%' },
]

const aiFeatures = [
  ['Smart matching', 'Embedding-powered job and gig recommendations.'],
  ['Moderation', 'Flag-and-hold review for risky listings and messages.'],
  ['Writing assistant', 'Turns rough briefs into editable marketplace copy.'],
  ['Dispute summaries', 'Neutral evidence summaries for admins.'],
]

const timeline = [
  ['W1-2', 'Discovery, UX, architecture, AI provider setup'],
  ['W2-4', 'Auth, profiles, marketplace core'],
  ['W5-7', 'Payments, escrow, messaging, matching'],
  ['W7-9', 'Trust, reviews, admin, moderation'],
  ['W9-10', 'Subscriptions, ads, assistant, chatbot'],
  ['W11-12', 'QA, hardening, launch readiness'],
]

export default function App() {
  const queryClient = useMemo(() => new QueryClient(), [])

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView className="flex-1 bg-ivory">
        <StatusBar style="dark" />
        <ScrollView contentContainerClassName="pb-8" showsVerticalScrollIndicator={false}>
          <Header />
          <Hero />
          <Marketplace />
          <Matches />
          <AiLayer />
          <Timeline />
        </ScrollView>
      </SafeAreaView>
    </QueryClientProvider>
  )
}

function Header() {
  return (
    <View className="flex-row items-center justify-between border-b border-ink/10 bg-white px-5 py-4">
      <View className="flex-row items-center gap-3">
        <View className="h-10 w-10 items-center justify-center rounded-lg bg-ink">
          <Ionicons name="sparkles" color="#ffffff" size={18} />
        </View>
        <Text className="text-xl font-bold text-ink">SkillNest</Text>
      </View>
      <Pressable className="h-10 w-10 items-center justify-center rounded-lg bg-ivory">
        <Ionicons name="notifications-outline" color="#17201c" size={20} />
      </Pressable>
    </View>
  )
}

function Hero() {
  return (
    <View className="bg-white px-5 pb-6 pt-5">
      <View className="mb-5 flex-row items-center gap-2 self-start rounded-lg bg-mint px-3 py-2">
        <Ionicons name="shield-checkmark-outline" color="#17201c" size={16} />
        <Text className="text-sm font-semibold text-ink">Escrow-backed creative work</Text>
      </View>
      <Text className="text-4xl font-bold leading-tight text-ink">Hire trusted creators faster.</Text>
      <Text className="mt-4 text-base leading-7 text-ink/70">
        Verified freelancers, protected payments, AI matching, and human-reviewed trust workflows for
        micro-services like video edits, thumbnails, captions, and content repurposing.
      </Text>
      <View className="mt-5 flex-row gap-3">
        <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-coral px-4 py-4">
          <Ionicons name="search-outline" color="#ffffff" size={18} />
          <Text className="font-bold text-white">Browse</Text>
        </Pressable>
        <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-ink/15 bg-white px-4 py-4">
          <Ionicons name="briefcase-outline" color="#17201c" size={18} />
          <Text className="font-bold text-ink">Post job</Text>
        </Pressable>
      </View>
      <View className="mt-5 rounded-lg border border-ink/10 bg-ivory px-4 py-3">
        <Text className="mb-2 text-sm font-semibold text-ink/60">Find a service</Text>
        <View className="flex-row items-center gap-2">
          <Ionicons name="search" color="#6b746f" size={18} />
          <TextInput
            className="flex-1 text-base text-ink"
            placeholder="Try 'edit my podcast clips'"
            placeholderTextColor="#6b746f"
          />
        </View>
      </View>
    </View>
  )
}

function Marketplace() {
  return (
    <Section eyebrow="Marketplace" title="Popular micro-services">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 px-5">
        <View className="flex-row gap-4">
          {services.map((service) => (
            <View className="w-56 rounded-lg border border-ink/10 bg-white p-4" key={service.title}>
              <View className={`mb-5 h-2 w-14 rounded-full ${service.color}`} />
              <Text className="text-lg font-bold text-ink">{service.title}</Text>
              <Text className="mt-2 text-sm text-ink/60">{service.meta}</Text>
              <View className="mt-6 flex-row items-center justify-between">
                <Text className="text-2xl font-bold text-ink">{service.price}</Text>
                <View className="h-10 w-10 items-center justify-center rounded-lg bg-ivory">
                  <Ionicons name="chevron-forward" color="#17201c" size={18} />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Section>
  )
}

function Matches() {
  return (
    <Section eyebrow="AI matches" title="Recommended freelancers">
      <View className="gap-3">
        {freelancers.map((freelancer) => (
          <View
            className="flex-row items-center gap-3 rounded-lg border border-ink/10 bg-white p-4"
            key={freelancer.name}
          >
            <View className="h-12 w-12 items-center justify-center rounded-lg bg-ivory">
              <Text className="font-bold text-ink">{freelancer.name.replace('.', '')}</Text>
            </View>
            <View className="flex-1">
              <View className="flex-row items-center gap-2">
                <Text className="font-bold text-ink">{freelancer.name}</Text>
                <Ionicons name="checkmark-circle" color="#2b8a5b" size={16} />
              </View>
              <Text className="text-sm text-ink/60">{freelancer.role}</Text>
            </View>
            <View className="items-end">
              <Text className="font-bold text-ink">{freelancer.fit}</Text>
              <Text className="text-xs text-ink/60">fit</Text>
            </View>
          </View>
        ))}
      </View>
    </Section>
  )
}

function AiLayer() {
  return (
    <Section eyebrow="AI layer" title="Automation with review paths">
      <View className="flex-row flex-wrap gap-3">
        {aiFeatures.map(([title, description]) => (
          <View className="min-h-32 flex-1 basis-[45%] rounded-lg bg-white p-4" key={title}>
            <Ionicons name="sparkles-outline" color="#e65f4f" size={20} />
            <Text className="mt-3 font-bold text-ink">{title}</Text>
            <Text className="mt-2 text-sm leading-5 text-ink/60">{description}</Text>
          </View>
        ))}
      </View>
    </Section>
  )
}

function Timeline() {
  return (
    <Section eyebrow="Delivery plan" title="12-week launch roadmap">
      <View className="overflow-hidden rounded-lg border border-ink/10 bg-white">
        {timeline.map(([weeks, focus]) => (
          <View className="flex-row gap-3 border-b border-ink/10 p-4 last:border-b-0" key={weeks}>
            <Text className="w-16 font-bold text-coral">{weeks}</Text>
            <Text className="flex-1 leading-6 text-ink/70">{focus}</Text>
          </View>
        ))}
      </View>
    </Section>
  )
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <View className="px-5 pt-8">
      <Text className="text-xs font-bold uppercase text-coral">{eyebrow}</Text>
      <Text className="mb-4 mt-2 text-2xl font-bold text-ink">{title}</Text>
      {children}
    </View>
  )
}
