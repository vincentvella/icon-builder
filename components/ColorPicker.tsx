import React from "react";
import { TouchableOpacity } from "react-native";
import colors from "tailwindcss/colors";
import { ColorView } from "./ColorView";
import { ColorPickerInput } from "./ColorPickerInput";
import { ScrollView } from "./core/ScrollView";

export function ColorPicker({
  isMobile,
  onValueChanged,
  ...props
}: React.ComponentProps<typeof ScrollView> & {
  isMobile?: boolean;
  onValueChanged: (hex: string) => void;
}) {
  const [text, onTextChanged] = React.useState("FFFFFF");

  return (
    <ScrollView
      {...props}
      className="sm:min-h-12 sm:max-h-48 flex-shrink flex-grow-0 max-w-72"
      contentContainerClassName="py-3 sm:w-full flex-row flex-wrap"
      horizontal={isMobile}
      pagingEnabled
    >
      {COLORS.map((color) => (
        <TouchableOpacity key={color} onPress={() => onValueChanged(color)}>
          <ColorView color={color} pad />
        </TouchableOpacity>
      ))}
      <ColorPickerInput
        value={text}
        onValueChanged={onTextChanged}
        onSubmit={(value) => {
          onValueChanged(value);
        }}
      />
    </ScrollView>
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
