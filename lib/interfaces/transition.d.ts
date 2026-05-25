export interface TransitionOrigin {
    x: number;
    y: number;
    bgColor?: string;
}

export interface ActiveProjectBg {
    bgColor?: string;
    bgClass?: string;
    textColor?: string;
    textClass?: string;
}

export interface TransitionContextType {
    origin: TransitionOrigin | null;
    setTransitionOrigin: (origin: TransitionOrigin) => void;
    clearOrigin: () => void;
    activeProjectBg: ActiveProjectBg | null;
    setActiveProjectBg: (bg: ActiveProjectBg | null) => void;
}

export interface TransitionContextProviderProps {
    children: React.ReactNode;
}
