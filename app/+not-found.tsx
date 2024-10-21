import { Link, useGlobalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import queryString from "query-string";

export default function NotFoundScreen() {
  const { emoji, color } = useGlobalSearchParams();
  const query = queryString.stringify({ emoji, color });
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-bold text-2xl text-black dark:text-white">
        This screen doesn't exist.
      </Text>
      <Link href={`/?${query}`}>
        <Text className="mt-4 py-4 text-xl color-blue-500">
          Go to home screen
        </Text>
      </Link>
    </View>
  );
}
