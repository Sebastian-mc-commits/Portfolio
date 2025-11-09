import IExperience from '@/lib/interfaces/experience'
import React, { Fragment, useState } from 'react'
import { VerticalTimelineElement } from 'react-vertical-timeline-component'
import { useTheme } from '@/context/theme-context'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import SidePanel from '@/components/SidePanel'
import { IoMdClose } from 'react-icons/io'
import Image from 'next/image'

function ExperienceItem(item: IExperience) {
    const [isSidePanelOpened, setIsSidePanelOpened] = useState(false)
    const [selectedImage, setSelectedImage] = useState<any>(null)
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
                    item.type === "degrees_images" && item.images && item.images.length > 0
                    &&
                    <button
                        className="mt-4 bg-black dark:bg-white text-white dark:text-black font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                        onClick={() => setIsSidePanelOpened(true)}
                    >
                        {t("b_view_images") || "View Images"}
                    </button>
                }
            </VerticalTimelineElement>

            {/* Enhanced SidePanel Modal for Images */}
            <SidePanel
                isOpen={isSidePanelOpened}
                onClose={() => {
                    setIsSidePanelOpened(false)
                    setSelectedImage(null)
                }}
                position="right"
                widthPercentage={45}
                heightPercentage={95}
                overlay={true}
                backdropBlur={true}
                backdropOpacity={0.7}
                showCloseButton={false}
                className="bg-white dark:bg-gray-900"
            >
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {item.title}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {item.date}
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setIsSidePanelOpened(false)
                                setSelectedImage(null)
                            }}
                            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <IoMdClose size={24} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                {t("about") || "About"}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {t(item.descriptionTranslationKey)}
                            </p>
                        </div>

                        {/* Images Grid */}
                        {item?.images && item?.images.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    {t("images") || "Images & Certificates"}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {item.images.map((image, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="cursor-pointer group"
                                            onClick={() => setSelectedImage(image)}
                                        >
                                            <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
                                                <Image
                                                    src={image.src}
                                                    alt={image.alt}
                                                    quality={95}
                                                    className="w-full h-48 object-contain bg-gray-50 dark:bg-gray-800 group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                                                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                                                        {t("click_to_enlarge") || "Click to enlarge"}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                                                {image.alt}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </SidePanel>

            {/* Full-size Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative max-w-[95vw] max-h-[95vh] p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                quality={100}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-6 right-6 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
                            >
                                <IoMdClose size={20} />
                            </button>
                            <div className="absolute bottom-6 left-6 right-6 text-center">
                                <p className="text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">
                                    {selectedImage.alt}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Fragment>
    )
}

export default ExperienceItem