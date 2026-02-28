'use client';

import { useEffect, useState } from 'react';
import styles from './FloatingEmojis.module.css';

interface FloatingEmojisProps {
  emojis: string[];
  count?: number;
}

interface FloatingEmoji {
  id: number;
  emoji: string;
  left: number;
  animationDelay: number;
  animationDuration: number;
}

export default function FloatingEmojis({ emojis, count = 15 }: FloatingEmojisProps) {
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    const generated: FloatingEmoji[] = [];
    for (let i = 0; i < count; i++) {
      generated.push({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 100,
        animationDelay: Math.random() * 8,
        animationDuration: 6 + Math.random() * 4,
      });
    }
    setFloatingEmojis(generated);
  }, [emojis, count]);

  return (
    <div className={styles.container}>
      {floatingEmojis.map((item) => (
        <div
          key={item.id}
          className={styles.floatingEmoji}
          style={{
            left: `${item.left}%`,
            animationDelay: `${item.animationDelay}s`,
            animationDuration: `${item.animationDuration}s`,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}
