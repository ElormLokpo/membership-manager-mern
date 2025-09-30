import { ModalContext } from "@/context/ModalContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useContextSelector } from "use-context-selector";

export const useTheme = () =>
  useContextSelector(ThemeContext, (ctx) => ({
    theme: ctx?.theme,
    setTheme: ctx?.setTheme,
  }));

export const useModal = () =>
  useContextSelector(ModalContext, (ctx) => ({
    modal: ctx?.modal,
    setModal: ctx?.setModal,
    direction: ctx?.direction,
    setDirection: ctx?.setDirection,
  }));
