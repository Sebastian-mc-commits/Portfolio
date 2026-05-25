"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useTransitionOrigin } from "@/context/transition-context";
import { resolveProjectColors } from "@/lib/utils";
import { IUserProjects } from "@/lib/interfaces/IUser";
import { MouseEvent } from "react";

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

interface ProjectSlideProps {
  project: IUserProjects;
  index: number;
  totalProjects: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  t: (key: string) => string;
}

export function ProjectSlide({
  project,
  index,
  totalProjects,
  scrollYProgress,
  t,
}: ProjectSlideProps) {
  const { setTransitionOrigin } = useTransitionOrigin();
  const { images, tags, id, translationKey, metadata } = project;
  const title =
    "title" in project ? project.title : t(project.translationTitleKey);
  const coreStack = tags.slice(0, 3);

  const bgKey = project.bgColor || project.backgroundColor || project.bg;
  const resolvedColors = resolveProjectColors(bgKey);
  const bgColorValue =
    resolvedColors.bgColor ||
    bgClassToColor[resolvedColors.bgClass || ""] ||
    "#0a0a0a";

  const segmentSize = 1 / totalProjects;
  const start = index * segmentSize;
  const end = (index + 1) * segmentSize;
  const isFirst = index === 0;
  const isLast = index === totalProjects - 1;

  const x = useTransform(
    scrollYProgress,
    isFirst
      ? [start, end - segmentSize * 0.3, end]
      : isLast
        ? [start, start + segmentSize * 0.3, 1]
        : [start, start + segmentSize * 0.3, end - segmentSize * 0.3, end],
    isFirst
      ? ["0%", "0%", "-120%"]
      : isLast
        ? ["120%", "0%", "0%"]
        : ["120%", "0%", "0%", "-120%"]
  );

  const y = useTransform(
    scrollYProgress,
    isFirst
      ? [start, end - segmentSize * 0.3, end]
      : isLast
        ? [start, start + segmentSize * 0.3, 1]
        : [start, start + segmentSize * 0.3, end - segmentSize * 0.3, end],
    isFirst
      ? ["0%", "0%", "-60%"]
      : isLast
        ? ["60%", "0%", "0%"]
        : ["60%", "0%", "0%", "-60%"]
  );

  const scale = useTransform(
    scrollYProgress,
    isFirst
      ? [start, end - segmentSize * 0.3, end]
      : isLast
        ? [start, start + segmentSize * 0.2, 1]
        : [start, start + segmentSize * 0.2, end - segmentSize * 0.2, end],
    isFirst ? [1, 1, 0.85] : isLast ? [0.85, 1, 1] : [0.85, 1, 1, 0.85]
  );

  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [start, end - segmentSize * 0.2, end]
      : isLast
        ? [start, start + segmentSize * 0.15, 1]
        : [start, start + segmentSize * 0.15, end - segmentSize * 0.15, end],
    isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );

  const rotate = useTransform(
    scrollYProgress,
    isFirst ? [start, end] : isLast ? [start, 1] : [start, end],
    isFirst ? [0, -8] : isLast ? [8, 0] : [8, -8]
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
      className="absolute inset-0 w-full h-full will-change-transform"
      style={{
        x,
        y,
        scale,
        opacity,
        rotate,
        zIndex: totalProjects - index,
        backgroundColor: bgColorValue,
      }}
    >
      <div className="absolute inset-0 w-full h-full">
        {images[0] ? (
          <Image
            src={images[0].src}
            alt={images[0].alt ?? title}
            fill
            className="object-cover"
            placeholder="blur"
            priority={index < 2}
            sizes="100vw"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ backgroundColor: bgColorValue }}
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

      <div className="absolute inset-0 flex items-center p-8 sm:p-16 lg:p-24">
        <div className="max-w-2xl">
          <div className="flex gap-2 mb-6 flex-wrap">
            {coreStack.map((tag) => (
              <span
                key={`${id}-${tag}`}
                className="text-xs font-mono px-3 py-1.5 bg-white/10 backdrop-blur-md text-white/90 border border-white/20 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[0.9]">
            {title}
          </h2>

          <p className="text-white/60 text-base sm:text-lg max-w-lg mb-8 leading-relaxed line-clamp-3">
            {metadata?.description || t(translationKey)}
          </p>

          <Link
            href={`/projects/${id}`}
            onClick={handleClick}
            className="inline-flex items-center gap-4 text-white group"
          >
            <span className="text-sm font-semibold tracking-widest uppercase">
              {t("b_view_details") || "Explore"}
            </span>
            <span className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-20 right-8 sm:bottom-24 sm:right-16 pointer-events-none">
        <span className="text-white/10 text-[10rem] sm:text-[14rem] font-black leading-none select-none">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
}
