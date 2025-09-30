import type { IThemeContext } from "@/context/ThemeContext";
import { useTheme } from "@/hooks/contextHooks";
import { CloudSunIcon, MoonIcon } from "@phosphor-icons/react";
import { useEffect } from "react";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme() as IThemeContext;

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    root.classList.add(theme);
  }, [theme]);

  const handleTheme = () => {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("light");
        break;
    }
  };

  return (
    <button
      onClick={handleTheme}
      className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-500 rounded-md hover:cursor-pointer w-fit"
    >
      {theme == "light" ? <CloudSunIcon size={13} /> : <MoonIcon size={13} />}
    </button>
  );
};
