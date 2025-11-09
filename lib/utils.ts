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
  bgClass?: string; // tailwind bg class when available (eg. 'bg-black')
  textClass?: string; // tailwind text class when available (eg. 'text-white')
  bgColor?: string; // raw color value for inline style (eg. '#ff0000' or 'rgb(...)')
  textColor?: string; // raw color for inline style
};

/**
 * Resolve a user project background color into usable tailwind classes or inline colors.
 * Accepts common named colors (black, red, blue, etc.) or hex values like '#ff0000'.
 */
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

  // If color is a hex value like #rrggbb or #rgb
  const hexMatch = name.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hexMatch) {
    const hex = hexMatch[0];
    // convert to full 6-char
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else {
      r = parseInt(hex.substr(1, 2), 16);
      g = parseInt(hex.substr(3, 2), 16);
      b = parseInt(hex.substr(5, 2), 16);
    }

    // relative luminance formula to pick white or black text
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    const textColor = luminance > 0.6 ? "#000000" : "#ffffff";

    return { bgColor: hex, textColor };
  }

  // default fallback
  return { bgClass: "bg-white", textClass: "text-black" };
};
