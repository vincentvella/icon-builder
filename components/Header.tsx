import { useTheme } from "@/hooks/theme/ThemeContext";
import { A, Header } from "@expo/html-elements";
import DarkModeSwitch from "expo-dark-mode-switch";
import { Text, View } from "react-native";

function HeaderComponent() {
  const { colorScheme, toggleColorScheme } = useTheme();
  return (
    <Header className="dark:bg-neutral-900 bg-neutral-100 drop-shadow-lg mb-4">
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
    </Header>
  );
}

export default HeaderComponent;
