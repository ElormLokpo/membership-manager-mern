import { ThemeContext, type ThemeType } from "@/context/ThemeContext";
import { useState, type ReactElement } from "react";
import { Toaster } from "sonner";

export const ThemeProvider = ({ children }: { children: ReactElement }) => {
  const [theme, setTheme] = useState<ThemeType>("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
      <Toaster theme={theme} />
    </ThemeContext.Provider>
  );
};
