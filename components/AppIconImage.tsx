import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { twitterEmoji } from "./utils/ImageOps";

type AppIconImageProps = {
  color: string;
  image?: string;
  emojiId?: string;
  onPress: () => void;
};

function AppIconImage({
  image,
  emojiId,
}: Pick<AppIconImageProps, "image" | "emojiId">) {
  if (image) {
    return (
      <Image
        className="size-32 flex-1"
        source={{ uri: image }}
        style={{ resizeMode: "cover" }}
      />
    );
  }

  if (emojiId) {
    return (
      <Image
        className="size-32 flex-1"
        source={{ uri: twitterEmoji(emojiId) }}
        style={{ resizeMode: "contain" }}
      />
    );
  }

  return null;
}

export function AppIconContainer({
  color,
  image,
  emojiId,
  onPress,
}: AppIconImageProps) {
  console.log(color);
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View
        className="drop-shadow-md dark:shadow-neutral-900 shadow-zinc-800 rounded-[38.4px] size-32 justify-center items-center"
        style={{ backgroundColor: color }}
      >
        <AppIconImage image={image} emojiId={emojiId} />
      </View>
    </TouchableOpacity>
  );
}
