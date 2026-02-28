'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Letter.module.css';
import { GiftContent, ThemeColors } from '@/types';

interface LetterProps {
  content: GiftContent;
  colors: ThemeColors;
  show: boolean;
  onClose: () => void;
}

export default function Letter({ content, colors, show, onClose }: LetterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.container}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {!isOpen ? (
            <motion.div
              className={styles.letterWrapper}
              onClick={handleClick}
              animate={{ y: [-5, 5, -5], rotate: [-1, 1, -1] }}
              transition={{ duration: 3, repeat: Infinity }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.letter} style={{ borderColor: colors.primary }}>
                <div className={styles.seal} style={{ background: colors.primary }}>
                  💌
                </div>
                <div className={styles.lines}>
                  <div className={styles.line} style={{ background: `${colors.primary}40` }}></div>
                  <div className={styles.line} style={{ background: `${colors.primary}30` }}></div>
                  <div className={styles.line} style={{ background: `${colors.primary}20` }}></div>
                </div>
                <div className={styles.heart} style={{ color: colors.primary }}>♥</div>
              </div>
              <div className={styles.tapHint}>Tap to read 💌</div>
            </motion.div>
          ) : (
            <motion.div
              className={styles.card}
              initial={{ scale: 0.3, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <button className={styles.closeButton} onClick={handleClose} style={{ background: colors.primary }}>×</button>
              
              <div className={styles.cardEmoji}>💌</div>
              
              <div className={styles.cardHeader}>
                <h1 style={{ color: colors.primary }}>{content.title}</h1>
                <div className={styles.hearts} style={{ color: colors.primary }}>♥ ♥ ♥</div>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardTo} style={{ color: colors.primary }}>
                  Dearest {content.recipientName},
                </div>

                <div className={styles.cardBody} style={{ color: colors.text }}>
                  {content.message}
                </div>

                {(content.venue || content.date || content.time) && (
                  <div className={styles.details} style={{ borderColor: `${colors.primary}30` }}>
                    {content.venue && <div className={styles.venue} style={{ color: colors.primary }}>📍 {content.venue}</div>}
                    {content.date && <div className={styles.date}>📅 {content.date}</div>}
                    {content.time && <div className={styles.time}>⏰ {content.time}</div>}
                  </div>
                )}

                <div className={styles.cardFrom}>
                  With all my love,
                  <span className={styles.name} style={{ color: colors.primary }}>{content.senderName} 💕</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
