import { createContext } from "react";

export type ThemeType = "light" | "dark" | "system";

export interface IThemeContext {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);
