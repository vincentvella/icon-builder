import Picker from "@emoji-mart/react";
import { Emoji } from "@emoji-mart/data";
import React from "react";
import { useTheme } from "@/hooks/theme/ThemeContext";

export type EmojiReturnValue = Emoji & { unified: string };
export type EmojiSelectEvent = (data: EmojiReturnValue) => void;

type EmojiPickerProps = {
  onSelect: EmojiSelectEvent;
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

export function EmojiPicker({ onSelect }: EmojiPickerProps) {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === "dark";
  const color = isDark ? "white" : "#4630eb";
  return (
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
  );
}
