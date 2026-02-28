'use client';

import { motion } from 'framer-motion';
import styles from './Dog.module.css';

interface DogProps {
  isHappy?: boolean;
  isSad?: boolean;
  isLaughing?: boolean;
  holdingEmoji?: string;
  themeColor?: string;
}

export default function Dog({
  isHappy = false,
  isSad = false,
  isLaughing = false,
  holdingEmoji = '💖',
  themeColor = '#ff758c',
}: DogProps) {
  return (
    <motion.div
      className={`${styles.dogContainer} ${isSad ? styles.sad : ''}`}
      animate={
        isHappy
          ? { y: [0, -20, 0], rotate: [0, 5, -5, 0] }
          : isLaughing
          ? { rotate: [-5, 5, -5, 5, 0] }
          : { y: [0, -2, 0] }
      }
      transition={{
        duration: isHappy ? 0.4 : isLaughing ? 0.5 : 1.5,
        repeat: isHappy || isLaughing ? 3 : Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className={styles.dog}>
        {/* Ears */}
        <motion.div 
          className={`${styles.ear} ${styles.earLeft}`}
          animate={isHappy ? { rotate: [-5, 5, -5] } : { rotate: [0, -3, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        ></motion.div>
        <motion.div 
          className={`${styles.ear} ${styles.earRight}`}
          animate={isHappy ? { rotate: [5, -5, 5] } : { rotate: [0, 3, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        ></motion.div>

        {/* Head */}
        <div className={styles.dogHead}>
          {/* Eyes */}
          <div className={styles.dogEyes}>
            <motion.div 
              className={styles.eye}
              animate={
                isSad 
                  ? { scaleY: 0.4 } 
                  : isLaughing 
                  ? { scaleY: [1, 0.2, 1] }
                  : { scaleY: [1, 1, 0.1, 1] }
              }
              transition={{
                duration: isLaughing ? 0.5 : 3,
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
                  ? { scaleY: [1, 0.2, 1] }
                  : { scaleY: [1, 1, 0.1, 1] }
              }
              transition={{
                duration: isLaughing ? 0.5 : 3,
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

          {/* Snout */}
          <div className={styles.snout}>
            <div className={styles.nose}></div>
            <motion.div 
              className={styles.tongue}
              animate={isHappy ? { height: [10, 18, 10] } : {}}
              transition={{ duration: 0.3, repeat: Infinity }}
              style={{ display: isHappy || isLaughing ? 'block' : 'none' }}
            ></motion.div>
          </div>
        </div>

        {/* Body */}
        <div className={styles.dogBody}>
          <div className={styles.bodySpot}></div>
          <div className={styles.belly}></div>
        </div>

        {/* Paws */}
        <div className={styles.paws}>
          <div className={styles.paw}></div>
          <div className={styles.paw}></div>
        </div>

        {/* Tail */}
        <motion.div
          className={styles.tail}
          animate={{ 
            rotate: isHappy ? [-25, 25, -25] : [-12, 12, -12] 
          }}
          transition={{ 
            duration: isHappy ? 0.2 : 0.5, 
            repeat: Infinity 
          }}
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
