import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import type { ColorValue } from 'react-native';

export type AppIconName = ComponentProps<typeof Ionicons>['name'];

interface AppIconProps {
  name: AppIconName;
  size?: number;
  color?: ColorValue;
}

export function AppIcon({ name, size = 20, color = '#10172A' }: AppIconProps) {
  return <Ionicons name={name} size={size} color={color} />;
}
