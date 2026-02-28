'use client';

import { motion } from 'framer-motion';
import styles from './Cat.module.css';

interface CatProps {
  isHappy?: boolean;
  isSad?: boolean;
  isLaughing?: boolean;
  holdingEmoji?: string;
  themeColor?: string;
}

export default function Cat({
  isHappy = false,
  isSad = false,
  isLaughing = false,
  holdingEmoji = '💝',
  themeColor = '#ff758c',
}: CatProps) {
  return (
    <motion.div
      className={`${styles.catContainer} ${isSad ? styles.sad : ''}`}
      animate={
        isHappy
          ? { y: [0, -15, 0] }
          : isLaughing
          ? { rotate: [-3, 3, -3, 3, 0] }
          : { y: [0, -3, 0] }
      }
      transition={{
        duration: isHappy ? 0.4 : isLaughing ? 0.5 : 2,
        repeat: isHappy || isLaughing ? 3 : Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className={styles.cat}>
        {/* Ears */}
        <div className={styles.ears}>
          <div className={styles.ear}>
            <div className={styles.earInner}></div>
          </div>
          <div className={styles.ear}>
            <div className={styles.earInner}></div>
          </div>
        </div>

        {/* Head */}
        <div className={styles.catHead}>
          {/* Eyes */}
          <div className={styles.catEyes}>
            <motion.div
              className={styles.eye}
              animate={
                isSad
                  ? { scaleY: 0.5 }
                  : isLaughing
                  ? { scaleY: [1, 0.15, 1] }
                  : { scaleY: [1, 1, 0.1, 1] }
              }
              transition={{
                duration: isLaughing ? 0.5 : 4,
                repeat: Infinity,
                times: isLaughing ? [0, 0.5, 1] : [0, 0.9, 0.95, 1],
              }}
            >
              <div className={styles.eyeShine}></div>
              <div className={styles.eyeShineSmall}></div>
            </motion.div>
            <motion.div
              className={styles.eye}
              animate={
                isSad
                  ? { scaleY: 0.5 }
                  : isLaughing
                  ? { scaleY: [1, 0.15, 1] }
                  : { scaleY: [1, 1, 0.1, 1] }
              }
              transition={{
                duration: isLaughing ? 0.5 : 4,
                repeat: Infinity,
                times: isLaughing ? [0, 0.5, 1] : [0, 0.9, 0.95, 1],
              }}
            >
              <div className={styles.eyeShine}></div>
              <div className={styles.eyeShineSmall}></div>
            </motion.div>
          </div>

          {/* Cheeks */}
          <div className={styles.cheeks}>
            <div
              className={styles.cheek}
              style={{ background: isSad ? '#a8d8ea' : '#ffb3c6' }}
            ></div>
            <div
              className={styles.cheek}
              style={{ background: isSad ? '#a8d8ea' : '#ffb3c6' }}
            ></div>
          </div>

          {/* Nose */}
          <div className={styles.nose}></div>

          {/* Mouth - cute "w" shape */}
          <div className={styles.mouth}>
            <div className={styles.mouthCurve}></div>
            <div className={styles.mouthCurve}></div>
          </div>
        </div>

        {/* Body */}
        <div className={styles.catBody}>
          <div className={styles.belly}></div>
        </div>

        {/* Arms tucked into body */}
        <div className={styles.arms}>
          <div className={styles.armLeft}></div>
          <div className={styles.armRight}></div>
        </div>

        {/* Feet */}
        <div className={styles.feet}>
          <div className={styles.foot}>
            <div className={styles.pawPad}></div>
          </div>
          <div className={styles.foot}>
            <div className={styles.pawPad}></div>
          </div>
        </div>

        {/* Tail */}
        <motion.div
          className={styles.tail}
          animate={{ rotate: isHappy ? [0, 25, 0, -25, 0] : [-8, 8, -8] }}
          transition={{ duration: isHappy ? 0.5 : 2.5, repeat: Infinity }}
        ></motion.div>

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
