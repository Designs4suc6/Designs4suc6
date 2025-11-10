import './globals.css';
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/Footer';

import { gontserrat } from './fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={gontserrat.className}>{children}</body>
    </html>
  );
}

export const metadata = {
  title: 'Designs4suc6',
  description: 'Designs4suc6 - Wordpress Web Design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  )
}
