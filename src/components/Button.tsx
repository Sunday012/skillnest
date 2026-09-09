import React from 'react';
import { Pressable, Text, ActivityIndicator, Platform, ViewStyle } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'outline' | 'ghost' | 'outline-dark';
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
}

export function Button({
  onPress,
  title,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  className = '',
  textClassName = '',
}: ButtonProps) {
  const baseStyles = 'flex-row items-center justify-center rounded-[10px] py-[13px] px-6 active:scale-95';
  
  let variantStyles = '';
  let textStyles = 'font-bold text-[15px]';
  let shadowStyle: ViewStyle = {};

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-pink active:bg-pink-dark border-2 border-transparent';
      textStyles += ' text-white';
      shadowStyle = Platform.select({
        ios: {
          shadowColor: '#EC1257',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
        },
        android: {
          elevation: 4,
          shadowColor: '#EC1257',
        },
        default: {
          boxShadow: '0 8px 20px -8px rgba(236,18,87,.55)',
        }
      }) as ViewStyle;
      break;
    case 'outline':
      variantStyles = 'bg-white border-2 border-border';
      textStyles += ' text-ink';
      break;
    case 'outline-dark':
      variantStyles = 'bg-transparent border-2 border-white/30';
      textStyles += ' text-white';
      break;
    case 'ghost':
      variantStyles = 'bg-transparent active:bg-ink/5';
      textStyles += ' text-ink';
      break;
  }

  if (disabled) {
    variantStyles += ' opacity-50';
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles} ${className}`}
      style={shadowStyle}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' || variant === 'outline-dark' ? 'white' : '#10172A'} />
      ) : (
        <Text className={`${textStyles} ${textClassName}`}>{title}</Text>
      )}
    </Pressable>
  );
}
