import { GrAppsRounded } from "react-icons/gr";
import { PiBriefcase } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi2";
import { PiMoney } from "react-icons/pi";
import { RiSettings4Line } from "react-icons/ri";

export const routes = {
  ["auth.login"]: "/login",
  ["auth.register"]: "/register",
  dashboard: "/dashboard",
  staff: "/dashboard/staff",
  members: "/dashboard/members",
  transactions: "/dashboard/transactions",
  settings: "/dashboard/settings",
};

export const adminMainSideNavRoutes = [
  {
    text: "Dashboard",
    route: routes.dashboard,
    icon: <GrAppsRounded />,
  },
  {
    text: "Staff",
    route: routes.staff,
    icon: <PiBriefcase />,
  },
  {
    text: "Members",
    route: routes.members,
    icon: <HiOutlineUsers />,
  },
  {
    text: "Transactions",
    route: routes.transactions,
    icon: <PiMoney />,
  },
  {
    text: "Settings",
    route: routes.settings,
    icon: <RiSettings4Line />,
  },
];
