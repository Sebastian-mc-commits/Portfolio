"use client";

import { useMemo } from "react";
import { StaticImageData } from "next/image";
import { I_Image } from "@/lib/interfaces/ui";
import { OptimizedImageOptions } from "@/lib/interfaces/image";

const DEFAULT_QUALITY = 85;
const PRIORITY_QUALITY = 95;
const DEFAULT_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

type ImageSource = I_Image | StaticImageData | string;

function isI_Image(source: ImageSource): source is I_Image {
    return typeof source === "object" && "src" in source && "alt" in source;
}

function isStaticImageData(source: ImageSource): source is StaticImageData {
    return typeof source === "object" && "src" in source && !("alt" in source);
}

export function useOptimizedImage(
    source: ImageSource,
    options: OptimizedImageOptions = {}
) {
    const {
        priority = false,
        quality,
        sizes = DEFAULT_SIZES,
        fill = false,
        width,
        height
    } = options;

    return useMemo(() => {
        const resolvedQuality = quality ?? (priority ? PRIORITY_QUALITY : DEFAULT_QUALITY);

        let src: StaticImageData | string;
        let alt = "";

        if (isI_Image(source)) {
            src = source.src;
            alt = source.alt;
        } else if (isStaticImageData(source)) {
            src = source;
        } else {
            src = source;
        }

        const hasBlurData = typeof src === "object" && "blurDataURL" in src;

        const baseProps = {
            src,
            alt,
            quality: resolvedQuality,
            sizes,
            ...(hasBlurData && { placeholder: "blur" as const }),
            ...(priority ? { priority: true } : { loading: "lazy" as const })
        };

        if (fill) {
            return { ...baseProps, fill: true };
        }

        if (width && height) {
            return { ...baseProps, width, height };
        }

        return baseProps;
    }, [source, priority, quality, sizes, fill, width, height]);
}

export function useOptimizedImageList(
    images: I_Image[],
    options: OptimizedImageOptions & { priorityCount?: number } = {}
) {
    const { priorityCount = 3, ...restOptions } = options;

    return useMemo(() => {
        return images.map((image, index) => {
            const isPriority = index < priorityCount;
            return {
                ...image,
                imageProps: {
                    src: image.src,
                    alt: image.alt,
                    quality: isPriority ? PRIORITY_QUALITY : DEFAULT_QUALITY,
                    sizes: restOptions.sizes || DEFAULT_SIZES,
                    ...(image.src.blurDataURL && { placeholder: "blur" as const }),
                    ...(isPriority ? { priority: true } : { loading: "lazy" as const }),
                    ...(restOptions.fill && { fill: true }),
                    ...(restOptions.width && restOptions.height && {
                        width: restOptions.width,
                        height: restOptions.height
                    })
                }
            };
        });
    }, [images, priorityCount, restOptions.sizes, restOptions.fill, restOptions.width, restOptions.height]);
}
