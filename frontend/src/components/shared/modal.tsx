import { Button } from "./button";
import { ModalTop } from "./sheet";
import { Typography } from "./typography";
import { type IModalContext } from "@/context/ModalContext";
import { useModal } from "@/hooks/contextHooks";

export const DeleteModal = ({
  text,
  handler,
}: {
  text: string;

  handler: () => void;
}) => {
  const { setModal } = useModal() as IModalContext;

  return (
    <div
      className="p-4"
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
      }}
    >
      <div>
        <ModalTop title="Delete confirm" />
      </div>

      <div className="mb-5">
        <Typography text={text} />
      </div>

      <div className="flex items-end justify-end gap-2">
        <div>
          <Button
            text={`Cancel`}
            variant={"dash-sec"}
            handler={() => {
              setModal(null);
            }}
          />
        </div>
        <div>
          <Button
            className="bg-red-600 hover:bg-red-700"
            text={`Confirm Delete`}
            variant={"dash-def"}
            handler={handler}
          />
        </div>
      </div>
    </div>
  );
};
