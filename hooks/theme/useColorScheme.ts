import { useEffect, useState } from "react";
import { useColorScheme as useRNColorScheme } from "react-native";
import { useColorScheme as useTWColorScheme } from "nativewind";
import { ColorScheme, ColorSchemeReturnValue } from "./types";

export function useColorScheme(): ColorSchemeReturnValue {
  const [loading, setLoading] = useState(true);
  const rnColorScheme = useRNColorScheme();
  const { setColorScheme: setTWColorScheme } = useTWColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    rnColorScheme ?? "light",
  );

  useEffect(() => {
    // TODO: Update persistent storage
    setLoading(false);
    setTWColorScheme(colorScheme);
  }, [colorScheme]);

  function toggleColorScheme() {
    if (colorScheme === "light") {
      setColorScheme("dark");
    } else {
      setColorScheme("light");
    }
  }

  return { loading, colorScheme, toggleColorScheme };
}
