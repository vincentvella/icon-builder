import { useTheme } from "@/hooks/theme/ThemeContext";
import { A, Header as HeaderElement } from "@expo/html-elements";
import Ionicons from "@expo/vector-icons/Ionicons";
import DarkModeSwitch from "expo-dark-mode-switch";
import { Text, View } from "react-native";
import colors from "tailwindcss/colors";

export function Header() {
  const { colorScheme, toggleColorScheme } = useTheme();
  return (
    <HeaderElement className="dark:bg-neutral-900 bg-neutral-100 drop-shadow-lg">
      <View className="flex-row items-center p-4">
        <A href="/">
          <Text className="text-black dark:text-white text-2xl my-4">
            App Icon Builder
          </Text>
        </A>
        <View className="flex-1" />
        <A
          className="align-center mr-2 pt-0.5"
          href="https://github.com/vincentvella/icon-builder"
        >
          <Ionicons
            name="logo-github"
            size={35}
            color={colorScheme === "dark" ? colors.white : colors.black}
          />
        </A>
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
