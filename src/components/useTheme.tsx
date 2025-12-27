import { useState, useEffect } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;
    } catch (e) {}

    return typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Keep DOM & localStorage in sync when this hook's state changes
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  // Listen for cross-instance theme changes in the same window
  useEffect(() => {
    const onThemeChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as string | undefined;
      if (detail && detail !== theme) setTheme(detail);
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme") {
        const newVal = e.newValue;
        if (newVal && newVal !== theme) setTheme(newVal);
      }
    };

    window.addEventListener("themechange", onThemeChange as EventListener);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("themechange", onThemeChange as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, [theme]);

  // Public setter that broadcasts changes to other hook instances
  const setThemePublic = (value: string | ((prev: string) => string)) => {
    setTheme((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
      return next;
    });
  };

  return [theme, setThemePublic] as const;
}
