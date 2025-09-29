import { Input } from "./input";
import { MdOutlineEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux";
import { Typography } from "./typography";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "@tanstack/react-router";
import { clearAuthUser } from "@/redux/reducers/authReducer";

export const TopNav = () => {
  const authData = useSelector((state: RootState) => state.authReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-stone-100 dark:bg-black dark:border py-2.5 pl-1.5 pr-10 rounded-xl flex justify-between items-center">
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
          <div className="bg-white dark:bg-black dark:border rounded-full p-2 hover:cursor-pointer">
            <MdOutlineEmail />
          </div>

          <div className="">
            <button
              onClick={() => {
                dispatch(clearAuthUser());
                navigate({ to: "/login" });
              }}
              className="bg-white dark:bg-black dark:border rounded-full p-2 hover:cursor-pointer"
            >
              <BiLogOut />
            </button>
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
