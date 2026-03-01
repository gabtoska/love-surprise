'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './preview.module.css';
import { SurpriseConfig } from '@/types';
import { themes, getDefaultMessages, getDefaultGiftContent, buildCustomTheme } from '@/config';
import Pet from '@/components/pets';
import Gift from '@/components/gifts';
import { FloatingEmojis, Confetti, Button } from '@/components/ui';

function PreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [config, setConfig] = useState<SurpriseConfig | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [petState, setPetState] = useState<'idle' | 'happy' | 'sad' | 'laughing'>('idle');
  const [showSadMessage, setShowSadMessage] = useState(false);
  const [showLaughMessage, setShowLaughMessage] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState<React.CSSProperties>({});
  const [copied, setCopied] = useState(false);
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const creator = sessionStorage.getItem('isCreator') === 'true';
      setIsCreator(creator);
    }
  }, []);

  useEffect(() => {
    const rawData = searchParams.get('data');
    if (rawData) {
      try {
        const data = decodeURIComponent(rawData);
        const decoded = JSON.parse(decodeURIComponent(escape(atob(data)))) as SurpriseConfig;
        // Read puzzle image from hash fragment (kept out of query to avoid URL length limits)
        if (typeof window !== 'undefined' && window.location.hash) {
          const hash = window.location.hash.substring(1); // remove #
          const imgMatch = hash.match(/^img=(.+)$/);
          if (imgMatch) {
            decoded.puzzleImage = decodeURIComponent(imgMatch[1]);
          }
        }
        setConfig(decoded);
      } catch {
        // Use default config if decoding fails
        setConfig({
          pet: 'penguin',
          theme: 'valentine',
          gift: 'envelope',
          messages: getDefaultMessages('valentine'),
          giftContent: getDefaultGiftContent('valentine'),
        });
      }
    } else {
      setConfig({
        pet: 'penguin',
        theme: 'valentine',
        gift: 'envelope',
        messages: getDefaultMessages('valentine'),
        giftContent: getDefaultGiftContent('valentine'),
      });
    }
  }, [searchParams]);

  if (!config) {
    return (
      <div className={styles.loading}>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          💕
        </motion.div>
        <p>Loading your surprise...</p>
      </div>
    );
  }

  const currentTheme =
    config.theme === 'custom' && config.customColors
      ? buildCustomTheme(config.customColors.primary)
      : themes[config.theme];

  const handleYes = () => {
    setAnswered(true);
    setPetState('happy');
    setShowConfetti(true);
    setTimeout(() => {
      setShowGift(true);
    }, 1500);
  };

  const handleNo = () => {
    setPetState('sad');
    setShowSadMessage(true);
    
    // Move the no button
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 100;
    setNoButtonStyle({
      position: 'fixed',
      left: `${Math.random() * maxX}px`,
      top: `${Math.random() * maxY}px`,
      zIndex: 10,
    });

    setTimeout(() => {
      setShowSadMessage(false);
      setPetState('idle');
    }, 2000);
  };

  const handlePetClick = () => {
    if (answered) return;
    setPetState('laughing');
    setShowLaughMessage(true);
    setTimeout(() => {
      setShowLaughMessage(false);
      setPetState('idle');
    }, 2000);
  };

  const handleGiftClose = () => {
    setShowGift(false);
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main
      className={styles.main}
      style={{ background: currentTheme.colors.backgroundGradient }}
    >
      <FloatingEmojis emojis={currentTheme.floatingEmojis} />
      <Confetti show={showConfetti} />

      <div className={styles.container}>
        {/* Pet with messages */}
        <div className={styles.petWrapper}>
          {/* Sad message bubble */}
          {showSadMessage && (
            <motion.div
              className={styles.messageBubble}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              {config.messages.sadMessage}
            </motion.div>
          )}
          
          {/* Laugh message bubble */}
          {showLaughMessage && (
            <motion.div
              className={styles.messageBubble}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              {config.messages.laughMessage}
            </motion.div>
          )}

          <div onClick={handlePetClick}>
            <Pet
              type={config.pet}
              isHappy={petState === 'happy'}
              isSad={petState === 'sad'}
              isLaughing={petState === 'laughing'}
              holdingEmoji={currentTheme.emoji}
              themeColor={currentTheme.colors.primary}
            />
          </div>
        </div>

        {/* Question */}
        {!answered && (
          <motion.div
            className={styles.question}
            style={{ color: currentTheme.colors.text }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {config.messages.question}
          </motion.div>
        )}

        {/* Response */}
        {answered && !showGift && (
          <motion.div
            className={styles.response}
            style={{ color: currentTheme.colors.primary }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {config.messages.yesResponse.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </motion.div>
        )}

        {/* Buttons */}
        {!answered && (
          <div className={styles.buttons}>
            <Button
              variant="primary"
              size="large"
              onClick={handleYes}
              style={{
                background: `linear-gradient(135deg, ${currentTheme.colors.secondary} 0%, ${currentTheme.colors.accent} 100%)`,
              }}
            >
              {config.messages.yesButton}
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={handleNo}
              onMouseEnter={handleNo}
              style={noButtonStyle}
            >
              {config.messages.noButton}
            </Button>
          </div>
        )}
      </div>

      {/* Gift */}
      <Gift
        type={config.gift}
        content={config.giftContent}
        colors={currentTheme.colors}
        show={showGift}
        onClose={handleGiftClose}
        puzzleImage={config.puzzleImage}
        puzzleGrid={config.puzzleGrid}
      />

      {/* Preview Controls - Only visible to the creator */}
      {isCreator && (
        <div className={styles.previewControls}>
          <Button
            variant="secondary"
            size="medium"
            onClick={handleCopyLink}
            style={{
              background: copied ? currentTheme.colors.secondary : undefined,
            }}
          >
            {copied ? '✓ Link Copied!' : '📋 Copy Link'}
          </Button>
          <Button
            variant="ghost"
            size="medium"
            onClick={handleGoBack}
          >
            ↻ Restart
          </Button>
        </div>
      )}
    </main>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className={styles.loading}>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          💕
        </motion.div>
        <p>Loading your surprise...</p>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}
