// Pet types
export type PetType = 'penguin' | 'cat' | 'dog' | 'bird';

// Theme types
export type ThemeType = 'valentine' | 'birthday' | 'anniversary' | 'christmas' | 'custom';

// Gift types
export type GiftType = 'letter' | 'flowers' | 'envelope' | 'cake' | 'ring' | 'puzzle';

// Interaction messages
export interface InteractionMessages {
  question: string;
  yesButton: string;
  noButton: string;
  yesResponse: string;
  sadMessage: string;
  laughMessage: string;
}

// Gift content
export interface GiftContent {
  title: string;
  recipientName: string;
  message: string;
  venue?: string;
  date?: string;
  time?: string;
  senderName: string;
}

// Full surprise configuration
export interface SurpriseConfig {
  id?: string;
  pet: PetType;
  theme: ThemeType;
  gift: GiftType;
  messages: InteractionMessages;
  giftContent: GiftContent;
  puzzleImage?: string; // base64 data URL for puzzle
  puzzleGrid?: number; // 3, 4, or 5
  customColors?: { primary: string }; // user-chosen color for custom theme
  createdAt?: Date;
}

// Theme colors
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  backgroundGradient: string;
  accent: string;
  text: string;
  textLight: string;
}

// Theme configuration
export interface ThemeConfig {
  name: string;
  emoji: string;
  colors: ThemeColors;
  floatingEmojis: string[];
}

// Pet configuration
export interface PetConfig {
  name: string;
  emoji: string;
  holdingEmoji: string;
}

// Gift configuration
export interface GiftConfig {
  name: string;
  emoji: string;
  description: string;
}
