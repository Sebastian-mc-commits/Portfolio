"use client";

import { useRef, useEffect, useState, createContext, useContext } from "react";
import { motion, useScroll, useTransform, MotionValue, AnimatePresence, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { Icon } from "@iconify/react";
import { useTransitionOrigin } from "@/context/transition-context";
import { resolveProjectColors } from "@/lib/utils";
import { IUserProjects } from "@/lib/interfaces/IUser";
import { MouseEvent } from "react";
import { useActiveSectionContext } from "@/context/active-section-context";
import { getTechIconConfig } from "@/components/ui/TechStackTag";
import { FadeInImage } from "@/components/ui/FadeInImage";

const MountedContext = createContext(false);

const DEFAULT_FOCUS_IMAGE = "/images/projects/astronaut.jpg";

function getProjectFocusImage(project: IUserProjects): string {
  const first = project.images?.[0]?.src;
  if (!first) return DEFAULT_FOCUS_IMAGE;
  if (typeof first === "string") return first;
  if (typeof first === "object" && "src" in first && typeof first.src === "string") {
    return first.src;
  }
  return DEFAULT_FOCUS_IMAGE;
}

const bgClassToColor: Record<string, string> = {
  "bg-black": "#000000",
  "bg-white": "#ffffff",
  "bg-red-600": "#dc2626",
  "bg-blue-600": "#2563eb",
  "bg-green-600": "#16a34a",
  "bg-gray-800": "#1f2937",
  "bg-slate-700": "#334155",
  "bg-yellow-400": "#facc15",
  "bg-purple-600": "#9333ea",
  "bg-pink-600": "#db2777",
  "bg-indigo-600": "#4f46e5",
};

const CARDS_PER_VIEW = 3;
const CARD_GAP_PX = 16;

interface HorizontalScrollGalleryProps {
  projects: IUserProjects[];
  t: (key: string) => string;
  onInViewChange?: (inView: boolean) => void;
}

function getProjectBgColor(project: IUserProjects): string {
  const bgKey = project.bgColor || project.backgroundColor || project.bg;
  const resolvedColors = resolveProjectColors(bgKey);
  return (
    resolvedColors.bgColor ||
    bgClassToColor[resolvedColors.bgClass || ""] ||
    "#0a0a0a"
  );
}

interface ProjectCardProps {
  project: IUserProjects;
  index: number;
  total: number;
  cardWidth: number;
  scrollYProgress: MotionValue<number>;
  t: (key: string) => string;
}

function ProjectCard({ project, index, total, cardWidth, scrollYProgress, t }: ProjectCardProps) {
  const { setTransitionOrigin } = useTransitionOrigin();
  const isMounted = useContext(MountedContext);
  const { images, tags, id, translationKey, metadata } = project;
  const title =
    "title" in project ? project.title : (isMounted ? t(project.translationTitleKey) : project.translationTitleKey);
  const coreStack = tags.slice(0, 3);
  const bgColorValue = getProjectBgColor(project);

  const totalSections = Math.ceil(total / CARDS_PER_VIEW);
  const sectionIndex = Math.floor(index / CARDS_PER_VIEW);
  const sectionStart = sectionIndex / totalSections;
  const sectionEnd = (sectionIndex + 1) / totalSections;

  const isFirstSection = sectionIndex === 0;

  const y = useTransform(
    scrollYProgress,
    [Math.max(0, sectionStart - 0.1), sectionStart + 0.02, sectionEnd - 0.02, Math.min(1, sectionEnd + 0.1)],
    isFirstSection ? [0, 0, 0, -60] : [60, 0, 0, -60]
  );

  const cardXOffset = useTransform(
    scrollYProgress,
    [Math.max(0, sectionStart - 0.1), sectionStart + 0.02, sectionEnd - 0.02, Math.min(1, sectionEnd + 0.1)],
    isFirstSection ? [0, 0, 0, -20] : [20, 0, 0, -20]
  );

  const rotate = useTransform(
    scrollYProgress,
    [Math.max(0, sectionStart - 0.1), sectionStart + 0.02, sectionEnd - 0.02, Math.min(1, sectionEnd + 0.1)],
    isFirstSection ? [0, 0, 0, -2] : [2, 0, 0, -2]
  );

  const scale = useTransform(
    scrollYProgress,
    [Math.max(0, sectionStart - 0.08), sectionStart + 0.02, sectionEnd - 0.02, Math.min(1, sectionEnd + 0.08)],
    isFirstSection ? [1, 1, 1, 0.95] : [0.95, 1, 1, 0.95]
  );

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, sectionStart - 0.1), sectionStart + 0.02, sectionEnd - 0.02, Math.min(1, sectionEnd + 0.1)],
    isFirstSection ? [1, 1, 1, 0.7] : [0.7, 1, 1, 0.7]
  );

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    setTransitionOrigin({
      x: e.clientX,
      y: e.clientY,
      bgColor: bgColorValue,
    });
  };

  return (
    <motion.div
      className="flex-shrink-0 h-full relative group"
      data-testid={`project-card-${index}`}
      style={{
        width: cardWidth,
        marginRight: index < total - 1 ? CARD_GAP_PX : 0,
        x: cardXOffset,
        y,
        rotate,
        scale,
        opacity
      }}
    >
      <div
        className="relative h-full rounded-none overflow-hidden shadow-2xl"
        style={{ backgroundColor: bgColorValue }}
      >
        <div className="absolute inset-0 w-full h-full">
          {images[0] ? (
            <FadeInImage
              src={images[0].src}
              alt={images[0].alt ?? title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              placeholder="blur"
              sizes="30vw"
            />
          ) : (
            <div className="w-full h-full" style={{ backgroundColor: bgColorValue }} />
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
          <div className="flex gap-3 mb-4 flex-wrap">
            {coreStack.map((tag) => {
              const cfg = getTechIconConfig(tag);
              return (
                <Icon
                  key={`${id}-${tag}`}
                  icon={cfg.icon}
                  style={{ color: cfg.color }}
                  className="w-7 h-7 drop-shadow-md"
                  aria-label={tag}
                />
              );
            })}
          </div>

          <h3 className="text-2xl lg:text-3xl font-black text-white mb-3 tracking-tight leading-[0.95]" suppressHydrationWarning>
            {title}
          </h3>

          <p className="text-white/60 text-sm max-w-sm mb-6 leading-relaxed line-clamp-2" suppressHydrationWarning>
            {metadata?.description || (isMounted ? t(translationKey) : translationKey)}
          </p>

          <Link
            href={`/projects/${id}`}
            onClick={handleClick}
            className="inline-flex items-center gap-3 text-white group/link w-fit"
          >
            <span className="text-xs font-semibold tracking-widest uppercase opacity-70 group-hover/link:opacity-100 transition-opacity" suppressHydrationWarning>
              {isMounted ? t("b_view_details") : "View Project"}
            </span>
            <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover/link:bg-white group-hover/link:text-black transition-all duration-500">
              <FaArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>

      </div>
    </motion.div>
  );
}

export function HorizontalScrollGallery({
  projects,
  t,
  onInViewChange,
}: HorizontalScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveSection } = useActiveSectionContext();
  const [dimensions, setDimensions] = useState({ viewportWidth: 1920, cardWidth: 600 });
  const [isMounted, setIsMounted] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      const vw = window.innerWidth;
      const totalGaps = (CARDS_PER_VIEW - 1) * CARD_GAP_PX;
      const availableWidth = vw - 80;
      const cardW = (availableWidth - totalGaps) / CARDS_PER_VIEW;
      setDimensions({ viewportWidth: vw, cardWidth: cardW });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalSections = Math.ceil(projects.length / CARDS_PER_VIEW);
  const totalCardsWidth = projects.length * dimensions.cardWidth + (projects.length - 1) * CARD_GAP_PX;
  const visibleWidth = CARDS_PER_VIEW * dimensions.cardWidth + (CARDS_PER_VIEW - 1) * CARD_GAP_PX;
  const endPadding = dimensions.cardWidth * 2;
  const maxScrollDistance = totalCardsWidth - visibleWidth + endPadding;
  const sidePadding = (dimensions.viewportWidth - visibleWidth) / 2;

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [sidePadding, sidePadding - maxScrollDistance]
  );

  const containerY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [0, 20, 0, -20, -40]
  );

  const containerRotate = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [0, -0.8, 0, 0.8, 1.5]
  );

  useEffect(() => {
    let lastInView: boolean | null = null;

    const checkInView = (latest: number) => {
      const inView = latest > 0.01 && latest < 0.99;

      if (lastInView !== inView) {
        lastInView = inView;
        setIsInView(inView);
        if (onInViewChange) {
          onInViewChange(inView);
        }
        if (inView) {
          setActiveSection("Projects");
        }
      }
    };

    checkInView(scrollYProgress.get());
    const unsubscribe = scrollYProgress.on("change", checkInView);
    return () => unsubscribe();
  }, [scrollYProgress, onInViewChange, setActiveSection]);

  // Focus the card that has slid into the "leftmost visible" position —
  // its left edge has crossed TRIGGER_OFFSET_PX (10rem from viewport edge),
  // so the card is positioned on the left but still fully visible.
  // leftEdge(i) = containerX + i*cardSpan
  // focus = highest i where leftEdge(i) <= TRIGGER_OFFSET_PX
  //       = floor((TRIGGER_OFFSET_PX - containerX) / cardSpan)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (dimensions.cardWidth <= 0 || maxScrollDistance <= 0) return;
    const TRIGGER_OFFSET_PX = 160; // 10rem
    const cardSpan = dimensions.cardWidth + CARD_GAP_PX;
    const containerX = sidePadding - maxScrollDistance * latest;
    const raw = Math.floor((TRIGGER_OFFSET_PX - containerX) / cardSpan);
    const safeIdx = Math.max(0, Math.min(projects.length - 1, raw));
    if (safeIdx !== focusedIndex) {
      setFocusedIndex(safeIdx);
    }
  });

  const focusedProject = projects[focusedIndex];
  const focusedImage = focusedProject ? getProjectFocusImage(focusedProject) : DEFAULT_FOCUS_IMAGE;

  // Preload every project's focus image so the cross-fade has nothing to wait on.
  useEffect(() => {
    if (typeof window === "undefined") return;
    projects.forEach((p) => {
      const url = getProjectFocusImage(p);
      const img = new window.Image();
      img.src = url;
    });
  }, [projects]);

  const scrollHeight = Math.max(totalSections * 60, 100);

  return (
    <MountedContext.Provider value={isMounted}>
      {/* Focused project background image - fixed position to escape parent overflow clipping */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{
          zIndex: 1,
          opacity: isInView ? 1 : 0,
          transition: "opacity 0.4s ease-out",
        }}
        aria-hidden="true"
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={focusedImage + "-" + focusedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute"
            style={{
              top: "-20px",
              bottom: "-20px",
              left: "-20px",
              right: "-20px",
              filter: "blur(1.5px) saturate(1.15) contrast(1.05)",
            }}
          >
            <FadeInImage
              src={focusedImage}
              alt="Focused project background"
              fill
              className="object-cover"
              sizes="110vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        ref={containerRef}
        className="relative z-[100]"
        style={{ height: `${scrollHeight}vh` }}
        data-testid="horizontal-scroll-gallery"
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden z-[100]">
          <motion.div
            className="flex h-[75vh] items-center relative z-10"
            style={{
              x,
              y: containerY,
              rotate: containerRotate,
            }}
            data-testid="projects-container"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                total={projects.length}
                cardWidth={dimensions.cardWidth}
                scrollYProgress={scrollYProgress}
                t={t}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </MountedContext.Provider>
  );
}
