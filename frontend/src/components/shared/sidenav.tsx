import { adminMainSideNavRoutes, sideNavRoutesTop } from "@/constants";
import { ThemeToggler } from "./themeToggler";
import { Typography } from "./typography";
import { Link } from "@tanstack/react-router";
import { TbCircleDotted } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

export const SideNav = () => {
  const sideNavStyle =
    "flex hover:cursor-pointer hover:dark:bg-stone-800 hover:bg-stone-200 p-2 rounded-md mb-2 gap-2 items-center";

  const organizations = [
    {
      id: "Org 1",
      name: "Organization",
    },
    {
      id: "Org 2",
      name: "Organization",
    },
  ];

  const searchHandler = () => {
    console.log("search handler clicked");
  };

  const notificationsHandler = () => {
    console.log("notifications handler clickedI");
  };

  return (
    <div className="h-screen p-3 flex flex-col justify-between">
      <div>
        <div className="flex justify-between mb-10">
          <div className="flex flex-col">
            <Typography text="MEMBR" className="font-bold" />
            <Typography text="Super admin account" size={"xs"} />
          </div>

          <div>
            <ThemeToggler />
          </div>
        </div>

        <div>
          <div className="mb-10">
            {sideNavRoutesTop(searchHandler, notificationsHandler).map(
              (item, index) => {
                if (item.handler) {
                  return (
                    <button
                      onClick={item.handler}
                      key={index}
                      className={sideNavStyle+ " w-full"}
                    >
                      {item.icon}
                      <Typography text={item.text} />
                    </button>
                  );
                }

                return (
                  <Link className={sideNavStyle} key={index} to={item.route}>
                    {item.icon}
                    <Typography text={item.text} />
                  </Link>
                );
              }
            )}
          </div>

          <div className="mb-10">
            <div className="mb-3">
              <Typography text="Main" className="font-semibold" />
            </div>

            {adminMainSideNavRoutes.map((item, index) => {
              return (
                <Link className={sideNavStyle} key={index} to={item.route}>
                  {item.icon}
                  <Typography text={item.text} />
                </Link>
              );
            })}
          </div>

          <div>
            <div className="mb-3">
              <Typography text="Organizations" className="font-semibold" />
            </div>

            {organizations.map((item, index) => {
              return (
                <div
                  className={sideNavStyle + " justify-between group"}
                  key={index}
                >
                  <div className="flex gap-3 items-center">
                    <TbCircleDotted />
                    <Typography text={item.name} />
                  </div>

                  <button
                    onClick={() => {
                      console.log("delete clicked" + item.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 hover:cursor-pointer dark:hover:bg-stone-600 p-1 rounded-sm"
                  >
                    <AiOutlineDelete className="text-red-400" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <Typography text="User One Time" />
          <Typography text="userone@gmail.com" size={"xs"} />
        </div>

        <div>
          <button className="hover:cursor-pointer dark:hover:bg-stone-800 p-2 rounded">
            <BiLogOut />
          </button>
        </div>
      </div>
    </div>
  );
};
