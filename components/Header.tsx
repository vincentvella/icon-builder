import { useTheme } from "@/hooks/theme/ThemeContext";
import { A, Header as HeaderElement } from "@expo/html-elements";
import DarkModeSwitch from "expo-dark-mode-switch";
import { Text, View } from "react-native";

export function Header() {
  const { colorScheme, toggleColorScheme } = useTheme();
  return (
    <HeaderElement className="dark:bg-neutral-900 bg-neutral-100 drop-shadow-lg">
      <View className="flex-row items-center p-4">
        <A href="/">
          <Text className="text-black dark:text-white text-2xl my-4">
            Icon Builder
          </Text>
        </A>
        <View className="flex-1" />
        <DarkModeSwitch
          value={colorScheme === "dark"}
          onChange={() => {
            toggleColorScheme();
          }}
        />
      </View>
    </HeaderElement>
  );
}
