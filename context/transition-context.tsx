"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
    TransitionOrigin,
    ActiveProjectBg,
    TransitionContextProviderProps,
} from "@/lib/interfaces/transition";

interface ExtendedTransitionContextType {
    origin: TransitionOrigin | null;
    setTransitionOrigin: (origin: TransitionOrigin) => void;
    clearOrigin: () => void;
    activeProjectBg: ActiveProjectBg | null;
    setActiveProjectBg: (bg: ActiveProjectBg | null) => void;
    isRevealComplete: boolean;
    setRevealComplete: (complete: boolean) => void;
}

const TransitionContext = createContext<ExtendedTransitionContextType | null>(null);

export default function TransitionContextProvider({ children }: TransitionContextProviderProps) {
    const [origin, setOrigin] = useState<TransitionOrigin | null>(null);
    const [activeProjectBg, setActiveProjectBgState] = useState<ActiveProjectBg | null>(null);
    const [isRevealComplete, setIsRevealComplete] = useState(true);

    const setTransitionOrigin = useCallback((newOrigin: TransitionOrigin) => {
        setOrigin(newOrigin);
        setIsRevealComplete(false);
    }, []);

    const clearOrigin = useCallback(() => {
        setOrigin(null);
    }, []);

    const setActiveProjectBg = useCallback((bg: ActiveProjectBg | null) => {
        setActiveProjectBgState(bg);
    }, []);

    const setRevealComplete = useCallback((complete: boolean) => {
        setIsRevealComplete(complete);
    }, []);

    return (
        <TransitionContext.Provider value={{
            origin,
            setTransitionOrigin,
            clearOrigin,
            activeProjectBg,
            setActiveProjectBg,
            isRevealComplete,
            setRevealComplete,
        }}>
            {children}
        </TransitionContext.Provider>
    );
}

export function useTransitionOrigin() {
    const context = useContext(TransitionContext);

    if (context === null) {
        throw new Error("useTransitionOrigin must be used within a TransitionContextProvider");
    }

    return context;
}
