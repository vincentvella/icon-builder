import { View } from "react-native";
import { cn } from "../utils/cn";

type ColorViewProps = {
  color: string;
  pad?: boolean;
};

export function ColorView({ color, pad }: ColorViewProps) {
  return (
    <View
      className={cn(
        "border-2 dark:border-neutral-600 border-white rounded-full shadow-neutral-900 drop-shadow-lg size-6",
        pad && "m-1.5 md:md-3",
      )}
      style={{ backgroundColor: color }}
    />
  );
}
