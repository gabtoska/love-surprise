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

            {/* Tap hint */}
            {!isOpen && <div className={styles.tapHint}>Tap to open</div>}
          </motion.div>

          {/* Letter – rendered outside the envelope so it centers properly */}
          <AnimatePresence>
            {showLetter && (
              <motion.div
                className={styles.letterOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
              >
                <motion.div
                  className={styles.letter}
                  initial={{ scale: 0.3, opacity: 0, y: 60 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.3, opacity: 0, y: 40 }}
                  transition={{ type: 'spring', damping: 22, stiffness: 260 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className={styles.closeButton} onClick={handleClose} style={{ background: colors.primary }}>✕</button>

                  {/* Top accent bar */}
                  <div className={styles.accentBar} style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary || colors.accent})` }} />

                  <div className={styles.letterHeader}>
                    <div className={styles.headerIcon} style={{ background: `${colors.primary}14`, color: colors.primary }}>💌</div>
                    <h1 style={{ color: colors.primary }}>{content.title}</h1>
                    <div className={styles.hearts} style={{ color: `${colors.primary}50` }}>─── ✦ ───</div>
                  </div>

                  <div className={styles.letterContent}>
                    <div className={styles.letterTo} style={{ color: colors.primary }}>
                      Dear {content.recipientName},
                    </div>

                    <div className={styles.letterBody} style={{ color: colors.text }}>
                      {content.message}
                    </div>

                    {(content.venue || content.date || content.time) && (
                      <div className={styles.invitationDetails} style={{ background: `${colors.primary}08`, borderColor: `${colors.primary}20` }}>
                        {content.venue && (
                          <div className={styles.detailLine}>
                            <span className={styles.detailIcon}>📍</span>
                            <span style={{ color: colors.text }}>{content.venue}</span>
                          </div>
                        )}
                        {content.date && (
                          <div className={styles.detailLine}>
                            <span className={styles.detailIcon}>📅</span>
                            <span style={{ color: colors.text }}>{content.date}</span>
                          </div>
                        )}
                        {content.time && (
                          <div className={styles.detailLine}>
                            <span className={styles.detailIcon}>🕐</span>
                            <span style={{ color: colors.text }}>{content.time}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className={styles.letterFrom}>
                      <span className={styles.closing} style={{ color: colors.textLight }}>With love,</span>
                      <span className={styles.name} style={{ color: colors.primary }}>{content.senderName}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
