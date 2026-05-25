import { useState, useCallback, useEffect, useRef, RefObject } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

interface UseProjectsScrollProps {
  containerRef: RefObject<HTMLDivElement | null>;
  totalSections: number;
  scrollYProgress: MotionValue<number>;
}

interface UseProjectsScrollReturn {
  currentSection: number;
  isInProjectsSection: boolean;
}

const ANIMATION_DURATION = 800;
const SCROLL_COOLDOWN = 300;

const easeInOutQuart = (t: number): number => {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
};

export function useProjectsScroll({
  containerRef,
  totalSections,
  scrollYProgress,
}: UseProjectsScrollProps): UseProjectsScrollReturn {
  const [currentSection, setCurrentSection] = useState(0);
  const [isInProjectsSection, setIsInProjectsSection] = useState(false);
  const isAnimatingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const inSection = latest > 0 && latest < 1;
    setIsInProjectsSection(inSection);

    const sectionIndex = Math.floor(latest * totalSections);
    setCurrentSection(Math.min(sectionIndex, totalSections - 1));
  });

  const smoothScrollTo = useCallback((targetY: number) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const startY = window.scrollY;
    const difference = targetY - startY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
      const easeProgress = easeInOutQuart(progress);

      window.scrollTo(0, startY + difference * easeProgress);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateScroll);
      } else {
        isAnimatingRef.current = false;
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateScroll);
  }, []);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!isInProjectsSection || !containerRef.current) return;

      const now = performance.now();
      if (now - lastScrollTimeRef.current < SCROLL_COOLDOWN) {
        e.preventDefault();
        return;
      }
      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = currentSection + direction;

      if (nextSection < 0 || nextSection >= totalSections) return;

      e.preventDefault();
      isAnimatingRef.current = true;
      lastScrollTimeRef.current = now;

      const containerTop =
        containerRef.current.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = containerRef.current.offsetHeight;
      const slideHeight = sectionHeight / totalSections;
      const targetScroll = containerTop + nextSection * slideHeight;

      smoothScrollTo(targetScroll);
    },
    [
      isInProjectsSection,
      currentSection,
      totalSections,
      smoothScrollTo,
      containerRef,
    ]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleWheel]);

  return {
    currentSection,
    isInProjectsSection,
  };
}
