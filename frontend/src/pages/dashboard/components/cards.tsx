import { RiPieChartLine } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi2";
import { GoBriefcase } from "react-icons/go";
import { GrMoney } from "react-icons/gr";
import { Typography } from "@/components/shared/typography";

export const DashboardCards = () => {
  const adminCards = [
    {
      icon: <RiPieChartLine />,
      title: "Total Revenue",
      text: "GHS 10,234",
      extra: "+20%(234).",
    },
    {
      icon: <GoBriefcase />,
      title: "Total Employees",
      text: "245",
      extra: "+5%(3).",
    },
    {
      icon: <HiOutlineUsers />,
      title: "Total Members",
      text: "4353",
      extra: "+35%(29).",
    },

    {
      icon: <GrMoney />,
      title: "Total Transactions",
      text: "455",
      extra: "+45%(68).",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {adminCards.map((item, index) => {
        return <div className="border p-2 rounded-md" key={index}>
            <div className="flex gap-2 mb-3"> 
                {item.icon}
                <Typography className="font-light" text={item.title} />
            </div>
            <div className="flex gap-2 items-center">
                <Typography text={item.text} className="text-xl" />
                <Typography className="text-lime-500" text={item.extra} size={"xs"} />

            </div>
        </div>;
      })}
    </div>
  );
};
