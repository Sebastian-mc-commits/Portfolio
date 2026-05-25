"use client";

import { useState, useEffect } from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useSectionInView } from "@/lib/hooks";
import { useTranslation } from "react-i18next";
import experienceData from "@/lib/data/experience";
import { ExperienceItem } from "./ui";

export default function Experience() {
  const { ref } = useSectionInView("Experience", 0.2);
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="experience" ref={ref} className="scroll-mt-36 mb-28 sm:mb-40">
      <SectionHeading suppressHydrationWarning>{isMounted ? t("t_experience") : "Experience"}</SectionHeading>
      <VerticalTimeline lineColor="">
        {experienceData.map(item => (
          <ExperienceItem {...item} key={item.id} />
        ))}
      </VerticalTimeline>
    </section>
  );
}
