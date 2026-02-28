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
  proposal: {
    name: 'Proposal',
    emoji: '💎',
    colors: {
      primary: '#9b59b6',
      secondary: '#e91e63',
      background: '#f8f0ff',
      backgroundGradient: 'linear-gradient(135deg, #f8f0ff 0%, #fff0f5 50%, #f0f0ff 100%)',
      accent: '#00bcd4',
      text: '#4a3f55',
      textLight: '#7a6a8a',
    },
    floatingEmojis: ['💎', '💍', '✨', '💕', '🌟'],
  },
};

export const getTheme = (themeType: ThemeType): ThemeConfig => {
  return themes[themeType] || themes.valentine;
};
