import { Typography } from "@/components/shared/typography";
import { DashboardCards } from "./components/cards";
import { DashboardCharts } from "./components/charts";
import { SideSection } from "./components/sideSection";
import { DashboardTable } from "./components/table";
import { DashboardTopNav } from "./components/topNav";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux";

export const DashboardPage = () => {
  const userName = useSelector((store:RootState)=>store.authReducer.user?.fullname)

  return (
    <div className="h-screen w-full">
      <div className="mb-1">
        <DashboardTopNav title="Dashboard" />
      </div>

      <div className="grid grid-cols-12 gap-3 p-5 h-screen">
        <div className="col-span-9">
          <div className="mb-8 flex gap-1 flex-col">
            <Typography text={`Welcome back, ${userName}`} size={"medium-x"} className="font-semibold"/>
            <Typography text={`A glance and basic overview of analytics and workflow.`} size={"xs"} className=""/>

          </div>
          <div className="mb-4">
            <DashboardCards />
          </div>

          <div className="mb-20">
            <DashboardCharts />
          </div>

          <div>
            <DashboardTable />
          </div>
        </div>

        <div className="col-span-3">
          <SideSection />
        </div>
      </div>
    </div>
  );
};
