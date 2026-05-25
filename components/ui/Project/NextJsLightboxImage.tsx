"use client";

import Image from "next/image";
import {
    isImageFitCover,
    useLightboxProps,
    useLightboxState,
} from "yet-another-react-lightbox";
import { CustomSlide, NextJsImageRenderProps } from "@/lib/interfaces/gallery";

function isCustomSlide(slide: unknown): slide is CustomSlide {
    return typeof slide === "object" && slide !== null && "nextImageData" in slide;
}

export function NextJsLightboxImage({ slide, offset, rect }: NextJsImageRenderProps) {
    const {
        on: { click },
        carousel: { imageFit },
    } = useLightboxProps();

    const { currentIndex } = useLightboxState();

    if (!isCustomSlide(slide)) return null;

    const cover = isImageFitCover(slide as Parameters<typeof isImageFitCover>[0], imageFit);

    const width = !cover
        ? Math.round(Math.min(rect.width, (rect.height / slide.height) * slide.width))
        : rect.width;

    const height = !cover
        ? Math.round(Math.min(rect.height, (rect.width / slide.width) * slide.height))
        : rect.height;

    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1920;

    return (
        <div style={{ position: "relative", width, height }}>
            <Image
                fill
                alt={slide.alt || ""}
                src={slide.nextImageData}
                loading="eager"
                draggable={false}
                placeholder={slide.blurDataURL ? "blur" : undefined}
                blurDataURL={slide.blurDataURL}
                style={{
                    objectFit: cover ? "cover" : "contain",
                    cursor: click ? "pointer" : undefined,
                }}
                sizes={`${Math.ceil((width / windowWidth) * 100)}vw`}
                onClick={offset === 0 ? () => click?.({ index: currentIndex }) : undefined}
            />
        </div>
    );
}
