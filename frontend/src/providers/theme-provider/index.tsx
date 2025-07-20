import { ThemeContext } from "@/context/ThemeContext";
import { useState, type ReactElement } from "react";

export const ThemeProvider = ({ children }: { children: ReactElement }) => {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

