'use client';

import { useEffect, useState } from 'react';
import styles from './Confetti.module.css';

interface ConfettiProps {
  show: boolean;
  colors?: string[];
}

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  isRound: boolean;
}

export default function Confetti({ 
  show, 
  colors = ['#ff758c', '#ff7eb3', '#ffd1dc', '#ffb3ba', '#ff6b6b', '#ffa07a']
}: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (show) {
      const generated: ConfettiPiece[] = [];
      for (let i = 0; i < 100; i++) {
        generated.push({
          id: i,
          left: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 2,
          isRound: Math.random() > 0.5,
        });
      }
      setPieces(generated);
    }
  }, [show, colors]);

  if (!show) return null;

  return (
    <div className={styles.container}>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={styles.piece}
          style={{
            left: `${piece.left}%`,
            background: piece.color,
            animationDelay: `${piece.delay}s`,
            borderRadius: piece.isRound ? '50%' : '0',
          }}
        />
      ))}
    </div>
  );
}
