import IExperience from '@/lib/interfaces/experience'
import React, { Fragment, useState } from 'react'
import { VerticalTimelineElement } from 'react-vertical-timeline-component'
import { ImageSelector } from '..'
import { useTheme } from '@/context/theme-context'
import { useTranslation } from 'react-i18next'

function ExperienceItem(item: IExperience) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const { t } = useTranslation()
    const { theme } = useTheme();
    return (
        <Fragment>
            <VerticalTimelineElement
                contentStyle={{
                    background:
                        theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
                    boxShadow: "none",
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                    textAlign: "left",
                    padding: "1.3rem 2rem",
                }}
                contentArrowStyle={{
                    borderRight:
                        theme === "light"
                            ? "0.4rem solid #9ca3af"
                            : "0.4rem solid rgba(255, 255, 255, 0.5)",
                }}
                date={item.date}
                icon={item.icon}
                iconStyle={{
                    background:
                        theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
                    fontSize: "1.5rem",
                }}
            >

                <h3 className="font-semibold capitalize">{item.title}</h3>
                <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
                    {t(item.descriptionTranslationKey)}
                </p>

                {
                    item.type === "degrees_images"
                    &&
                    <button
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300"
                        onClick={() => setIsModalOpen(true)}
                    >
                        {t("b_view_images")}
                    </button>
                }
            </VerticalTimelineElement>
            {
                item.type === "degrees_images"
                &&
                <ImageSelector
                    isOpen={isModalOpen}
                    images={item.images}
                    key={item.id}
                    onClose={() => setIsModalOpen(false)}
                />
            }
        </Fragment>
    )
}

export default ExperienceItem