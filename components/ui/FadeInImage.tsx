"use client";

import { useState, useEffect, useRef } from "react";
import Image, { ImageProps } from "next/image";

export function FadeInImage(props: ImageProps) {
    const [loaded, setLoaded] = useState(false);
    const ref = useRef<HTMLImageElement>(null);
    const { className = "", onLoad, ...rest } = props;

    useEffect(() => {
        const img = ref.current;
        if (img && img.complete && img.naturalWidth > 0) {
            setLoaded(true);
            return;
        }
        // Fallback: ensure visibility even if onLoad never fires (e.g., cached behind Next.js Image wrapper)
        const timer = setTimeout(() => setLoaded(true), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Image
            {...rest}
            ref={ref}
            onLoad={(e) => {
                setLoaded(true);
                onLoad?.(e);
            }}
            className={`${className} transition-opacity duration-700 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
        />
    );
}
