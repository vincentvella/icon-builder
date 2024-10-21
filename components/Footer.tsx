import { useTheme } from "@/hooks/theme/ThemeContext";
import { A, Footer as FooterElement, H3 } from "@expo/html-elements";
import colors from "tailwindcss/colors";

export function Footer() {
  const { colorScheme } = useTheme();
  return (
    <FooterElement className="justify-center items-center md:absolute md:bottom-0 md:left-0 md:right-0">
      <H3 className="text-xl pb-5 md:pb-2 dark:text-gray-400 text-slate-500">
        Made with{" "}
        <A
          style={{
            color: colorScheme === "dark" ? colors.white : colors.black,
          }}
          target="_blank"
          href="http://expo.io/"
        >
          Expo
        </A>
      </H3>
    </FooterElement>
  );
}
