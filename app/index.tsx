import { AppIconContainer } from "@/components/AppIconImage";
import { ColorPicker } from "@/components/ColorPicker";
import { EmojiPicker } from "@/components/EmojiPicker";
import { useState } from "react";
import { Text, View } from "react-native";
import colors from "tailwindcss/colors";

function App() {
  const [color, setColor] = useState<string>(colors.white);
  return (
    <View>
      <AppIconContainer color={color} onPress={() => {}} />
      <ColorPicker onValueChanged={(hex) => setColor(hex)} />
      <EmojiPicker onSelect={() => {}} />
    </View>
  );
}

export default App;
