import { adminMainSideNavRoutes } from "@/constants";
import { ThemeToggler } from "./themeToggler";
import { Typography } from "./typography";
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux";
import { Button } from "./button";
import { FiPlus } from "react-icons/fi";
import { type IModalContext } from "@/context/ModalContext";
import { CreateEstablishmentModal } from "@/pages/dashboard/establishments/create-establishment/create-establishment-page";
import { EstablishmentFlow } from "@/pages/dashboard/establishments/establishment-flow";
import { useModal } from "@/hooks/contextHooks";

export const SideNav = () => {
  const { setModal, setDirection } = useModal() as IModalContext;

  const sideNavStyle =
    "flex hover:cursor-pointer hover:dark:bg-stone-800 hover:bg-stone-200 p-2 rounded-md mb-2 gap-2 items-center";

  const authData = useSelector((state: RootState) => state.authReducer.user);

  const accountType: Record<string, string> = {
    ADMIN: "Super admin account",
    STAFF: "Staff account",
  };

  return (
    <div className="h-screen bg-stone-100 dark:bg-black dark:border rounded-xl p-3 flex flex-col justify-between">
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

            <div className="max-h-[20rem] overflow-y-auto no-scrollbar ">
              <EstablishmentFlow />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end"></div>
    </div>
  );
};
