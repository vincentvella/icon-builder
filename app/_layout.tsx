import "../global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/theme/useColorScheme";
import "react-native-reanimated";
import Header from "@/components/Header";
import { ThemeProvider } from "@react-navigation/native";
import { useReactNavigationTheme } from "@/hooks/theme/useReactNavigationTheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loading, colorScheme } = useColorScheme();
  const theme = useReactNavigationTheme(colorScheme);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded && !loading) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || loading) {
    return null;
  }

  return (
    <>
      <ThemeProvider value={theme}>
        <Header />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </>
  );
}
