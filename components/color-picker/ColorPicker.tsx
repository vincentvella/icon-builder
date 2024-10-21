import React from "react";
import { TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { ColorView } from "./ColorView";
import { ColorPickerInput } from "./ColorPickerInput";
import { useGlobalSearchParams, useRouter } from "expo-router";

type ColorPickerProps = {
  onValueChanged: (hex: string) => void;
};

export function ColorPicker({ onValueChanged }: ColorPickerProps) {
  const params = useGlobalSearchParams();
  const { setParams } = useRouter();
  const [text, setText] = React.useState<string>(
    (params.color as string) ?? colors.white,
  );

  function handleColorChange(hex: string) {
    if (!hex.startsWith("#")) {
      hex = `#${hex}`;
    }
    setParams({ color: hex });
    setText(hex);
    onValueChanged(hex);
  }

  return (
    <View className="flex-shrink flex-grow-0 max-w-72">
      <View className="flex-row flex-wrap py-5">
        {COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            onPress={() => handleColorChange(color)}
          >
            <ColorView color={color} pad />
          </TouchableOpacity>
        ))}
      </View>
      <ColorPickerInput value={text} onValueChanged={handleColorChange} />
    </View>
  );
}

const defaultColors = [
  colors.red[500],
  colors.pink[600],
  colors.rose[600],
  colors.purple[600],
  colors.fuchsia[700],
  colors.violet[700],
  colors.indigo[700],
  colors.sky[700],
  colors.sky[500],
  colors.cyan[500],
  colors.teal[600],
  colors.green[500],
  colors.lime[400],
  colors.emerald[300],
  colors.emerald[500],
  colors.yellow[300],
  colors.yellow[500],
  colors.amber[500],
  colors.orange[600],
  colors.slate[500],
  colors.neutral[400],
  colors.gray[400],
  colors.black,
  colors.white,
];

const COLORS = defaultColors.reverse();

export const randomColor = () =>
  defaultColors[Math.floor(Math.random() * defaultColors.length)];
