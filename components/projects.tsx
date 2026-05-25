"use client";

import { useState, useEffect } from "react";
import projectsData from "@/lib/data/projects";
import { useSectionInView } from "@/lib/hooks";
import { useTranslation } from "react-i18next";
import SectionHeading from "./section-heading";
import { HorizontalScrollGallery } from "@/components/ui/Project";

/* Layout toggle imports - commented out for future use
import { motion, AnimatePresence } from "framer-motion";
import { BentoGrid } from "@/components/ui/Project";
import { BsGrid, BsLayoutThreeColumns } from "react-icons/bs";
type LayoutType = "horizontal" | "bento";
*/

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.1);
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [isInProjectsView, setIsInProjectsView] = useState(false);

  /* Layout toggle state - commented out for future use
  const [layout, setLayout] = useState<LayoutType>("horizontal");
  */

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isInProjectsView !== undefined) {
      window.dispatchEvent(new CustomEvent("projectsInView", { detail: isInProjectsView }));
    }
  }, [isInProjectsView]);

  if (projectsData.length === 0) {
    return (
      <section
        ref={ref}
        id="projects"
        className="min-h-screen bg-red-500 flex items-center justify-center"
      >
        <h1 className="text-white text-4xl">NO PROJECTS DATA</h1>
      </section>
    );
  }

  return (
    <section ref={ref} id="projects" className="relative w-full z-[100]">
      <div className="text-center mb-4">
        <SectionHeading suppressHydrationWarning>{isMounted ? t("t_projects") : "Projects"}</SectionHeading>
      </div>

      {/* Layout toggle buttons - commented out for future use
      <div className="sticky top-4 z-[200] flex justify-center pb-4">
        <div className="bg-white backdrop-blur-xl rounded-full p-1.5 flex gap-1 border border-gray-100 shadow-sm">
          <button
            onClick={() => setLayout("horizontal")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              layout === "horizontal"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <BsLayoutThreeColumns className="w-4 h-4" />
            <span className="hidden sm:inline">Horizontal</span>
          </button>
          <button
            onClick={() => setLayout("bento")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              layout === "bento"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <BsGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>
        </div>
      </div>
      */}

      <HorizontalScrollGallery
        projects={projectsData}
        t={t}
        onInViewChange={setIsInProjectsView}
      />

      {/* BentoGrid layout - commented out for future use
      <BentoGrid projects={projectsData} t={t} />
      */}
    </section>
  );
}
