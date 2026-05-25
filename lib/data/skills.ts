import { IconType } from "react-icons";
import {
  SiPython,
  SiFastapi,
  SiCelery,
  SiPhp,
  SiWordpress,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiGooglecloud,
  SiDocker,
  SiGit,
  SiSelenium,
  SiPlaywright,
  SiTauri,
  SiRust,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { TbBrandOpenai, TbWorldWww } from "react-icons/tb";
import { HiTranslate } from "react-icons/hi";
import { MdOutlineTranslate } from "react-icons/md";

export interface Skill {
  name: string;
  icon: IconType;
  category: "frontend" | "backend" | "database" | "devops" | "tools" | "soft";
  level: "beginner" | "intermediate" | "advanced" | "expert";
  color: string;
  years?: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  gradient: string;
  skills: Skill[];
}

const backendSkills: Skill[] = [
  { name: "Python", icon: SiPython, category: "backend", level: "expert", color: "#3776AB", years: 5 },
  { name: "FastAPI", icon: SiFastapi, category: "backend", level: "expert", color: "#009688", years: 3 },
  { name: "Celery", icon: SiCelery, category: "backend", level: "advanced", color: "#37814A", years: 2 },
  { name: "PHP", icon: SiPhp, category: "backend", level: "advanced", color: "#777BB4", years: 4 },
  { name: "WordPress", icon: SiWordpress, category: "backend", level: "expert", color: "#21759B", years: 4 },
  { name: "Node.js", icon: SiNodedotjs, category: "backend", level: "advanced", color: "#339933", years: 3 },
  { name: "Express.js", icon: SiExpress, category: "backend", level: "advanced", color: "#ffffff", years: 3 },
  { name: "Nest.js", icon: SiNestjs, category: "backend", level: "intermediate", color: "#E0234E", years: 1 },
];

const frontendSkills: Skill[] = [
  { name: "React", icon: SiReact, category: "frontend", level: "advanced", color: "#61DAFB", years: 3 },
  { name: "Next.js", icon: SiNextdotjs, category: "frontend", level: "advanced", color: "#ffffff", years: 2 },
  { name: "TypeScript", icon: SiTypescript, category: "frontend", level: "advanced", color: "#3178C6", years: 2 },
  { name: "JavaScript", icon: SiJavascript, category: "frontend", level: "expert", color: "#F7DF1E", years: 5 },
  { name: "HTML5", icon: SiHtml5, category: "frontend", level: "expert", color: "#E34F26", years: 6 },
  { name: "CSS3", icon: SiCss3, category: "frontend", level: "advanced", color: "#1572B6", years: 6 },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "frontend", level: "advanced", color: "#06B6D4", years: 2 },
];

const databaseSkills: Skill[] = [
  { name: "PostgreSQL", icon: SiPostgresql, category: "database", level: "expert", color: "#4169E1", years: 4 },
  { name: "MongoDB", icon: SiMongodb, category: "database", level: "advanced", color: "#47A248", years: 2 },
  { name: "MySQL", icon: SiMysql, category: "database", level: "advanced", color: "#4479A1", years: 4 },
  { name: "Redis", icon: SiRedis, category: "database", level: "advanced", color: "#DC382D", years: 2 },
];

const devopsSkills: Skill[] = [
  { name: "Google Cloud", icon: SiGooglecloud, category: "devops", level: "advanced", color: "#4285F4", years: 3 },
  { name: "Docker", icon: SiDocker, category: "devops", level: "intermediate", color: "#2496ED", years: 2 },
  { name: "Git", icon: SiGit, category: "devops", level: "advanced", color: "#F05032", years: 5 },
  { name: "AWS", icon: FaAws, category: "devops", level: "beginner", color: "#FF9900", years: 1 },
];

const toolsSkills: Skill[] = [
  { name: "Selenium", icon: SiSelenium, category: "tools", level: "advanced", color: "#43B02A", years: 3 },
  { name: "Playwright", icon: SiPlaywright, category: "tools", level: "advanced", color: "#2EAD33", years: 2 },
  { name: "n8n", icon: TbWorldWww, category: "tools", level: "intermediate", color: "#EA4B71", years: 1 },
  { name: "Tauri", icon: SiTauri, category: "tools", level: "intermediate", color: "#FFC131", years: 1 },
  { name: "Rust", icon: SiRust, category: "tools", level: "beginner", color: "#ffffff", years: 1 },
  { name: "AI Tools", icon: TbBrandOpenai, category: "tools", level: "expert", color: "#10A37F", years: 2 },
];

const softSkills: Skill[] = [
  { name: "English B2", icon: HiTranslate, category: "soft", level: "advanced", color: "#3B82F6" },
  { name: "Spanish Native", icon: MdOutlineTranslate, category: "soft", level: "expert", color: "#EF4444" },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend",
    description: "Server-side development & APIs",
    gradient: "from-emerald-500 to-teal-600",
    skills: backendSkills,
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "User interfaces & experiences",
    gradient: "from-blue-500 to-cyan-600",
    skills: frontendSkills,
  },
  {
    id: "database",
    title: "Database",
    description: "Data storage & management",
    gradient: "from-violet-500 to-purple-600",
    skills: databaseSkills,
  },
  {
    id: "devops",
    title: "DevOps",
    description: "Infrastructure & deployment",
    gradient: "from-orange-500 to-amber-600",
    skills: devopsSkills,
  },
  {
    id: "tools",
    title: "Tools",
    description: "Development & automation",
    gradient: "from-pink-500 to-rose-600",
    skills: toolsSkills,
  },
  {
    id: "soft",
    title: "Languages",
    description: "Communication skills",
    gradient: "from-slate-500 to-zinc-600",
    skills: softSkills,
  },
];

export const allSkills = [
  ...backendSkills,
  ...frontendSkills,
  ...databaseSkills,
  ...devopsSkills,
  ...toolsSkills,
  ...softSkills,
];

export default allSkills;
