import { Cormorant_Garamond, Inter, Pinyon_Script } from 'next/font/google';
import './globals.css';

/* ------------------------------------------------------------------ *
 * Fonts — the single place to swap the brand faces. Each one exposes a
 * CSS variable that globals.css maps onto --font-display / --font-script
 * / --font-sans, so one edit here re-skins the whole page.
 * ------------------------------------------------------------------ */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const pinyon = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pinyon',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Glow — Gift a little glow',
  description: 'Glow campaign profile — help fund a procedure that changes how someone feels.',
};

export const viewport = {
  themeColor: '#faf7f2',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${pinyon.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
