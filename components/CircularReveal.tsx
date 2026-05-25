"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTransitionOrigin } from "@/context/transition-context";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function CircularReveal() {
    const { origin, clearOrigin, setRevealComplete } = useTransitionOrigin();
    const [isAnimating, setIsAnimating] = useState(false);
    const pathname = usePathname();
    const isProjectPage = pathname?.startsWith("/projects/");

    useEffect(() => {
        if (origin && isProjectPage) {
            setIsAnimating(true);
        }
    }, [origin, isProjectPage]);

    const handleAnimationComplete = () => {
        setIsAnimating(false);
        setRevealComplete(true);
        clearOrigin();
    };

    if (!origin || !isAnimating) return null;

    const { x, y } = origin;
    const w = window.innerWidth;
    const h = window.innerHeight;

    const distances = [
        Math.sqrt(x * x + y * y),
        Math.sqrt((w - x) * (w - x) + y * y),
        Math.sqrt(x * x + (h - y) * (h - y)),
        Math.sqrt((w - x) * (w - x) + (h - y) * (h - y)),
    ];
    const maxDistance = Math.max(...distances);
    const diameter = maxDistance * 2 + 100;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 pointer-events-none"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        left: x,
                        top: y,
                        backgroundColor: origin.bgColor || "#0a0a0a",
                        transform: "translate(-50%, -50%)",
                    }}
                    initial={{ width: 0, height: 0 }}
                    animate={{
                        width: diameter,
                        height: diameter,
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    onAnimationComplete={handleAnimationComplete}
                />
            </motion.div>
        </AnimatePresence>
    );
}
