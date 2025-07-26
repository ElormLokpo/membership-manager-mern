import { DashboardCards } from "./components/cards";
import { DashboardCharts } from "./components/charts";
import { SideSection } from "./components/sideSection";
import { DashboardTable } from "./components/table";
import { DashboardTopNav } from "./components/topNav";

export const DashboardPage = () => {
  return (
    <div className="h-screen w-full">
      <div className="mb-1">
        <DashboardTopNav title="Dashboard" />
      </div>

      <div className="grid grid-cols-12 gap-3 p-5 h-screen">
        <div className="col-span-9">
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
