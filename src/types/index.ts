// Pet types
export type PetType = 'penguin' | 'cat' | 'dog' | 'bird';

// Theme types
export type ThemeType = 'valentine' | 'birthday' | 'anniversary' | 'christmas' | 'proposal';

// Gift types
export type GiftType = 'letter' | 'flowers' | 'envelope' | 'cake' | 'ring';

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
