'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './RingBox.module.css';
import { GiftContent, ThemeColors } from '@/types';

interface RingBoxProps {
  content: GiftContent;
  colors: ThemeColors;
  show: boolean;
  onClose: () => void;
}

export default function RingBox({ content, colors, show, onClose }: RingBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => setShowCard(true), 1500);
    }
  };

  const handleClose = () => {
    setShowCard(false);
    setTimeout(() => {
      setIsOpen(false);
      onClose();
    }, 300);
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
          {!showCard ? (
            <motion.div
              className={styles.boxWrapper}
              onClick={handleClick}
              animate={isOpen ? {} : { y: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: isOpen ? 0 : Infinity }}
            >
              <div className={`${styles.box} ${isOpen ? styles.open : ''}`}>
                {/* Box lid */}
                <motion.div
                  className={styles.lid}
                  style={{ background: `linear-gradient(135deg, ${colors.primary}dd 0%, ${colors.primary} 100%)` }}
                  animate={isOpen ? { rotateX: -130 } : {}}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <div className={styles.lidInner}></div>
                  <div className={styles.goldTrim}></div>
                </motion.div>

                {/* Box base */}
                <div
                  className={styles.base}
                  style={{ background: `linear-gradient(135deg, ${colors.primary}dd 0%, ${colors.primary} 100%)` }}
                >
                  <div className={styles.velvet}></div>
                  
                  {/* Ring */}
                  <motion.div
                    className={styles.ringHolder}
                    animate={isOpen ? { y: -20, scale: 1.1 } : {}}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <div className={styles.ring}>
                      <div className={styles.diamond}>
                        <motion.div
                          className={styles.sparkle}
                          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          ✨
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <div className={styles.tapHint}>
                {isOpen ? 'A moment to remember... 💎' : 'Tap to open 💍'}
              </div>
            </motion.div>
          ) : (
            <motion.div
              className={styles.card}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <button className={styles.closeButton} onClick={handleClose}>×</button>
              
              <motion.div
                className={styles.cardEmoji}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💍
              </motion.div>
              
              <div className={styles.cardHeader}>
                <h1 style={{ color: colors.primary }}>{content.title}</h1>
                <div className={styles.sparkles}>💎 ✨ 💎</div>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardTo} style={{ color: colors.primary }}>
                  {content.recipientName}
                </div>

                <div className={styles.cardBody} style={{ color: colors.primary }}>
                  {content.message}
                </div>

                <div className={styles.cardFrom}>
                  Forever yours,
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
