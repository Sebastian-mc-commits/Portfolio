"use client";

import SectionHeading from "./section-heading";
import projectsData from "@/lib/data/projects";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import { useTranslation } from "react-i18next";
import { Fragment, useState } from "react";
import { IUserProjects } from "@/lib/interfaces/IUser";
import SidePanel from "./SidePanel";
import { ChallengeIcon, FeatureIcon, ProcessIcon } from "./ui/ProgrammingIcon";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);
  const { t } = useTranslation()
  const [isSidePanelOpened, setIsSidePanelOpened] = useState<IUserProjects | null>(null)

  const onDevelopmentProcessOpen = (project: IUserProjects) => {
    setIsSidePanelOpened(project)
  }

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">

      <SidePanel
        isOpen={!!isSidePanelOpened}
        onClose={() => setIsSidePanelOpened(null)}
        position="left"
        widthPercentage={45}
        heightPercentage={95}
        zIndex={999}
        overlay={false}
        animationDuration={0.3}
        pushMode="shrink"
        showCloseButton={false}
      >
        <div className="h-full bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <ProcessIcon size={28} className="text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t("side_panel_development_process")}
              </h1>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {isSidePanelOpened?.metadata.developmentProcessKey 
                  ? t(isSidePanelOpened.metadata.developmentProcessKey)
                  : isSidePanelOpened?.metadata.developmentProcess
                }
              </p>
            </div>
          </div>

          {/* Challenges Section */}
          {(isSidePanelOpened?.metadata?.challengesKeys?.length || isSidePanelOpened?.metadata?.challenges?.length) && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <ChallengeIcon size={24} className="text-red-600 dark:text-red-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t("side_panel_challenges")}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isSidePanelOpened?.metadata?.challengesKeys?.map((challengeKey, i) => (
                  <div 
                    key={i} 
                    className="group bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 hover:border-red-300 dark:hover:border-red-600"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {t(challengeKey)}
                      </p>
                    </div>
                  </div>
                )) || 
                isSidePanelOpened?.metadata?.challenges?.map((challenge, i) => (
                  <div 
                    key={i} 
                    className="group bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 hover:border-red-300 dark:hover:border-red-600"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {challenge}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features Section */}
          {(isSidePanelOpened?.metadata?.keyFeaturesKeys?.length || isSidePanelOpened?.metadata?.keyFeatures?.length) && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <FeatureIcon size={24} className="text-green-600 dark:text-green-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t("side_panel_key_features")}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isSidePanelOpened?.metadata?.keyFeaturesKeys?.map((featureKey, i) => (
                  <div 
                    key={i} 
                    className="group bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 hover:border-green-300 dark:hover:border-green-600"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5">
                        <FeatureIcon size={12} className="text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {t(featureKey)}
                      </p>
                    </div>
                  </div>
                )) || 
                isSidePanelOpened?.metadata?.keyFeatures?.map((feature, i) => (
                  <div 
                    key={i} 
                    className="group bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 hover:border-green-300 dark:hover:border-green-600"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5">
                        <FeatureIcon size={12} className="text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {feature}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Close Button */}
          <div className="sticky bottom-0 pt-6 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent">
            <button
              onClick={() => setIsSidePanelOpened(null)}
              className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              {t("b_close") || "Close"}
            </button>
          </div>
        </div>
      </SidePanel>

      <SectionHeading>{t("t_projects")}</SectionHeading>
      <div>
        {projectsData.map((project, index) => (
          <Fragment key={`${index}_${project.id}`}>
            <Project {...project} onDevelopmentProcessOpen={onDevelopmentProcessOpen} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}
