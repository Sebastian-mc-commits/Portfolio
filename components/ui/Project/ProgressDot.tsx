"use client";

import { motion, useTransform, useScroll } from "framer-motion";

interface ProgressDotProps {
  index: number;
  totalProjects: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

export function ProgressDot({
  index,
  totalProjects,
  scrollYProgress,
}: ProgressDotProps) {
  const segmentSize = 1 / totalProjects;
  const start = index * segmentSize;
  const end = (index + 1) * segmentSize;

  const width = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.3, end - segmentSize * 0.3, end],
    [8, 32, 32, 8]
  );

  const opacity = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.3, end - segmentSize * 0.3, end],
    [0.3, 1, 1, 0.3]
  );

  return (
    <motion.div
      className="h-2 rounded-full bg-white"
      style={{ width, opacity }}
    />
  );
}
