"use client";

import { useRef, MouseEvent, useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa";
import { IUserProjects } from "@/lib/interfaces/IUser";
import { useTransitionOrigin } from "@/context/transition-context";
import { resolveProjectColors } from "@/lib/utils";

// Client-side only parallax wrapper
function ParallaxWrapper({
  children,
  orientation,
  scale,
  overflow,
  delay,
  transition,
  maxTransition
}: {
  children: ReactNode;
  orientation?: string;
  scale?: number;
  overflow?: boolean;
  delay?: number;
  transition?: string;
  maxTransition?: number;
}) {
  const [SimpleParallax, setSimpleParallax] = useState<any>(null);

  useEffect(() => {
    import("simple-parallax-js").then((mod) => {
      setSimpleParallax(() => mod.default);
    });
  }, []);

  if (!SimpleParallax) {
    return <>{children}</>;
  }

  return (
    <SimpleParallax
      orientation={orientation}
      scale={scale}
      overflow={overflow}
      delay={delay}
      transition={transition}
      maxTransition={maxTransition}
    >
      {children}
    </SimpleParallax>
  );
}

interface ParallaxProjectCardProps {
    project: IUserProjects;
    index: number;
}

type ParallaxOrientation = "up" | "down" | "left" | "right" | "up left" | "up right" | "down left" | "down right";

const orientations: ParallaxOrientation[] = [
    "down",
    "up",
    "down right",
    "up left",
    "down left",
    "up right",
];

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

export function ParallaxProjectCard({ project, index }: ParallaxProjectCardProps) {
    const { t } = useTranslation();
    const { setTransitionOrigin } = useTransitionOrigin();
    const containerRef = useRef<HTMLDivElement>(null);

    const { images, tags, id, translationKey, metadata } = project;
    const title = "title" in project ? project.title : t(project.translationTitleKey);
    const coreStack = tags.slice(0, 3);

    const bgKey = project.bgColor || project.backgroundColor || project.bg;
    const resolvedColors = resolveProjectColors(bgKey);
    const bgColorValue = resolvedColors.bgColor || getBgColorFromClass(resolvedColors.bgClass);

    const orientation = orientations[index % orientations.length];
    const scale = 1.5 + (index % 3) * 0.2;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const contentOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
    const contentY = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [80, 0, 0, -80]);
    const numberX = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        setTransitionOrigin({
            x: e.clientX,
            y: e.clientY,
            bgColor: bgColorValue,
        });
    };

    return (
        <motion.div
            ref={containerRef}
            className="relative w-full h-[85vh] min-h-[600px] overflow-hidden"
        >
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                {images[0] ? (
                    <ParallaxWrapper
                        orientation={orientation}
                        scale={scale}
                        overflow={true}
                        delay={0.4}
                        transition="cubic-bezier(0.25, 0.1, 0.25, 1)"
                        maxTransition={70}
                    >
                        <Image
                            src={images[0].src}
                            alt={images[0].alt ?? title}
                            width={1920}
                            height={1080}
                            className="w-full h-auto min-h-[85vh] object-cover"
                            placeholder="blur"
                            priority={index < 2}
                            sizes="100vw"
                        />
                    </ParallaxWrapper>
                ) : (
                    <div
                        className="w-full h-full"
                        style={{ backgroundColor: bgColorValue }}
                    />
                )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 pointer-events-none" />

            <motion.div
                className="absolute top-1/2 right-8 sm:right-16 -translate-y-1/2 text-white/[0.03] text-[20rem] sm:text-[28rem] font-black pointer-events-none select-none leading-none"
                style={{ x: numberX }}
            >
                {String(index + 1).padStart(2, "0")}
            </motion.div>

            <motion.div
                className="absolute inset-0 flex items-end pointer-events-none"
                style={{ opacity: contentOpacity, y: contentY }}
            >
                <div className="w-full p-8 sm:p-12 lg:p-20 max-w-4xl pointer-events-auto">
                    <div className="flex gap-2 mb-6">
                        {coreStack.map((tag, i) => (
                            <motion.span
                                key={`${id}-${tag}`}
                                className="text-xs font-mono px-3 py-1.5 bg-white/10 backdrop-blur-md text-white/90 border border-white/10"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>

                    <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[0.9]">
                        {title}
                    </h2>

                    <p className="text-white/60 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
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
                        <span className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500 ease-out">
                            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                    </Link>
                </div>
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        </motion.div>
    );
}
