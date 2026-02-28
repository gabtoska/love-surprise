'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './page.module.css';
import { themes, pets, gifts, getDefaultMessages, getDefaultGiftContent } from '@/config';
import { PetType, ThemeType, GiftType, SurpriseConfig } from '@/types';
import Pet from '@/components/pets';
import { FloatingEmojis, Button } from '@/components/ui';

export default function Home() {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<SurpriseConfig>({
    pet: 'penguin',
    theme: 'valentine',
    gift: 'envelope',
    messages: getDefaultMessages('valentine'),
    giftContent: getDefaultGiftContent('valentine'),
  });

  const currentTheme = themes[config.theme];

  const handleThemeChange = (theme: ThemeType) => {
    setConfig({
      ...config,
      theme,
      messages: getDefaultMessages(theme),
      giftContent: getDefaultGiftContent(theme),
    });
  };

  const generatePreviewLink = () => {
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(config))));
    return `/preview?data=${encodeURIComponent(encoded)}`;
  };

  const copyLink = async () => {
    const link = `${window.location.origin}${generatePreviewLink()}`;
    await navigator.clipboard.writeText(link);
    alert('Link copied! Share it with your loved one! 💕');
  };

  return (
    <main
      className={styles.main}
      style={{ background: currentTheme.colors.backgroundGradient }}
    >
      <FloatingEmojis emojis={currentTheme.floatingEmojis} />

      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 style={{ color: currentTheme.colors.primary }}>
            Love Surprise {currentTheme.emoji}
          </h1>
          <p style={{ color: currentTheme.colors.text }}>
            Create beautiful surprises for your loved ones
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className={styles.progress}>
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`${styles.progressStep} ${step >= s ? styles.active : ''}`}
              style={{
                background: step >= s ? currentTheme.colors.primary : '#e0e0e0',
              }}
              onClick={() => setStep(s)}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <motion.div
          key={step}
          className={styles.stepContent}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {/* Step 1: Choose Theme */}
          {step === 1 && (
            <div className={styles.step}>
              <h2 style={{ color: currentTheme.colors.primary }}>Choose the occasion</h2>
              <div className={styles.optionsGrid}>
                {(Object.keys(themes) as ThemeType[]).map((theme) => (
                  <motion.div
                    key={theme}
                    className={`${styles.optionCard} ${config.theme === theme ? styles.selected : ''}`}
                    style={{
                      borderColor: config.theme === theme ? themes[theme].colors.primary : 'transparent',
                      background: config.theme === theme ? `${themes[theme].colors.primary}15` : 'white',
                    }}
                    onClick={() => handleThemeChange(theme)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={styles.optionEmoji}>{themes[theme].emoji}</span>
                    <span className={styles.optionName}>{themes[theme].name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Choose Pet */}
          {step === 2 && (
            <div className={styles.step}>
              <h2 style={{ color: currentTheme.colors.primary }}>Choose your cute messenger</h2>
              <div className={styles.petPreview}>
                <Pet
                  type={config.pet}
                  holdingEmoji={currentTheme.emoji}
                  themeColor={currentTheme.colors.primary}
                />
              </div>
              <div className={styles.optionsRow}>
                {(Object.keys(pets) as PetType[]).map((pet) => (
                  <motion.div
                    key={pet}
                    className={`${styles.optionPill} ${config.pet === pet ? styles.selected : ''}`}
                    style={{
                      borderColor: config.pet === pet ? currentTheme.colors.primary : '#e0e0e0',
                      background: config.pet === pet ? `${currentTheme.colors.primary}15` : 'white',
                    }}
                    onClick={() => setConfig({ ...config, pet })}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{pets[pet].emoji}</span>
                    <span>{pets[pet].name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Choose Gift */}
          {step === 3 && (
            <div className={styles.step}>
              <h2 style={{ color: currentTheme.colors.primary }}>Choose the surprise gift</h2>
              <div className={styles.optionsGrid}>
                {(Object.keys(gifts) as GiftType[]).map((gift) => (
                  <motion.div
                    key={gift}
                    className={`${styles.optionCard} ${config.gift === gift ? styles.selected : ''}`}
                    style={{
                      borderColor: config.gift === gift ? currentTheme.colors.primary : 'transparent',
                      background: config.gift === gift ? `${currentTheme.colors.primary}15` : 'white',
                    }}
                    onClick={() => setConfig({ ...config, gift })}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={styles.optionEmoji}>{gifts[gift].emoji}</span>
                    <span className={styles.optionName}>{gifts[gift].name}</span>
                    <span className={styles.optionDesc}>{gifts[gift].description}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Customize Messages */}
          {step === 4 && (
            <div className={styles.step}>
              <h2 style={{ color: currentTheme.colors.primary }}>Customize your message</h2>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label style={{ color: currentTheme.colors.text }}>Question for your loved one</label>
                  <input
                    type="text"
                    value={config.messages.question}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        messages: { ...config.messages, question: e.target.value },
                      })
                    }
                    style={{ borderColor: currentTheme.colors.primary }}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label style={{ color: currentTheme.colors.text }}>Yes Button</label>
                    <input
                      type="text"
                      value={config.messages.yesButton}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          messages: { ...config.messages, yesButton: e.target.value },
                        })
                      }
                      style={{ borderColor: currentTheme.colors.primary }}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label style={{ color: currentTheme.colors.text }}>No Button</label>
                    <input
                      type="text"
                      value={config.messages.noButton}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          messages: { ...config.messages, noButton: e.target.value },
                        })
                      }
                      style={{ borderColor: currentTheme.colors.primary }}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label style={{ color: currentTheme.colors.text }}>Response when they say Yes!</label>
                  <textarea
                    value={config.messages.yesResponse}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        messages: { ...config.messages, yesResponse: e.target.value },
                      })
                    }
                    style={{ borderColor: currentTheme.colors.primary }}
                  />
                </div>

                <div className={styles.divider}></div>

                <h3 style={{ color: currentTheme.colors.primary }}>Gift Card Details</h3>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label style={{ color: currentTheme.colors.text }}>Recipient Name</label>
                    <input
                      type="text"
                      value={config.giftContent.recipientName}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          giftContent: { ...config.giftContent, recipientName: e.target.value },
                        })
                      }
                      style={{ borderColor: currentTheme.colors.primary }}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label style={{ color: currentTheme.colors.text }}>Your Name</label>
                    <input
                      type="text"
                      value={config.giftContent.senderName}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          giftContent: { ...config.giftContent, senderName: e.target.value },
                        })
                      }
                      style={{ borderColor: currentTheme.colors.primary }}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label style={{ color: currentTheme.colors.text }}>Your Message</label>
                  <textarea
                    value={config.giftContent.message}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        giftContent: { ...config.giftContent, message: e.target.value },
                      })
                    }
                    style={{ borderColor: currentTheme.colors.primary }}
                    rows={3}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label style={{ color: currentTheme.colors.text }}>Venue (optional)</label>
                    <input
                      type="text"
                      value={config.giftContent.venue || ''}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          giftContent: { ...config.giftContent, venue: e.target.value },
                        })
                      }
                      style={{ borderColor: currentTheme.colors.primary }}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label style={{ color: currentTheme.colors.text }}>Date (optional)</label>
                    <input
                      type="text"
                      value={config.giftContent.date || ''}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          giftContent: { ...config.giftContent, date: e.target.value },
                        })
                      }
                      style={{ borderColor: currentTheme.colors.primary }}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label style={{ color: currentTheme.colors.text }}>Time (optional)</label>
                    <input
                      type="text"
                      value={config.giftContent.time || ''}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          giftContent: { ...config.giftContent, time: e.target.value },
                        })
                      }
                      style={{ borderColor: currentTheme.colors.primary }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className={styles.navigation}>
          {step > 1 && (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              ← Back
            </Button>
          )}
          <div className={styles.spacer}></div>
          {step < 4 ? (
            <Button
              variant="primary"
              onClick={() => setStep(step + 1)}
              style={{
                background: `linear-gradient(135deg, ${currentTheme.colors.secondary} 0%, ${currentTheme.colors.accent} 100%)`,
              }}
            >
              Next →
            </Button>
          ) : (
            <div className={styles.finalButtons}>
              <Link href={generatePreviewLink()}>
                <Button
                  variant="primary"
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.colors.secondary} 0%, ${currentTheme.colors.accent} 100%)`,
                  }}
                >
                  Preview {currentTheme.emoji}
                </Button>
              </Link>
              <Button variant="ghost" onClick={copyLink}>
                Copy Link 🔗
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
