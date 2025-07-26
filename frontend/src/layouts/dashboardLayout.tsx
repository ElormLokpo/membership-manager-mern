import { Sheet } from "@/components/shared/sheet";
import { SideNav } from "@/components/shared/sidenav";
import { ModalContext, type IModalContext } from "@/context/ModalContext";
import { Outlet } from "@tanstack/react-router";
import { useContext } from "react";

export const DashboardLayout = () => {
  const { modal } = useContext(ModalContext) as IModalContext;

  return (
    <>
      {modal && <Sheet modal={modal} />}
      <div className="h-screen grid grid-cols-12">
        <div className="col-span-2 border border-r-1">
          <SideNav />
        </div>

        <div className="col-span-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};
