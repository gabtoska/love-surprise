'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Cake.module.css';
import { GiftContent, ThemeColors } from '@/types';

interface CakeProps {
  content: GiftContent;
  colors: ThemeColors;
  show: boolean;
  onClose: () => void;
}

export default function Cake({ content, colors, show, onClose }: CakeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);

  const handleClick = () => {
    if (!candlesBlown) {
      setCandlesBlown(true);
      setTimeout(() => setIsOpen(true), 1000);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setCandlesBlown(false);
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
              className={styles.cakeWrapper}
              onClick={handleClick}
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className={styles.cake}>
                {/* Candles */}
                <div className={styles.candles}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} className={styles.candle}>
                      <motion.div
                        className={styles.flame}
                        animate={candlesBlown ? { scale: 0, opacity: 0 } : { scale: [1, 1.2, 1], rotate: [-5, 5, -5] }}
                        transition={{ duration: candlesBlown ? 0.3 : 0.5, repeat: candlesBlown ? 0 : Infinity }}
                        style={{ background: `linear-gradient(to top, ${colors.primary}, #ffd700, #fff)` }}
                      />
                    </div>
                  ))}
                </div>

                {/* Top layer */}
                <div className={styles.layer} style={{ background: colors.secondary }}>
                  <div className={styles.frosting} style={{ borderBottomColor: colors.primary }}></div>
                  <div className={styles.sprinkles}>
                    <div className={styles.sprinkle} style={{ background: colors.primary }}></div>
                    <div className={styles.sprinkle} style={{ background: colors.accent }}></div>
                    <div className={styles.sprinkle} style={{ background: '#fff' }}></div>
                    <div className={styles.sprinkle} style={{ background: colors.primary }}></div>
                  </div>
                </div>

                {/* Middle layer */}
                <div className={styles.layerMiddle} style={{ background: colors.primary }}>
                  <div className={styles.frostingMiddle} style={{ borderBottomColor: colors.secondary }}></div>
                </div>

                {/* Bottom layer */}
                <div className={styles.layerBottom} style={{ background: colors.secondary }}>
                  <div className={styles.frostingBottom} style={{ borderBottomColor: colors.primary }}></div>
                </div>

                {/* Plate */}
                <div className={styles.plate}></div>
              </div>
              
              <div className={styles.tapHint}>
                {candlesBlown ? 'Make a wish! ✨' : 'Blow the candles! 🎂'}
              </div>
            </motion.div>
          ) : (
            <motion.div
              className={styles.card}
              initial={{ scale: 0.3, opacity: 0, rotateY: 180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <button className={styles.closeButton} onClick={handleClose}>×</button>
              
              <div className={styles.cardEmoji}>🎂</div>
              
              <div className={styles.cardHeader}>
                <h1 style={{ color: colors.primary }}>{content.title}</h1>
                <div className={styles.sparkles}>✨ 🎉 ✨</div>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardTo} style={{ color: colors.primary }}>
                  For {content.recipientName}
                </div>

                <div className={styles.cardBody} style={{ color: colors.primary }}>
                  {content.message}
                </div>

                {(content.venue || content.date || content.time) && (
                  <div className={styles.details}>
                    {content.venue && <div className={styles.venue} style={{ color: colors.primary }}>📍 {content.venue}</div>}
                    {content.date && <div className={styles.date}>📅 {content.date}</div>}
                    {content.time && <div className={styles.time}>⏰ {content.time}</div>}
                  </div>
                )}

                <div className={styles.cardFrom}>
                  With love,
                  <span className={styles.name} style={{ color: colors.primary }}>{content.senderName} 🎈</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
