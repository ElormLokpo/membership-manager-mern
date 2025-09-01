import { ModalContext, type IModalContext } from "@/context/ModalContext";
import { useContext, type ReactElement } from "react";
import { Typography } from "./typography";
import { IoIosCloseCircleOutline } from "react-icons/io";

export const Sheet = ({ modal }: { modal: ReactElement }) => {
  const { setModal, direction, setDirection } = useContext(
    ModalContext
  ) as IModalContext;

  const modalDirections: Record<string, ReactElement> = {
    right: (
      <div className="h-screen w-[40rem] z-50 dark:bg-stone-950 border-l bg-stone-100">
        {modal}
      </div>
    ),
    center: (
      <div className="w-[35rem] z-50 dark:bg-stone-950 rounded-md border-l bg-stone-100">
        {modal}
      </div>
    ),
  };

  return (
    <div
      onClick={() => {
        setDirection("right");
        setModal(null);
      }}
      className={`bg-black/40 min-h-screen h-full z-25 w-full absolute top-0 flex ${direction == "right" ? "justify-end" : "justify-center items-center"}`}
    >
      {modalDirections[direction]}
    </div>
  );
};

export interface IModalTop {
  title: string;
  subTitle?: string;
}
export const ModalTop = ({ title, subTitle }: IModalTop) => {
  const { setModal, setDirection } = useContext(ModalContext) as IModalContext;

  return (
    <div className="mb-5 flex justify-between">
      <div className="flex flex-col gap-1">
        <Typography text={title} className="font-semibold" size={"medium"} />
        <Typography text={subTitle ?? ""} className="" size={"xs"} />
      </div>

      <div>
        <button
        className="hover:cursor-pointer"
          onClick={() => {
            setModal(null);
            setDirection("center");
          }}
        >
          <IoIosCloseCircleOutline />
        </button>
      </div>
    </div>
  );
};
