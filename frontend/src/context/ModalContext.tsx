import { type ReactElement } from "react";
import {createContext} from "use-context-selector";

export interface IModalContext {
  modal: ReactElement | null;
  setModal: (modal: ReactElement | null) => void | null;
  direction: string;
  setDirection: (direction: string) => void | null;
}

export const ModalContext = createContext<IModalContext | undefined>(undefined);
