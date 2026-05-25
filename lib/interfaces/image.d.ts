import { StaticImageData } from "next/image";

export interface OptimizedImageOptions {
    priority?: boolean;
    quality?: number;
    sizes?: string;
    fill?: boolean;
    width?: number;
    height?: number;
}

export interface OptimizedImageProps {
    src: StaticImageData;
    quality: number;
    loading: "lazy" | "eager" | undefined;
    placeholder: "blur";
    sizes: string;
}

export interface UseOptimizedImageReturn {
    imageProps: OptimizedImageProps;
    isOptimized: boolean;
}
