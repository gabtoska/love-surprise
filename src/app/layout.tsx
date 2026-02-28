import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Love Surprise - Create Beautiful Surprises for Your Loved Ones',
  description: 'Create personalized Valentine\'s Day, Birthday, Anniversary, and Proposal surprises with cute animated pets and beautiful gifts.',
  keywords: 'valentine, birthday, anniversary, proposal, surprise, love, gift, card',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💕</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
