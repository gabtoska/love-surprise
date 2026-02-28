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

/* Helper: generate flower positions in a dome layout */
const FLOWERS = [
  // row 1 (top) — 3 flowers
  { x: -42, y: -108, s: 1, rot: -12, hue: 0 },
  { x: 0,   y: -118, s: 1.1, rot: 4, hue: 1 },
  { x: 42,  y: -108, s: 1, rot: 10, hue: 2 },
  // row 2 — 4 flowers
  { x: -62, y: -82, s: 0.92, rot: -18, hue: 3 },
  { x: -20, y: -90, s: 1.05, rot: -6, hue: 4 },
  { x: 20,  y: -90, s: 1.05, rot: 6, hue: 0 },
  { x: 62,  y: -82, s: 0.92, rot: 16, hue: 1 },
  // row 3 — 5 flowers
  { x: -74, y: -55, s: 0.85, rot: -22, hue: 2 },
  { x: -38, y: -62, s: 0.95, rot: -10, hue: 3 },
  { x: 0,   y: -66, s: 1.0, rot: 0, hue: 4 },
  { x: 38,  y: -62, s: 0.95, rot: 8, hue: 0 },
  { x: 74,  y: -55, s: 0.85, rot: 20, hue: 1 },
  // filler small flowers
  { x: -52, y: -98, s: 0.7, rot: -15, hue: 2 },
  { x: 52,  y: -98, s: 0.7, rot: 14, hue: 3 },
];

const PALETTE = ['#e75480', '#ff6b8a', '#c084fc', '#f472b6', '#fb923c'];

export default function Flowers({ content, colors, show, onClose }: FlowersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(true);
  const handleClose = () => { setIsOpen(false); onClose(); };

  const hasDetails = content.venue || content.date || content.time;

  // Build a 5-color palette from theme + preset
  const flowerColors = [
    colors.primary,
    colors.secondary || PALETTE[1],
    colors.accent || PALETTE[2],
    PALETTE[3],
    PALETTE[4],
  ];

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
            /* ── Bouquet ── */
            <motion.div
              className={styles.bouquetScene}
              onClick={handleClick}
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <div className={styles.bouquet}>
                {/* Wrapping paper cone */}
                <div className={styles.wrap} style={{ '--c1': colors.primary, '--c2': colors.secondary || colors.accent } as React.CSSProperties}>
                  <div className={styles.wrapFold} />
                  <div className={styles.wrapEdge} />
                </div>

                {/* Leaves behind flowers */}
                <div className={styles.leaves}>
                  <div className={styles.leaf} style={{ left: '15%', transform: 'rotate(-35deg)', animationDelay: '0s' }} />
                  <div className={styles.leaf} style={{ left: '30%', transform: 'rotate(-18deg)', animationDelay: '0.3s' }} />
                  <div className={styles.leaf} style={{ right: '30%', transform: 'rotate(18deg)', animationDelay: '0.5s' }} />
                  <div className={styles.leaf} style={{ right: '15%', transform: 'rotate(35deg)', animationDelay: '0.2s' }} />
                  <div className={styles.leaf} style={{ left: '46%', transform: 'rotate(-5deg)', animationDelay: '0.4s' }} />
                </div>

                {/* Flowers */}
                <div className={styles.flowerBed}>
                  {FLOWERS.map((f, i) => (
                    <div
                      key={i}
                      className={styles.flower}
                      style={{
                        '--fx': `${f.x}px`,
                        '--fy': `${f.y}px`,
                        '--fs': f.s,
                        '--fr': `${f.rot}deg`,
                        '--fd': `${i * 0.08}s`,
                        '--fc': flowerColors[f.hue % flowerColors.length],
                      } as React.CSSProperties}
                    >
                      {/* Petals */}
                      <div className={styles.petal} />
                      <div className={styles.petal} />
                      <div className={styles.petal} />
                      <div className={styles.petal} />
                      <div className={styles.petal} />
                      {/* Center */}
                      <div className={styles.center} />
                    </div>
                  ))}
                </div>

                {/* Ribbon / bow */}
                <div className={styles.ribbon} style={{ background: colors.primary }}>
                  <div className={styles.bowLeft} style={{ background: colors.primary }} />
                  <div className={styles.bowRight} style={{ background: colors.primary }} />
                  <div className={styles.bowKnot} style={{ background: colors.secondary || colors.accent }} />
                </div>
              </div>

              <motion.p
                className={styles.tapHint}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Tap the bouquet 💐
              </motion.p>
            </motion.div>
          ) : (
            /* ── Card ── */
            <motion.div
              className={styles.cardWrap}
              initial={{ scale: 0.4, opacity: 0, y: 60 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.4, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            >
              <div className={styles.card}>
                <button className={styles.closeBtn} onClick={handleClose} style={{ background: colors.primary }}>✕</button>
                <div className={styles.accentBar} style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary || colors.accent})` }} />

                <header className={styles.header}>
                  <motion.div
                    className={styles.headerIcon}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.25, type: 'spring', stiffness: 400, damping: 12 }}
                    style={{ background: `${colors.primary}14` }}
                  >
                    💐
                  </motion.div>
                  <h1 className={styles.title} style={{ color: colors.primary }}>{content.title}</h1>
                  <div className={styles.ornament} style={{ color: `${colors.primary}50` }}>🌸 ✦ 🌸</div>
                </header>

                <div className={styles.body}>
                  <p className={styles.greeting} style={{ color: colors.primary }}>
                    Dear {content.recipientName},
                  </p>
                  <div className={styles.message} style={{ color: colors.text }}>
                    {content.message}
                  </div>

                  {hasDetails && (
                    <div className={styles.details} style={{ background: `${colors.primary}08`, borderColor: `${colors.primary}20` }}>
                      {content.venue && <div className={styles.detailRow}><span className={styles.detailIcon}>📍</span><span style={{ color: colors.text }}>{content.venue}</span></div>}
                      {content.date && <div className={styles.detailRow}><span className={styles.detailIcon}>📅</span><span style={{ color: colors.text }}>{content.date}</span></div>}
                      {content.time && <div className={styles.detailRow}><span className={styles.detailIcon}>🕐</span><span style={{ color: colors.text }}>{content.time}</span></div>}
                    </div>
                  )}

                  <div className={styles.signoff}>
                    <span className={styles.closing} style={{ color: colors.textLight }}>With love,</span>
                    <span className={styles.sender} style={{ color: colors.primary }}>{content.senderName}</span>
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
