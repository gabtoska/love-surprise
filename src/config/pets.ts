import { PetType, PetConfig } from '@/types';

export const pets: Record<PetType, PetConfig> = {
  penguin: {
    name: 'Penguin',
    emoji: '🐧',
    holdingEmoji: '💕',
  },
  cat: {
    name: 'Cat',
    emoji: '🐱',
    holdingEmoji: '💝',
  },
  dog: {
    name: 'Dog',
    emoji: '🐶',
    holdingEmoji: '💖',
  },
  bird: {
    name: 'Bird',
    emoji: '🐦',
    holdingEmoji: '💗',
  },
};

export const getPet = (petType: PetType): PetConfig => {
  return pets[petType] || pets.penguin;
};
