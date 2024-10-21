import React, { createContext, useContext } from "react";
import { ColorSchemeReturnValue } from "./types";
import { useColorScheme } from "./useColorScheme";

const ThemeContext = createContext<ColorSchemeReturnValue | undefined>(
  undefined,
);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider",
    );
  }
  return context;
}

export function ThemeContextProvider({ children }: React.PropsWithChildren) {
  const scheme = useColorScheme();
  if (scheme.loading) {
    return null;
  }
  return <ThemeContext.Provider value={scheme} children={children} />;
}
