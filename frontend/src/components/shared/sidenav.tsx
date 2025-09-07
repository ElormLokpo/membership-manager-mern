import { adminMainSideNavRoutes } from "@/constants";
import { ThemeToggler } from "./themeToggler";
import { Typography } from "./typography";
import { Link, useNavigate } from "@tanstack/react-router";
import { TbCircleDotted } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux";
import { clearAuthUser } from "@/redux/reducers/authReducer";
import { Button } from "./button";
import { FiPlus } from "react-icons/fi";
import { useContext } from "react";
import { ModalContext, type IModalContext } from "@/context/ModalContext";
import { CreateEstablishmentModal } from "@/pages/dashboard/establishments/create-establishment/create-establishment-page";

export const SideNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { setModal, setDirection } = useContext(ModalContext) as IModalContext;

  const sideNavStyle =
    "flex hover:cursor-pointer hover:dark:bg-stone-800 hover:bg-stone-200 p-2 rounded-md mb-2 gap-2 items-center";

  const organizations = [
    {
      id: "Org 1",
      name: "Organization",
    },
    {
      id: "Org 2",
      name: "Organization",
    },
  ];

  const authData = useSelector((state: RootState) => state.authReducer.user);

  const accountType: Record<string, string> = {
    ADMIN: "Super admin account",
    STAFF: "Staff account",
  };

  return (
    <div className="h-screen bg-stone-100 dark:bg-stone-800 rounded-xl p-3 flex flex-col justify-between">
      <div>
        <div className="flex justify-between mb-10">
          <div className="flex flex-col">
            <Typography text="MEMBR" className="font-bold" />
            <Typography text={accountType[authData?.role ?? ""]} size={"xs"} />
          </div>

          <div>
            <ThemeToggler />
          </div>
        </div>

        <div>
          <div className="mb-10">
            <div className="mb-3">
              <Typography text="Main" className="font-semibold" />
            </div>

            {adminMainSideNavRoutes.map((item, index) => {
              return (
                <Link className={sideNavStyle} key={index} to={item.route}>
                  {item.icon}
                  <Typography text={item.text} />
                </Link>
              );
            })}
          </div>

          <div>
            <div className="mb-3 flex items-end justify-between gap-2">
              <Typography text="Establishments" className="font-semibold" />

              <div>
                <Button
                  handler={() => {
                    setDirection("center");
                    setModal(<CreateEstablishmentModal />);
                  }}
                  variant="icon"
                  icon={<FiPlus />}
                />
              </div>
            </div>

            {organizations.map((item, index) => {
              return (
                <div
                  className={sideNavStyle + " justify-between group"}
                  key={index}
                >
                  <div className="flex gap-3 items-center">
                    <TbCircleDotted />
                    <Typography text={item.name} />
                  </div>

                  <button
                    onClick={() => {
                      console.log("delete clicked" + item.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 hover:cursor-pointer dark:hover:bg-stone-600 p-1 rounded-sm"
                  >
                    <AiOutlineDelete className="text-red-400" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end">
       

        <div>
          <button
            onClick={() => {
              dispatch(clearAuthUser());
              navigate({ to: "/login" });
            }}
            className="hover:cursor-pointer hover:border dark:hover:bg-stone-800 p-2 rounded"
          >
            <BiLogOut />
          </button>
        </div>
      </div>
    </div>
  );
};
