export type ColorScheme = "light" | "dark";

export type ColorSchemeReturnValue = {
  loading: boolean;
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
};
