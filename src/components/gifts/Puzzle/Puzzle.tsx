'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Puzzle.module.css';
import { GiftContent, ThemeColors } from '@/types';

interface PuzzleProps {
  content: GiftContent;
  colors: ThemeColors;
  show: boolean;
  onClose: () => void;
  image: string;
  grid: number;
}

function shuffle(arr: number[]): number[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  // Ensure it's not already solved
  if (a.every((v, i) => v === i)) {
    [a[0], a[1]] = [a[1], a[0]];
  }
  return a;
}

export default function Puzzle({ content, colors, show, onClose, image, grid }: PuzzleProps) {
  const GRID = grid;
  const TOTAL = GRID * GRID;

  const [positions, setPositions] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const [moves, setMoves] = useState(0);
  const [boardSize, setBoardSize] = useState(340);
  const [justPlaced, setJustPlaced] = useState<number | null>(null);

  // Initialize shuffled positions
  useEffect(() => {
    if (show && positions.length === 0) {
      const indices = Array.from({ length: TOTAL }, (_, i) => i);
      setPositions(shuffle(indices));
      setSolved(false);
      setSelected(null);
      setMoves(0);
    }
  }, [show, positions.length, TOTAL]);

  // Responsive board size
  useEffect(() => {
    const update = () => {
      const maxW = Math.min(window.innerWidth - 48, 420);
      const maxH = window.innerHeight - 300;
      setBoardSize(Math.max(Math.min(maxW, maxH, 420), 240));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const cellSize = boardSize / GRID;
  const gap = 3;

  // Correct count
  const correctCount = useMemo(() => {
    return positions.filter((pos, idx) => pos === idx).length;
  }, [positions]);

  // Check solved
  useEffect(() => {
    if (positions.length === TOTAL && correctCount === TOTAL) {
      setSolved(true);
    }
  }, [positions, correctCount, TOTAL]);

  const handleClick = useCallback(
    (pieceIdx: number) => {
      if (solved) return;
      if (positions[pieceIdx] === pieceIdx) return; // already correct

      if (selected === null) {
        setSelected(pieceIdx);
      } else if (selected === pieceIdx) {
        setSelected(null);
      } else {
        setPositions((prev) => {
          const next = [...prev];
          [next[selected], next[pieceIdx]] = [next[pieceIdx], next[selected]];
          return next;
        });
        setMoves((m) => m + 1);
        // Flash feedback for correct placement
        if (positions[pieceIdx] === selected || positions[selected] === pieceIdx) {
          setJustPlaced(pieceIdx);
          setTimeout(() => setJustPlaced(null), 600);
        }
        setSelected(null);
      }
    },
    [selected, positions, solved]
  );

  if (!show) return null;

  const progress = (correctCount / TOTAL) * 100;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget && solved) onClose();
        }}
      >
        <motion.div
          className={styles.modal}
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
        >
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerTop}>
              <h2>
                <span className={styles.headerIcon}>🧩</span>
                {solved ? 'Puzzle Complete!' : 'Solve the Puzzle'}
              </h2>
              <div className={styles.stats}>
                <span className={styles.statBadge}>{moves} moves</span>
                <span className={styles.statBadge}>{correctCount}/{TOTAL}</span>
              </div>
            </div>

            {/* Progress */}
            <div className={styles.progressTrack}>
              <motion.div
                className={styles.progressFill}
                style={{
                  background: `linear-gradient(90deg, ${colors.secondary}, ${colors.accent})`,
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
          </div>

          {/* Puzzle board */}
          <div className={styles.boardWrapper}>
            <div
              className={`${styles.board} ${solved ? styles.solved : ''}`}
              style={{
                width: boardSize + gap * (GRID - 1),
                height: boardSize + gap * (GRID - 1),
              }}
            >
              {positions.map((visualSlot, pieceIdx) => {
                const origRow = Math.floor(pieceIdx / GRID);
                const origCol = pieceIdx % GRID;
                const curRow = Math.floor(visualSlot / GRID);
                const curCol = visualSlot % GRID;
                const isCorrect = visualSlot === pieceIdx;
                const isSelected = selected === pieceIdx;
                const wasJustPlaced = justPlaced === pieceIdx;

                return (
                  <motion.div
                    key={pieceIdx}
                    className={`${styles.piece} ${isSelected ? styles.pieceSelected : ''} ${isCorrect ? styles.pieceCorrect : ''} ${wasJustPlaced ? styles.pieceFlash : ''}`}
                    style={{
                      width: cellSize - gap,
                      height: cellSize - gap,
                      backgroundImage: `url(${image})`,
                      backgroundSize: `${boardSize}px ${boardSize}px`,
                      backgroundPosition: `-${origCol * cellSize}px -${origRow * cellSize}px`,
                      borderColor: isSelected ? colors.accent : undefined,
                    }}
                    animate={{
                      left: curCol * (cellSize + gap * ((GRID - 1) / GRID)),
                      top: curRow * (cellSize + gap * ((GRID - 1) / GRID)),
                      scale: isSelected ? 1.08 : 1,
                      zIndex: isSelected ? 20 : isCorrect ? 1 : 5,
                    }}
                    transition={{
                      type: 'spring',
                      damping: 28,
                      stiffness: 350,
                      scale: { duration: 0.15 },
                    }}
                    onClick={() => handleClick(pieceIdx)}
                    whileHover={!solved && !isCorrect ? { scale: 1.04, zIndex: 15 } : {}}
                    whileTap={!solved && !isCorrect ? { scale: 0.96 } : {}}
                  />
                );
              })}
            </div>

            {/* Solved image reveal */}
            {solved && (
              <motion.div
                className={styles.solvedOverlay}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className={styles.solvedEmoji}>🎉</div>
              </motion.div>
            )}
          </div>

          {/* Hint or message */}
          {!solved && (
            <p className={styles.hint}>
              Tap a piece to select, then tap another to swap
            </p>
          )}

          {/* Message card after solve */}
          {solved && (
            <motion.div
              className={styles.messageCard}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, type: 'spring', damping: 20 }}
            >
              <h3 style={{ color: colors.primary }}>
                {content.title || `Dear ${content.recipientName}`}
              </h3>
              <p className={styles.messageText}>{content.message}</p>
              {content.venue && (
                <p className={styles.messageDetails}>
                  📍 {content.venue}
                  {content.date && ` · ${content.date}`}
                  {content.time && ` · ${content.time}`}
                </p>
              )}
              <p className={styles.sender}>— {content.senderName}</p>
            </motion.div>
          )}

          {/* Footer */}
          <div className={styles.footer}>
            {solved ? (
              <motion.button
                className={styles.closeBtn}
                style={{
                  background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
                }}
                onClick={onClose}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Close
              </motion.button>
            ) : (
              <span className={styles.footerLabel}>{GRID}×{GRID} Puzzle</span>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
