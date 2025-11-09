"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import skills, { Skill } from "@/lib/data/skills";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.03 * index,
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  }),
};

const categoryVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

const categoryTitles = {
  frontend: { icon: "Frontend", title: "Frontend Development", color: "text-gray-700 dark:text-gray-300" },
  backend: { icon: "Backend", title: "Backend Development", color: "text-gray-700 dark:text-gray-300" },
  database: { icon: "Database", title: "Database Technologies", color: "text-gray-700 dark:text-gray-300" },
  devops: { icon: "DevOps", title: "DevOps & Cloud", color: "text-gray-700 dark:text-gray-300" },
  tools: { icon: "Tools", title: "Development Tools", color: "text-gray-700 dark:text-gray-300" },
  ai: { icon: "AI", title: "AI & Automation", color: "text-gray-700 dark:text-gray-300" },
  soft: { icon: "Skills", title: "Professional Skills", color: "text-gray-700 dark:text-gray-300" },
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const filteredSkills = selectedCategory 
    ? skillsByCategory[selectedCategory] || []
    : skills;

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-32 max-w-[75rem] scroll-mt-28 text-center sm:mb-40 px-4"
    >
      <SectionHeading>{t("t_skills") || "Skills & Technologies"}</SectionHeading>
      
      {/* Category Filter */}
      <motion.div 
        className="mb-16 flex flex-wrap justify-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          onClick={() => setSelectedCategory(null)}
          className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border-2 ${
            selectedCategory === null
              ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-lg"
              : "bg-transparent text-gray-700 border-gray-300 dark:text-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          All Skills
        </motion.button>
        
        {Object.entries(categoryTitles).map(([category, { icon, title, color }]) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border-2 ${
              selectedCategory === category
                ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-lg"
                : "bg-transparent text-gray-700 border-gray-300 dark:text-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {title}
          </motion.button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      {selectedCategory ? (
        // Category View
        <motion.div
          key={selectedCategory}
          variants={categoryVariants}
          initial="initial"
          animate="animate"
          className="space-y-10"
        >
          <div className="text-left">
            <div className="text-center mb-12">
              <h3 className={`text-3xl font-bold mb-2 ${categoryTitles[selectedCategory as keyof typeof categoryTitles]?.color}`}>
                {categoryTitles[selectedCategory as keyof typeof categoryTitles]?.title}
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-gray-300 to-gray-500 dark:from-gray-600 dark:to-gray-400 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  animate="animate"
                  custom={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                  whileHover={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
                      {skill.icon}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      skill.level === 'expert' ? 'bg-gray-800 text-white' :
                      skill.level === 'advanced' ? 'bg-gray-600 text-white' :
                      skill.level === 'intermediate' ? 'bg-gray-500 text-white' :
                      'bg-gray-400 text-white'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                  <h4 className="font-bold text-lg leading-tight group-hover:text-opacity-80 transition-all text-gray-800 dark:text-gray-100">
                    {skill.name}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        // All Skills View
        <motion.div 
          className="space-y-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <motion.div
              key={category}
              variants={categoryVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="text-left"
            >
              <div className="text-center mb-10">
                <h3 className={`text-2xl font-bold mb-3 ${categoryTitles[category as keyof typeof categoryTitles]?.color}`}>
                  {categoryTitles[category as keyof typeof categoryTitles]?.title}
                </h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-gray-300 to-gray-500 dark:from-gray-600 dark:to-gray-400 mx-auto rounded-full"></div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {categorySkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={fadeInAnimationVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    custom={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-full px-6 py-4 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                    whileHover={{ 
                      scale: 1.05,
                      y: -4,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-xs font-mono font-bold px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
                      {skill.icon}
                    </span>
                    <span className="font-semibold group-hover:text-opacity-80 transition-all text-gray-800 dark:text-gray-200">
                      {skill.name}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      skill.level === 'expert' ? 'bg-gray-800 text-white' :
                      skill.level === 'advanced' ? 'bg-gray-600 text-white' :
                      skill.level === 'intermediate' ? 'bg-gray-500 text-white' :
                      'bg-gray-400 text-white'
                    }`}>
                      {skill.level}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
