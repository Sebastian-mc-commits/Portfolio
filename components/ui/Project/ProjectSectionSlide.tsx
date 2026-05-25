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

interface ProjectSectionSlideProps {
  projects: IUserProjects[];
  sectionIndex: number;
  totalSections: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
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

interface ProjectCardProps {
  project: IUserProjects;
  t: (key: string) => string;
}

function ProjectCard({ project, t }: ProjectCardProps) {
  const { setTransitionOrigin } = useTransitionOrigin();
  const { images, tags, id, translationKey, metadata } = project;
  const title =
    "title" in project ? project.title : t(project.translationTitleKey);
  const coreStack = tags.slice(0, 2);
  const bgColorValue = getProjectBgColor(project);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    setTransitionOrigin({
      x: e.clientX,
      y: e.clientY,
      bgColor: bgColorValue,
    });
  };

  return (
    <div
      className="relative h-full flex-1 overflow-hidden group"
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
            sizes="33vw"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ backgroundColor: bgColorValue }}
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-10">
        <div className="flex gap-2 mb-4 flex-wrap">
          {coreStack.map((tag) => (
            <span
              key={`${id}-${tag}`}
              className="text-[10px] font-mono px-2 py-1 bg-white/10 backdrop-blur-md text-white/90 border border-white/20 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-2xl lg:text-4xl font-black text-white mb-3 tracking-tight leading-[0.95]">
          {title}
        </h3>

        <p className="text-white/50 text-sm lg:text-base max-w-sm mb-6 leading-relaxed line-clamp-2">
          {metadata?.description || t(translationKey)}
        </p>

        <Link
          href={`/projects/${id}`}
          onClick={handleClick}
          className="inline-flex items-center gap-3 text-white group/link"
        >
          <span className="text-xs font-semibold tracking-widest uppercase opacity-70 group-hover/link:opacity-100 transition-opacity">
            {t("b_view_details") || "Explore"}
          </span>
          <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover/link:bg-white group-hover/link:text-black transition-all duration-500">
            <FaArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      </div>
    </div>
  );
}

export function ProjectSectionSlide({
  projects,
  sectionIndex,
  totalSections,
  scrollYProgress,
  t,
}: ProjectSectionSlideProps) {
  const segmentSize = 1 / totalSections;
  const start = sectionIndex * segmentSize;
  const end = (sectionIndex + 1) * segmentSize;
  const isFirst = sectionIndex === 0;
  const isLast = sectionIndex === totalSections - 1;

  const y = useTransform(
    scrollYProgress,
    isFirst
      ? [start, end - segmentSize * 0.2, end]
      : isLast
        ? [start, start + segmentSize * 0.2, 1]
        : [start, start + segmentSize * 0.2, end - segmentSize * 0.2, end],
    isFirst
      ? ["0%", "0%", "-100%"]
      : isLast
        ? ["100%", "0%", "0%"]
        : ["100%", "0%", "0%", "-100%"]
  );

  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [start, end - segmentSize * 0.15, end]
      : isLast
        ? [start, start + segmentSize * 0.15, 1]
        : [start, start + segmentSize * 0.15, end - segmentSize * 0.15, end],
    isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    isFirst
      ? [start, end - segmentSize * 0.2, end]
      : isLast
        ? [start, start + segmentSize * 0.15, 1]
        : [start, start + segmentSize * 0.15, end - segmentSize * 0.15, end],
    isFirst ? [1, 1, 0.95] : isLast ? [0.95, 1, 1] : [0.95, 1, 1, 0.95]
  );

  return (
    <motion.div
      className="absolute inset-0 w-full h-full will-change-transform flex"
      style={{
        y,
        opacity,
        scale,
        zIndex: totalSections - sectionIndex,
      }}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} t={t} />
      ))}
    </motion.div>
  );
}
