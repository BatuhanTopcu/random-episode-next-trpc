import { useLayoutEffect } from "react";

export const themes = [
  {
    name: "theme-1",
    title: "Sky",
    colors: ["#d8d8d8", "#06283d", "#dff6ff", "#827397"],
  },
  {
    name: "theme-2",
    title: "Pitch Black",
    colors: ["#000000", "#d8d8d8"],
  },
  {
    name: "theme-3",
    title: "Pinky",
    colors: ["#d8d8d8", "#e8a0bf", "#810955", "#980f5a"],
  },
  {
    name: "theme-4",
    title: "Dark",
    colors: ["#171717", "#2d2424", "#d8d8d8"],
  },
  {
    name: "theme-5",
    title: "Nature",
    colors: ["#446a46", "#c7d36f", "#5fd068"],
  },
  {
    name: "theme-6",
    title: "Night",
    colors: ["#371b58", "#7858a6", "#827397"],
  },
] as const;

type Theme = typeof themes[number]["name"];
const themeNames = themes.map((theme) => theme.name as string);

export const useTheme = () => {
  useLayoutEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme && themeNames.includes(theme)) {
      document.body.classList.add(theme);
    } else {
      localStorage.setItem("theme", "theme-1");
      document.body.classList.add("theme-1");
    }
  }, []);
};

export const toggleTheme = (theme: Theme) => {
  document.body.classList.remove(...themeNames);
  document.body.classList.add(theme);
  localStorage.setItem("theme", theme);
};
