// src/components/ThemeProvider.tsx
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return <>{children}</>;
};
