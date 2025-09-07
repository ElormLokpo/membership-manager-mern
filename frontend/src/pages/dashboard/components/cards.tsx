import { RiPieChartLine } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi2";
import { GoBriefcase } from "react-icons/go";
import { GrMoney } from "react-icons/gr";
import { LuUserRoundX } from "react-icons/lu";
import { Typography } from "@/components/shared/typography";

export const DashboardCards = ({
  activeIndex = 0,
}: {
  activeIndex?: number;
}) => {
  const adminCards = [
    {
      icon: <RiPieChartLine />,
      title: "Total Revenue",
      text: "GHS 10,234",
      extra: "+20% since last year",
    },
    {
      icon: <GoBriefcase />,
      title: "Total Staff",
      text: "245",
      extra: "+5% since last year",
    },
    {
      icon: <HiOutlineUsers />,
      title: "Total Active Members",
      text: "4353",
      extra: "+35% since last month",
    },

    {
      icon: <LuUserRoundX />,
      title: "Total Inactive Members",
      text: "20",
      extra: "+4% this week",
    },

    {
      icon: <GrMoney />,
      title: "Total Transactions",
      text: "455",
      extra: "+45% this week",
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-2">
      {adminCards.map((item, index) => {
        return (
          <div
            className={
              index == activeIndex
                ? "px-3 py-6 rounded-xl bg-[#4CAF50]"
                : "px-3 py-6 rounded-xl bg-white dark:bg-black"
            }
            key={index}
          >
            <div
              className={
                index == activeIndex
                  ? "flex gap-2 mb-1 text-white"
                  : "flex gap-2 mb-1"
              }
            >
              {item.icon}
              <Typography
                className={
                  index == activeIndex ? "text-white font-light" : "font-light"
                }
                text={item.title}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Typography
                text={item.text}
                className={
                  index == activeIndex
                    ? "text-2xl text-white font-semibold"
                    : "text-2xl font-semibold"
                }
              />
            </div>

            <div>
              <Typography
                className={
                  index == activeIndex ? "text-lime-300" : "text-lime-600"
                }
                text={item.extra}
                size={"xs"}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
