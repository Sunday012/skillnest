import React from 'react';
import { View, Text, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export type HeroVisualVariant = 'talent' | 'job';

interface HeroVisualProps {
  variant: HeroVisualVariant;
  title: string;
  subtitle: string;
  price: string;
  priceLabel?: string;
  tagOrStat: string; // Rating for talent, Tag for job
  avatarText?: string; // For talent
  avatarStack?: string[]; // For job (e.g. ['M', 'D', '+9'])
  topPillText: string;
  topPillIcon?: 'verified' | 'dot';
  bottomPillText?: string;
  bottomPillIcon?: 'dot';
}

export function HeroVisual({
  variant,
  title,
  subtitle,
  price,
  priceLabel,
  tagOrStat,
  avatarText,
  avatarStack,
  topPillText,
  topPillIcon,
  bottomPillText,
  bottomPillIcon,
}: HeroVisualProps) {
  return (
    <View className="flex-1 h-[320px] md:h-[440px] items-center justify-center relative mt-5 md:mt-0">
      <LinearGradient
        colors={['rgba(236,18,87,0.22)', 'rgba(236,18,87,0)']}
        start={{ x: 0.35, y: 0.3 }}
        end={{ x: 0.65, y: 0.65 }}
        className="absolute w-[360px] h-[360px] rounded-full blur-xl"
      />
      
      <View 
        className="bg-white border border-border rounded-[18px] p-[22px] w-[290px] rotate-[-3deg]" 
        style={Platform.select({ 
          web: { boxShadow: '0 30px 60px -20px rgba(16,23,42,.22)' }, 
          default: { elevation: 15, shadowColor: '#10172A', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.22, shadowRadius: 30 }
        }) as any}
      >
        {/* Top Pill */}
        {topPillText && (
          <View 
            className={`absolute -top-4 ${variant === 'talent' ? '-right-4 bg-navy' : '-left-6 bg-white border border-border'} px-3.5 py-2.5 rounded-full flex-row items-center gap-1.5`} 
            style={{ elevation: 5, shadowColor: variant === 'talent' ? '#0B1220' : '#10172A', shadowOpacity: 0.3, shadowRadius: 15, shadowOffset: { width: 0, height: 8 }}}
          >
            {topPillIcon === 'dot' && <View className="w-2 h-2 rounded-full bg-green" />}
            <Text className={`${variant === 'talent' ? 'text-white font-bold text-[12px]' : 'text-ink font-bold text-[12.5px]'}`}>
              {topPillIcon === 'verified' ? '✓ ' : ''}{topPillText}
            </Text>
          </View>
        )}

        {/* Talent Avatar */}
        {variant === 'talent' && avatarText && (
          <View className="w-11 h-11 rounded-full bg-navy items-center justify-center mb-3.5">
            <Text className="text-white font-bold">{avatarText}</Text>
          </View>
        )}

        {/* Job Tag */}
        {variant === 'job' && tagOrStat && (
          <View className="self-start bg-pink-tint px-2.5 py-1 rounded-full mb-3">
            <Text className="text-pink-dark font-bold text-[11px]">{tagOrStat}</Text>
          </View>
        )}

        <Text className={`font-manrope font-extrabold ${variant === 'talent' ? 'text-[16px]' : 'text-[16px]'} text-ink mb-1`}>{title}</Text>
        <Text className="text-[13px] text-gray-body mb-3.5">{subtitle}</Text>
        
        {/* Talent Rating */}
        {variant === 'talent' && tagOrStat && (
          <Text className="text-[13px] text-[#F5A623] mb-4">{tagOrStat}</Text>
        )}
        
        {/* Job Spacing */}
        {variant === 'job' && <View className="mb-4" />}

        <View className="border-t border-border pt-3.5 flex-row justify-between items-center">
          {variant === 'talent' ? (
            <Text className="text-[13px] text-gray-body">{priceLabel}</Text>
          ) : (
            <View className="flex-row ml-2">
              {avatarStack?.map((av, i) => (
                <View key={i} className="w-6 h-6 rounded-full bg-navy items-center justify-center border-2 border-white -ml-2">
                  <Text className="text-white font-bold text-[10px]">{av}</Text>
                </View>
              ))}
            </View>
          )}
          <Text className={`font-manrope font-extrabold ${variant === 'talent' ? 'text-[18px]' : 'text-[17px]'} text-ink`}>{price}</Text>
        </View>

        {/* Bottom Pill */}
        {bottomPillText && (
          <View 
            className="absolute -bottom-4 -left-7 bg-white border border-border px-4 py-2.5 rounded-xl flex-row items-center gap-2" 
            style={{ elevation: 5, shadowColor: '#10172A', shadowOpacity: 0.25, shadowRadius: 20, shadowOffset: { width: 0, height: 10 }}}
          >
            {bottomPillIcon === 'dot' && <View className="w-2 h-2 rounded-full bg-green" />}
            <Text className="text-[13px] font-bold text-ink">{bottomPillText}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
