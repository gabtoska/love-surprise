'use client';

import { GiftType, GiftContent, ThemeColors } from '@/types';
import Envelope from './Envelope/Envelope';
import Flowers from './Flowers/Flowers';
import Cake from './Cake/Cake';
import RingBox from './RingBox/RingBox';
import Letter from './Letter/Letter';
import Puzzle from './Puzzle/Puzzle';

interface GiftProps {
  type: GiftType;
  content: GiftContent;
  colors: ThemeColors;
  show: boolean;
  onClose: () => void;
  puzzleImage?: string;
  puzzleGrid?: number;
}

export default function Gift({ type, content, colors, show, onClose, puzzleImage, puzzleGrid }: GiftProps) {
  const commonProps = {
    content,
    colors,
    show,
    onClose,
  };

  switch (type) {
    case 'flowers':
      return <Flowers {...commonProps} />;
    case 'cake':
      return <Cake {...commonProps} />;
    case 'ring':
      return <RingBox {...commonProps} />;
    case 'letter':
      return <Letter {...commonProps} />;
    case 'puzzle':
      return <Puzzle {...commonProps} image={puzzleImage || ''} grid={puzzleGrid || 4} />;
    case 'envelope':
    default:
      return <Envelope {...commonProps} />;
  }
}

export { Envelope, Flowers, Cake, RingBox, Letter, Puzzle };
