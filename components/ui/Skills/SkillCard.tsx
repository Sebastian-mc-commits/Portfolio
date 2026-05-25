"use client";

import { motion } from "framer-motion";
import { Skill } from "@/lib/data/skills";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const levelToPercent: Record<string, number> = {
  beginner: 25,
  intermediate: 50,
  advanced: 75,
  expert: 95,
};

const levelToLabel: Record<string, string> = {
  beginner: "Learning",
  intermediate: "Familiar",
  advanced: "Proficient",
  expert: "Expert",
};

export function SkillCard({ skill, index }: SkillCardProps) {
  const Icon = skill.icon;
  const percent = levelToPercent[skill.level] || 50;
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <motion.div
      className="flex-shrink-0 w-[200px] h-[240px] relative group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-black/20">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${skill.color}20 0%, transparent 60%)`,
          }}
        />

        <div className="relative h-full flex flex-col items-center justify-center p-6">
          <div className="relative w-20 h-20 mb-4">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-white/10"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="36"
                stroke={skill.color}
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 + 0.3, duration: 1, ease: "easeOut" }}
                style={{ strokeDasharray: circumference }}
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundColor: `${skill.color}20` }}
              >
                <Icon className="w-7 h-7" style={{ color: skill.color }} />
              </div>
            </div>
          </div>

          <h4 className="text-white font-semibold text-sm text-center mb-1 tracking-tight">
            {skill.name}
          </h4>

          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${skill.color}20`,
              color: skill.color,
            }}
          >
            {levelToLabel[skill.level]}
          </span>

          {skill.years && (
            <span className="text-white/40 text-xs mt-2 font-mono">
              {skill.years}+ years
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
