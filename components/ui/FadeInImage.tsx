"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

export function FadeInImage(props: ImageProps) {
    const [loaded, setLoaded] = useState(false);
    const { className = "", onLoad, ...rest } = props;
    return (
        <Image
            {...rest}
            onLoad={(e) => {
                setLoaded(true);
                onLoad?.(e);
            }}
            className={`${className} transition-opacity duration-700 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
        />
    );
}
