"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GalleryLayoutProps } from "@/lib/interfaces/gallery";

export function SingleImageLayout({ images, title, onImageClick, compact }: GalleryLayoutProps) {
    return (
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
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <motion.div
                    className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                >
                    <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                </motion.div>
            </div>
        </motion.div>
    );
}

export function TwoImagesLayout({ images, title, onImageClick, compact }: GalleryLayoutProps) {
    return (
        <div className="grid grid-cols-2 gap-3">
            {images.map((img, i) => (
                <motion.div
                    key={i}
                    className={`relative ${compact ? "aspect-[16/9]" : "aspect-[4/3]"} rounded-none overflow-hidden cursor-pointer group`}
                    onClick={() => onImageClick(i)}
                    whileHover={{ scale: 1.02, zIndex: 10 }}
                    transition={{ duration: 0.2 }}
                >
                    <Image
                        src={img.src}
                        alt={img.alt || `${title} - ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        placeholder="blur"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
            ))}
        </div>
    );
}

export function ThreeImagesLayout({ images, title, onImageClick, compact }: GalleryLayoutProps) {
    return (
        <div className="grid grid-cols-3 gap-3">
            <motion.div
                className={`relative ${compact ? "aspect-[4/3]" : "aspect-square"} rounded-none overflow-hidden cursor-pointer group col-span-2`}
                onClick={() => onImageClick(0)}
                whileHover={{ scale: 1.02, zIndex: 10 }}
                transition={{ duration: 0.2 }}
            >
                <Image
                    src={images[0].src}
                    alt={images[0].alt || title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    placeholder="blur"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
            <div className="flex flex-col gap-3">
                {images.slice(1, 3).map((img, i) => (
                    <motion.div
                        key={i}
                        className={`relative ${compact ? "aspect-[4/3]" : "aspect-video"} rounded-none overflow-hidden cursor-pointer group`}
                        onClick={() => onImageClick(i + 1)}
                        whileHover={{ scale: 1.02, zIndex: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt || `${title} - ${i + 2}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            placeholder="blur"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export function FourImagesLayout({ images, title, onImageClick, compact }: GalleryLayoutProps) {
    return (
        <div className="grid grid-cols-4 gap-3">
            <motion.div
                className={`relative ${compact ? "aspect-[16/9]" : "aspect-[3/4]"} rounded-none overflow-hidden cursor-pointer group col-span-2`}
                onClick={() => onImageClick(0)}
                whileHover={{ scale: 1.01, zIndex: 10 }}
                transition={{ duration: 0.2 }}
            >
                <Image
                    src={images[0].src}
                    alt={images[0].alt || title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
            {images.slice(1, 4).map((img, i) => (
                <motion.div
                    key={i}
                    className={`relative ${compact ? "aspect-[4/3]" : "aspect-square"} rounded-none overflow-hidden cursor-pointer group ${i === 0 ? "col-span-2" : ""}`}
                    onClick={() => onImageClick(i + 1)}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    transition={{ duration: 0.2 }}
                >
                    <Image
                        src={img.src}
                        alt={img.alt || `${title} - ${i + 2}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        placeholder="blur"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
            ))}
        </div>
    );
}
