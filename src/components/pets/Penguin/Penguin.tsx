'use client';

import { motion } from 'framer-motion';
import styles from './Penguin.module.css';

interface PenguinProps {
  isHappy?: boolean;
  isSad?: boolean;
  isLaughing?: boolean;
  holdingEmoji?: string;
  themeColor?: string;
}

export default function Penguin({
  isHappy = false,
  isSad = false,
  isLaughing = false,
  holdingEmoji = '💕',
  themeColor = '#ff758c',
}: PenguinProps) {
  const getAnimation = () => {
    if (isHappy) return 'jump';
    if (isLaughing) return 'laugh';
    return 'waddle';
  };

  return (
    <motion.div
      className={`${styles.penguinContainer} ${isSad ? styles.sad : ''}`}
      animate={
        isHappy
          ? { y: [0, -20, 0] }
          : isLaughing
          ? { rotate: [-5, 5, -5, 5, 0], scale: [1, 1.05, 1, 1.05, 1] }
          : { rotate: [-3, 3, -3] }
      }
      transition={{
        duration: isHappy ? 0.5 : isLaughing ? 0.6 : 2,
        repeat: isHappy || isLaughing ? 3 : Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className={styles.penguin}>
        {/* Face */}
        <div className={styles.penguinFace}>
          <div className={styles.facePatch}></div>
          <div className={styles.penguinEyes}>
            <motion.div 
              className={styles.eye}
              animate={
                isSad 
                  ? { scaleY: 0.5 } 
                  : isLaughing 
                  ? { scaleY: [1, 0.3, 1] }
                  : { scaleY: [1, 1, 0.1, 1] }
              }
              transition={{
                duration: isLaughing ? 0.6 : 4,
                repeat: Infinity,
                times: isLaughing ? [0, 0.5, 1] : [0, 0.9, 0.95, 1],
              }}
            >
              <div className={styles.eyeShine}></div>
            </motion.div>
            <motion.div 
              className={styles.eye}
              animate={
                isSad 
                  ? { scaleY: 0.5 } 
                  : isLaughing 
                  ? { scaleY: [1, 0.3, 1] }
                  : { scaleY: [1, 1, 0.1, 1] }
              }
              transition={{
                duration: isLaughing ? 0.6 : 4,
                repeat: Infinity,
                times: isLaughing ? [0, 0.5, 1] : [0, 0.9, 0.95, 1],
              }}
            >
              <div className={styles.eyeShine}></div>
            </motion.div>
          </div>
          <div className={styles.cheeks}>
            <div 
              className={styles.cheek}
              style={{ background: isSad ? '#a8d8ea' : '#ffb3ba' }}
            ></div>
            <div 
              className={styles.cheek}
              style={{ background: isSad ? '#a8d8ea' : '#ffb3ba' }}
            ></div>
          </div>
          <div className={styles.penguinBeak}></div>
        </div>

        {/* Body */}
        <div className={styles.penguinBody}>
          <div className={styles.penguinBelly}></div>
        </div>

        {/* Flippers */}
        <motion.div
          className={`${styles.flipper} ${styles.flipperLeft}`}
          animate={{ rotate: [15, 30, 15] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        ></motion.div>
        <motion.div
          className={`${styles.flipper} ${styles.flipperRight}`}
          animate={{ rotate: [-15, -30, -15] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        ></motion.div>

        {/* Feet */}
        <div className={styles.feet}>
          <div className={styles.foot}></div>
          <div className={styles.foot}></div>
        </div>

        {/* Heart held */}
        <motion.div
          className={styles.heartHeld}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          {holdingEmoji}
        </motion.div>
      </div>
    </motion.div>
  );
}
