import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Layout from "../components/Layout";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export const metadata = {
  title: "| TCI Admin",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
