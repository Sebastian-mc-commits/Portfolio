"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GalleryLayoutProps } from "@/lib/interfaces/gallery";

export function StackedPileLayout({ images, title, onImageClick, compact }: GalleryLayoutProps) {
    const count = images.length;
    const totalVisible = Math.min(5, count - 1);

    return (
        <div className="space-y-4">
            <motion.div
                className={`relative w-full ${compact ? "aspect-[21/9]" : "aspect-video"} rounded-none overflow-hidden cursor-pointer group`}
                onClick={() => onImageClick(0)}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
            >
                <Image
                    src={images[0].src}
                    alt={images[0].alt || title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        View Gallery
                    </span>
                </div>
            </motion.div>

            <div className={`relative ${compact ? "h-24 sm:h-32" : "h-32 sm:h-40"}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                    {images.slice(1, Math.min(6, count)).map((img, i) => {
                        const offset = (i - (totalVisible - 1) / 2) * 60;
                        const rotation = (i - (totalVisible - 1) / 2) * 4;
                        const zIndex = totalVisible - Math.abs(i - (totalVisible - 1) / 2);

                        return (
                            <motion.div
                                key={i}
                                className="absolute w-36 sm:w-48 aspect-[4/3] rounded-none overflow-hidden cursor-pointer shadow-2xl border-2 border-white/10"
                                style={{ zIndex: Math.round(zIndex * 10) }}
                                initial={{
                                    x: offset,
                                    rotate: rotation,
                                    scale: 1 - Math.abs(i - (totalVisible - 1) / 2) * 0.05,
                                }}
                                whileHover={{
                                    scale: 1.15,
                                    rotate: 0,
                                    zIndex: 100,
                                    y: -20,
                                    transition: { duration: 0.2 },
                                }}
                                onClick={() => onImageClick(i + 1)}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt || `${title} - ${i + 2}`}
                                    fill
                                    className="object-cover"
                                    placeholder="blur"
                                />
                            </motion.div>
                        );
                    })}

                </div>
            </div>
        </div>
    );
}
