/**
 * Official SkillNest category taxonomy — 15 categories.
 * Source of truth: docs/app-arrangement.md §3
 *
 * Import this anywhere categories are needed (onboarding pickers,
 * browse filters, category chips, etc.) so the list stays in sync.
 */
export interface Category {
  label: string;
  icon: string;
}

export const OFFICIAL_CATEGORIES: Category[] = [
  { icon: '🎥', label: 'Videography' },
  { icon: '✂️', label: 'Video Editing' },
  { icon: '📷', label: 'Photography' },
  { icon: '🎨', label: 'Graphic Design' },
  { icon: '🖥️', label: 'Web Design' },
  { icon: '💻', label: 'Software Development' },
  { icon: '✍️', label: 'Script Writing' },
  { icon: '📝', label: 'Copywriting' },
  { icon: '📱', label: 'UGC Creation' },
  { icon: '🎬', label: 'Animation' },
  { icon: '🎙️', label: 'Voice Over' },
  { icon: '📣', label: 'Social Media Management' },
  { icon: '📈', label: 'Digital Marketing' },
  { icon: '🗂️', label: 'Virtual Assistance' },
  { icon: '✨', label: 'Other Digital Skills' },
];

/** Flat array of just the label strings — handy for filter lists */
export const CATEGORY_LABELS = OFFICIAL_CATEGORIES.map(c => c.label);
