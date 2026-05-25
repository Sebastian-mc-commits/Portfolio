"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import links from "@/lib/data/links";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useTransitionOrigin } from "@/context/transition-context";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { BsMoon, BsSun } from "react-icons/bs";
import { IoLanguage } from "react-icons/io5";
import { useTheme } from "@/context/theme-context";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const { activeProjectBg } = useTransitionOrigin();
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isInProjectsView, setIsInProjectsView] = useState(false);
  const [isQuickSummaryVisible, setIsQuickSummaryVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isOnProjectDetailPage = pathname?.startsWith("/projects/");

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", newLang);
    window.history.replaceState({}, "", url.toString());
  };

  useEffect(() => {
    const handleProjectsView = (e: CustomEvent<boolean>) => {
      setIsInProjectsView(e.detail);
    };

    const handleQuickSummary = (e: CustomEvent<boolean>) => {
      setIsQuickSummaryVisible(e.detail);
    };

    window.addEventListener("projectsInView" as keyof WindowEventMap, handleProjectsView as EventListener);
    window.addEventListener("quickSummaryVisible" as keyof WindowEventMap, handleQuickSummary as EventListener);
    return () => {
      window.removeEventListener("projectsInView" as keyof WindowEventMap, handleProjectsView as EventListener);
      window.removeEventListener("quickSummaryVisible" as keyof WindowEventMap, handleQuickSummary as EventListener);
    };
  }, []);

  const isOnProjectPage = !!activeProjectBg;
  const textStyle = isOnProjectPage && activeProjectBg.textColor
    ? { color: activeProjectBg.textColor }
    : undefined;
  const textClass = isOnProjectPage && activeProjectBg.textClass
    ? activeProjectBg.textClass
    : "";

  if (isOnProjectDetailPage || isQuickSummaryVisible) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {!isInProjectsView && (
        <motion.header
          className="hidden md:block z-[999] relative h-[4.5rem] sm:h-[5rem]"
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          data-testid="main-header"
        >
          <nav className="hidden md:flex fixed top-0 left-1/2 -translate-x-1/2 h-[4.5rem] sm:top-6 sm:h-[2.75rem] items-center justify-center">
            {/* DESKTOP: pill nav */}
            <motion.div
              className={clsx(
                "flex items-center h-full px-3 rounded-full border shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem]",
                isOnProjectPage
                  ? "bg-black/20 border-white/10"
                  : "bg-white bg-opacity-80 border-border-subtle dark:bg-surface-secondary dark:border-border-subtle dark:bg-opacity-90"
              )}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <ul className={clsx(
                "flex items-center justify-center gap-0.5 text-[0.85rem] font-medium",
                isOnProjectPage ? `${textClass} opacity-70` : "text-gray-500"
              )} style={isOnProjectPage ? textStyle : undefined}>
                {links.map((link) => (
                  <motion.li
                    className="relative flex items-center justify-center"
                    key={link.hash}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <Link
                      className={clsx(
                        "flex items-center justify-center px-2.5 py-1 transition whitespace-nowrap rounded-full",
                        isOnProjectPage
                          ? "hover:opacity-100"
                          : "hover:text-gray-950 dark:text-gray-500 dark:hover:text-gray-300",
                        {
                          "text-gray-950 dark:text-gray-200":
                            activeSection === link.name && !isOnProjectPage,
                          "opacity-100": activeSection === link.name && isOnProjectPage,
                        }
                      )}
                      href={link.hash}
                      onClick={() => {
                        setActiveSection(link.name);
                        setTimeOfLastClick(Date.now());
                      }}
                    >
                      <span suppressHydrationWarning>{isMounted ? t(link.translationKey) : link.name}</span>

                      {link.name === activeSection && (
                        <motion.span
                          className={clsx(
                            "rounded-full absolute inset-0 -z-10",
                            isOnProjectPage ? "bg-white/10" : "bg-gray-100 dark:bg-surface-tertiary"
                          )}
                          layoutId="activeSection"
                          transition={{
                            type: "tween",
                            duration: 0.2,
                          }}
                        ></motion.span>
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="hidden sm:flex items-center gap-1 ml-2 border-l border-gray-200 dark:border-gray-700 pl-2">
                <button
                  onClick={toggleLanguage}
                  className={clsx(
                    "p-1.5 rounded-full transition-colors",
                    isOnProjectPage
                      ? "hover:bg-white/20 text-white/70 hover:text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                  )}
                  aria-label="Toggle language"
                >
                  <IoLanguage className="w-4 h-4" />
                </button>

                {/* Theme toggle button - commented out for light-only mode
                <button
                  onClick={toggleTheme}
                  className={clsx(
                    "p-1.5 rounded-full transition-colors",
                    isOnProjectPage
                      ? "hover:bg-white/20 text-white/70 hover:text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                  )}
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? <BsSun className="w-4 h-4" /> : <BsMoon className="w-4 h-4" />}
                </button>
                */}
              </div>
            </motion.div>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
