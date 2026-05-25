"use client";

import { useEffect } from "react";
import { useTransitionOrigin } from "@/context/transition-context";

export function BodyBackground() {
    const { activeProjectBg, isRevealComplete } = useTransitionOrigin();

    useEffect(() => {
        const body = document.body;

        if (activeProjectBg && isRevealComplete) {
            if (activeProjectBg.bgColor) {
                body.style.backgroundColor = activeProjectBg.bgColor;
            } else if (activeProjectBg.bgClass) {
                body.classList.add(activeProjectBg.bgClass);
            }
        }

        return () => {
            body.style.backgroundColor = "";
            if (activeProjectBg?.bgClass) {
                body.classList.remove(activeProjectBg.bgClass);
            }
        };
    }, [activeProjectBg, isRevealComplete]);

    return null;
}
