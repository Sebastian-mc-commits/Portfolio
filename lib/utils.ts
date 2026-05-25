export const validateString = (
  value: unknown,
  maxLength: number
): value is string => {
  if (!value || typeof value !== "string" || value.length > maxLength) {
    return false;
  }

  return true;
};

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

export type ResolvedProjectColor = {
  bgClass?: string;
  textClass?: string;
  bgColor?: string;
  textColor?: string;
};

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

const hexToRgb = (hex: string): RGB => {
  const clean = hex.replace("#", "");
  let r: number, g: number, b: number;

  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16);
    g = parseInt(clean[1] + clean[1], 16);
    b = parseInt(clean[2] + clean[2], 16);
  } else {
    r = parseInt(clean.substr(0, 2), 16);
    g = parseInt(clean.substr(2, 2), 16);
    b = parseInt(clean.substr(4, 2), 16);
  }

  return { r, g, b };
};

const rgbToHsl = ({ r, g, b }: RGB): HSL => {
  r /= 255;
  g /= 255;
  b /= 255;

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
};

const hslToHex = ({ h, s, l }: HSL): string => {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const getLuminance = ({ r, g, b }: RGB): number => {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
};

const getContrastRatio = (color1: RGB, color2: RGB): number => {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

export interface AccentColors {
  primary: string;
  secondary: string;
  tertiary: string;
  challengeIcon: string;
  featureIcon: string;
  processIcon: string;
  challengeBorder: string;
  featureBorder: string;
}

export const generateAccentColors = (bgColor?: string): AccentColors => {
  const defaultAccents: AccentColors = {
    primary: "#3b82f6",
    secondary: "#8b5cf6",
    tertiary: "#06b6d4",
    challengeIcon: "#f97316",
    featureIcon: "#22c55e",
    processIcon: "#3b82f6",
    challengeBorder: "#f9731650",
    featureBorder: "#22c55e50",
  };

  if (!bgColor || !bgColor.startsWith("#")) return defaultAccents;

  const rgb = hexToRgb(bgColor);
  const hsl = rgbToHsl(rgb);
  const luminance = getLuminance(rgb);
  const isDark = luminance < 0.5;

  const targetLightness = isDark ? 65 : 40;
  const saturationBoost = isDark ? 20 : 10;
  const baseSaturation = Math.min(100, Math.max(50, hsl.s + saturationBoost));

  const complementaryHue = (hsl.h + 180) % 360;
  const analogousHue1 = (hsl.h + 30) % 360;
  const analogousHue2 = (hsl.h + 330) % 360;
  const triadicHue1 = (hsl.h + 120) % 360;
  const triadicHue2 = (hsl.h + 240) % 360;

  const createColor = (hue: number, satMod: number = 0, lightMod: number = 0): string => {
    return hslToHex({
      h: hue,
      s: Math.min(100, Math.max(40, baseSaturation + satMod)),
      l: Math.min(80, Math.max(30, targetLightness + lightMod)),
    });
  };

  const ensureContrast = (color: string, minContrast: number = 3): string => {
    const colorRgb = hexToRgb(color);
    let colorHsl = rgbToHsl(colorRgb);
    let attempts = 0;

    while (getContrastRatio(rgb, hexToRgb(hslToHex(colorHsl))) < minContrast && attempts < 20) {
      if (isDark) {
        colorHsl.l = Math.min(90, colorHsl.l + 5);
      } else {
        colorHsl.l = Math.max(20, colorHsl.l - 5);
      }
      attempts++;
    }

    return hslToHex(colorHsl);
  };

  const warmHue = (hsl.h + 45) % 360;
  const coolHue = (hsl.h + 195) % 360;
  const vibrantHue = (hsl.h + 150) % 360;

  const challengeBase = createColor(warmHue, 15, isDark ? 5 : -5);
  const featureBase = createColor(coolHue, 10, isDark ? 0 : -10);
  const processBase = createColor(vibrantHue, 5, 0);

  const challengeIcon = ensureContrast(challengeBase, 4);
  const featureIcon = ensureContrast(featureBase, 4);
  const processIcon = ensureContrast(processBase, 4);

  return {
    primary: ensureContrast(createColor(complementaryHue, 10, 0), 4.5),
    secondary: ensureContrast(createColor(triadicHue1, 5, 5), 4),
    tertiary: ensureContrast(createColor(triadicHue2, 5, -5), 4),
    challengeIcon,
    featureIcon,
    processIcon,
    challengeBorder: challengeIcon + "50",
    featureBorder: featureIcon + "50",
  };
};

export const resolveProjectColors = (color?: string): ResolvedProjectColor => {
  if (!color) return { bgClass: "bg-white", textClass: "text-black" };

  const name = String(color).trim().toLowerCase();

  const map: Record<string, ResolvedProjectColor> = {
    black: { bgClass: "bg-black", textClass: "text-white" },
    white: { bgClass: "bg-white", textClass: "text-black" },
    red: { bgClass: "bg-red-600", textClass: "text-white" },
    blue: { bgClass: "bg-blue-600", textClass: "text-white" },
    green: { bgClass: "bg-green-600", textClass: "text-white" },
    gray: { bgClass: "bg-gray-800", textClass: "text-white" },
    slate: { bgClass: "bg-slate-700", textClass: "text-white" },
    yellow: { bgClass: "bg-yellow-400", textClass: "text-black" },
    purple: { bgClass: "bg-purple-600", textClass: "text-white" },
    pink: { bgClass: "bg-pink-600", textClass: "text-white" },
    indigo: { bgClass: "bg-indigo-600", textClass: "text-white" },
  };

  if (map[name]) return map[name];

  const hexMatch = name.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hexMatch) {
    const hex = hexMatch[0];
    const rgb = hexToRgb(hex);
    const luminance = getLuminance(rgb);
    const textColor = luminance > 0.5 ? "#000000" : "#ffffff";

    return { bgColor: hex, textColor };
  }

  return { bgClass: "bg-white", textClass: "text-black" };
};
