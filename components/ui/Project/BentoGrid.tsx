"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useTransitionOrigin } from "@/context/transition-context";
import { resolveProjectColors } from "@/lib/utils";
import { IUserProjects } from "@/lib/interfaces/IUser";
import { MouseEvent } from "react";

const MountedContext = createContext(false);

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

interface BentoGridProps {
  projects: IUserProjects[];
  t: (key: string) => string;
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

type CardSize = "large" | "medium" | "small";

function getCardSize(index: number, total: number): CardSize {
  const pattern = index % 6;
  if (pattern === 0 || pattern === 3) return "large";
  if (pattern === 1 || pattern === 4) return "medium";
  return "small";
}

function getGridClasses(size: CardSize): string {
  switch (size) {
    case "large":
      return "col-span-2 row-span-2";
    case "medium":
      return "col-span-1 row-span-2";
    case "small":
      return "col-span-1 row-span-1";
  }
}

interface BentoCardProps {
  project: IUserProjects;
  index: number;
  size: CardSize;
  t: (key: string) => string;
}

function BentoCard({ project, index, size, t }: BentoCardProps) {
  const { setTransitionOrigin } = useTransitionOrigin();
  const isMounted = useContext(MountedContext);
  const { images, tags, id, translationKey, metadata } = project;
  const title =
    "title" in project ? project.title : (isMounted ? t(project.translationTitleKey) : project.translationTitleKey);
  const coreStack = tags.slice(0, size === "small" ? 2 : 3);
  const bgColorValue = getProjectBgColor(project);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    setTransitionOrigin({
      x: e.clientX,
      y: e.clientY,
      bgColor: bgColorValue,
    });
  };

  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <motion.div
      className={`${getGridClasses(size)} relative group`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <Link
        href={`/projects/${id}`}
        onClick={handleClick}
        className="block h-full"
      >
        <div
          className="relative h-full rounded-2xl overflow-hidden cursor-pointer"
          style={{ backgroundColor: bgColorValue }}
        >
          <div className="absolute inset-0 w-full h-full">
            {images[0] ? (
              <Image
                src={images[0].src}
                alt={images[0].alt ?? title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                placeholder="blur"
                sizes={isLarge ? "66vw" : "33vw"}
              />
            ) : (
              <div
                className="w-full h-full"
                style={{ backgroundColor: bgColorValue }}
              />
            )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

          <div
            className={`absolute inset-0 flex flex-col justify-end ${isSmall ? "p-4" : "p-6 lg:p-8"}`}
          >
            {!isSmall && (
              <div className="flex gap-2 mb-3 flex-wrap">
                {coreStack.map((tag) => (
                  <span
                    key={`${id}-${tag}`}
                    className="text-[10px] lg:text-xs font-mono px-2 py-1 bg-white/10 backdrop-blur-md text-white/90 border border-white/20 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h3
              className={`font-black text-white tracking-tight leading-[0.95] ${
                isLarge
                  ? "text-3xl lg:text-5xl mb-3"
                  : isSmall
                    ? "text-lg lg:text-xl mb-2"
                    : "text-2xl lg:text-3xl mb-3"
              }`}
              suppressHydrationWarning
            >
              {title}
            </h3>

            {!isSmall && (
              <p
                className={`text-white/60 leading-relaxed line-clamp-2 ${isLarge ? "text-sm lg:text-base max-w-md mb-4" : "text-xs lg:text-sm mb-3"}`}
                suppressHydrationWarning
              >
                {metadata?.description || (isMounted ? t(translationKey) : translationKey)}
              </p>
            )}

            <div className="flex items-center gap-2 text-white group/link">
              <span
                className={`font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-70 transition-opacity ${isSmall ? "text-[10px]" : "text-xs"}`}
                suppressHydrationWarning
              >
                {isMounted ? t("b_view_details") : "View"}
              </span>
              <span
                className={`rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 ${isSmall ? "w-8 h-8" : "w-10 h-10"}`}
              >
                <FaArrowRight
                  className={`group-hover:translate-x-0.5 transition-transform ${isSmall ? "w-2.5 h-2.5" : "w-3 h-3"}`}
                />
              </span>
            </div>
          </div>

          {isLarge && (
            <div className="absolute top-6 right-6 pointer-events-none">
              <span className="text-white/10 text-7xl font-black leading-none select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export function BentoGrid({ projects, t }: BentoGridProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <MountedContext.Provider value={isMounted}>
      <div className="py-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[200px] lg:auto-rows-[250px] gap-4">
            {projects.map((project, index) => (
              <BentoCard
                key={project.id}
                project={project}
                index={index}
                size={getCardSize(index, projects.length)}
                t={t}
              />
            ))}
          </div>
        </div>
      </div>
    </MountedContext.Provider>
  );
}
