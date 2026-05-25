"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SkillCategory } from "@/lib/data/skills";
import { SkillCard } from "./SkillCard";

interface SkillsGalleryProps {
  categories: SkillCategory[];
}

interface CategoryRowProps {
  category: SkillCategory;
  index: number;
  reverse?: boolean;
}

function CategoryRow({ category, index, reverse }: CategoryRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [-100, 100] : [100, -100]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  );

  return (
    <motion.div
      ref={rowRef}
      className="relative py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <div className="mb-6 px-8 md:px-16">
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          <div className={`w-1.5 h-12 rounded-full bg-gradient-to-b ${category.gradient}`} />
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {category.title}
            </h3>
            <p className="text-white/50 text-sm">{category.description}</p>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent ml-4" />
        </motion.div>
      </div>

      <motion.div style={{ x, opacity }} className="relative">
        <div className="flex gap-4 px-8 md:px-16 overflow-visible">
          {category.skills.map((skill, skillIndex) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={skillIndex}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function SkillsGallery({ categories }: SkillsGalleryProps) {
  return (
    <div className="relative bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative py-12">
        {categories.map((category, index) => (
          <CategoryRow
            key={category.id}
            category={category}
            index={index}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </div>
  );
}
