import { useState, useEffect } from "react";

const screenSizes: { [key: string]: string } = {
  xs: "(max-width: 420px)",
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
};

export function useMediaQuery(query: string): boolean {
  const mediaQuery = screenSizes[query] || query;
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(mediaQuery).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(mediaQuery);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", documentChangeHandler);

    return () => {
      mediaQueryList.removeEventListener("change", documentChangeHandler);
    };
  }, [mediaQuery]);

  return matches;
}
