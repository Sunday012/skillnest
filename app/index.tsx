import { View, Text, ScrollView, Platform, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Button } from '../src/components/Button';
import { FAQItem } from '../src/components/landing/FAQItem';
import { ProcessCard } from '../src/components/landing/ProcessCard';
import { PricingCard } from '../src/components/landing/PricingCard';
import { RoadmapItem } from '../src/components/landing/RoadmapItem';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <View className="flex-1 bg-white">
      {/* Utility Bar */}
      <View className="bg-navy px-6 py-2 flex-row justify-between items-center">
        <View className="flex-row items-center gap-5 hidden md:flex">
          <Text className="text-gray-muted text-[13px]">🌍 Trusted in 45+ countries</Text>
          <Text className="text-gray-muted text-[13px]">🔒 Escrow-protected payments</Text>
        </View>
        <View className="flex-row gap-5">
          <Text className="text-gray-muted text-[13px]">Become a Seller</Text>
          <Text className="text-gray-muted text-[13px]">For Business</Text>
          <Text className="text-gray-muted text-[13px]">EN ▾</Text>
        </View>
      </View>

      {/* Nav */}
      <View style={{ zIndex: 50 }} className={`${Platform.OS === 'web' ? 'sticky top-0' : 'relative'}`}>
        {Platform.OS === 'web' || Platform.OS === 'ios' ? (
          <BlurView intensity={90} tint="light" className="absolute inset-0 bg-white/90 border-b border-border" />
        ) : (
          <View className="absolute inset-0 bg-white border-b border-border" />
        )}
        <View className="max-w-[1180px] w-full mx-auto px-6 h-[76px] flex-row items-center justify-between">
          {/* Logo */}
          <View className="flex-row items-center gap-2">
            <View className="w-[34px] h-[34px] rounded-[9px] bg-pink items-center justify-center">
              <Text className="text-white font-manrope font-extrabold text-[16px]">S</Text>
            </View>
            <Text className="font-manrope font-extrabold text-[20px] text-ink">SkillNest</Text>
          </View>

          {/* Desktop Links */}
          <View className="hidden md:flex flex-row gap-8">
            <Text className="font-semibold text-[15px] text-ink hover:text-pink">How it works</Text>
            <Text className="font-semibold text-[15px] text-ink hover:text-pink">Roadmap</Text>
            <Text className="font-semibold text-[15px] text-ink hover:text-pink">Pricing</Text>
            <Text className="font-semibold text-[15px] text-ink hover:text-pink">FAQ</Text>
          </View>

          {/* Right Actions */}
          <View className="hidden md:flex flex-row items-center gap-5">
            <Link href="/login">
              <Text className="font-bold text-[15px] text-ink">Log in</Text>
            </Link>
            <Link href="/signup" asChild>
              <Button title="Get Started →" onPress={() => {}} />
            </Link>
          </View>

          {/* Mobile Menu Toggle */}
          <Pressable className="md:hidden" onPress={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Ionicons name="menu" size={28} color="#10172A" />
          </Pressable>
        </View>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <View className="absolute top-[76px] left-0 right-0 bg-white border-b border-border p-6 gap-5 md:hidden">
            <Text className="font-semibold text-[15px] text-ink">How it works</Text>
            <Text className="font-semibold text-[15px] text-ink">Roadmap</Text>
            <Text className="font-semibold text-[15px] text-ink">Pricing</Text>
            <Text className="font-semibold text-[15px] text-ink">FAQ</Text>
            <Link href="/login">
              <Text className="font-bold text-[15px] text-ink">Log in</Text>
            </Link>
            <Link href="/signup" asChild>
              <Button title="Get Started →" onPress={() => {}} className="mt-2" />
            </Link>
          </View>
        )}
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View className="max-w-[1180px] mx-auto px-6 pt-[88px] w-full flex-col md:flex-row gap-10 items-center overflow-hidden">
          <View className="flex-1 items-start">
            <View className="bg-pink-tint rounded-full px-4 py-2 flex-row items-center gap-2 mb-6">
              <Text className="text-pink-dark font-bold text-[14px]">⭐ Rated 4.9 by 12,000+ professionals</Text>
            </View>
            <Text className="font-manrope font-extrabold text-[38px] md:text-[56px] leading-[1.06] text-ink mb-5">
              Hire skilled hands.{'\n'}
              <Text className="text-pink">Get real work done.</Text>
            </Text>
            <Text className="text-[19px] text-gray-body mb-8 max-w-[520px] leading-relaxed">
              SkillNest connects vetted freelancers with clients through milestone escrow — work gets delivered, funds move safely, and nobody chases an invoice.
            </Text>
            <View className="flex-row flex-wrap gap-3.5 mb-7">
              <Button title="Post a Job →" onPress={() => {}} />
              <Button title="Browse Talent" variant="outline" onPress={() => {}} />
            </View>
            <View className="flex-row flex-wrap gap-6 text-[14px] font-semibold text-gray-body">
              <Text className="text-gray-body"><Text className="text-green font-extrabold">✓</Text> Milestone escrow</Text>
              <Text className="text-gray-body"><Text className="text-green font-extrabold">✓</Text> Identity-verified freelancers</Text>
              <Text className="text-gray-body"><Text className="text-green font-extrabold">✓</Text> 5% platform fee</Text>
            </View>
          </View>

          {/* Hero Visual */}
          <View className="flex-1 h-[320px] md:h-[440px] items-center justify-center relative mt-5 md:mt-0">
            <LinearGradient
              colors={['rgba(236,18,87,0.22)', 'rgba(236,18,87,0)']}
              start={{ x: 0.35, y: 0.3 }}
              end={{ x: 0.65, y: 0.65 }}
              className="absolute w-[360px] h-[360px] rounded-full blur-xl"
            />
            <View className="bg-white border border-border rounded-[18px] p-[22px] w-[280px] rotate-[-4deg]" style={Platform.select({ web: { boxShadow: '0 30px 60px -20px rgba(16,23,42,.22)' }, default: { elevation: 15, shadowColor: '#10172A', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.22, shadowRadius: 30 }}) as any}>
              <View className="absolute -top-4 -right-4 bg-navy px-3.5 py-2 rounded-full flex-row items-center gap-1.5" style={{ elevation: 5, shadowColor: '#0B1220', shadowOpacity: 0.4, shadowRadius: 12, shadowOffset: { width: 0, height: 5 }}}>
                <Text className="text-white text-[12px] font-bold">✓ Verified</Text>
              </View>
              <View className="w-11 h-11 rounded-full bg-navy items-center justify-center mb-3.5">
                <Text className="text-white font-bold">MV</Text>
              </View>
              <Text className="font-manrope font-extrabold text-[16px] text-ink mb-1">Mira Vance</Text>
              <Text className="text-[13px] text-gray-body mb-3.5">Brand Designer & Identity Systems</Text>
              <Text className="text-[13px] text-[#F5A623] mb-4">★★★★★ 4.9 (212)</Text>
              <View className="border-t border-border pt-3.5 flex-row justify-between items-center">
                <Text className="text-[13px] text-gray-body">Starting at</Text>
                <Text className="font-manrope font-extrabold text-[18px] text-ink">$450</Text>
              </View>
              <View className="absolute -bottom-4 -left-7 bg-white border border-border px-4 py-2.5 rounded-xl flex-row items-center gap-2" style={{ elevation: 5, shadowColor: '#10172A', shadowOpacity: 0.25, shadowRadius: 20, shadowOffset: { width: 0, height: 10 }}}>
                <View className="w-2 h-2 rounded-full bg-green" />
                <Text className="text-[13px] font-bold text-ink">Held in escrow</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="bg-navy py-[52px] mt-20">
          <View className="max-w-[1180px] mx-auto px-6 w-full flex-row flex-wrap justify-between md:flex-nowrap">
            <View className="w-1/2 md:w-1/4 items-center mb-8 md:mb-0 border-r-0 md:border-r border-white/10">
              <Text className="font-manrope font-extrabold text-[38px] text-white">12k+</Text>
              <Text className="text-[13px] font-bold tracking-widest text-pink mt-1 uppercase">Verified Pros</Text>
            </View>
            <View className="w-1/2 md:w-1/4 items-center mb-8 md:mb-0 border-r-0 md:border-r border-white/10">
              <Text className="font-manrope font-extrabold text-[38px] text-white">98%</Text>
              <Text className="text-[13px] font-bold tracking-widest text-pink mt-1 uppercase">On-Time Delivery</Text>
            </View>
            <View className="w-1/2 md:w-1/4 items-center border-r-0 md:border-r border-white/10">
              <Text className="font-manrope font-extrabold text-[38px] text-white">$2.4M</Text>
              <Text className="text-[13px] font-bold tracking-widest text-pink mt-1 uppercase">Escrowed Monthly</Text>
            </View>
            <View className="w-1/2 md:w-1/4 items-center">
              <Text className="font-manrope font-extrabold text-[38px] text-white">45</Text>
              <Text className="text-[13px] font-bold tracking-widest text-pink mt-1 uppercase">Countries</Text>
            </View>
          </View>
        </View>

        {/* Process */}
        <View className="py-[96px] max-w-[1180px] mx-auto px-6 w-full">
          <View className="max-w-[640px] mx-auto items-center mb-14 text-center">
            <Text className="font-inter font-bold text-[13px] tracking-widest uppercase text-pink mb-3.5">The Process</Text>
            <Text className="font-manrope font-extrabold text-[38px] text-ink mb-3.5 text-center">From Brief to Delivery in Three Steps</Text>
            <Text className="text-[17px] text-gray-body text-center">No guesswork, no chasing invoices — just a clear path from posting to payment.</Text>
          </View>
          <View className="flex-col md:flex-row gap-6">
            <ProcessCard 
              number="01" 
              icon="📝" 
              title="Post or Browse" 
              description="Describe the job you need done, or explore ready-made gigs from vetted specialists across every category."
            />
            <ProcessCard 
              number="02" 
              icon="💰" 
              title="Fund the Milestone" 
              description="Break the budget into stages. Funds sit in escrow — not with us, not with the freelancer — until you approve."
            />
            <ProcessCard 
              number="03" 
              icon="✅" 
              title="Approve & Release" 
              description="Review each delivery against the brief. Payment releases the moment you're satisfied, milestone by milestone."
            />
          </View>
        </View>

        {/* Roadmap */}
        <View className="py-[96px] bg-bg-alt relative">
          <View className="max-w-[1180px] mx-auto px-6 w-full">
            <View className="max-w-[640px] mx-auto items-center mb-14 text-center">
              <Text className="font-inter font-bold text-[13px] tracking-widest uppercase text-pink mb-3.5">Roadmap</Text>
              <Text className="font-manrope font-extrabold text-[38px] text-ink mb-3.5 text-center">Building the Future of Freelance Work</Text>
              <Text className="text-[17px] text-gray-body text-center">Here's what's coming next as we grow the platform with our community.</Text>
            </View>
            
            <View className="relative">
              {/* Timeline Line */}
              <View className="absolute top-0 bottom-0 left-[22px] md:left-1/2 w-0.5 bg-border -translate-x-1/2 z-0" />
              <View className="absolute top-0 h-[26%] left-[22px] md:left-1/2 w-0.5 bg-pink -translate-x-1/2 z-0" />

              <RoadmapItem 
                quarter="Q4 2026" 
                title="Video Portfolios" 
                description="Freelancers showcase real work through short video reels alongside images — not just static thumbnails." 
                status="active" 
                align="left"
              />
              <RoadmapItem 
                quarter="Q1 2027" 
                title="Smart Talent Matching" 
                description="Post a job and get freelancer recommendations ranked by skill fit, budget, and availability — instantly." 
                status="past" 
                align="right"
              />
              <RoadmapItem 
                quarter="Q2 2027" 
                title="Native Mobile Apps" 
                description="iOS and Android apps so freelancers can manage gigs, chat with clients, and get paid from anywhere." 
                status="future" 
                align="left"
              />
              <RoadmapItem 
                quarter="Q3 2027" 
                title="Team Accounts" 
                description="Agencies manage multiple freelancers and shared billing under one workspace, with role-based access." 
                status="future" 
                align="right"
              />
            </View>
          </View>
        </View>

        {/* Platforms */}
        <View className="py-[96px] max-w-[1180px] mx-auto px-6 w-full">
          <View className="max-w-[640px] mx-auto items-center mb-14 text-center">
            <Text className="font-inter font-bold text-[13px] tracking-widest uppercase text-pink mb-3.5">Built For How You Work</Text>
            <Text className="font-manrope font-extrabold text-[38px] text-ink mb-3.5 text-center">Work From Anywhere</Text>
            <Text className="text-[17px] text-gray-body text-center">Manage gigs, clients, and payments across every device you use.</Text>
          </View>
          <View className="flex-col md:flex-row gap-6">
            <View className="bg-white border border-border rounded-[14px] p-[30px] flex-1 min-w-[280px]">
              <Text className="text-[26px] mb-4">💻</Text>
              <Text className="font-manrope font-extrabold text-[19px] text-ink mb-2">Web App</Text>
              <Text className="text-[14.5px] text-gray-body mb-4">Full marketplace access from any browser. Post jobs, browse talent, and manage orders — no downloads required.</Text>
              <Text className="text-[14px] font-bold text-pink">Learn more →</Text>
            </View>
            <View className="bg-white border border-border rounded-[14px] p-[30px] flex-1 min-w-[280px]">
              <Text className="text-[26px] mb-4">📱</Text>
              <Text className="font-manrope font-extrabold text-[19px] text-ink mb-2">Mobile Apps</Text>
              <Text className="text-[14.5px] text-gray-body mb-4">iOS and Android apps built for on-the-go work — chat, deliver, and get paid without opening a laptop.</Text>
              <Text className="text-[14px] font-bold text-pink">Learn more →</Text>
            </View>
            <View className="bg-white border border-border rounded-[14px] p-[30px] flex-1 min-w-[280px]">
              <Text className="text-[26px] mb-4">💬</Text>
              <Text className="font-manrope font-extrabold text-[19px] text-ink mb-2">Real-Time Messaging</Text>
              <Text className="text-[14.5px] text-gray-body mb-4">Discuss scope, share files, and stay aligned with clients or freelancers in one running conversation per order.</Text>
              <Text className="text-[14px] font-bold text-pink">Learn more →</Text>
            </View>
          </View>
        </View>

        {/* Pricing */}
        <View className="py-[96px] bg-bg-alt">
          <View className="max-w-[1180px] mx-auto px-6 w-full">
            <View className="max-w-[640px] mx-auto items-center mb-14 text-center">
              <Text className="font-inter font-bold text-[13px] tracking-widest uppercase text-pink mb-3.5">Plans</Text>
              <Text className="font-manrope font-extrabold text-[38px] text-ink mb-3.5 text-center">Grow Without the Overhead</Text>
              <Text className="text-[17px] text-gray-body text-center">Start free. Upgrade when unlimited applications and priority ranking start paying for themselves.</Text>
            </View>
            <View className="flex-col md:flex-row items-stretch gap-6">
              <PricingCard 
                title="Free"
                subtitle="Perfect for getting started."
                price="$0"
                features={['Post & apply to gigs', 'Standard search ranking', 'Escrow-protected orders', 'Ads shown between sessions']}
                buttonText="Get Started"
              />
              <PricingCard 
                title="Premium Monthly"
                subtitle="For freelancers ready to scale."
                price="$5"
                period="/month"
                isPopular
                features={['Unlimited job applications', 'No advertisements', 'Higher ranking priority', 'Gig visibility boosts', 'Premium profile badge']}
                buttonText="Go Premium"
              />
              <PricingCard 
                title="Premium Quarterly"
                subtitle="Save with quarterly billing."
                price="$12.99"
                period="/3 months"
                features={['Everything in Premium', '~13% cheaper than monthly', 'Priority support']}
                buttonText="Choose Quarterly"
              />
            </View>
          </View>
        </View>

        {/* FAQ */}
        <View className="py-[96px] max-w-[1180px] mx-auto px-6 w-full">
          <View className="max-w-[640px] mx-auto items-center mb-14 text-center">
            <Text className="font-inter font-bold text-[13px] tracking-widest uppercase text-pink mb-3.5">Support</Text>
            <Text className="font-manrope font-extrabold text-[38px] text-ink mb-3.5 text-center">Frequently Asked Questions</Text>
          </View>
          <View className="max-w-[760px] mx-auto w-full">
            <FAQItem 
              isFirst
              question="How does escrow protect my payment?"
              answer="When a milestone is funded, money moves into a secure escrow account — not to the freelancer and not to SkillNest. It only releases once you review and approve the delivered work."
            />
            <FAQItem 
              question="What happens if there's a dispute?"
              answer="Either side can open a dispute on a milestone. Funds stay frozen while a mediator reviews the evidence submitted by both parties before releasing or refunding."
            />
            <FAQItem 
              question="How much does SkillNest charge?"
              answer="SkillNest takes a small commission on completed transactions. Freelancers can also opt into a Premium plan for unlimited applications and higher visibility."
            />
            <FAQItem 
              question="Can I hire freelancers from anywhere?"
              answer="Yes — SkillNest is a global marketplace. You can filter talent by location, or set your job to remote-only if location doesn't matter."
            />
            <FAQItem 
              question="What if I'm not satisfied with the delivery?"
              answer="You can request revisions within the scope agreed upfront, or open a dispute if the delivery doesn't match what was promised in the milestone."
            />
          </View>
        </View>

        {/* Trust Band */}
        <View className="bg-navy py-[56px]">
          <View className="max-w-[1180px] mx-auto px-6 w-full flex-col md:flex-row gap-10">
            <View className="flex-1">
              <Text className="font-bold text-[17px] text-white mb-2.5">🔒 Escrow Protection</Text>
              <Text className="text-[14.5px] text-gray-muted leading-relaxed">Funds are held securely until you approve each milestone, so payment always matches delivered work — never before, never blind.</Text>
            </View>
            <View className="flex-1">
              <Text className="font-bold text-[17px] text-white mb-2.5">🛡 Verified Professionals</Text>
              <Text className="text-[14.5px] text-gray-muted leading-relaxed">Every freelancer completes identity verification before earning the verified badge, so you know exactly who you're working with.</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View className="bg-navy pt-[64px] pb-[30px]">
          <View className="max-w-[1180px] mx-auto px-6 w-full">
            <View className="flex-col md:flex-row gap-8 pb-[44px]">
              <View className="flex-[1.4]">
                <View className="flex-row items-center gap-2 mb-3.5">
                  <View className="w-[34px] h-[34px] rounded-[9px] bg-pink items-center justify-center">
                    <Text className="text-white font-manrope font-extrabold text-[16px]">S</Text>
                  </View>
                  <Text className="font-manrope font-extrabold text-[19px] text-white">SkillNest</Text>
                </View>
                <Text className="text-[14px] text-gray-muted max-w-[260px] leading-relaxed">The trusted way to hire freelancers and get hired — backed by milestone escrow.</Text>
              </View>
              <View className="flex-1">
                <Text className="text-[13px] font-bold tracking-widest uppercase text-white mb-4">Categories</Text>
                {['Design', 'Development', 'Writing', 'Marketing', 'Video', 'AI & Data'].map(link => (
                  <Text key={link} className="text-[14px] text-gray-muted mb-2.5 hover:text-white">{link}</Text>
                ))}
              </View>
              <View className="flex-1">
                <Text className="text-[13px] font-bold tracking-widest uppercase text-white mb-4">Company</Text>
                {['About SkillNest', 'Contact Us', 'Careers', 'Become a Seller'].map(link => (
                  <Text key={link} className="text-[14px] text-gray-muted mb-2.5 hover:text-white">{link}</Text>
                ))}
              </View>
              <View className="flex-1">
                <Text className="text-[13px] font-bold tracking-widest uppercase text-white mb-4">Legal</Text>
                {['Privacy Policy', 'Terms & Conditions', 'Trust & Safety', 'Dispute Policy'].map(link => (
                  <Text key={link} className="text-[14px] text-gray-muted mb-2.5 hover:text-white">{link}</Text>
                ))}
              </View>
            </View>
            <View className="border-t border-white/10 pt-6">
              <Text className="text-[12.5px] text-gray-muted leading-relaxed">
                SkillNest is a marketplace connecting independent freelancers with clients worldwide. Freelancers are independent contractors, not employees of SkillNest.{'\n\n'}
                © 2026 SkillNest. All rights reserved.
              </Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
