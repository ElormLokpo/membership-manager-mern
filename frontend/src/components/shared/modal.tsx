import { Button } from "./button";
import { ModalTop } from "./sheet";
import { Typography } from "./typography";

export const DeleteModal = ({
    
  text,
  handler
}: {
  text: string;
  
  handler: () => void;
}) => {
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
          <Button text={`Cancel`} variant={"dash-sec"} />
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
