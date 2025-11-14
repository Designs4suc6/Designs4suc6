import "./globals.css";
import NavBar from "./components/Navbar"; // uses app/components/Navbar/index.tsx
import { gontserrat } from "./fonts";

export const metadata = {
  title: "Designs4suc6",
  description: "Designs4suc6 - Wordpress Web Design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body className={gontserrat.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
