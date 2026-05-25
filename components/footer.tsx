"use client";

import mainUser from "@/lib/data/mainUser";
import { useTransitionOrigin } from "@/context/transition-context";

export default function Footer() {
  const { activeProjectBg } = useTransitionOrigin();
  const isOnProjectPage = !!activeProjectBg;

  const textStyle = isOnProjectPage && activeProjectBg.textColor
    ? { color: activeProjectBg.textColor, opacity: 0.5 }
    : undefined;

  const textClass = isOnProjectPage && activeProjectBg.textClass
    ? `${activeProjectBg.textClass} opacity-50`
    : "text-gray-500";

  return (
    <footer className={`mb-10 px-4 text-center ${textClass}`} style={textStyle}>
      <small className="mb-2 block text-xs">
        &copy; 2025 {mainUser.name}.
      </small>
      <p className="text-xs">
        built with
        React & Next.js (App Router & Server Actions), TypeScript, Tailwind CSS,
        Framer Motion & React, Render Hosting.
      </p>
    </footer>
  );
}
