import { Button } from "@/components/shared/button";
import { useCreateEstContext } from "../context";
import { useNavigate } from "@tanstack/react-router";

export const FormButtons = ({isLoading}: {isLoading?:boolean}) => {
  const { activeIndex, completedSteps } = useCreateEstContext();
  const navigate = useNavigate();

  return (
    <div className=" gap-1 flex justify-end w-auto items-end">
      {completedSteps < 1 && (
        <div className="w-[8rem]">
          <Button
            handler={() => {
              navigate({
                to: "/dashboard",
              });
            }}
            buttonType="button"
            variant={"cancel"}
            text="Skip for now"
          />
        </div>
      )}
      <div className="w-[8rem]">
        <Button
          buttonType="submit"
          variant={"next"}
          text={activeIndex == 3 ? "Finish" : "Next"}
          isLoading={isLoading}
          loadingText={activeIndex == 3 ? "Creating establishment..." : "Next..."}
        />
      </div>
    </div>
  );
};

export const CreateEstablishmentTopNav = () => {
  const { activeIndex, setActiveIndex, completedSteps } = useCreateEstContext();

  const activeStyle = `hover:cursor-pointer dark:bg-white dark:text-black text-white bg-stone-900 text-black rounded-sm px-2 flex items-center justify-center py-2`;
  const defStyle = `hover:cursor-pointer dark:text-white  flex items-center justify-center py-2`;

  const tabs = [
    { title: "General Info" },
    { title: "Contact Info" },
    { title: "Operation Info" },
  ];

  return (
    <div className="grid grid-cols-3 gap-1 border dark:border-stone-600 border-stone-700 rounded-md p-0.5">
      {tabs.map((item, index) => (
        <button
          disabled={!(completedSteps >= index)}
          key={index}
          className={activeIndex == index + 1 ? activeStyle : defStyle}
          onClick={() => setActiveIndex(index + 1)}
        >
          <span className="text-xs">{item.title}</span>
        </button>
      ))}
    </div>
  );
};
