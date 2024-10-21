import { View } from "react-native";
import { cn } from "./utils/cn";

type ColorViewProps = {
  color: string;
  pad?: boolean;
};

export function ColorView({ color, pad }: ColorViewProps) {
  return (
    <View
      className={cn(
        "border-2 dark:border-neutral-600 border-white rounded-full shadow-neutral-900 drop-shadow-md size-6",
        pad && "m-3 sm:m-1.5",
      )}
      style={{ backgroundColor: color }}
    />
  );
}
