import { Text, TextInput, View } from "react-native";
import tinycolor from "tinycolor2";
import { cn } from "../utils/cn";

export const isValidHex = (hex: string) => {
  if (hex === "transparent") {
    return true;
  }
  // disable hex4 and hex8
  const lh = String(hex).charAt(0) === "#" ? 1 : 0;
  return (
    hex.length !== 4 + lh && hex.length < 7 + lh && tinycolor(hex).isValid()
  );
};

type ColorPickerInputProps = {
  value: string;
  onValueChanged: (hex: string) => void;
};

export function ColorPickerInput({
  value,
  onValueChanged,
}: ColorPickerInputProps) {
  return (
    <View
      className={cn(
        "flex-1 h-6 min-w-64 m-1.5 rounded-[10px] border-2 flex-row overflow-hidden dark:border-neutral-800 dark:bg-zinc-800 border-neutral-100 bg-white",
        !isValidHex(value) && "border-red-500 dark:border-red-500",
      )}
    >
      <View className="h-5 w-6 justify-center items-center p-2 self-center border-red-500">
        <Text className="self-center dark:color-white color-zinc-400">#</Text>
      </View>
      <TextInput
        className="flex-1 px-1 outline-transparent dark:color-white color-stone-500 p-2 dark:border-neutral-800 outline-none"
        autoCapitalize="none"
        autoCorrect={false}
        value={value.replace("#", "")}
        onChangeText={onValueChanged}
      />
    </View>
  );
}
