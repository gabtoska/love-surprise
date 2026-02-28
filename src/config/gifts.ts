import { GiftType, GiftConfig } from '@/types';

export const gifts: Record<GiftType, GiftConfig> = {
  letter: {
    name: 'Love Letter',
    emoji: '💌',
    description: 'A beautiful handwritten love letter',
  },
  flowers: {
    name: 'Flowers',
    emoji: '💐',
    description: 'A gorgeous bouquet of flowers',
  },
  envelope: {
    name: 'Special Envelope',
    emoji: '✉️',
    description: 'An elegant invitation envelope',
  },
  cake: {
    name: 'Cake',
    emoji: '🎂',
    description: 'A delicious celebration cake',
  },
  ring: {
    name: 'Ring Box',
    emoji: '💍',
    description: 'A precious ring in a velvet box',
  },
  puzzle: {
    name: 'Photo Puzzle',
    emoji: '🧩',
    description: 'Upload a photo that becomes a puzzle',
  },
};

export const getGift = (giftType: GiftType): GiftConfig => {
  return gifts[giftType] || gifts.envelope;
};
