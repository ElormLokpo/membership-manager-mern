import { Typography } from "@/components/shared/typography";
import { VscLayoutSidebarLeftOff } from "react-icons/vsc";

interface IDashboardTopNav {
  title: string;
}

export const DashboardTopNav = ({ title }: IDashboardTopNav) => {
  return (
    <div className="border-b w-full p-1.5">
      <div className="flex gap-2 items-center ">
        <VscLayoutSidebarLeftOff />
        <Typography className="" text={title} />
      </div>
    </div>
  );
};
