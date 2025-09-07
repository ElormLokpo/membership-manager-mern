import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";
import { DashboardCards } from "../components/cards";
import { StaffTable } from "./components/table";

export const StaffPage = () => {
  return (
    <div className="h-screen w-full bg-stone-100 rounded-lg my-2">
      <div className="p-5 h-screen">
        <div className="col-span-9">
          <div className="mb-4 flex justify-between">
            <div className=" flex gap-1 flex-col">
              <Typography
                text={`Staff`}
                size={"xl"}
                className="font-semibold"
              />
              <Typography
                text={`All operations involving adding and managing staff.`}
                size={"xs"}
                className="text-stone-500"
              />
            </div>

            <div className="flex gap-2">
              <div>
                <Button text={`Add Staff`} variant={"dash-def"} />
              </div>
              <div>
                <Button text={`Import Data`} variant={"dash-sec"} />
              </div>
            </div>
          </div>

          <div className="mb-2">
            <DashboardCards activeIndex={1} />
          </div>

          <div className="">
            <StaffTable />
          </div>
        </div>
      </div>
    </div>
  );
};
