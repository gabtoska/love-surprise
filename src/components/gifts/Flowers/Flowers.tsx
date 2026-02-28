'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Flowers.module.css';
import { GiftContent, ThemeColors } from '@/types';

interface FlowersProps {
  content: GiftContent;
  colors: ThemeColors;
  show: boolean;
  onClose: () => void;
}

export default function Flowers({ content, colors, show, onClose }: FlowersProps) {
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
              className={styles.bouquet}
              onClick={handleClick}
              animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.wrapper}>
                <div className={styles.paper} style={{ background: `linear-gradient(135deg, ${colors.secondary}40 0%, ${colors.primary}30 100%)` }}>
                  <div className={styles.paperFold}></div>
                </div>
                <div className={styles.flowers}>
                  {/* Roses */}
                  <div className={styles.flower} style={{ '--delay': '0s' } as React.CSSProperties}>
                    <div className={styles.rose} style={{ background: colors.primary }}>
                      <div className={styles.rosePetal}></div>
                      <div className={styles.rosePetal}></div>
                      <div className={styles.rosePetal}></div>
                    </div>
                    <div className={styles.stem}></div>
                  </div>
                  <div className={styles.flower} style={{ '--delay': '0.2s' } as React.CSSProperties}>
                    <div className={styles.rose} style={{ background: colors.secondary }}>
                      <div className={styles.rosePetal}></div>
                      <div className={styles.rosePetal}></div>
                      <div className={styles.rosePetal}></div>
                    </div>
                    <div className={styles.stem}></div>
                  </div>
                  <div className={styles.flower} style={{ '--delay': '0.4s' } as React.CSSProperties}>
                    <div className={styles.rose} style={{ background: colors.primary }}>
                      <div className={styles.rosePetal}></div>
                      <div className={styles.rosePetal}></div>
                      <div className={styles.rosePetal}></div>
                    </div>
                    <div className={styles.stem}></div>
                  </div>
                  <div className={styles.flower} style={{ '--delay': '0.3s' } as React.CSSProperties}>
                    <div className={styles.rose} style={{ background: colors.accent }}>
                      <div className={styles.rosePetal}></div>
                      <div className={styles.rosePetal}></div>
                      <div className={styles.rosePetal}></div>
                    </div>
                    <div className={styles.stem}></div>
                  </div>
                  <div className={styles.flower} style={{ '--delay': '0.1s' } as React.CSSProperties}>
                    <div className={styles.rose} style={{ background: colors.secondary }}>
                      <div className={styles.rosePetal}></div>
                      <div className={styles.rosePetal}></div>
                      <div className={styles.rosePetal}></div>
                    </div>
                    <div className={styles.stem}></div>
                  </div>
                </div>
                <div className={styles.ribbon} style={{ background: colors.primary }}>
                  <div className={styles.bow}></div>
                </div>
              </div>
              <div className={styles.tapHint}>Tap the bouquet 💐</div>
            </motion.div>
          ) : (
            <motion.div
              className={styles.card}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <button className={styles.closeButton} onClick={handleClose}>×</button>
              
              <div className={styles.cardEmoji}>💐</div>
              
              <div className={styles.cardHeader}>
                <h1 style={{ color: colors.primary }}>{content.title}</h1>
                <div className={styles.hearts} style={{ color: colors.primary }}>🌹 🌷 🌸</div>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardTo} style={{ color: colors.primary }}>
                  For {content.recipientName}
                </div>

                <div className={styles.cardBody} style={{ color: colors.primary }}>
                  {content.message}
                </div>

                <div className={styles.cardFrom}>
                  With love,
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
