"use client";

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
  const { ref } = useSectionInView("Experience");
  const { t } = useTranslation()

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>{t("t_experience")}</SectionHeading>
      <VerticalTimeline lineColor="">
        {experienceData.map(item => (
          <ExperienceItem {...item} key={item.id} />
        ))}
      </VerticalTimeline>
    </section>
  );
}
