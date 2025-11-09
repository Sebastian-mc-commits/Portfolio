"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { createPortal } from "react-dom";
import { IUserProjects, UserProjectsStates } from "@/lib/interfaces/IUser";
import { resolveProjectColors } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Label } from "./ui";
import { FaGithubSquare, FaTimes, FaImages, FaEye, FaGem, FaPlay, FaExternalLinkAlt, FaCogs } from "react-icons/fa";
import { SiSimilarweb } from "react-icons/si";

type IProjectProps = IUserProjects & {

  onDevelopmentProcessOpen: (project: IUserProjects) => void;
}

export default function Project({
  images,
  tags,
  id,
  translationKey,
  type,
  link,
  videoLink,
  linkType,
  onDevelopmentProcessOpen,
  ...filteredProps
}: IProjectProps) {
  const { t } = useTranslation();


  const title = useMemo(() =>
    "title" in filteredProps ? filteredProps.title : t(filteredProps.translationTitleKey),
    [filteredProps, t]
  );

  const [isExpanded, setIsExpanded] = useState(false);
  const [autoplayIndex, setAutoplayIndex] = useState(0);
  const [isFullGalleryOpen, setIsFullGalleryOpen] = useState(false);
  const expandRef = useRef<HTMLDivElement | null>(null);
  const portalElRef = useRef<HTMLDivElement | null>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);


  const ProjectStatCard = ({
    icon,
    title,
    value,
    className = ""
  }: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    className?: string;
  }) => (
    <div className={`group relative overflow-hidden rounded-lg bg-gradient-to-br from-white to-gray-50 dark:from-neutral-800 dark:to-neutral-900 border border-gray-200 dark:border-neutral-700 p-3 hover:shadow-md transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400">
            {icon}
          </div>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            {title}
          </span>
        </div>
        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {value}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );

  const ProjectSection = ({
    title,
    children,
    className = ""
  }: {
    title: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={`space-y-3 ${className}`}>
      <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base tracking-tight border-b border-gray-200 dark:border-neutral-700 pb-1.5">
        {title}
      </h3>
      {children}
    </div>
  );

  const ProjectLinkButton = ({
    href,
    icon,
    label,
    variant = "secondary",
    color = "blue"
  }: {
    href: string;
    icon: React.ReactNode;
    label: string;
    variant?: "primary" | "secondary";
    color?: "blue" | "green" | "purple" | "orange";
  }) => {
    const colorClasses = {
      blue: variant === "primary"
        ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-blue-500 shadow-blue-500/25"
        : "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700/50 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/30 dark:hover:to-blue-700/30 text-blue-700 dark:text-blue-300",
      green: variant === "primary"
        ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-green-500 shadow-green-500/25"
        : "bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 border-green-200 dark:border-green-700/50 hover:from-green-100 hover:to-emerald-200 dark:hover:from-green-800/30 dark:hover:to-emerald-700/30 text-green-700 dark:text-green-300",
      purple: variant === "primary"
        ? "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white border-purple-500 shadow-purple-500/25"
        : "bg-gradient-to-r from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-800/20 border-purple-200 dark:border-purple-700/50 hover:from-purple-100 hover:to-violet-200 dark:hover:from-purple-800/30 dark:hover:to-violet-700/30 text-purple-700 dark:text-purple-300",
      orange: variant === "primary"
        ? "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-orange-500 shadow-orange-500/25"
        : "bg-gradient-to-r from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-800/20 border-orange-200 dark:border-orange-700/50 hover:from-orange-100 hover:to-red-200 dark:hover:from-orange-800/30 dark:hover:to-red-700/30 text-orange-700 dark:text-orange-300"
    };

    return (
      <Link
        href={href}
        target="_blank"
        className={`flex items-center justify-between p-2.5 rounded-lg border transition-all duration-300 group transform hover:scale-105 hover:shadow-md ${colorClasses[color]}`}
      >
        <div className="flex items-center gap-2">
          <div className="p-0.5">
            {icon}
          </div>
          <span className="font-semibold text-xs">
            {label}
          </span>
        </div>
        <FaExternalLinkAlt className="w-2.5 h-2.5 transition-transform group-hover:translate-x-1" />
      </Link>
    );
  };

  const ProjectActionButton = ({
    onClick,
    icon,
    label,
    variant = "secondary",
    color = "purple"
  }: {
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    variant?: "primary" | "secondary";
    color?: "blue" | "green" | "purple" | "orange";
  }) => {
    const colorClasses = {
      blue: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-blue-500 shadow-blue-500/25",
      green: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-green-500 shadow-green-500/25",
      purple: "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white border-purple-500 shadow-purple-500/25",
      orange: "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-orange-500 shadow-orange-500/25"
    };

    return (
      <button
        onClick={onClick}
        className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border transition-all duration-300 group w-full transform hover:scale-105 hover:shadow-md ${colorClasses[color]}`}
      >
        <div className="p-0.5">
          {icon}
        </div>
        <span className="font-semibold text-xs">
          {label}
        </span>
      </button>
    );
  };


  const bgKey = useMemo(() =>
    ("bgColor" in filteredProps && (filteredProps as any).bgColor) ||
    ("backgroundColor" in filteredProps && (filteredProps as any).backgroundColor) ||
    ("bg" in filteredProps && (filteredProps as any).bg) ||
    undefined,
    [filteredProps]
  );

  const resolvedColors = useMemo(() => resolveProjectColors(bgKey as string | undefined), [bgKey]);

  const tagText: { [K in UserProjectsStates]: string } = {
    forAClient: "t_c_tag",
    forWork: "t_w_tag",
    ownProject: "t_p_tag",
  };


  const difficultyConfig = useMemo(() => {
    const level = Math.max(1, Math.min(10, filteredProps.metadata?.difficultyRankNumber ?? 1));
    const colors = [
      { bg: "#10b981", text: "#ffffff", label: "Beginner" },
      { bg: "#059669", text: "#ffffff", label: "Beginner" },
      { bg: "#84cc16", text: "#ffffff", label: "Easy" },
      { bg: "#eab308", text: "#ffffff", label: "Easy" },
      { bg: "#f59e0b", text: "#ffffff", label: "Medium" },
      { bg: "#f97316", text: "#ffffff", label: "Medium" },
      { bg: "#ef4444", text: "#ffffff", label: "Hard" },
      { bg: "#dc2626", text: "#ffffff", label: "Hard" },
      { bg: "#b91c1c", text: "#ffffff", label: "Expert" },
      { bg: "#7c2d12", text: "#ffffff", label: "Master" },
    ];
    return { ...colors[level - 1], level };
  }, [filteredProps.metadata?.difficultyRankNumber]);


  const cleanupAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  }, []);


  const handleCloseExpanded = useCallback(() => {
    setIsExpanded(false);
    setAutoplayIndex(0);
    cleanupAutoplay();
  }, [cleanupAutoplay]);

  const handleCloseGallery = useCallback(() => {
    setIsFullGalleryOpen(false);
  }, []);


  useEffect(() => {
    if (isExpanded) {

      cleanupAutoplay();
      autoplayIntervalRef.current = setInterval(() => {
        setAutoplayIndex((i) => (i + 1) % Math.max(1, images.length));
      }, 3500);
    } else {
      cleanupAutoplay();
      setAutoplayIndex(0);
    }

    return () => {
      if (!isExpanded) {
        cleanupAutoplay();
      }
    };
  }, [isExpanded, images.length, cleanupAutoplay]);


  useEffect(() => {
    const locked = isExpanded || isFullGalleryOpen;
    const prev = document.body.style.overflow;
    if (locked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prev || "";
    }
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [isExpanded, isFullGalleryOpen]);


  useEffect(() => {
    const header = document.querySelector("header") as HTMLElement;
    if (!header) return;
    const prevDisplay = header.style.display;
    if (isExpanded || isFullGalleryOpen) {
      header.style.display = "none";
    } else {
      header.style.display = prevDisplay || "";
    }
    return () => {
      header.style.display = prevDisplay || "";
    };
  }, [isExpanded, isFullGalleryOpen]);


  useEffect(() => {
    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.top = "0";
    el.style.left = "0";
    el.style.right = "0";
    el.style.bottom = "0";
    el.style.zIndex = "99999";

    el.style.pointerEvents = "none";
    document.body.appendChild(el);
    portalElRef.current = el;
    return () => {
      el.remove();
      portalElRef.current = null;
    };
  }, []);


  useEffect(() => {
    if (!portalElRef.current) return;
    portalElRef.current.style.pointerEvents = isFullGalleryOpen ? "auto" : "none";
  }, [isFullGalleryOpen]);



  const titleVariants = useMemo<Variants>(() => ({
    center: {
      y: -100,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25, delay: 0.5 }
    },
    up: {
      y: 0,
      opacity: 0.9,
      scale: 0.9,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
  }), []);

  const imageItem = useMemo(() => ({
    hidden: {
      y: 30,
      opacity: 0,
      scale: 0.9,
      rotateX: -15
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 0.8,
      scale: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }),
  }), []);



  return (
    <div className="mb-6 last:mb-0">
      {/* Enhanced compact card with better visual hierarchy */}
      <motion.div
        className="group relative rounded-xl overflow-hidden bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-black/10 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        onClick={() => setIsExpanded(true)}
        whileHover={{
          scale: 1.02,
          y: -2,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
        layout
      >
        {/* Gradient overlay for visual appeal */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/5 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative p-6 sm:flex sm:gap-6 items-center">
          {/* Enhanced image preview */}
          <div className="flex-none w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-800 dark:to-neutral-700 shadow-inner">
            {images[0] ? (
              <Image
                src={images[0].src}
                alt={images[0].alt ?? title}
                width={200}
                height={200}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-neutral-700 dark:to-neutral-800 flex items-center justify-center">
                <FaImages className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>

          {/* Enhanced content area */}
          <div className="mt-4 sm:mt-0 flex-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 max-w-[60ch] line-clamp-2 leading-relaxed">
                  {filteredProps.metadata?.description || t(translationKey)}
                </p>
              </div>

              {/* Difficulty badge in card */}
              {typeof filteredProps.metadata?.difficultyRankNumber === "number" && (
                <div className="ml-4 flex items-center gap-2">
                  <div
                    className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                    style={{
                      backgroundColor: difficultyConfig.bg,
                      color: difficultyConfig.text
                    }}
                  >
                    <FaGem className="w-3 h-3" />
                    <span>{difficultyConfig.level}/10</span>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced tags */}
            <div className="mt-3 flex gap-2 flex-wrap items-center">
              <Label type={type} text={t(tagText[type])} />
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={`${id}-tag-${tag}`}
                  className="bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-200 dark:border-neutral-700"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* View indicator */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg">
              <FaEye className="w-4 h-4" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced expanded overlay with better backdrop */}
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-50 bg-gradient-to-br from-black/70 via-black/60 to-black/80 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              ref={expandRef}
              layout
              initial={{
                width: "85%",
                height: "60%",
                scale: 0.9,
                opacity: 0,
                rotateX: -15
              }}
              animate={{
                width: "95%",
                height: "90%",
                scale: 1,
                opacity: 1,
                rotateX: 0
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                rotateX: 10,
                transition: { duration: 0.25 }
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 35,
                opacity: { duration: 0.3 }
              }}
              className={
                "relative rounded-2xl shadow-2xl w-full max-w-7xl overflow-hidden flex flex-col " +
                "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md " +
                (resolvedColors.bgClass || "")
              }
              style={!resolvedColors.bgClass && resolvedColors.bgColor ? { backgroundColor: resolvedColors.bgColor } : undefined}
            >
              {/* Enhanced close button */}
              <button
                onClick={handleCloseExpanded}
                aria-label="Close"
                className="absolute right-4 top-4 z-50 rounded-full bg-white/90 dark:bg-neutral-800/90 p-3 shadow-lg hover:scale-110 hover:rotate-90 transition-all duration-200 backdrop-blur-sm border border-gray-200 dark:border-neutral-700"
              >
                <FaTimes className="w-4 h-4" />
              </button>

              {/* Enhanced title area with better spacing */}
              <div className="flex-1 flex flex-col items-center justify-center relative p-8">
                <motion.h2
                  className={
                    "text-4xl sm:text-6xl font-black text-center tracking-tight " +
                    (resolvedColors.textClass ? resolvedColors.textClass : "text-gray-900 dark:text-gray-100")
                  }
                  style={!resolvedColors.textClass && resolvedColors.textColor ? { color: resolvedColors.textColor } : undefined}
                  variants={titleVariants}
                  animate="center"
                >
                  {title}
                </motion.h2>

                {/* Enhanced description with better typography */}
                <motion.div
                  className="mt-6 px-6 max-w-[85ch] text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <p className={
                    "text-base sm:text-lg leading-relaxed font-medium " +
                    (resolvedColors.textClass ? resolvedColors.textClass : "text-gray-600 dark:text-gray-300")
                  }
                    style={!resolvedColors.textClass && resolvedColors.textColor ? { color: resolvedColors.textColor } : undefined}>
                    {filteredProps.metadata?.description || t(translationKey)}
                  </p>
                </motion.div>

                {/* Enhanced difficulty indicator - moved to a better location */}
                {typeof filteredProps.metadata?.difficultyRankNumber === "number" && (
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/80 dark:bg-black/20 backdrop-blur-sm border border-gray-200/50 dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: difficultyConfig.bg }}></div>
                        <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                          {difficultyConfig.label}
                        </span>
                      </div>
                      <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                        {difficultyConfig.level}/10
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Enhanced images gallery area */}
                <div className="absolute bottom-8 left-8 right-8">
                  <motion.div
                    className="bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-xl p-4 relative border border-white/20 dark:border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <div className="w-full overflow-hidden rounded-lg">
                      <motion.ul
                        className="flex gap-6 w-max"
                        initial={false}
                        animate={{
                          x: `calc(-${autoplayIndex * (100 / Math.max(1, images.length))}%)`
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35
                        }}
                        style={{ willChange: "transform" }}
                      >
                        {images.map((img, i) => (
                          <motion.li
                            key={`${id}-carousel-${i}`}
                            custom={i}
                            variants={imageItem}
                            initial="hidden"
                            animate="visible"
                            className="flex-none w-[20rem] sm:w-[24rem] rounded-lg overflow-hidden shadow-xl bg-white dark:bg-neutral-800 border border-white/20 dark:border-neutral-700"
                            whileHover={{
                              scale: 1.05,
                              y: -5,
                              transition: { duration: 0.2 }
                            }}
                          >
                            <Image
                              src={img.src}
                              alt={img.alt ?? `${title}-${i}`}
                              width={960}
                              height={540}
                              className="object-cover w-full h-52 sm:h-60"
                              priority={i < 3}
                            />
                            {img.alt && (
                              <div className="p-3">
                                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                  {img.alt}
                                </p>
                              </div>
                            )}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Enhanced footer controls with professional design */}
              <div className="border-t border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Left side - Links and labels */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {link && (
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          href={link}
                          target="_blank"
                          className="px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 flex items-center gap-2 hover:bg-black dark:hover:bg-white transition-colors duration-200 font-medium text-sm"
                        >
                          {linkType === "website" ? <SiSimilarweb className="w-4 h-4" /> : <FaGithubSquare className="w-4 h-4" />}
                        </Link>
                      </motion.div>
                    )}
                    {videoLink && (
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          href={videoLink as string}
                          target="_blank"
                          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-neutral-700 text-gray-900 dark:text-gray-100 flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-neutral-600 transition-colors duration-200 font-medium text-sm"
                        >
                          <FaPlay className="w-3 h-3" />
                          <span>{t("b_watch_demo")}</span>
                        </Link>
                      </motion.div>
                    )}
                    <Label type={type} text={t(tagText[type])} />
                  </div>

                  {/* Right side - Gallery button */}
                  <motion.button
                    onClick={() => setIsFullGalleryOpen(true)}
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-neutral-700 text-gray-900 dark:text-gray-100 flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-neutral-600 transition-colors duration-200 font-medium text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaImages className="w-4 h-4" />
                    <span>{t("t_project_gallery")} ({images.length})</span>
                  </motion.button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Enhanced full gallery modal with complete project data */}
      {portalElRef.current && createPortal(
        <AnimatePresence mode="wait">
          {isFullGalleryOpen && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >

              <motion.div
                className="w-full h-full max-w-7xl max-h-[95vh] flex rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-2xl border border-gray-200/20 dark:border-neutral-700/20"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Left sidebar with project details */}
                <motion.div
                  className="w-80 flex-shrink-0 bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-700 overflow-y-auto"
                  initial={{ x: -320 }}
                  animate={{ x: 0 }}
                  exit={{ x: -320 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="p-6 space-y-6 h-full">
                    {/* Project Header */}
                    <div className="border-b border-gray-200 dark:border-neutral-700 pb-4">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
                        {title}
                      </h2>
                      {filteredProps.metadata?.description && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          {filteredProps.metadata.description}
                        </p>
                      )}
                    </div>

                    {/* Project Actions - Most Important First */}
                    <ProjectSection title={t("t_project_links")} className="space-y-2">
                      <div className="grid grid-cols-1 gap-2">
                        <ProjectActionButton
                          onClick={() => {
                            onDevelopmentProcessOpen({
                              images,
                              tags,
                              id,
                              translationKey,
                              type,
                              link,
                              videoLink,
                              linkType,
                              ...filteredProps
                            })
                          }}
                          icon={<FaCogs className="w-4 h-4" />}
                          label={t("b_development_process")}
                          variant="primary"
                          color="purple"
                        />

                        {link && (
                          <ProjectLinkButton
                            href={link}
                            icon={linkType === "website" ?
                              <SiSimilarweb className="w-4 h-4" /> :
                              <FaGithubSquare className="w-4 h-4" />
                            }
                            label={linkType === "website" ? t("b_view_website") : t("b_view_repository")}
                            color={linkType === "website" ? "green" : "blue"}
                          />
                        )}

                        {videoLink && (
                          <ProjectLinkButton
                            href={videoLink}
                            icon={<FaPlay className="w-4 h-4" />}
                            label={t("b_watch_demo")}
                            color="orange"
                          />
                        )}
                      </div>
                    </ProjectSection>

                    {/* Project Statistics - Compact Version */}
                    <ProjectSection title={t("t_project_stats")} className="bg-gradient-to-br from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-800 p-4 rounded-xl border border-gray-200 dark:border-neutral-700">
                      <div className="grid grid-cols-1 gap-2">
                        {typeof filteredProps.metadata?.difficultyRankNumber === "number" && (
                          <ProjectStatCard
                            icon={<FaGem className="w-4 h-4" />}
                            title={t("t_project_difficulty")}
                            value={`${difficultyConfig.level}/10`}
                          />
                        )}

                        <ProjectStatCard
                          icon={<FaImages className="w-4 h-4" />}
                          title={t("t_images_count")}
                          value={images.length}
                        />
                      </div>
                    </ProjectSection>

                    {/* Project Type */}
                    <ProjectSection title={t("t_project_type")}>
                      <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700/50">
                        <Label type={type} text={t(tagText[type])} />
                      </div>
                    </ProjectSection>

                    {/* Technologies */}
                    <ProjectSection title={t("t_project_technologies")}>
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag, index) => {
                          const colors = [
                            "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50",
                            "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50",
                            "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700/50",
                            "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700/50",
                            "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700/50",
                            "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700/50"
                          ];
                          return (
                            <span
                              key={`${id}-sidebar-tag-${tag}`}
                              className={`text-xs px-2.5 py-1.5 rounded-md border font-semibold transition-all duration-200 hover:scale-105 ${colors[index % colors.length]}`}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </ProjectSection>
                  </div>
                </motion.div>

                {/* Main gallery area */}
                <div className="flex-1 flex flex-col relative bg-white dark:bg-neutral-900">
                  {/* Close button - positioned within the modal container */}
                  <div className="absolute right-4 top-4 z-50">
                    <motion.button
                      onClick={handleCloseGallery}
                      className="p-2 rounded-lg bg-gray-900 hover:bg-black dark:bg-gray-100 dark:hover:bg-white text-white dark:text-gray-900 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTimes className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Gallery header */}
                  <div className="p-6 pb-4 border-b border-gray-200 dark:border-neutral-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {t("t_project_gallery")}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      {images.length} {t("t_images_count").toLowerCase()}
                    </p>
                  </div>

                  {/* Bento Grid Gallery */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    <motion.div
                      className="bento-grid gap-4"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={{
                        visible: { transition: { staggerChildren: 0.03 } },
                        hidden: { transition: { staggerChildren: 0.01, staggerDirection: -1 } }
                      }}
                    >
                      {images.map((img, i) => {

                        const getBentoClass = (index: number) => {
                          const patterns = [
                            "bento-item-large",
                            "bento-item-medium",
                            "bento-item-small",
                            "bento-item-wide",
                            "bento-item-tall",
                            "bento-item-small",
                          ];
                          return patterns[index % patterns.length] || "bento-item-small";
                        };

                        return (
                          <motion.div
                            key={`${id}-gallery-${i}`}
                            className={`group rounded-lg overflow-hidden bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300 ${getBentoClass(i)}`}
                            variants={{
                              hidden: { opacity: 0, scale: 0.95, y: 20 },
                              visible: {
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                transition: {
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 25
                                }
                              }
                            }}
                            whileHover={{
                              scale: 1.02,
                              transition: { duration: 0.2 }
                            }}
                          >
                            <div className="relative h-full overflow-hidden">
                              <Image
                                src={img.src}
                                alt={img.alt ?? `${title}-${i}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                priority={i < 6}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                              {/* Modern overlay with number */}
                              <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-black/90 rounded-full flex items-center justify-center text-xs font-semibold text-gray-900 dark:text-gray-100">
                                {i + 1}
                              </div>

                              {/* Bottom overlay with description */}
                              {img.alt && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                  <p className="text-white text-xs leading-relaxed line-clamp-2">
                                    {img.alt}
                                  </p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        portalElRef.current as Element
      )}
    </div>
  );
}
