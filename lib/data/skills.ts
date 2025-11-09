
export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'languages' | 'tools' | 'ai' | 'soft';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  color: string;
}

export default [
  // Frontend Technologies
  { name: "React", icon: "⚛️", category: "frontend", level: "expert", color: "" },
  { name: "Next.js", icon: "▲", category: "frontend", level: "expert", color: "" },
  { name: "TypeScript", icon: "TS", category: "frontend", level: "expert", color: "" },
  { name: "JavaScript", icon: "JS", category: "frontend", level: "expert", color: "" },
  { name: "HTML5", icon: "HTML", category: "frontend", level: "expert", color: "" },
  { name: "CSS3", icon: "CSS", category: "frontend", level: "expert", color: "" },
  { name: "Tailwind CSS", icon: "TW", category: "frontend", level: "expert", color: "" },
  { name: "Framer Motion", icon: "FM", category: "frontend", level: "advanced", color: "" },
  { name: "Redux", icon: "RX", category: "frontend", level: "advanced", color: "" },

  // Backend Technologies
  { name: "Node.js", icon: "NODE", category: "backend", level: "expert", color: "" },
  { name: "Express.js", icon: "EXP", category: "backend", level: "expert", color: "" },
  { name: "PHP", icon: "PHP", category: "backend", level: "advanced", color: "" },
  { name: "Python", icon: "PY", category: "backend", level: "advanced", color: "" },
  { name: "Rust (Enthusiast)", icon: "RS", category: "backend", level: "beginner", color: "" },

  // Database Technologies
  { name: "MongoDB", icon: "MONGO", category: "database", level: "expert", color: "" },
  { name: "MySQL", icon: "SQL", category: "database", level: "expert", color: "" },
  { name: "Prisma", icon: "PRISMA", category: "database", level: "advanced", color: "" },
  { name: "PostgreSQL", icon: "PSQL", category: "database", level: "advanced", color: "" },

  // DevOps & Tools
  { name: "Git", icon: "GIT", category: "devops", level: "expert", color: "" },
  { name: "Docker", icon: "DOCKER", category: "devops", level: "intermediate", color: "" },
  { name: "AWS", icon: "AWS", category: "devops", level: "beginner", color: "" },
  { name: "Google Cloud", icon: "GCP", category: "devops", level: "beginner", color: "" },
  { name: "Vercel", icon: "VERCEL", category: "devops", level: "advanced", color: "" },
  { name: "Tauri", icon: "TAURI", category: "tools", level: "beginner", color: "" },

  // AI & Machine Learning
  { name: "ChatGPT API", icon: "GPT", category: "ai", level: "advanced", color: "" },
  { name: "OpenAI", icon: "AI", category: "ai", level: "advanced", color: "" },
  { name: "AI Automation", icon: "AUTO", category: "ai", level: "advanced", color: "" },
  { name: "n8n", icon: "N8N", category: "ai", level: "advanced", color: "" },

  // Soft Skills & Languages
  { name: "English B2", icon: "EN", category: "soft", level: "advanced", color: "" },
  { name: "Spanish Native", icon: "ES", category: "soft", level: "expert", color: "" },
  { name: "Problem Solving", icon: "PS", category: "soft", level: "expert", color: "" },
  { name: "Team Leadership", icon: "LEAD", category: "soft", level: "advanced", color: "" },
] as Skill[];