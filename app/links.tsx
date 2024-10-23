import { useGlobalSearchParams, useRouter } from "expo-router";
import queryString from "query-string";
import { Pressable, Text, View } from "react-native";

export default function Modal() {
  const router = useRouter();
  const { emoji, color } = useGlobalSearchParams();

  console.log(emoji);

  function dismissModal() {
    router.dismiss();
  }

  const query = queryString.stringify({ emoji, color });
  const iconLink = `https://icon-builder.up.railway.app/icon?${query}`;
  const splashLink = `https://icon-builder.up.railway.app/splash?${query}`;

  return (
    <>
      <Pressable
        className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50"
        onPress={dismissModal}
      />
      <View className="flex-1 items-center justify-center">
        <View className="p-8 px-8 bg-white dark:bg-neutral-900 items-center rounded-[10px] drop-shadow-sm m-2 h-1/2 w-1/2">
          <Text className="text-center text-2xl dark:text-white">
            Icon Links
          </Text>
          <Text className="text-center text-lg dark:text-white">
            Add the following links in your app's app.config.js/ts or app.json
            file.
          </Text>
          <pre className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 mt-4">
            <code className="text-center text-lg dark:text-white">
              {snippet({ iconLink, splashLink })}
            </code>
          </pre>
        </View>
      </View>
    </>
  );
}

const snippet = ({
  iconLink,
  splashLink,
}: {
  iconLink: string;
  splashLink: string;
}) => `{
  "expo": {
    "icon": "${iconLink}",
    "splash": {
      "image": "${splashLink}",
    },
  }
}`;
