"use client";

import { useState, useEffect } from "react";
import { useSectionInView } from "@/lib/hooks";
import { useTranslation } from "react-i18next";
import { allSkills } from "@/lib/data/skills";
import { SkillsMarquee } from "@/components/ui/Skills";
import { motion } from "framer-motion";

export default function Skills() {
  const { ref } = useSectionInView("Skills", 0.3);
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section ref={ref} id="skills" className="mb-28 max-w-[53rem] scroll-mt-36 text-center sm:mb-40 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-medium capitalize mb-8 text-center" suppressHydrationWarning>
          {isMounted ? t("t_skills") : "My Skills"}
        </h2>
      </motion.div>

      <SkillsMarquee skills={allSkills} t={t} />
    </section>
  );
}
