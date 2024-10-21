import { AppIconContainer } from "@/components/AppIconImage";
import { ColorPicker } from "@/components/color-picker/ColorPicker";
import { ScrollView } from "@/components/core/ScrollView";
import { EmojiPicker, EmojiReturnValue } from "@/components/EmojiPicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import colors from "tailwindcss/colors";

function App() {
  const [color, setColor] = useState<string>(colors.white);
  const [emoji, setEmoji] = useState<EmojiReturnValue | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const { setParams } = useRouter();

  function setEmojiAndUpdateURL(emoji: EmojiReturnValue) {
    setParams({ emoji: emoji.unified });
    setEmoji(emoji);
    setImage(null);
  }

  function setColorAndUpdateURL(color: string) {
    setParams({ color });
    setColor(color);
  }

  function onError() {
    if (emoji) {
      const split = emoji.unified.split("-").slice(0, -1).join("-");
      console.log(split);
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
    <ScrollView className="flex-1 md:m-4 gap-4">
      <View className="flex-col md:flex-row">
        <View className="flex-1 justify-center self-center items-center my-4">
          <View className="p-12 px-8 bg-white dark:bg-neutral-900 items-center rounded-[10px] drop-shadow-sm m-2">
            <AppIconContainer
              onError={onError}
              color={color}
              onPress={() => {}}
              emojiId={emoji?.unified ?? undefined}
            />
            <ColorPicker onValueChanged={setColorAndUpdateURL} />
          </View>
        </View>
        <View className="flex-1 justify-center self-center items-center">
          <EmojiPicker onSelect={setEmojiAndUpdateURL} />
        </View>
      </View>
    </ScrollView>
  );
}

export default App;
