// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

// Use Google fonts that work on Next 14, but keep the same CSS variable names
import { Inter, Roboto_Mono } from "next/font/google";

const geistSans = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Academic Record System",
  description: "University Student Record Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
