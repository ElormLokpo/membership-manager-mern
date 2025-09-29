import { ModalContext, type IModalContext } from "@/context/ModalContext";
import { useContext } from "react";

export const useModal = () => {
  const { setModal, setDirection } = useContext(ModalContext) as IModalContext;
  
  return { setModal, setDirection };
};
