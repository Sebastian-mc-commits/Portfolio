import { StaticImageData } from "next/image";

export interface GalleryImage {
    src: StaticImageData;
    alt?: string;
}

export interface ImageGalleryProps {
    images: GalleryImage[];
    title: string;
    compact?: boolean;
}

export interface CustomSlide {
    src: string;
    nextImageData: StaticImageData;
    alt: string;
    width: number;
    height: number;
    blurDataURL?: string;
}

export interface NextJsImageRenderProps {
    slide: CustomSlide;
    offset: number;
    rect: { width: number; height: number };
}

export interface GalleryLayoutProps {
    images: GalleryImage[];
    title: string;
    onImageClick: (index: number) => void;
    compact?: boolean;
}
