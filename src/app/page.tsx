'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './page.module.css';
import { themes, pets, gifts, getDefaultMessages, getDefaultGiftContent, buildCustomTheme } from '@/config';
import { PetType, ThemeType, GiftType, SurpriseConfig } from '@/types';
import Pet from '@/components/pets';
import { FloatingEmojis, Button } from '@/components/ui';

export default function Home() {
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [config, setConfig] = useState<SurpriseConfig>({
    pet: 'penguin',
    theme: 'valentine',
    gift: 'envelope',
    messages: getDefaultMessages('valentine'),
    giftContent: getDefaultGiftContent('valentine'),
  });

  const currentTheme =
    config.theme === 'custom' && config.customColors
      ? buildCustomTheme(config.customColors.primary)
      : themes[config.theme];

  const handleThemeChange = (theme: ThemeType) => {
    setConfig({
      ...config,
      theme,
      messages: getDefaultMessages(theme),
      giftContent: getDefaultGiftContent(theme),
      customColors: theme === 'custom' ? (config.customColors || { primary: '#6366f1' }) : undefined,
    });
  };

  const handleCustomColorChange = (color: string) => {
    setConfig({ ...config, customColors: { primary: color } });
  };

  const generatePreviewLink = () => {
    // Separate puzzleImage from config to keep URL query short
    const { puzzleImage, ...configWithoutImage } = config;
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(configWithoutImage))));
    const base = `/preview?data=${encodeURIComponent(encoded)}`;
    // Put the image in the hash (never sent to server, avoids URL length limits)
    if (puzzleImage) {
      return `${base}#img=${encodeURIComponent(puzzleImage)}`;
    }
    return base;
  };

  const handlePreviewClick = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('isCreator', 'true');
    }
  };

  const copyLink = async () => {
    const link = `${window.location.origin}${generatePreviewLink()}`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX = 600;
        let w = img.width;
        let h = img.height;
        // Make it square for best puzzle results
        const size = Math.min(w, h);
        const sx = (w - size) / 2;
        const sy = (h - size) / 2;
        const outSize = Math.min(size, MAX);
        canvas.width = outSize;
        canvas.height = outSize;
        const ctx = canvas.getContext('2d')!;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, sx, sy, size, size, 0, 0, outSize, outSize);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setImagePreview(dataUrl);
        setConfig({ ...config, puzzleImage: dataUrl });
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
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
                      borderColor: config.theme === theme
                        ? (theme === 'custom' && config.customColors ? config.customColors.primary : themes[theme].colors.primary)
                        : 'transparent',
                      background: config.theme === theme
                        ? `${theme === 'custom' && config.customColors ? config.customColors.primary : themes[theme].colors.primary}15`
                        : 'white',
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

              {/* Color picker for custom theme */}
              {config.theme === 'custom' && (
                <motion.div
                  className={styles.colorPicker}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 style={{ color: currentTheme.colors.primary }}>Pick your color</h3>
                  <div className={styles.colorRow}>
                    {['#e75480', '#ff6b6b', '#f59e0b', '#10b981', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'].map((c) => (
                      <motion.button
                        key={c}
                        className={`${styles.colorSwatch} ${config.customColors?.primary === c ? styles.colorSwatchActive : ''}`}
                        style={{ background: c, boxShadow: config.customColors?.primary === c ? `0 0 0 3px white, 0 0 0 5px ${c}` : undefined }}
                        onClick={() => handleCustomColorChange(c)}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                    <label className={styles.colorCustom} style={{ borderColor: currentTheme.colors.primary }}>
                      <input
                        type="color"
                        value={config.customColors?.primary || '#6366f1'}
                        onChange={(e) => handleCustomColorChange(e.target.value)}
                        className={styles.colorInput}
                      />
                      <span style={{ color: currentTheme.colors.primary }}>🎨</span>
                    </label>
                  </div>
                  <div className={styles.colorPreview} style={{ background: currentTheme.colors.backgroundGradient }}>
                    <span className={styles.colorPreviewDot} style={{ background: currentTheme.colors.primary }} />
                    <span className={styles.colorPreviewDot} style={{ background: currentTheme.colors.secondary }} />
                    <span className={styles.colorPreviewDot} style={{ background: currentTheme.colors.accent }} />
                    <span className={styles.colorPreviewLabel} style={{ color: currentTheme.colors.text }}>Your palette</span>
                  </div>
                </motion.div>
              )}
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

              {/* Puzzle image upload */}
              {config.gift === 'puzzle' && (
                <motion.div
                  className={styles.puzzleConfig}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 style={{ color: currentTheme.colors.primary }}>
                    Upload your puzzle image
                  </h3>
                  <p className={styles.puzzleSubtext}>
                    Choose a photo — it gets cropped to a square and turned into a puzzle
                  </p>

                  {/* Grid size selector */}
                  <div className={styles.gridSelector}>
                    <span className={styles.gridLabel}>Difficulty</span>
                    <div className={styles.gridOptions}>
                      {[3, 4, 5].map((g) => (
                        <motion.button
                          key={g}
                          className={`${styles.gridOption} ${(config.puzzleGrid || 4) === g ? styles.gridOptionActive : ''}`}
                          style={{
                            borderColor: (config.puzzleGrid || 4) === g ? currentTheme.colors.primary : undefined,
                            background: (config.puzzleGrid || 4) === g ? `${currentTheme.colors.primary}12` : undefined,
                            color: (config.puzzleGrid || 4) === g ? currentTheme.colors.primary : undefined,
                          }}
                          onClick={() => setConfig({ ...config, puzzleGrid: g })}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className={styles.gridOptionSize}>{g}×{g}</span>
                          <span className={styles.gridOptionLabel}>
                            {g === 3 ? 'Easy' : g === 4 ? 'Medium' : 'Hard'}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Upload + Preview */}
                  <div className={styles.puzzleUploadArea}>
                    {!imagePreview ? (
                      <label
                        className={styles.uploadDropzone}
                        style={{ borderColor: currentTheme.colors.primary }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                        <span className={styles.uploadIcon}>📷</span>
                        <span className={styles.uploadText} style={{ color: currentTheme.colors.primary }}>
                          Click to upload a photo
                        </span>
                        <span className={styles.uploadHint}>JPG, PNG — will be cropped square</span>
                      </label>
                    ) : (
                      <motion.div
                        className={styles.previewCard}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                      >
                        <div className={styles.previewImageWrap}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imagePreview} alt="Puzzle preview" className={styles.previewImage} />
                          {/* Grid overlay */}
                          <div
                            className={styles.gridOverlay}
                            style={{
                              gridTemplateColumns: `repeat(${config.puzzleGrid || 4}, 1fr)`,
                              gridTemplateRows: `repeat(${config.puzzleGrid || 4}, 1fr)`,
                            }}
                          >
                            {Array.from({ length: (config.puzzleGrid || 4) ** 2 }).map((_, i) => (
                              <div key={i} className={styles.gridCell} />
                            ))}
                          </div>
                          <span className={styles.puzzleBadge}>
                            🧩 {config.puzzleGrid || 4}×{config.puzzleGrid || 4}
                          </span>
                        </div>
                        <label
                          className={styles.changeImageBtn}
                          style={{ color: currentTheme.colors.primary }}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                          />
                          Change photo
                        </label>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
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

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label style={{ color: currentTheme.colors.text }}>Sad message (when they say No)</label>
                    <input
                      type="text"
                      value={config.messages.sadMessage}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          messages: { ...config.messages, sadMessage: e.target.value },
                        })
                      }
                      style={{ borderColor: currentTheme.colors.primary }}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label style={{ color: currentTheme.colors.text }}>Click pet message</label>
                    <input
                      type="text"
                      value={config.messages.laughMessage}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          messages: { ...config.messages, laughMessage: e.target.value },
                        })
                      }
                      style={{ borderColor: currentTheme.colors.primary }}
                    />
                  </div>
                </div>

                <div className={styles.divider}></div>

                <h3 style={{ color: currentTheme.colors.primary }}>Gift Card Details</h3>

                <div className={styles.formGroup}>
                  <label style={{ color: currentTheme.colors.text }}>Title</label>
                  <input
                    type="text"
                    value={config.giftContent.title}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        giftContent: { ...config.giftContent, title: e.target.value },
                      })
                    }
                    style={{ borderColor: currentTheme.colors.primary }}
                  />
                </div>

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
              <Link href={generatePreviewLink()} onClick={handlePreviewClick}>
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
                {copied ? 'Copied! 💕' : 'Copy Link 🔗'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
