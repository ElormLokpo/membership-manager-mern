import { SideNav } from "@/components/shared/sidenav";
import { Outlet } from "@tanstack/react-router";

export const DashboardLayout = () => {
  return (
    <div className="h-screen grid grid-cols-12">
      <div className="col-span-2 border border-r-1">
        <SideNav />
      </div>

      <div className="col-sapn-10">
        <Outlet />
      </div>
    </div>
  );
};
