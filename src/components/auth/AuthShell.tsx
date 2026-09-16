import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from 'react-native';
import { AppIcon, type AppIconName } from '../AppIcon';

const AUTH_IMAGE =
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85';

interface AuthShellProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  mobilePanel?: boolean;
  mobileHeadingInPanel?: boolean;
  hideMobileSubtitle?: boolean;
  onMobileEyebrowPress?: () => void;
  mobilePanelVariant?: 'light' | 'glass';
}

interface AuthFieldProps extends TextInputProps {
  label: string;
  icon: AppIconName;
  mobileGlass?: boolean;
}

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  mobilePanel = true,
  mobileHeadingInPanel = false,
  hideMobileSubtitle = false,
  onMobileEyebrowPress,
  mobilePanelVariant = 'light',
}: AuthShellProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#F3F5FA]"
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="min-h-screen md:justify-center md:px-8 md:py-8 lg:px-10"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full overflow-hidden bg-navy shadow-sm md:hidden">
          <ImageBackground
            source={{ uri: AUTH_IMAGE }}
            resizeMode="cover"
            className="min-h-screen justify-end px-5 py-6"
          >
            <LinearGradient
              colors={[
                'rgba(7,12,22,0.42)',
                'rgba(7,12,22,0.68)',
                'rgba(7,12,22,0.97)',
              ]}
              locations={[0, 0.48, 1]}
              pointerEvents="none"
              style={styles.gradientOverlay}
            />

            <View className={`relative z-10 ${mobileHeadingInPanel ? 'mb-5' : 'mb-8'}`}>
              <BrandMark inverse />
              {onMobileEyebrowPress ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Change from ${eyebrow}`}
                  onPress={onMobileEyebrowPress}
                  className={`${mobileHeadingInPanel ? 'mt-6' : 'mt-10'} flex-row items-center gap-2 self-start rounded-full border border-white/30 bg-black/25 px-4 py-2 active:bg-black/40`}
                >
                  <Text className="text-[12.5px] font-inter-bold text-white">{eyebrow}</Text>
                  <View className="h-4 w-px bg-white/30" />
                  <AppIcon name="swap-horizontal-outline" size={15} color="#FFFFFF" />
                  <Text className="text-[12px] font-inter-bold text-white">Change</Text>
                </Pressable>
              ) : (
                <View
                  className={`${mobileHeadingInPanel ? 'mt-6' : 'mt-10'} self-start rounded-full border border-white/20 bg-white/15 px-4 py-2`}
                >
                  <Text className="text-[12.5px] font-inter-bold text-white">{eyebrow}</Text>
                </View>
              )}
              {!mobileHeadingInPanel && (
                <>
                  <Text className="mt-4 max-w-[330px] font-manrope-extraBold text-[42px] leading-tight text-white">
                    {title}
                  </Text>
                  <Text
                    className="mt-3 max-w-[330px] text-[15px] leading-6"
                    style={{ color: 'rgba(255,255,255,0.82)' }}
                  >
                    {subtitle}
                  </Text>
                </>
              )}
            </View>

            {mobilePanel ? (
              <BlurView
                intensity={64}
                tint={mobilePanelVariant === 'glass' ? 'dark' : 'light'}
                style={[
                  styles.mobileGlassPanel,
                  mobilePanelVariant === 'glass'
                    ? styles.mobileGlassPanelDark
                    : styles.mobileGlassPanelLight,
                ]}
              >
                {mobileHeadingInPanel && (
                  <View className={hideMobileSubtitle ? 'mb-4' : 'mb-5'}>
                    <Text
                      className={`font-manrope-extraBold text-[28px] leading-9 ${mobilePanelVariant === 'glass' ? 'text-white' : 'text-ink'}`}
                    >
                      {title}
                    </Text>
                    {!hideMobileSubtitle && (
                      <Text
                        className={`mt-2 text-[14px] leading-5 ${mobilePanelVariant === 'glass' ? 'text-white/75' : 'text-gray-body'}`}
                      >
                        {subtitle}
                      </Text>
                    )}
                  </View>
                )}
                {children}
              </BlurView>
            ) : (
              <View className="relative z-10">{children}</View>
            )}
          </ImageBackground>
        </View>

        <View className="mx-auto hidden w-full max-w-[1120px] overflow-hidden rounded-[28px] border border-border bg-white shadow-sm md:min-h-[700px] md:flex md:flex-row">
          <View className="hidden flex-1 overflow-hidden md:flex">
            <ImageBackground
              source={{ uri: AUTH_IMAGE }}
              resizeMode="cover"
              className="flex-1 justify-between p-8"
            >
              <LinearGradient
                colors={['rgba(11,18,32,0.2)', 'rgba(11,18,32,0.72)', 'rgba(65,13,43,0.92)']}
                pointerEvents="none"
                style={styles.gradientOverlay}
              />

              <View className="relative z-10">
                <BrandMark inverse />
              </View>

              <View className="relative z-10">
                <View className="mb-4 self-start rounded-full border border-white/25 bg-white/15 px-4 py-2">
                  <Text className="text-[13px] font-inter-bold text-white">{eyebrow}</Text>
                </View>
                <Text className="max-w-[430px] font-manrope-extraBold text-[42px] leading-tight text-white">
                  Hire confidently. Work moves safely.
                </Text>
                <Text className="mt-4 max-w-[430px] text-[15px] leading-6 text-white/78">
                  SkillNest pairs verified talent with escrow-backed projects, clear milestones,
                  and a smoother way to get creative work delivered.
                </Text>

                <View className="mt-7 flex-row gap-3">
                  <TrustPill icon="shield-checkmark-outline" label="Verified talent" />
                  <TrustPill icon="lock-closed-outline" label="Escrow protected" />
                </View>
              </View>

              <View className="relative z-10 flex-row gap-3">
                <Metric value="12k+" label="verified pros" />
                <Metric value="$2.4M" label="monthly escrow" />
                <Metric value="98%" label="on-time" />
              </View>
            </ImageBackground>
          </View>

          <View className="w-full justify-center px-5 py-8 sm:px-8 md:w-[470px] lg:w-[520px]">
            <View>
              <BrandMark />
            </View>

            <View className="mt-8">
              <Text className="font-manrope-extraBold text-[32px] leading-tight text-ink">
                {title}
              </Text>
              <Text className="mt-2 text-[15px] leading-6 text-gray-body">{subtitle}</Text>
            </View>

            <View className="mt-8">{children}</View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export function AuthField({ label, icon, mobileGlass = false, className = '', ...props }: AuthFieldProps) {
  return (
    <View className={`mb-4 ${className}`}>
      <Text
        className={`mb-2 font-inter-bold text-[13px] ${mobileGlass ? 'text-white md:text-ink' : 'text-ink'}`}
      >
        {label}
      </Text>
      <View
        className={`h-[54px] flex-row items-center gap-3 rounded-[14px] border px-4 focus:border-pink ${
          mobileGlass
            ? 'border-white/25 bg-white/10 md:border-border md:bg-white'
            : 'border-border bg-white'
        }`}
      >
        <AppIcon name={icon} size={19} color={mobileGlass ? '#CFD7E4' : '#93A0B4'} />
        <TextInput
          className={`h-full flex-1 text-[15px] outline-none ${mobileGlass ? 'text-white md:text-ink' : 'text-ink'}`}
          placeholderTextColor={mobileGlass ? '#B8C2D1' : '#93A0B4'}
          {...props}
        />
      </View>
    </View>
  );
}

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <View className="flex-row items-center gap-3">
      <View className="h-10 w-10 items-center justify-center rounded-[12px] bg-pink">
        <Text className="font-manrope-extraBold text-[18px] text-white">S</Text>
      </View>
      <View>
        <Text className={`font-manrope-extraBold text-[21px] ${inverse ? 'text-white' : 'text-ink'}`}>
          SkillNest
        </Text>
        <Text className={`text-[12px] ${inverse ? 'text-white/65' : 'text-gray-muted'}`}>
          Micro-skill marketplace
        </Text>
      </View>
    </View>
  );
}

function TrustPill({ icon, label }: { icon: AppIconName; label: string }) {
  return (
    <View className="flex-row items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-2">
      <AppIcon name={icon} size={16} color="#FFFFFF" />
      <Text className="text-[12.5px] font-inter-bold text-white">{label}</Text>
    </View>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <View className="flex-1 rounded-[16px] border border-white/15 bg-white/12 p-4">
      <Text className="font-manrope-extraBold text-[22px] text-white">{value}</Text>
      <Text className="mt-1 text-[11px] uppercase tracking-wide text-white/62">{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  mobileGlassPanel: {
    position: 'relative',
    zIndex: 10,
    overflow: 'hidden',
    padding: 20,
    borderWidth: 1,
    borderRadius: 26,
  },
  mobileGlassPanelLight: {
    borderColor: 'rgba(255,255,255,0.48)',
    backgroundColor: 'rgba(255,255,255,0.64)',
  },
  mobileGlassPanelDark: {
    borderColor: 'rgba(255,255,255,0.24)',
    backgroundColor: 'rgba(8,15,28,0.5)',
  },
});
