import { useEffect, useState } from "react";
import { useColorScheme as useRNColorScheme } from "react-native";
import { useColorScheme as useTWColorScheme } from "nativewind";
import { ColorScheme, ColorSchemeReturnValue } from "./types";

export function useColorScheme(): ColorSchemeReturnValue {
  const [loading] = useState(false);
  const rnColorScheme = useRNColorScheme();
  const { setColorScheme: setTWColorScheme } = useTWColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    (localStorage.getItem("theme") as ColorScheme) ?? rnColorScheme,
  );

  useEffect(() => {
    // update persistent storage whenever tw color scheme changes
    localStorage.setItem("theme", colorScheme);
    setTWColorScheme(colorScheme);
  }, [colorScheme]);

  function toggleColorScheme() {
    if (colorScheme === "light") {
      setColorScheme("dark");
    } else {
      setColorScheme("light");
    }
  }

  return {
    loading,
    colorScheme: colorScheme ?? "light",
    toggleColorScheme,
  };
}
