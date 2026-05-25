"use client";

import { useReducer, useCallback, useRef, useEffect } from "react";
import { ProjectState, ProjectAction } from "@/lib/interfaces/project";

const initialState: ProjectState = {
    isExpanded: false,
    autoplayIndex: 0,
    isFullGalleryOpen: false
};

function projectReducer(state: ProjectState, action: ProjectAction): ProjectState {
    switch (action.type) {
        case "OPEN_EXPANDED":
            return { ...state, isExpanded: true, autoplayIndex: 0 };
        case "CLOSE_EXPANDED":
            return { ...state, isExpanded: false, autoplayIndex: 0 };
        case "SET_AUTOPLAY_INDEX":
            return { ...state, autoplayIndex: action.payload };
        case "INCREMENT_AUTOPLAY":
            return { ...state, autoplayIndex: state.autoplayIndex + 1 };
        case "OPEN_GALLERY":
            return { ...state, isFullGalleryOpen: true };
        case "CLOSE_GALLERY":
            return { ...state, isFullGalleryOpen: false };
        case "RESET":
            return initialState;
        default:
            return state;
    }
}

const AUTOPLAY_INTERVAL = 3500;

export function useProjectState(imageCount: number) {
    const [state, dispatch] = useReducer(projectReducer, initialState);
    const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const cleanupAutoplay = useCallback(() => {
        if (autoplayIntervalRef.current) {
            clearInterval(autoplayIntervalRef.current);
            autoplayIntervalRef.current = null;
        }
    }, []);

    const openExpanded = useCallback(() => {
        dispatch({ type: "OPEN_EXPANDED" });
    }, []);

    const closeExpanded = useCallback(() => {
        dispatch({ type: "CLOSE_EXPANDED" });
        cleanupAutoplay();
    }, [cleanupAutoplay]);

    const openGallery = useCallback(() => {
        dispatch({ type: "OPEN_GALLERY" });
    }, []);

    const closeGallery = useCallback(() => {
        dispatch({ type: "CLOSE_GALLERY" });
    }, []);

    const setAutoplayIndex = useCallback((index: number) => {
        dispatch({ type: "SET_AUTOPLAY_INDEX", payload: index });
    }, []);

    useEffect(() => {
        if (state.isExpanded) {
            cleanupAutoplay();
            autoplayIntervalRef.current = setInterval(() => {
                dispatch({
                    type: "SET_AUTOPLAY_INDEX",
                    payload: (state.autoplayIndex + 1) % Math.max(1, imageCount)
                });
            }, AUTOPLAY_INTERVAL);
        } else {
            cleanupAutoplay();
        }

        return () => {
            if (!state.isExpanded) {
                cleanupAutoplay();
            }
        };
    }, [state.isExpanded, state.autoplayIndex, imageCount, cleanupAutoplay]);

    useEffect(() => {
        const isLocked = state.isExpanded || state.isFullGalleryOpen;
        const previousOverflow = document.body.style.overflow;

        if (isLocked) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = previousOverflow || "";
        }

        return () => {
            document.body.style.overflow = previousOverflow || "";
        };
    }, [state.isExpanded, state.isFullGalleryOpen]);

    useEffect(() => {
        const header = document.querySelector("header") as HTMLElement;
        if (!header) return;

        const previousDisplay = header.style.display;

        if (state.isExpanded || state.isFullGalleryOpen) {
            header.style.display = "none";
        } else {
            header.style.display = previousDisplay || "";
        }

        return () => {
            header.style.display = previousDisplay || "";
        };
    }, [state.isExpanded, state.isFullGalleryOpen]);

    return {
        state,
        openExpanded,
        closeExpanded,
        openGallery,
        closeGallery,
        setAutoplayIndex,
        isModalOpen: state.isExpanded || state.isFullGalleryOpen
    };
}
