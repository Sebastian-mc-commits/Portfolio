"use client"

import { useEffect } from "react";
import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeContextProvider from "@/context/theme-context";
import TransitionContextProvider from "@/context/transition-context";
import { Toaster } from "react-hot-toast";
import { PageTransition } from "@/components/PageTransition";
import { CircularReveal } from "@/components/CircularReveal";
import { BodyBackground } from "@/components/BodyBackground";
import { detectAndSetLanguage } from "@/lib/utils/i18n";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    detectAndSetLanguage();
  }, []);

  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-surface dark:text-gray-50 dark:text-opacity-90 min-h-screen overflow-x-clip`}
      >
        <ThemeContextProvider>
          <TransitionContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            <PageTransition>
              {children}
            </PageTransition>
            <Footer />

            <Toaster position="top-right" />
            <CircularReveal />
            <BodyBackground />
          </ActiveSectionContextProvider>
          </TransitionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
