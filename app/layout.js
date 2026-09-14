import './globals.css';

export const metadata = {
  title: 'PureVelo | Premium Durum Wheat Foods',
  description: 'Premium durum wheat vermicelli, pasta and grain-based foods from Velora Grain & Foods.',
  icons: {
    icon: [
      { url: '/purevelo-favicon.png?v=2', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/purevelo-favicon.png?v=2',
    apple: '/purevelo-favicon.png?v=2',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/purevelo-favicon.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/purevelo-favicon.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/purevelo-favicon.png?v=2" />
      </head>
      <body>{children}</body>
    </html>
  );
}
