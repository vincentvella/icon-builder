import { cssInterop } from "nativewind";
import { ScrollView as RNScrollView } from "react-native";

export const ScrollView = cssInterop(RNScrollView, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});
