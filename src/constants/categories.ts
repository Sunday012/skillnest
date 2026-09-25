import type { AppIconName } from '../components/AppIcon';

/**
 * Official SkillNest category taxonomy — 15 categories.
 * Source of truth: docs/app-arrangement.md §3
 *
 * Import this anywhere categories are needed (onboarding pickers,
 * browse filters, category chips, etc.) so the list stays in sync.
 */
export interface Category {
  label: string;
  icon: AppIconName;
}

export const OFFICIAL_CATEGORIES: Category[] = [
  { icon: 'videocam-outline', label: 'Videography' },
  { icon: 'cut-outline', label: 'Video Editing' },
  { icon: 'camera-outline', label: 'Photo Editing' },
  { icon: 'color-palette-outline', label: 'Graphic Design' },
  { icon: 'desktop-outline', label: 'Web Design' },
  { icon: 'code-slash-outline', label: 'Software Development' },
  { icon: 'create-outline', label: 'Script Writing' },
  { icon: 'document-text-outline', label: 'Copywriting' },
  { icon: 'phone-portrait-outline', label: 'UGC Creation' },
  { icon: 'film-outline', label: 'Animation' },
  { icon: 'mic-outline', label: 'Voice Over' },
  { icon: 'megaphone-outline', label: 'Social Media Management' },
  { icon: 'trending-up-outline', label: 'Digital Marketing' },
  { icon: 'folder-open-outline', label: 'Virtual Assistance' },
  { icon: 'sparkles-outline', label: 'Other Digital Skills' },
];

/** Flat array of just the label strings — handy for filter lists */
export const CATEGORY_LABELS = OFFICIAL_CATEGORIES.map(c => c.label);
