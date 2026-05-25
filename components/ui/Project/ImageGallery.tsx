"use client";

import { useState, useCallback } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

import { ImageGalleryProps, CustomSlide } from "@/lib/interfaces/gallery";
import { NextJsLightboxImage } from "./NextJsLightboxImage";
import {
    SingleImageLayout,
    TwoImagesLayout,
    ThreeImagesLayout,
    FourImagesLayout,
} from "./GalleryLayouts";
import { StackedPileLayout } from "./StackedPileLayout";

const LIGHTBOX_PLUGINS = [Zoom, Fullscreen, Thumbnails, Counter];

const LIGHTBOX_CONFIG = {
    zoom: { maxZoomPixelRatio: 3, scrollToZoom: true },
    thumbnails: {
        position: "bottom" as const,
        width: 100,
        height: 60,
        border: 2,
        borderRadius: 8,
        padding: 4,
        gap: 8,
    },
    carousel: { imageFit: "contain" as const, padding: 16 },
    styles: {
        container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
        thumbnailsContainer: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
    },
    animation: { fade: 300, swipe: 300 },
};

export function ImageGallery({ images, title, compact = false }: ImageGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const openLightbox = useCallback((index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    }, []);

    const closeLightbox = useCallback(() => setLightboxOpen(false), []);

    const slides: CustomSlide[] = images.map((img) => ({
        src: img.src.src,
        nextImageData: img.src,
        alt: img.alt || title,
        width: img.src.width,
        height: img.src.height,
        blurDataURL: img.src.blurDataURL,
    }));

    if (images.length === 0) return null;

    const layoutProps = { images, title, onImageClick: openLightbox, compact };

    const renderLayout = () => {
        const count = images.length;
        if (count === 1) return <SingleImageLayout {...layoutProps} />;
        if (count === 2) return <TwoImagesLayout {...layoutProps} />;
        if (count === 3) return <ThreeImagesLayout {...layoutProps} />;
        if (count === 4) return <FourImagesLayout {...layoutProps} />;
        return <StackedPileLayout {...layoutProps} />;
    };

    return (
        <>
            {renderLayout()}
            <Lightbox
                open={lightboxOpen}
                close={closeLightbox}
                index={lightboxIndex}
                slides={slides}
                plugins={LIGHTBOX_PLUGINS}
                render={{ slide: NextJsLightboxImage as unknown as undefined }}
                {...LIGHTBOX_CONFIG}
            />
        </>
    );
}
