import localFont from 'next/font/local';

export const gontserrat = localFont({
  src: [
    { path: '../public/fonts/Gontserrat-Regular.woff2', weight: '400', style: 'normal' },
  ],
  display: 'swap',                 // keep fast text paint
  fallback: ['system-ui','Segoe UI','Roboto','Arial'],
  adjustFontFallback: true,        // align metrics to reduce “jump”
  preload: true,                   // adds <link rel="preload">
});
