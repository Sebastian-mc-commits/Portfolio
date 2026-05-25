"use client"

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";
import QuickSummary from "@/components/QuickSummary";
import { FaChevronUp } from "react-icons/fa";
import { useActiveSectionContext } from "@/context/active-section-context";

function HomeContent() {
  const searchParams = useSearchParams();
  const [showQuickSummary, setShowQuickSummary] = useState(false);
  const [quickModeEnabled, setQuickModeEnabled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  // Client-side initialization
  useEffect(() => {
    setIsClient(true);
    // Check URL directly
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'quick') {
      setShowQuickSummary(true);
      setQuickModeEnabled(true);
    }
  }, []);

  useEffect(() => {
    // Also respond to searchParams changes
    const mode = searchParams?.get("mode");
    if (mode === "quick") {
      setShowQuickSummary(true);
      setQuickModeEnabled(true);
    }
  }, [searchParams]);

  const handleScrollToContent = () => {
    setShowQuickSummary(false);
    // Remove mode=quick from URL without page reload (preserve other params like visitor)
    const url = new URL(window.location.href);
    url.searchParams.delete('mode');
    const newUrl = url.searchParams.toString() ? `${url.pathname}?${url.searchParams.toString()}` : url.pathname;
    window.history.replaceState({}, '', newUrl);
    // Reset active section to Home and scroll to top
    setActiveSection("Home");
    setTimeOfLastClick(Date.now());
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleReturnToQuickSummary = () => {
    setShowQuickSummary(true);
    // Add mode=quick back to URL (preserve other params like visitor)
    const url = new URL(window.location.href);
    url.searchParams.set('mode', 'quick');
    window.history.replaceState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <AnimatePresence>
        {showQuickSummary && (
          <QuickSummary onScrollDown={handleScrollToContent} />
        )}
      </AnimatePresence>

      <main ref={mainContentRef} className="relative flex flex-col items-center px-5 sm:px-4">
        {/* Up arrow to return to QuickSummary - positioned to the right of the profile photo */}
        <AnimatePresence>
          {quickModeEnabled && !showQuickSummary && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              onClick={handleReturnToQuickSummary}
              className="absolute top-0 left-[calc(50%+4rem)] sm:left-[calc(50%+5rem)] z-[50] flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              aria-label="Return to Quick Summary"
            >
              <FaChevronUp className="w-3 h-3 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors" />
              <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-500 transition-colors">Quick View</span>
            </motion.button>
          )}
        </AnimatePresence>
        <Intro />
        <SectionDivider />
        <About />
        <div className="w-full overflow-x-clip">
          <Projects />
        </div>
        <Skills />
        <Experience />
        <Contact />
      </main>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}

