'use client';

import { PetType } from '@/types';
import Penguin from './Penguin/Penguin';
import Cat from './Cat/Cat';
import Dog from './Dog/Dog';
import Bird from './Bird/Bird';

interface PetProps {
  type: PetType;
  isHappy?: boolean;
  isSad?: boolean;
  isLaughing?: boolean;
  holdingEmoji?: string;
  themeColor?: string;
  onClick?: () => void;
}

export default function Pet({
  type,
  isHappy = false,
  isSad = false,
  isLaughing = false,
  holdingEmoji,
  themeColor,
  onClick,
}: PetProps) {
  const commonProps = {
    isHappy,
    isSad,
    isLaughing,
    holdingEmoji,
    themeColor,
  };

  const renderPet = () => {
    switch (type) {
      case 'cat':
        return <Cat {...commonProps} />;
      case 'dog':
        return <Dog {...commonProps} />;
      case 'bird':
        return <Bird {...commonProps} />;
      case 'penguin':
      default:
        return <Penguin {...commonProps} />;
    }
  };

  return (
    <div onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      {renderPet()}
    </div>
  );
}

export { Penguin, Cat, Dog, Bird };
