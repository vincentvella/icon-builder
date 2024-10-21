import React from "react";
import { Image, View } from "react-native";
import { twitterEmoji } from "./utils/ImageOps";

type AppIconImageProps = {
  color: string;
  image?: string;
  emojiId?: string;
  onError: () => void;
};

function AppIconImage({
  image,
  emojiId,
  onError,
}: Pick<AppIconImageProps, "image" | "emojiId" | "onError">) {
  if (image) {
    return (
      <Image
        className="size-24 flex-1"
        source={{ uri: image }}
        style={{ resizeMode: "contain" }}
      />
    );
  }

  if (emojiId) {
    return (
      <Image
        className="size-24 flex-1"
        source={{ uri: twitterEmoji(emojiId) }}
        onError={onError}
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
  onError,
}: AppIconImageProps) {
  return (
    <View className="size-40 items-center">
      <View
        className="drop-shadow-md dark:shadow-neutral-900 shadow-zinc-800 rounded-[38.4px] size-32 justify-center items-center"
        style={{ backgroundColor: color }}
      >
        <AppIconImage image={image} emojiId={emojiId} onError={onError} />
      </View>
    </View>
  );
}
