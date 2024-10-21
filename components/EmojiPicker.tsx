import Picker from "@emoji-mart/react";
import { Emoji } from "@emoji-mart/data";
import React from "react";
import { useTheme } from "@/hooks/theme/ThemeContext";
import { Text, TouchableOpacity, View } from "react-native";
import { launchImageLibraryAsync } from "expo-image-picker";

export type EmojiReturnValue = Emoji & { unified: string };
export type EmojiSelectEvent = (data: EmojiReturnValue | null) => void;

type EmojiPickerProps = {
  onSelect: EmojiSelectEvent;
  onSelectImage: (image: string) => void;
};

const categories = [
  "frequent",
  "people",
  "nature",
  "foods",
  "activity",
  "places",
  "objects",
  "symbols",
];

export function EmojiPicker({ onSelect, onSelectImage }: EmojiPickerProps) {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === "dark";
  const color = isDark ? "white" : "#4630eb";

  async function uploadImageAsync() {
    const file = await launchImageLibraryAsync({
      selectionLimit: 1,
      allowsMultipleSelection: false,
    });
    if (!file.canceled) {
      onSelectImage(file.assets[0].uri);
      onSelect(null);
    }
  }

  return (
    <View>
      <TouchableOpacity
        onPress={uploadImageAsync}
        activeOpacity={0.6}
        className=" bg-primary rounded-lg p-4 justify-center items-center"
      >
        <Text className="text-white text-2xl">Upload Image</Text>
      </TouchableOpacity>
      <Picker
        theme={colorScheme}
        set="twitter"
        notFoundEmoji="mag"
        color={color}
        categories={categories}
        title=""
        showPreview={false}
        emoji="bacon"
        onEmojiSelect={onSelect}
        showSkinTones={false}
      />
    </View>
  );
}
