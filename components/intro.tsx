"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import ProfilePhoto from "@/public/images/Sebas_M.jpg"
import { useTranslation } from "react-i18next";
import mainUser from "@/lib/data/mainUser";
import SidePanel from "./SidePanel";
import {
  ProgrammingIconComponent,
  KnowledgeIcon,
  ApproachIcon,
  AIIcon,
  SpecialtyIcon
} from "./ui/ProgrammingIcon";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { t, i18n } = useTranslation()
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const [isSidePanelOpened, setIsSidePanelOpened] = useState(false);
  const [shouldShowStickyButton, setShouldShowStickyButton] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldShowStickyButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
    >
      <SideBarAbilities isOpen={isSidePanelOpened} onClose={() => setIsSidePanelOpened(false)} />
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          >
            <Image
              src={ProfilePhoto}
              alt={mainUser.name}
              width="200"
              height="200"
              quality="95"
              priority={true}
              className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
            />
          </motion.div>
        </div>
      </div>

      <motion.h1
        className="mb-10 mt-4 px-4 text-1xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {t("presentation")}
      </motion.h1>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        {/* <Link
          href="#contact"
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          {t("b_contact")}{" "}
          <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
        </Link> */}

        <a
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
          href={i18n.language === "en" ? "/PDF/en_CV_v2.pdf" : "/PDF/CV_v2.pdf"}
          download
        >
          {t("b_resume")}{" "}
          <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
        </a>

        <a
          className="bg-white p-4 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://www.linkedin.com/in/sebastian-machado-89a476192/"
          target="_blank"
        >
          <BsLinkedin />
        </a>

        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://github.com/Sebastian-mc-commits"
          target="_blank"
        >
          <FaGithubSquare />
        </a>

        {/* Sticky Button */}
        <AnimatePresence>
          {!isSidePanelOpened && (
            <motion.div
              initial={{ opacity: 0, scale: 0, x: 100 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                rotate: [0, -1, 1, -1, 0],
              }}
              exit={{ opacity: 0, scale: 0, x: 100 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                rotate: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: 1
                }
              }}
              className="fixed top-6 right-6 z-50"
            >
              <motion.button
                onClick={() => {
                  setIsSidePanelOpened(true);
                  setShouldShowStickyButton(false);
                }}
                className="group relative bg-black text-white p-4 rounded-full shadow-2xl hover:shadow-3xl border-2 border-transparent hover:border-gray-600 dark:bg-white dark:text-black dark:hover:border-gray-300 transition-all duration-300"
                style={{
                  boxShadow: '0 12px 48px rgba(0, 0, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: '0 16px 56px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.15)'
                }}
                whileTap={{ scale: 0.9 }}
              >
                <KnowledgeIcon size={24} className="group-hover:rotate-12 transition-transform" />

                {
                  shouldShowStickyButton && (
                    <>
                      <div className="absolute inset-0 rounded-full border-2 border-black/20 dark:border-white/20 animate-ping" />

                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </>
                  )
                }

                {/* Tooltip */}
                <div className="absolute -bottom-12 right-0 bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {t("intro_side_panel_title") || "Technical Expertise"}
                  <div className="absolute top-0 right-4 transform -translate-y-1 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black dark:border-b-white" />
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

interface SideBarAbilitiesProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBarAbilities = ({ isOpen, onClose }: SideBarAbilitiesProps) => {
  const { t } = useTranslation();


  const knowledgeItems = [
    { key: "mern", icon: "typescript" as const, titleKey: "knowledge_mern_title", descKey: "knowledge_mern_desc", levelKey: "knowledge_mern_level" },
    { key: "python", icon: "python" as const, titleKey: "knowledge_python_title", descKey: "knowledge_python_desc", levelKey: "knowledge_python_level" },
    { key: "n8n", icon: "programming" as const, titleKey: "knowledge_n8n_title", descKey: "knowledge_n8n_desc", levelKey: "knowledge_n8n_level" },
    { key: "devops", icon: "programming" as const, titleKey: "knowledge_devops_title", descKey: "knowledge_devops_desc", levelKey: "knowledge_devops_level" },
    { key: "php", icon: "programming" as const, titleKey: "knowledge_php_title", descKey: "knowledge_php_desc", levelKey: "knowledge_php_level" },
    { key: "rust", icon: "rust" as const, titleKey: "knowledge_rust_title", descKey: "knowledge_rust_desc", levelKey: "knowledge_rust_level" },
    { key: "databases", icon: "mysql" as const, titleKey: "knowledge_databases_title", descKey: "knowledge_databases_desc", levelKey: "knowledge_databases_level" },
    { key: "docker", icon: "programming" as const, titleKey: "knowledge_docker_title", descKey: "knowledge_docker_desc", levelKey: "knowledge_docker_level" },
  ];


  const approachItems = [
    { key: "breakdown", icon: "project-breakdown" as const, titleKey: "approach_breakdown_title", descKey: "approach_breakdown_desc" },
    { key: "database", icon: "database-first" as const, titleKey: "approach_database_title", descKey: "approach_database_desc" },
    { key: "template", icon: "security-architecture" as const, titleKey: "approach_template_title", descKey: "approach_template_desc" },
  ];


  const aiItems = [
    { key: "efficiency", icon: "ai-efficiency" as const, titleKey: "ai_efficiency_title", descKey: "ai_efficiency_desc" },
    { key: "precision", icon: "ai-precision" as const, titleKey: "ai_precision_title", descKey: "ai_precision_desc" },
    { key: "boundaries", icon: "ai-quality" as const, titleKey: "ai_boundaries_title", descKey: "ai_boundaries_desc" },
  ];


  const specialtyItems = [
    { key: "backend", icon: "backend-architecture" as const, titleKey: "specialty_backend_title", descKey: "specialty_backend_desc" },
    { key: "advanced", icon: "advanced-technologies" as const, titleKey: "specialty_advanced_title", descKey: "specialty_advanced_desc" },
  ];

  return (
    <SidePanel
      isOpen={isOpen}
      onClose={onClose}
      position="left"
      widthPercentage={50}
      heightPercentage={95}
      zIndex={999}
      overlay={true}
      animationDuration={0.3}
      pushMode="shrink"
    >
      <div className="h-full bg-white dark:bg-black p-6 overflow-y-auto">
        {/* Header */}
        <motion.div
          className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
            {t("intro_side_panel_title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Professional capabilities and development methodology overview
          </p>
        </motion.div>

        {/* Knowledge Section */}
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <KnowledgeIcon size={24} className="text-black dark:text-white" />
            <h2 className="text-xl font-semibold text-black dark:text-white">
              {t("intro_knowledge_title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {knowledgeItems.map((item, index) => (
              <motion.div
                key={item.key}
                className="group bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-black dark:hover:border-white transition-all duration-200 hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                    <ProgrammingIconComponent
                      type={item.icon}
                      size={20}
                      className="filter invert dark:invert-0"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-black dark:text-white mb-1 text-sm">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
                      {t(item.descKey)}
                    </p>
                    <span className="text-xs font-medium text-black dark:text-white bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                      {t(item.levelKey)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Approach Section */}
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <ApproachIcon size={24} className="text-black dark:text-white" />
            <h2 className="text-xl font-semibold text-black dark:text-white">
              {t("intro_approach_title")}
            </h2>
          </div>

          <div className="space-y-4">
            {approachItems.map((item, index) => (
              <motion.div
                key={item.key}
                className="group bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-black dark:hover:border-white transition-all duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                    <ProgrammingIconComponent
                      type={item.icon}
                      size={20}
                      className="filter invert dark:invert-0"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-black dark:text-white mb-2 text-sm">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t(item.descKey)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* AI Usage Section */}
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <AIIcon size={24} className="text-black dark:text-white" />
            <h2 className="text-xl font-semibold text-black dark:text-white">
              {t("intro_ai_title")}
            </h2>
          </div>

          <div className="space-y-4">
            {aiItems.map((item, index) => (
              <motion.div
                key={item.key}
                className="group bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-black dark:hover:border-white transition-all duration-200"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ x: -4 }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                    <ProgrammingIconComponent
                      type={item.icon}
                      size={20}
                      className="filter invert dark:invert-0"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-black dark:text-white mb-2 text-sm">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t(item.descKey)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Specialties Section */}
        <motion.section
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <SpecialtyIcon size={24} className="text-black dark:text-white" />
            <h2 className="text-xl font-semibold text-black dark:text-white">
              {t("intro_specialties_title")}
            </h2>
          </div>

          <div className="space-y-4">
            {specialtyItems.map((item, index) => (
              <motion.div
                key={item.key}
                className="group bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-black dark:hover:border-white transition-all duration-200"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                    <ProgrammingIconComponent
                      type={item.icon}
                      size={20}
                      className="filter invert dark:invert-0"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-black dark:text-white mb-2 text-sm">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t(item.descKey)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Close Button */}
        <motion.div
          className="sticky bottom-0 pt-6 bg-white dark:bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={onClose}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-6 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 border border-black dark:border-white"
          >
            {t("b_close") || "Close"}
          </button>
        </motion.div>
      </div>
    </SidePanel>
  );
};