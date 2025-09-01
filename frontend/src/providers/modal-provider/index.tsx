import { ModalContext } from "@/context/ModalContext";
import { useState, type ReactElement } from "react";

export const ModalProvider = ({ children }: { children: ReactElement }) => {
  const [modal, setModal] = useState<ReactElement | null>(null);
  const [direction, setDirection] = useState<string>("right");

  return (
    <ModalContext.Provider value={{ modal, setModal, direction, setDirection }}>
      {children}
    </ModalContext.Provider>
  );
};
