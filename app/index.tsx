import { AppIconContainer } from "@/components/AppIconImage";
import { ColorPicker } from "@/components/color-picker/ColorPicker";
import { ScrollView } from "@/components/core/ScrollView";
import { EmojiPicker, EmojiReturnValue } from "@/components/EmojiPicker";
import { Footer } from "@/components/Footer";
import { generateImagesAsync } from "@/components/utils/ImageOps";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";

function App() {
  const params = useGlobalSearchParams();
  const [color, setColor] = useState<string>(
    (params.color as string) ?? colors.white,
  );
  const [emoji, setEmoji] = useState<Pick<EmojiReturnValue, "unified"> | null>({
    unified: params.emoji as string,
  });
  const [image, setImage] = useState<string | null>(null);

  const { setParams } = useRouter();

  function setEmojiAndUpdateURL(emoji: EmojiReturnValue) {
    setParams({ emoji: emoji.unified });
    setEmoji(emoji);
    setImage(null);
  }

  function onError() {
    if (emoji) {
      // Some icons aren't hosted by Twitter, so we need to split the emoji ID and find the closest match
      const split = emoji.unified.split("-").slice(0, -1).join("-");
      if (split !== emoji.unified) {
        setEmoji((emoji) => {
          if (emoji) {
            return {
              ...emoji,
              unified: split,
            };
          }
          return emoji;
        });
      }
    }
  }

  return (
    <ScrollView
      className="flex-1 md:m-4 gap-4"
      contentContainerClassName="h-full"
    >
      <View className="flex-col md:flex-row">
        <View className="flex-1 justify-center self-center items-center my-4">
          <View className="p-8 px-8 bg-white dark:bg-neutral-900 items-center rounded-[10px] drop-shadow-sm m-2 h-[435px]">
            <AppIconContainer
              onError={onError}
              color={color}
              emojiId={emoji?.unified ?? undefined}
            />
            <ColorPicker onValueChanged={setColor} />
          </View>
        </View>
        <View className="flex-1 justify-center self-center items-center">
          <EmojiPicker onSelect={setEmojiAndUpdateURL} />
        </View>
      </View>
      <TouchableOpacity
        className="m-5 bg-primary rounded-lg p-4 justify-center items-center"
        onPress={() => generateImagesAsync({ color, emojiId: emoji?.unified })}
      >
        <Text className="text-white text-2xl">Generate Icon</Text>
      </TouchableOpacity>
      <Footer />
    </ScrollView>
  );
}

export default App;
