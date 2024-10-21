import { A, Header } from "@expo/html-elements";
import { Text, View } from "react-native";

function HeaderComponent() {
  return (
    <Header className="dark:bg-neutral-900 bg-neutral-100 shadow-2xl shadow-red-50">
      <View className="flex-row items-center p-4">
        <A href="/">
          <Text className="text-black dark:text-white text-2xl my-4">
            Icon Builder
          </Text>
        </A>
      </View>
    </Header>
  );
}

export default HeaderComponent;
