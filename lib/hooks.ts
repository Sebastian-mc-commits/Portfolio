import { useActiveSectionContext } from "@/context/active-section-context";
import { useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import type { SectionName } from "./types";

export { useOptimizedImage, useOptimizedImageList } from "./hooks/useOptimizedImage";
export { useProjectState } from "./hooks/useProjectState";

export function useSectionInView(sectionName: SectionName, threshold = 0.5) {
  const { ref, inView } = useInView({
    threshold,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    // Simple logic: if in view and not recently clicked, set active
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(sectionName);
    }
  }, [inView, setActiveSection, timeOfLastClick, sectionName]);

  return {
    ref,
  };
}
