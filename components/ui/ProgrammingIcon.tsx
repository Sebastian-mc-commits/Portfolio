import Image from "next/image";
import React from "react";

// Programming Icons
import RustIcon from "@/public/images/programming/icons8-rust-programming-language-48.png";
import PythonIcon from "@/public/images/programming/python.png";
import TypeScriptIcon from "@/public/images/programming/typescript.png";
import MySQLIcon from "@/public/images/programming/mysql.png";
import ProgrammingIcon from "@/public/images/programming/programming.png";

// Define icon types
export type ProgrammingIconType = 
  | "rust" 
  | "python" 
  | "typescript" 
  | "mysql" 
  | "programming"
  | "challenge"
  | "feature"
  | "process"
  | "mern"
  | "n8n"
  | "devops"
  | "php"
  | "docker"
  | "database"
  | "approach"
  | "ai"
  | "backend"
  | "project-breakdown"
  | "database-first"
  | "security-architecture"
  | "ai-efficiency"
  | "ai-precision"
  | "ai-quality"
  | "backend-architecture"
  | "advanced-technologies";

interface ProgrammingIconProps {
  type: ProgrammingIconType;
  size?: number;
  className?: string;
}

const iconMap = {
  rust: RustIcon,
  python: PythonIcon,
  typescript: TypeScriptIcon,
  mysql: MySQLIcon,
  programming: ProgrammingIcon,
  challenge: ProgrammingIcon,
  feature: ProgrammingIcon,
  process: ProgrammingIcon,
  mern: TypeScriptIcon, // Using TypeScript for MERN
  n8n: ProgrammingIcon,
  devops: ProgrammingIcon,
  php: ProgrammingIcon,
  docker: ProgrammingIcon,
  database: MySQLIcon,
  approach: ProgrammingIcon,
  ai: ProgrammingIcon,
  backend: PythonIcon,
  // Approach icons
  "project-breakdown": ProgrammingIcon,
  "database-first": MySQLIcon,
  "security-architecture": ProgrammingIcon,
  // AI icons
  "ai-efficiency": ProgrammingIcon,
  "ai-precision": ProgrammingIcon,
  "ai-quality": ProgrammingIcon,
  // Specialty icons
  "backend-architecture": PythonIcon,
  "advanced-technologies": ProgrammingIcon
};

export const ProgrammingIconComponent: React.FC<ProgrammingIconProps> = ({ 
  type, 
  size = 24, 
  className = "" 
}) => {
  const iconSrc = iconMap[type] || iconMap.programming;
  
  return (
    <Image
      src={iconSrc}
      alt={`${type} icon`}
      width={size}
      height={size}
      className={`inline-block ${className}`}
    />
  );
};

// Enhanced SVG Icons for different categories
export const KnowledgeIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 20, 
  className = "" 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 2L3 7L12 12L21 7L12 2Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M3 17L12 22L21 17" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M3 12L12 17L21 12" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const ApproachIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 20, 
  className = "" 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M3 3V9H9V3H3Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M15 3V9H21V3H15Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 15V21H15V15H9Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 9V15" 
      stroke="currentColor" 
      strokeWidth="2"
    />
    <path 
      d="M9 12H15" 
      stroke="currentColor" 
      strokeWidth="2"
    />
  </svg>
);

export const AIIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 20, 
  className = "" 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M9.663 17H7.5C5.567 17 4 15.433 4 13.5C4 11.567 5.567 10 7.5 10C7.5 7.239 9.739 5 12.5 5S17.5 7.239 17.5 10C19.433 10 21 11.567 21 13.5C21 15.433 19.433 17 17.5 17H14.337" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 13V21" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M16 16L12 20L8 16" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const SpecialtyIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 20, 
  className = "" 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 2L15.09 8.26L22 9L16 14.74L17.18 21.02L12 18.77L6.82 21.02L8 14.74L2 9L8.91 8.26L12 2Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Updated previous icons
export const ChallengeIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 20, 
  className = "" 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" 
      fill="currentColor"
    />
    <path 
      d="M19 15L19.74 17.74L22.5 18.5L19.74 19.26L19 22L18.26 19.26L15.5 18.5L18.26 17.74L19 15Z" 
      fill="currentColor"
    />
    <path 
      d="M5 9L5.74 11.74L8.5 12.5L5.74 13.26L5 16L4.26 13.26L1.5 12.5L4.26 11.74L5 9Z" 
      fill="currentColor"
    />
  </svg>
);

export const FeatureIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 20, 
  className = "" 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const ProcessIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 20, 
  className = "" 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);