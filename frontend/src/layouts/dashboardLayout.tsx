import { Sheet } from "@/components/shared/sheet";
import { SideNav } from "@/components/shared/sidenav";
import { TopNav } from "@/components/shared/topnav";
import { type IModalContext } from "@/context/ModalContext";
import { useModal } from "@/hooks/contextHooks";
import { Outlet } from "@tanstack/react-router";


export const DashboardLayout = () => {
  const { modal } = useModal() as IModalContext;

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
