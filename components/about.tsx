"use client";

import React, { useState, useEffect } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { useTranslation } from "react-i18next";
import {
  SiPython,
  SiFastapi,
  SiPostgresql,
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiWordpress,
  SiPhp,
  SiDocker,
  SiRedis,
  SiGooglecloud
} from "react-icons/si";
import { IconType } from "react-icons";

interface TechStack {
  name: string;
  icon: IconType;
}

interface SkillArea {
  titleKey: string;
  stack: TechStack[];
}

const skillAreas: SkillArea[] = [
  {
    titleKey: "about_skill_backend",
    stack: [
      { name: "Python", icon: SiPython },
      { name: "FastAPI", icon: SiFastapi },
      { name: "PostgreSQL", icon: SiPostgresql },
    ]
  },
  {
    titleKey: "about_skill_fullstack",
    stack: [
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Next.js", icon: SiNextdotjs },
    ]
  },
  {
    titleKey: "about_skill_wordpress",
    stack: [
      { name: "WordPress", icon: SiWordpress },
      { name: "PHP", icon: SiPhp },
    ]
  },
  {
    titleKey: "about_skill_cloud",
    stack: [
      { name: "Docker", icon: SiDocker },
      { name: "Redis", icon: SiRedis },
      { name: "GCP", icon: SiGooglecloud },
    ]
  },
];

interface SkillCardProps {
  title: string;
  stack: TechStack[];
  index: number;
}

function SkillCard({ title, stack, index }: SkillCardProps) {
  return (
    <motion.div
      className="group p-5 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      whileHover={{ y: -2 }}
    >
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider text-center">
        {title}
      </h3>
      <div className="flex items-center justify-center gap-6">
        {stack.map((tech, i) => (
          <div
            key={tech.name}
            className="flex flex-col items-center gap-1.5 group/icon"
          >
            <tech.icon className="w-8 h-8 text-gray-700 dark:text-gray-300 group-hover/icon:text-gray-900 dark:group-hover/icon:text-white transition-colors" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function About() {
  const { ref } = useSectionInView("About", 0.5);
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[50rem] text-center sm:mb-40 scroll-mt-36"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading suppressHydrationWarning>{isMounted ? t("t_about") : "About"}</SectionHeading>

      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-10 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        suppressHydrationWarning
      >
        {isMounted ? t("about_hero") : null}
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {skillAreas.map((area, index) => (
          <SkillCard
            key={area.titleKey}
            title={isMounted ? t(area.titleKey) : area.titleKey}
            stack={area.stack}
            index={index}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}
