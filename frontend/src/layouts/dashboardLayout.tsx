import { Sheet } from "@/components/shared/sheet";
import { SideNav } from "@/components/shared/sidenav";
import { TopNav } from "@/components/shared/topnav";
import { ModalContext, type IModalContext } from "@/context/ModalContext";
import { Outlet } from "@tanstack/react-router";
import { useContext } from "react";

export const DashboardLayout = () => {
  const { modal } = useContext(ModalContext) as IModalContext;

  return (
    <div className="bg-white dark:bg-black">
      {modal && <Sheet modal={modal} />}
      <div className="h-screen grid grid-cols-12">
        <div className="col-span-2 p-2">
          <SideNav />
        </div>

        <div className="col-span-10 py-2 pr-2">
          <TopNav />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
