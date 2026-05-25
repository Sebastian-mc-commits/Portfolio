"use client";

import { Icon } from "@iconify/react";
import { TechStackTagProps } from "@/lib/interfaces/project";

interface TechConfig {
    icon: string;
    color: string;
    label?: string;
}

const techConfigMap: Record<string, TechConfig> = {
    PYTHON: { icon: "devicon:python", color: "#3776AB" },
    TYPESCRIPT: { icon: "devicon:typescript", color: "#3178C6" },
    JAVASCRIPT: { icon: "devicon:javascript", color: "#F7DF1E" },
    "VANILLA JS": { icon: "devicon:javascript", color: "#F7DF1E" },
    REACT: { icon: "devicon:react", color: "#61DAFB" },
    "REACT JS": { icon: "devicon:react", color: "#61DAFB" },
    NEXTJS: { icon: "devicon:nextjs", color: "#ffffff" },
    "NEXT JS": { icon: "devicon:nextjs", color: "#ffffff" },
    "NEXT.JS 15": { icon: "devicon:nextjs", color: "#ffffff" },
    "NEXT.JS": { icon: "devicon:nextjs", color: "#ffffff" },
    NODEJS: { icon: "devicon:nodejs", color: "#339933" },
    "NODE JS": { icon: "devicon:nodejs", color: "#339933" },
    NESTJS: { icon: "devicon:nestjs", color: "#E0234E" },
    "NEST JS": { icon: "devicon:nestjs", color: "#E0234E" },
    FASTAPI: { icon: "devicon:fastapi", color: "#009688" },
    KAFKA: { icon: "devicon:apachekafka", color: "#231F20" },
    "AWS COGNITO": { icon: "mdi:aws", color: "#FF9900" },
    "RADIX UI": { icon: "simple-icons:radixui", color: "#ffffff" },
    SENDGRID: { icon: "simple-icons:sendgrid", color: "#1A82E2" },
    TURBOPACK: { icon: "devicon:nextjs", color: "#ffffff" },
    "REACT HOOK FORM": { icon: "simple-icons:reacthookform", color: "#EC5990" },
    "DND KIT": { icon: "mdi:drag-variant", color: "#6366F1" },
    POSTGRESQL: { icon: "devicon:postgresql", color: "#4169E1" },
    MONGODB: { icon: "devicon:mongodb", color: "#47A248" },
    REDIS: { icon: "devicon:redis", color: "#DC382D" },
    DOCKER: { icon: "devicon:docker", color: "#2496ED" },
    TAILWINDCSS: { icon: "devicon:tailwindcss", color: "#06B6D4" },
    TAILWIND: { icon: "devicon:tailwindcss", color: "#06B6D4" },
    RUST: { icon: "devicon:rust", color: "#DEA584" },
    PHP: { icon: "devicon:php", color: "#777BB4" },
    WORDPRESS: { icon: "devicon:wordpress", color: "#21759B" },
    MYSQL: { icon: "devicon:mysql", color: "#4479A1" },
    SELENIUM: { icon: "devicon:selenium", color: "#43B02A" },
    "SELENIUM GRID": { icon: "devicon:selenium", color: "#43B02A" },
    "SELENIUM HUB": { icon: "devicon:selenium", color: "#43B02A" },
    CELERY: { icon: "simple-icons:celery", color: "#37814A" },
    PANDAS: { icon: "devicon:pandas", color: "#150458" },
    NUMPY: { icon: "devicon:numpy", color: "#013243" },
    HTML: { icon: "devicon:html5", color: "#E34F26" },
    HTML5: { icon: "devicon:html5", color: "#E34F26" },
    CSS: { icon: "devicon:css3", color: "#1572B6" },
    CSS3: { icon: "devicon:css3", color: "#1572B6" },
    "GOOGLE CLOUD": { icon: "devicon:googlecloud", color: "#4285F4" },
    AWS: { icon: "devicon:amazonwebservices-wordmark", color: "#FF9900" },
    "AWS S3": { icon: "devicon:amazonwebservices-wordmark", color: "#FF9900" },
    PLAYWRIGHT: { icon: "devicon:playwright", color: "#2EAD33" },
    EXPRESS: { icon: "devicon:express", color: "#ffffff" },
    "EXPRESS JS": { icon: "devicon:express", color: "#ffffff" },
    JWT: { icon: "simple-icons:jsonwebtokens", color: "#000000" },
    SQLALCHEMY: { icon: "devicon:sqlalchemy", color: "#D71F00" },
    "TAURI JS": { icon: "devicon:tauri", color: "#FFC131" },
    TAURI: { icon: "devicon:tauri", color: "#FFC131" },
    "DESKTOP APP": { icon: "mdi:desktop-mac", color: "#6366F1" },
    NLP: { icon: "mdi:brain", color: "#8B5CF6" },
    AI: { icon: "mdi:robot", color: "#8B5CF6" },
    "MACHINE LEARNING": { icon: "mdi:brain", color: "#8B5CF6" },
    "LEGAL TECH": { icon: "mdi:scale-balance", color: "#6366F1" },
    "WORDPRESS PLUGIN DEVELOPMENT": { icon: "devicon:wordpress", color: "#21759B" },
    GIT: { icon: "devicon:git", color: "#F05032" },
    GITHUB: { icon: "devicon:github", color: "#ffffff" },
    FIREBASE: { icon: "devicon:firebase", color: "#FFCA28" },
    GRAPHQL: { icon: "devicon:graphql", color: "#E10098" },
    REDUX: { icon: "devicon:redux", color: "#764ABC" },
    SASS: { icon: "devicon:sass", color: "#CC6699" },
    VUE: { icon: "devicon:vuejs", color: "#4FC08D" },
    ANGULAR: { icon: "devicon:angular", color: "#DD0031" },
    SVELTE: { icon: "devicon:svelte", color: "#FF3E00" },
    FLUTTER: { icon: "devicon:flutter", color: "#02569B" },
    DART: { icon: "devicon:dart", color: "#0175C2" },
    KOTLIN: { icon: "devicon:kotlin", color: "#7F52FF" },
    SWIFT: { icon: "devicon:swift", color: "#F05138" },
    GO: { icon: "devicon:go", color: "#00ADD8" },
    JAVA: { icon: "devicon:java", color: "#007396" },
    "C#": { icon: "devicon:csharp", color: "#239120" },
    "C++": { icon: "devicon:cplusplus", color: "#00599C" },
    C: { icon: "devicon:c", color: "#A8B9CC" },
    LINUX: { icon: "devicon:linux", color: "#FCC624" },
    NGINX: { icon: "devicon:nginx", color: "#009639" },
    VERCEL: { icon: "devicon:vercel", color: "#ffffff" },
    FIGMA: { icon: "devicon:figma", color: "#F24E1E" },
};

const defaultConfig: TechConfig = {
    icon: "mdi:code-tags",
    color: "#6366F1"
};

export function getTechIconConfig(tag: string): TechConfig {
    const normalizedTag = tag.toUpperCase();
    return techConfigMap[normalizedTag] || techConfigMap[tag] || defaultConfig;
}

export function TechStackTag({ tag, projectId }: TechStackTagProps) {
    const config = getTechIconConfig(tag);

    return (
        <div
            key={`${projectId}-tag-${tag}`}
            className="flex flex-col items-center justify-center p-4 min-w-[120px] hover:scale-110 transition-transform"
        >
            <Icon
                icon={config.icon}
                style={{ color: config.color }}
                className="w-20 h-20 mb-2 drop-shadow-lg"
            />
            <span className="text-sm font-medium text-white/90 text-center">
                {tag}
            </span>
        </div>
    );
}
