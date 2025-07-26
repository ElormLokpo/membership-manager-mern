import { ModalContext, type IModalContext } from "@/context/ModalContext";
import { useContext, type ReactElement } from "react";

export const Sheet = ({ modal }: { modal: ReactElement }) => {
  const { setModal } = useContext(ModalContext) as IModalContext;

  return (
    <div
      onClick={() => setModal(null)}
      className="bg-black/40 min-h-screen w-full absolute top-0 flex justify-end"
    >
      <div className="h-screen w-[40rem] dark:bg-stone-950 border-l bg-stone-100">
        {modal}
      </div>
    </div>
  );
};
