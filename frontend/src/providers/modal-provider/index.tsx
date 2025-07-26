import { ModalContext} from "@/context/ModalContext";
import { useState, type ReactElement } from "react";

export const ModalProvider = ({ children }: { children: ReactElement }) => {
  const [modal, setModal] = useState<ReactElement | null>(null);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};
