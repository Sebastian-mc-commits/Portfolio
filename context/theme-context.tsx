"use client";

import React, { useEffect, useState, createContext, useContext } from "react";

type Theme = "light" | "dark";

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getUrlTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const themeParam = params.get("theme");
  if (themeParam === "light" || themeParam === "dark") return themeParam;
  return null;
}

function updateUrlTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.set("theme", theme);
  window.history.replaceState({}, "", url.toString());
}

export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  // Always use light theme
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    // Theme toggle disabled - always light mode
    // Uncomment below to re-enable dark mode switching:
    /*
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    window.localStorage.setItem("theme", newTheme);
    updateUrlTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    */
  };

  useEffect(() => {
    // Always enforce light theme
    document.documentElement.classList.remove("dark");
    setTheme("light");

    // Uncomment below to re-enable theme detection:
    /*
    const urlTheme = getUrlTheme();
    const localTheme = window.localStorage.getItem("theme") as Theme | null;
    const systemTheme = getSystemTheme();

    const resolvedTheme = urlTheme || localTheme || systemTheme;

    setTheme(resolvedTheme);
    if (resolvedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    */
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }

  return context;
}
