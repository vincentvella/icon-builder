import { Theme } from "@react-navigation/native";
import colors from "tailwindcss/colors";
import { useMemo } from "react";
import { useTheme } from "./ThemeContext";

const navigationTheme = {
  light: {
    primary: colors.white,
    card: colors.white,
    text: colors.black,
    background: colors.neutral[100],
    border: colors.black,
    notification: colors.white,
  },
  dark: {
    primary: colors.black,
    card: colors.black,
    text: colors.black,
    background: colors.neutral[800],
    border: colors.black,
    notification: colors.black,
  },
} satisfies Record<"light" | "dark", Theme["colors"]>;

export function useReactNavigationTheme() {
  const { colorScheme } = useTheme();
  return useMemo(() => {
    return {
      dark: colorScheme === "dark",
      colors: navigationTheme[colorScheme],
    };
  }, [colorScheme]);
}
