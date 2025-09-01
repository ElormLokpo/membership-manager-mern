import { createContext, type ReactElement } from "react";

export interface IModalContext {
  modal: ReactElement | null;
  setModal: (modal: ReactElement | null) => void | null;
  direction: string;
  setDirection: (direction: string) => void | null;
}

export const ModalContext = createContext<IModalContext | undefined>(undefined);
