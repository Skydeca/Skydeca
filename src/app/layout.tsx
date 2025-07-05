import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sora } from "next/font/google"; // ✅ Add this line
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700"], // ✅ Add relevant weights
});

export const metadata: Metadata = {
  title: "Skydeca",
  description: "Your mission. Your media. Your meaning. Built in the cloud.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable}`} // ✅ Add sora
    >
      <body>{children}</body>
    </html>
  );
}
