"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skill } from "@/lib/data/skills";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

interface SkillsMarqueeProps {
  skills: Skill[];
  t: (key: string) => string;
}

function SkillTag({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <div className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 cursor-default group">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${skill.color}15` }}
      >
        <Icon className="w-4 h-4" style={{ color: skill.color }} />
      </div>
      <span className="font-medium text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
        {skill.name}
      </span>
    </div>
  );
}

export function SkillsMarquee({ skills, t }: SkillsMarqueeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="marquee"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden py-4"
          >
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex gap-4 w-fit"
              animate={{ x: ["0%", "-33.333%"] }}
              transition={{
                x: {
                  duration: 80,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {duplicatedSkills.map((skill, index) => (
                <SkillTag key={`${skill.name}-${index}`} skill={skill} />
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="py-4 px-4"
          >
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02, duration: 0.3 }}
                >
                  <SkillTag skill={skill} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        >
          {isExpanded ? (
            <>
              <span>{t("b_collapse")}</span>
              <HiChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>{t("b_view_all_skills")}</span>
              <HiChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
