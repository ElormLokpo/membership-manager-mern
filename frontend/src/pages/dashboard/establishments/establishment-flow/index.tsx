import { Typography } from "@/components/shared/typography";
import {
  useDeleteEstablishmentByOwner,
  useGetEstablishmentByOwner,
} from "@/hooks/establishmentHook";
import { AiOutlineDelete } from "react-icons/ai";
import { TbCircleDotted } from "react-icons/tb";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { storeCurrentEstablishmentId } from "@/redux/reducers/establishmentReducer";
import type { RootState } from "@/redux";
import { useContext, useEffect, useState } from "react";
import { ModalContext, type IModalContext } from "@/context/ModalContext";
import { DeleteModal } from "@/components/shared/modal";

export const EstablishmentFlow = () => {
  const [currentEs, setCurrentEs] = useState<string | null>(null);
  const { setModal, setDirection } = useContext(ModalContext) as IModalContext;

  const dispatch = useDispatch();
  const { data: establishmentResponse } = useGetEstablishmentByOwner();

  const currentEstablishmentId = useSelector(
    (store: RootState) => store.establishmentReducer.currentEstablishmentId
  );

  useEffect(() => {
    if (establishmentResponse?.data?.length) {
      dispatch(storeCurrentEstablishmentId(establishmentResponse?.data[0].id));
    }
  }, [dispatch, establishmentResponse]);

  useEffect(() => {
    setCurrentEs(currentEstablishmentId);
  }, [currentEstablishmentId]);

  const { mutate: deleteEstablishment } = useDeleteEstablishmentByOwner();

  const deleteHandler = (id: string) => {
    deleteEstablishment(id);
  };

  return (
    <div>
      {establishmentResponse?.data.map(
        (item: { name: string; id: string }, index: number) => {
          return (
            <button
              onClick={() => dispatch(storeCurrentEstablishmentId(item.id))}
              className={
                currentEs == item.id
                  ? "bg-stone-300 dark:bg-stone-600 w-full flex hover:cursor-pointer hover:dark:bg-stone-700 hover:bg-stone-400 p-2 rounded-md mb-2 gap-2 items-center justify-between group"
                  : `w-full flex hover:cursor-pointer hover:dark:bg-stone-800 hover:bg-stone-200 p-2 rounded-md mb-2 gap-2 items-center justify-between group`
              }
              key={index}
            >
              <div className="flex gap-3 items-center">
                <TbCircleDotted />
                <Typography text={item?.name} />
              </div>

              <div>
                <button
                  onClick={() => {
                    console.log("delete clicked" + item.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 hover:cursor-pointer dark:hover:bg-stone-600 p-1 rounded-sm"
                >
                  <FiEdit2 />
                </button>

                <button
                  onClick={() => {
                    console.log("delete clicked" + item.id);
                    setDirection("center");
                    setModal(
                      <DeleteModal
                        handler={() => deleteHandler(item.id)}
                        text={`Are you sure you want to delete ${item.name} establishment?`}
                      />
                    );
                  }}
                  className="opacity-0 group-hover:opacity-100 hover:cursor-pointer dark:hover:bg-stone-600 p-1 rounded-sm"
                >
                  <AiOutlineDelete className="text-red-400" />
                </button>
              </div>
            </button>
          );
        }
      )}
    </div>
  );
};
