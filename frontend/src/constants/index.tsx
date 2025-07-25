import { FiSearch } from "react-icons/fi";
import { LuArchive } from "react-icons/lu";
import { GrAppsRounded } from "react-icons/gr";
import { PiBriefcase } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi2";
import { PiMoney } from "react-icons/pi";
import { RiSettings4Line } from "react-icons/ri";

export const routes = {
  ["auth.login"]: "/login",
  ["auth.register"]: "/register",
};

export const sideNavRoutesTop = (searchHandler:unknown, notificationsHandler:unknown) => [
  {
    text: "Search",
    route: "/",
    icon: <FiSearch />,
    handler: searchHandler,
  },
  {
    text: "Notifications",
    route: "/",
    icon: <LuArchive />,
    handler: notificationsHandler,
  },
];

export const adminMainSideNavRoutes = [
  {
    text: "Dashboard",
    route: "/",
    icon: <GrAppsRounded />,
    handler: null,
  },
  {
    text: "Staff",
    route: "/",
    icon: <PiBriefcase />,
  },
  {
    text: "Members",
    route: "/",
    icon: <HiOutlineUsers />,
  },
  {
    text: "Transactions",
    route: "/",
    icon: <PiMoney />,
  },
  {
    text: "Settings",
    route: "/",
    icon: <RiSettings4Line />,
  },
];
