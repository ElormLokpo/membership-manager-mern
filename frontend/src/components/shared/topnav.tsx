import { Input } from "./input";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux";
import { Typography } from "./typography";

export const TopNav = () => {
  const authData = useSelector((state: RootState) => state.authReducer.user);

  return (
    <div className="bg-stone-100 dark:bg-stone-800 py-2.5 pl-1.5 pr-10 rounded-xl flex justify-between items-center">
      <div className="w-[25%]">
        <Input
          inputType="search"
          name="search"
          placeholder="Search item"
          variant="search"
        />
      </div>

      <div className="flex gap-6 items-center">
        <div className="flex gap-2 items-center">
          <div className="bg-white dark:bg-black rounded-full p-2">
            <MdOutlineEmail />
          </div>

          <div className="bg-white dark:bg-black rounded-full p-2">
            <IoIosNotificationsOutline />
          </div>
        </div>

        <div>
          <div className="flex flex-col">
            <Typography
              className="font-semibold"
              text={authData?.fullname ?? ""}
              size={"xs"}
            />
            <Typography text={authData?.email ?? ""} size={"xs"} />
          </div>
        </div>
      </div>
    </div>
  );
};
