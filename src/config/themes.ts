import { ThemeType, ThemeConfig } from '@/types';

export const themes: Record<ThemeType, ThemeConfig> = {
  valentine: {
    name: "Valentine's Day",
    emoji: '💕',
    colors: {
      primary: '#e75480',
      secondary: '#ff758c',
      background: '#ffeef8',
      backgroundGradient: 'linear-gradient(135deg, #ffeef8 0%, #fff5f8 50%, #ffe6f0 100%)',
      accent: '#ff7eb3',
      text: '#4a3f55',
      textLight: '#8a7a6a',
    },
    floatingEmojis: ['💗', '💕', '💖', '💓', '🤍'],
  },
  birthday: {
    name: 'Birthday',
    emoji: '🎂',
    colors: {
      primary: '#ff6b6b',
      secondary: '#ffd93d',
      background: '#fff5e6',
      backgroundGradient: 'linear-gradient(135deg, #fff5e6 0%, #ffe8f0 50%, #f0e6ff 100%)',
      accent: '#6bcb77',
      text: '#4a4a4a',
      textLight: '#7a7a7a',
    },
    floatingEmojis: ['🎈', '🎉', '🎊', '🎁', '⭐'],
  },
  anniversary: {
    name: 'Anniversary',
    emoji: '💍',
    colors: {
      primary: '#d4af37',
      secondary: '#c9a227',
      background: '#fdf8e6',
      backgroundGradient: 'linear-gradient(135deg, #fdf8e6 0%, #fff5f0 50%, #f5e6d3 100%)',
      accent: '#e8b4b8',
      text: '#4a4035',
      textLight: '#8a7a6a',
    },
    floatingEmojis: ['💝', '✨', '🌹', '💫', '🥂'],
  },
  christmas: {
    name: 'Christmas',
    emoji: '🎄',
    colors: {
      primary: '#c41e3a',
      secondary: '#228b22',
      background: '#f5fff5',
      backgroundGradient: 'linear-gradient(135deg, #f5fff5 0%, #fff5f5 50%, #f0fff0 100%)',
      accent: '#ffd700',
      text: '#2d4a2d',
      textLight: '#5a7a5a',
    },
    floatingEmojis: ['❄️', '🎄', '⭐', '🎁', '🔔'],
  },
  custom: {
    name: 'Custom',
    emoji: '✨',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      background: '#f5f3ff',
      backgroundGradient: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #e0e7ff 100%)',
      accent: '#a78bfa',
      text: '#3b3655',
      textLight: '#6b6580',
    },
    floatingEmojis: ['✨', '💫', '⭐', '🌟', '💜'],
  },
};

export const getTheme = (themeType: ThemeType): ThemeConfig => {
  return themes[themeType] || themes.valentine;
};

/**
 * Derive a full ThemeConfig from a single hex color.
 * Used when the custom theme has a user-chosen color.
 */
export function buildCustomTheme(hex: string): ThemeConfig {
  // Convert hex to HSL for palette generation
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  const hDeg = Math.round(h * 360);
  const sPct = Math.round(s * 100);
  const lPct = Math.round(l * 100);

  const hsl = (hh: number, ss: number, ll: number) =>
    `hsl(${((hh % 360) + 360) % 360}, ${ss}%, ${ll}%)`;

  return {
    ...themes.custom,
    colors: {
      primary: hex,
      secondary: hsl(hDeg + 15, Math.min(sPct + 10, 90), Math.min(lPct + 8, 65)),
      background: hsl(hDeg, Math.min(sPct, 30), 97),
      backgroundGradient: `linear-gradient(135deg, ${hsl(hDeg, Math.min(sPct, 30), 97)} 0%, ${hsl(hDeg + 10, Math.min(sPct, 25), 95)} 50%, ${hsl(hDeg - 10, Math.min(sPct, 25), 94)} 100%)`,
      accent: hsl(hDeg + 30, Math.min(sPct + 5, 85), Math.min(lPct + 12, 70)),
      text: hsl(hDeg, Math.min(sPct, 20), 25),
      textLight: hsl(hDeg, Math.min(sPct, 15), 45),
    },
  };
}
