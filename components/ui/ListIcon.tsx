"use client";

export type IconVariant = "challenge" | "feature" | "process" | "default";

interface ListIconProps {
    variant?: IconVariant;
    size?: number;
    className?: string;
    bgColor?: string;
}

// Color manipulation utilities
function hexToHSL(hex: string): { h: number; s: number; l: number } {
    // Remove # if present
    hex = hex.replace(/^#/, '');

    // Parse hex
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    };

    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (x: number) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Generates a vibrant accent color from a background color
 * Algorithm:
 * 1. Extract HSL values from background
 * 2. Boost saturation for vibrancy
 * 3. Adjust lightness for contrast (lighter for dark bg, darker for light bg)
 * 4. Optionally shift hue for more visual interest
 */
function generateAccentFromBg(bgColor: string, variant: IconVariant): string {
    try {
        const { h, s, l } = hexToHSL(bgColor);

        // Variant-based hue shifts for visual distinction
        const hueShifts: Record<IconVariant, number> = {
            challenge: 15,   // Slight warm shift
            feature: -15,    // Slight cool shift
            process: 30,     // More noticeable shift
            default: 0       // Keep original hue
        };

        // Calculate new values
        let newHue = (h + hueShifts[variant] + 360) % 360;

        // Boost saturation (min 60%, max 90%)
        const newSaturation = Math.min(90, Math.max(60, s + 30));

        // Adjust lightness for contrast
        // Dark backgrounds (l < 50) get lighter accents
        // Light backgrounds (l >= 50) get darker accents
        let newLightness: number;
        if (l < 30) {
            // Very dark bg: bright accent
            newLightness = 65 + (30 - l) * 0.5;
        } else if (l < 50) {
            // Medium-dark bg: moderately bright accent
            newLightness = 55 + (50 - l) * 0.4;
        } else if (l < 70) {
            // Medium-light bg: darker accent
            newLightness = 45 - (l - 50) * 0.3;
        } else {
            // Very light bg: dark accent
            newLightness = 35 - (l - 70) * 0.2;
        }

        // Clamp lightness
        newLightness = Math.min(80, Math.max(25, newLightness));

        return hslToHex(newHue, newSaturation, newLightness);
    } catch {
        // Fallback colors if parsing fails
        const fallbacks: Record<IconVariant, string> = {
            challenge: "#f97316",
            feature: "#10b981",
            process: "#3b82f6",
            default: "#8b5cf6"
        };
        return fallbacks[variant];
    }
}

export function ListIcon({
    variant = "default",
    size = 24,
    className = "",
    bgColor
}: ListIconProps) {
    const accentColor = bgColor
        ? generateAccentFromBg(bgColor, variant)
        : undefined;

    // Fallback Tailwind classes if no bgColor provided
    const fallbackColors: Record<IconVariant, string> = {
        challenge: "text-orange-400",
        feature: "text-emerald-400",
        process: "text-blue-400",
        default: "text-violet-400"
    };

    return (
        <div
            className={`
                flex items-center justify-center flex-shrink-0
                font-bold
                ${!accentColor ? fallbackColors[variant] : ''}
                ${className}
            `}
            style={{
                fontSize: size * 0.8,
                color: accentColor || undefined
            }}
        >
            <span>-</span>
        </div>
    );
}

interface ListItemProps {
    children: React.ReactNode;
    variant?: IconVariant;
    iconSize?: number;
    className?: string;
    bgColor?: string;
}

export function ListItem({
    children,
    variant = "default",
    iconSize = 32,
    className = "",
    bgColor
}: ListItemProps) {
    return (
        <div className={`flex items-start gap-3 ${className}`}>
            <ListIcon variant={variant} size={iconSize} bgColor={bgColor} />
            <div className="flex-1">{children}</div>
        </div>
    );
}
