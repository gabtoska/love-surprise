import { ThemeType, InteractionMessages, GiftContent } from '@/types';

export const defaultMessages: Record<ThemeType, InteractionMessages> = {
  valentine: {
    question: 'Will you be my Valentine? 💕',
    yesButton: 'Yes! 💖',
    noButton: 'No...',
    yesResponse: 'Yay! 🎉💕\nI love you! 🐧✨',
    sadMessage: "How could you say no!? 😢",
    laughMessage: "Stop tickling me! 😂",
  },
  birthday: {
    question: "It's your special day! Ready for a surprise? 🎂",
    yesButton: 'Yes! 🎉',
    noButton: 'Maybe later...',
    yesResponse: 'Happy Birthday! 🎂🎉\nMake a wish! ✨',
    sadMessage: "But it's your birthday! 🥺",
    laughMessage: "Hehe, party time! 🎈",
  },
  anniversary: {
    question: 'Remember the day we met? 💍',
    yesButton: 'Always! 💝',
    noButton: 'Um...',
    yesResponse: 'Happy Anniversary! 💕\nForever yours! 💍✨',
    sadMessage: "You forgot...? 😢",
    laughMessage: "Still making me smile! 🥰",
  },
  christmas: {
    question: 'Have you been nice this year? 🎄',
    yesButton: 'Of course! 🎁',
    noButton: 'Maybe not...',
    yesResponse: 'Merry Christmas! 🎄✨\nSanta approves! 🎅',
    sadMessage: "Coal for you then! 😅",
    laughMessage: "Ho ho ho! 🎅",
  },
  proposal: {
    question: 'Will you spend forever with me? 💎',
    yesButton: 'Yes, I will! 💍',
    noButton: 'I need time...',
    yesResponse: "You've made me the happiest! 💍✨\nForever starts now! 💕",
    sadMessage: "My heart is breaking... 💔",
    laughMessage: "Nervous giggles! 😅",
  },
};

export const defaultGiftContent: Record<ThemeType, GiftContent> = {
  valentine: {
    title: "Valentine's Day",
    recipientName: 'My Love',
    message: "You make every day special",
    venue: 'Our Favorite Place',
    date: 'February 14, 2026',
    time: '7:00 PM',
    senderName: 'Your Valentine',
  },
  birthday: {
    title: 'Happy Birthday',
    recipientName: 'Birthday Star',
    message: "Wishing you the happiest birthday ever!",
    venue: 'Party Location',
    date: 'Your Special Day',
    time: '6:00 PM',
    senderName: 'With Love',
  },
  anniversary: {
    title: 'Happy Anniversary',
    recipientName: 'My Darling',
    message: "Another year of loving you",
    venue: 'Our Special Place',
    date: 'Our Anniversary',
    time: '8:00 PM',
    senderName: 'Forever Yours',
  },
  christmas: {
    title: 'Merry Christmas',
    recipientName: 'Dearest',
    message: "May your holidays be filled with joy",
    venue: 'Home Sweet Home',
    date: 'December 25',
    time: '5:00 PM',
    senderName: 'Santa\'s Helper',
  },
  proposal: {
    title: 'A Question',
    recipientName: 'Love of My Life',
    message: "Will you marry me?",
    venue: 'Where It All Began',
    date: 'The Beginning of Forever',
    time: 'Sunset',
    senderName: 'Yours Forever',
  },
};

export const getDefaultMessages = (theme: ThemeType): InteractionMessages => {
  return defaultMessages[theme] || defaultMessages.valentine;
};

export const getDefaultGiftContent = (theme: ThemeType): GiftContent => {
  return defaultGiftContent[theme] || defaultGiftContent.valentine;
};
