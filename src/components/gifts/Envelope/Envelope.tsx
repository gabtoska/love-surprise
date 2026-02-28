'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Envelope.module.css';
import { GiftContent, ThemeColors } from '@/types';

interface EnvelopeProps {
  content: GiftContent;
  colors: ThemeColors;
  show: boolean;
  onClose: () => void;
}

export default function Envelope({ content, colors, show, onClose }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => setShowLetter(true), 400);
    }
  };

  const handleClose = () => {
    setShowLetter(false);
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
          animate={{ opacity: 1, background: isOpen ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.5)' }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`${styles.envelope} ${isOpen ? styles.open : ''}`}
            onClick={handleEnvelopeClick}
            animate={isOpen ? {} : { y: [-10, 8, -10] }}
            transition={{ duration: 2, repeat: isOpen ? 0 : Infinity }}
          >
            {/* Decorative hearts */}
            <span className={styles.sideHeart}>💕</span>
            <span className={styles.sideHeartRight}>💕</span>

            {/* Envelope back */}
            <div className={styles.envelopeBack}>
              <div className={styles.layerAccent} style={{ background: `linear-gradient(to right, transparent 0%, ${colors.primary}40 25%, ${colors.primary}40 75%, transparent 100%)` }}>
                <span className={styles.centerHeart}>💕</span>
              </div>
            </div>

            {/* Wax seal */}
            <motion.div
              className={styles.waxSeal}
              style={{
                background: `radial-gradient(circle at 35% 35%, ${colors.secondary} 0%, ${colors.primary} 30%, ${colors.primary}dd 60%, ${colors.primary}aa 100%)`,
              }}
              whileHover={{ scale: 1.08 }}
            >
              💕
            </motion.div>

            {/* Envelope flap */}
            <motion.div
              className={styles.envelopeFlap}
              style={{ borderTopColor: colors.primary }}
              animate={isOpen ? { rotateX: -180 } : {}}
              transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
            />

            {/* Letter */}
            <AnimatePresence>
              {showLetter && (
                <motion.div
                  className={styles.letter}
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.3, opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className={styles.closeButton} onClick={handleClose}>×</button>
                  
                  <div className={styles.letterHeader}>
                    <h1 style={{ color: colors.primary }}>{content.title}</h1>
                    <div className={styles.hearts} style={{ color: colors.primary }}>♥ ♥ ♥</div>
                  </div>

                  <div className={styles.letterContent}>
                    <div className={styles.letterTo} style={{ color: colors.primary }}>
                      For {content.recipientName}
                    </div>

                    <div className={styles.letterBody} style={{ color: colors.primary, background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.secondary}10 100%)` }}>
                      {content.message}
                    </div>

                    {(content.venue || content.date || content.time) && (
                      <div className={styles.invitationDetails}>
                        {content.venue && (
                          <div className={styles.venueName} style={{ color: colors.primary }}>~ {content.venue} ~</div>
                        )}
                        {content.date && (
                          <div className={styles.detailLine}>
                            <span className={styles.label}>Date:</span>
                            <span className={styles.value} style={{ color: colors.primary }}>{content.date}</span>
                          </div>
                        )}
                        {content.time && (
                          <div className={styles.detailLine}>
                            <span className={styles.label}>Time:</span>
                            <span className={styles.value} style={{ color: colors.primary }}>{content.time}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className={styles.letterFrom}>
                      With love,
                      <span className={styles.name} style={{ color: colors.primary }}>{content.senderName} 💕</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tap hint */}
            {!isOpen && <div className={styles.tapHint}>Tap to open</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
