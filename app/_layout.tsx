import "../global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import Header from "@/components/Header";
import { ThemeProvider } from "@react-navigation/native";
import { useReactNavigationTheme } from "@/hooks/theme/useReactNavigationTheme";
import { ThemeContextProvider } from "@/hooks/theme/ThemeContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const theme = useReactNavigationTheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen name="index" options={{ header: Header }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <ThemeContextProvider>
      <RootLayout />
    </ThemeContextProvider>
  );
}
