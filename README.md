# Love Surprise 💕

Create beautiful, personalized surprises for your loved ones! A Next.js application that lets you create interactive love messages with cute animated pets, beautiful themes, and charming gift reveals.

## ✨ Features

### 🐾 Adorable Pets
Choose from 4 cute animated pets to deliver your message:
- 🐧 **Penguin** - Classic and adorable
- 🐱 **Cat** - Playful and charming
- 🐶 **Dog** - Loyal and loving
- 🐦 **Bird** - Free and cheerful

### 🎨 Beautiful Themes
5 gorgeous themes for any occasion:
- 💕 **Valentine's Day** - Romantic pink theme
- 🎂 **Birthday** - Festive and colorful
- 💍 **Anniversary** - Elegant gold tones
- 🎄 **Christmas** - Holiday celebration
- 💎 **Proposal** - Purple luxury theme

### 🎁 Interactive Gifts
5 unique gift reveals:
- ✉️ **Envelope** - Elegant opening animation with wax seal
- 💐 **Flowers** - Beautiful bouquet presentation
- 🎂 **Cake** - Blow out the candles!
- 💌 **Letter** - Handwritten love letter
- 💍 **Ring Box** - Perfect for proposals

### 🎮 Interactive Features
- Moving "No" button that runs away
- Pet reactions (sad, happy, laughing)
- Message bubbles from pets
- Confetti celebrations
- Floating emoji backgrounds

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd love-surprise
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the builder.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
love-surprise/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Builder/customization page
│   │   ├── preview/           # Viewer/recipient page
│   │   └── globals.css
│   ├── components/
│   │   ├── pets/              # Penguin, Cat, Dog, Bird
│   │   ├── gifts/             # Envelope, Flowers, Cake, etc.
│   │   └── ui/                # Buttons, Confetti, etc.
│   ├── config/                # Themes, pets, gifts configuration
│   └── types/                 # TypeScript types
├── package.json
└── tsconfig.json
```

## 🎯 How It Works

1. **Create**: Use the builder to customize your surprise
   - Choose a theme (Valentine, Birthday, etc.)
   - Pick a cute pet messenger
   - Select a gift type
   - Write your personal message

2. **Share**: Get a unique link to share with your loved one

3. **Surprise**: When they open the link:
   - They see the cute pet with your question
   - The "No" button runs away!
   - Clicking "Yes" triggers confetti
   - The gift reveals your message

## 💼 Use as a Service

This project is designed to be sold as a service:
- Easy customization for any occasion
- Shareable links
- Mobile-responsive
- No user data storage required (config in URL)

## 🛠️ Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Framer Motion** - Smooth animations
- **CSS Modules** - Scoped styling

## 📱 Mobile Support

Fully responsive design that works beautifully on:
- Desktop browsers
- Tablets
- Mobile phones (iOS & Android)

## 🎨 Customization

All configurations are in `/src/config/`:
- `themes.ts` - Add new themes
- `pets.ts` - Add new pets
- `gifts.ts` - Add new gift types
- `messages.ts` - Default messages

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

---

Made with 💕 for spreading love and joy!
