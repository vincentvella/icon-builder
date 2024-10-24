import { useTheme } from "@/hooks/theme/ThemeContext";
import { A, Code } from "@expo/html-elements";
import Ionicons from "@expo/vector-icons/Ionicons";
import { setStringAsync } from "expo-clipboard";
import { useGlobalSearchParams, useRouter } from "expo-router";
import queryString from "query-string";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type LinkSectionProps = {
  title: string;
  location: string;
  link: string;
};

function LinkSection({ title, location, link }: LinkSectionProps) {
  const { colorScheme } = useTheme();

  const copyToClipboard = async () => {
    await setStringAsync(link);
  };

  return (
    <View className="flex-1 justify-center self-center items-center pt-4">
      <Text className="text-center text-lg dark:text-white">{title}</Text>
      <Text className="text-center text-lg dark:text-white">
        Place in app.json as <Code>{location}</Code>
      </Text>
      <View className="flex-1 flex-row items-center">
        <Text className="text-center text-lg dark:text-white bg-neutral-200 dark:bg-neutral-800">
          {link}
        </Text>
        <TouchableOpacity
          className="p-2 ml-2 bg-primary rounded-lg"
          onPress={copyToClipboard}
        >
          <Ionicons
            name="clipboard"
            size={20}
            color="#fff"
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Modal() {
  const router = useRouter();
  const { emoji, color } = useGlobalSearchParams();

  function dismissModal() {
    router.dismiss();
  }

  const query = queryString.stringify({ emoji, color });
  const iconLink = `https://icon-builder.up.railway.app/icon?${query}`;
  const splashLink = `https://icon-builder.up.railway.app/splash?${query}`;
  const faviconLink = `https://icon-builder.up.railway.app/favicon?${query}`;

  return (
    <>
      <Pressable
        className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-90"
        onPress={dismissModal}
      />
      <View className="flex-1 items-center justify-center pointer-events-none">
        <View className="p-4 bg-white dark:bg-neutral-900 items-center rounded-[10px] drop-shadow-sm m-8 pointer-events-auto">
          <Text className="text-center text-lg dark:text-white">
            Add the following links in your app's{" "}
            <A
              className="text-blue-500"
              href="https://docs.expo.dev/versions/latest/config/app"
            >
              app.json/app.config.js
            </A>
            &nbsp;file.
          </Text>
          <LinkSection title="Icon Link" location="expo.icon" link={iconLink} />
          <LinkSection
            title="Splash Link"
            location="expo.splash.image"
            link={splashLink}
          />
          <LinkSection
            title="Favicon Link"
            location="expo.web.favicon"
            link={faviconLink}
          />
        </View>
      </View>
    </>
  );
}
