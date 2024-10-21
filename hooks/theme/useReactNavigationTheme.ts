import { Theme } from "@react-navigation/native";
import colors from "tailwindcss/colors";
import { ColorScheme } from "./types";
import { useMemo } from "react";

const navigationTheme = {
  light: {
    primary: colors.white,
    card: colors.white,
    text: colors.black,
    background: colors.white,
    border: colors.black,
    notification: colors.white,
  },
  dark: {
    primary: colors.black,
    card: colors.black,
    text: colors.black,
    background: colors.neutral[50],
    border: colors.black,
    notification: colors.black,
  },
} satisfies Record<"light" | "dark", Theme["colors"]>;

export function useReactNavigationTheme(scheme: ColorScheme) {
  return useMemo(() => {
    return {
      dark: scheme === "dark",
      colors: navigationTheme[scheme],
    };
  }, [scheme]);
}
