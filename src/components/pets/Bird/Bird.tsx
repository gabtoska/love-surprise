'use client';

import { motion } from 'framer-motion';
import styles from './Bird.module.css';

interface BirdProps {
  isHappy?: boolean;
  isSad?: boolean;
  isLaughing?: boolean;
  holdingEmoji?: string;
  themeColor?: string;
}

export default function Bird({
  isHappy = false,
  isSad = false,
  isLaughing = false,
  holdingEmoji = '💗',
  themeColor = '#ff758c',
}: BirdProps) {
  return (
    <motion.div
      className={`${styles.birdContainer} ${isSad ? styles.sad : ''}`}
      animate={
        isHappy
          ? { y: [0, -25, 0], scale: [1, 1.05, 1] }
          : isLaughing
          ? { rotate: [-3, 3, -3, 3, 0] }
          : { y: [0, -5, 0] }
      }
      transition={{
        duration: isHappy ? 0.3 : isLaughing ? 0.4 : 1.5,
        repeat: isHappy || isLaughing ? 4 : Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className={styles.bird}>
        {/* Crest/Feathers on head */}
        <div className={styles.crest}>
          <div className={styles.feather}></div>
          <div className={styles.feather}></div>
          <div className={styles.feather}></div>
        </div>

        {/* Head */}
        <div className={styles.birdHead}>
          {/* Eyes */}
          <div className={styles.birdEyes}>
            <motion.div 
              className={styles.eye}
              animate={
                isSad 
                  ? { scaleY: 0.4 } 
                  : isLaughing 
                  ? { scaleY: [1, 0.15, 1] }
                  : { scaleY: [1, 1, 0.1, 1] }
              }
              transition={{
                duration: isLaughing ? 0.4 : 3,
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
                  ? { scaleY: 0.4 } 
                  : isLaughing 
                  ? { scaleY: [1, 0.15, 1] }
                  : { scaleY: [1, 1, 0.1, 1] }
              }
              transition={{
                duration: isLaughing ? 0.4 : 3,
                repeat: Infinity,
                times: isLaughing ? [0, 0.5, 1] : [0, 0.9, 0.95, 1],
              }}
            >
              <div className={styles.eyeShine}></div>
            </motion.div>
          </div>

          {/* Cheeks */}
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

          {/* Beak */}
          <div className={styles.beak}>
            <div className={styles.beakTop}></div>
            <div className={styles.beakBottom}></div>
          </div>
        </div>

        {/* Body */}
        <div className={styles.birdBody}>
          <div className={styles.belly}></div>
        </div>

        {/* Wings */}
        <motion.div
          className={`${styles.wing} ${styles.wingLeft}`}
          animate={isHappy ? { rotate: [-10, -60, -10] } : { rotate: [-5, -15, -5] }}
          transition={{ duration: isHappy ? 0.15 : 0.8, repeat: Infinity }}
        ></motion.div>
        <motion.div
          className={`${styles.wing} ${styles.wingRight}`}
          animate={isHappy ? { rotate: [10, 60, 10] } : { rotate: [5, 15, 5] }}
          transition={{ duration: isHappy ? 0.15 : 0.8, repeat: Infinity }}
        ></motion.div>

        {/* Feet */}
        <div className={styles.feet}>
          <div className={styles.foot}>
            <div className={styles.toe}></div>
            <div className={styles.toe}></div>
            <div className={styles.toe}></div>
          </div>
          <div className={styles.foot}>
            <div className={styles.toe}></div>
            <div className={styles.toe}></div>
            <div className={styles.toe}></div>
          </div>
        </div>

        {/* Tail feathers */}
        <div className={styles.tailFeathers}>
          <div className={styles.tailFeather}></div>
          <div className={styles.tailFeather}></div>
          <div className={styles.tailFeather}></div>
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
