'use client';

import { motion } from 'framer-motion';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Button({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  onMouseEnter,
  disabled = false,
  className = '',
  style,
}: ButtonProps) {
  const getClassName = () => {
    const classes = [styles.button, styles[variant], styles[size]];
    if (className) classes.push(className);
    if (disabled) classes.push(styles.disabled);
    return classes.join(' ');
  };

  return (
    <motion.button
      className={getClassName()}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      disabled={disabled}
      style={style}
      whileHover={!disabled ? { scale: variant === 'secondary' ? 0.95 : 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  );
}
