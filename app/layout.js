import './globals.css';

export const metadata = {
  title: 'PureVelo | Premium Durum Wheat Foods',
  description: 'Premium durum wheat vermicelli, pasta and grain-based foods from Velora Grain & Foods.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
