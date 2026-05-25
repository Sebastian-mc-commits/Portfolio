"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaGithubSquare, FaPlay, FaStar, FaArrowRight } from "react-icons/fa";
import { SiSimilarweb } from "react-icons/si";
import { UserProjectsStates } from "@/lib/interfaces/IUser";
import { FeaturedProjectCardProps } from "@/lib/interfaces/project";
import { useTransitionOrigin } from "@/context/transition-context";
import { resolveProjectColors } from "@/lib/utils";
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

const getBgColorFromClass = (bgClass?: string): string => {
  if (!bgClass) return "#0a0a0a";
  return bgClassToColor[bgClass] || "#0a0a0a";
};

const tagText: Record<UserProjectsStates, string> = {
  forAClient: "t_c_tag",
  forWork: "t_w_tag",
  ownProject: "t_p_tag",
};

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  const { t } = useTranslation();
  const { setTransitionOrigin } = useTransitionOrigin();
  const { images, tags, type, link, videoLink, linkType, translationKey, metadata } = project;

  const title = "title" in project ? project.title : t(project.translationTitleKey);
  const coreStack = tags.slice(0, 4);

  const bgKey = project.bgColor || project.backgroundColor || project.bg;
  const resolvedColors = resolveProjectColors(bgKey);
  const bgColorValue = resolvedColors.bgColor || getBgColorFromClass(resolvedColors.bgClass);

  const handleViewDetailsClick = (e: MouseEvent<HTMLAnchorElement>) => {
    setTransitionOrigin({
      x: e.clientX,
      y: e.clientY,
      bgColor: bgColorValue,
    });
  };

  return (
    <motion.div
      className="w-full rounded-2xl overflow-hidden bg-surface-secondary border border-border-subtle mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row">
        <div className="relative w-full lg:w-[55%] h-[280px] lg:h-[400px] bg-surface-tertiary">
          {images[0] ? (
            <Image
              src={images[0].src}
              alt={images[0].alt ?? title}
              fill
              className="object-cover"
              placeholder="blur"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-accent/5">
              <span className="text-6xl font-bold text-accent/20">AI</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-secondary/80 hidden lg:block" />
        </div>

        <div className="w-full lg:w-[45%] p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
              <FaStar className="w-3 h-3" />
              Featured Project
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-tertiary text-gray-400 text-xs font-medium border border-border-subtle">
              {t(tagText[type])}
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-100 mb-4 tracking-tight">
            {title}
          </h2>

          <p className="text-gray-400 leading-relaxed mb-6 text-sm lg:text-base">
            {metadata?.description || t(translationKey)}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {coreStack.map((tag) => (
              <span
                key={`featured-${project.id}-${tag}`}
                className="font-mono text-xs px-3 py-1.5 rounded-md bg-surface-tertiary text-gray-300 border border-border-subtle"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {link && linkType !== "none" && (
              <Link
                href={link}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-colors"
              >
                {linkType === "website" ? (
                  <SiSimilarweb className="w-4 h-4" />
                ) : (
                  <FaGithubSquare className="w-4 h-4" />
                )}
                <span>{linkType === "website" ? t("b_view_website") : t("b_view_repository")}</span>
              </Link>
            )}
            {videoLink && (
              <Link
                href={videoLink}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-tertiary hover:bg-surface-elevated text-gray-300 font-medium text-sm border border-border-subtle transition-colors"
              >
                <FaPlay className="w-3 h-3" />
                <span>{t("b_watch_demo")}</span>
              </Link>
            )}
            <Link
              href={`/projects/${project.id}`}
              onClick={handleViewDetailsClick}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-tertiary hover:bg-surface-elevated text-gray-300 font-medium text-sm border border-border-subtle transition-colors group"
            >
              <span>{t("b_view_details") || "View Details"}</span>
              <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
