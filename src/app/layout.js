import "./globals.css";
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ['latin']
})

export const metadata = {
  title: "Marco Angioni",
  description: "Marco Angioni, Web Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
