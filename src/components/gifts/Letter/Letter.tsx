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

  const handleClick = () => setIsOpen(true);
  const handleClose = () => { setIsOpen(false); onClose(); };

  const hasDetails = content.venue || content.date || content.time;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => { if (e.target === e.currentTarget && isOpen) handleClose(); }}
        >
          {!isOpen ? (
            /* ── Closed sealed envelope ── */
            <motion.div
              className={styles.envelopeScene}
              onClick={handleClick}
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className={styles.envelope} style={{ '--c-primary': colors.primary, '--c-secondary': colors.secondary } as React.CSSProperties}>
                {/* Main envelope body */}
                <div className={styles.envelopeBody} />
                {/* Bottom stripe decoration */}
                <div className={styles.envelopeStripe} />
                {/* Flap folded DOWN (closed) */}
                <div className={styles.flap} />
                {/* Inner shadow where flap meets body */}
                <div className={styles.flapShadow} />
                {/* Wax seal on top of the flap */}
                <div className={styles.waxSeal} style={{ background: colors.primary, boxShadow: `0 4px 18px ${colors.primary}55` }}>
                  <span className={styles.sealIcon}>♥</span>
                </div>
              </div>
              <motion.p
                className={styles.tapHint}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Tap to open 💌
              </motion.p>
            </motion.div>
          ) : (
            /* ── Opened letter card ── */
            <motion.div
              className={styles.cardWrap}
              initial={{ scale: 0.4, opacity: 0, y: 60 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.4, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            >
              <div className={styles.card}>
                {/* Close button */}
                <button
                  className={styles.closeBtn}
                  onClick={handleClose}
                  style={{ background: colors.primary }}
                >
                  ✕
                </button>

                {/* Top accent bar */}
                <div className={styles.accentBar} style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary || colors.accent})` }} />

                {/* Header area */}
                <header className={styles.header}>
                  <motion.div
                    className={styles.headerIcon}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.25, type: 'spring', stiffness: 400, damping: 12 }}
                    style={{ background: `${colors.primary}14`, color: colors.primary }}
                  >
                    💌
                  </motion.div>
                  <h1 className={styles.title} style={{ color: colors.primary }}>
                    {content.title}
                  </h1>
                  <div className={styles.ornament} style={{ color: `${colors.primary}50` }}>
                    ─── ✦ ───
                  </div>
                </header>

                {/* Body */}
                <div className={styles.body}>
                  <p className={styles.greeting} style={{ color: colors.primary }}>
                    Dear {content.recipientName},
                  </p>

                  <div className={styles.message} style={{ color: colors.text }}>
                    {content.message}
                  </div>

                  {/* Details card */}
                  {hasDetails && (
                    <motion.div
                      className={styles.details}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      style={{ background: `${colors.primary}08`, borderColor: `${colors.primary}20` }}
                    >
                      {content.venue && (
                        <div className={styles.detailRow}>
                          <span className={styles.detailIcon}>📍</span>
                          <span style={{ color: colors.text }}>{content.venue}</span>
                        </div>
                      )}
                      {content.date && (
                        <div className={styles.detailRow}>
                          <span className={styles.detailIcon}>📅</span>
                          <span style={{ color: colors.text }}>{content.date}</span>
                        </div>
                      )}
                      {content.time && (
                        <div className={styles.detailRow}>
                          <span className={styles.detailIcon}>🕐</span>
                          <span style={{ color: colors.text }}>{content.time}</span>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Sign-off */}
                  <div className={styles.signoff}>
                    <span className={styles.closing} style={{ color: colors.textLight }}>With love,</span>
                    <span className={styles.sender} style={{ color: colors.primary }}>
                      {content.senderName}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
