import { Typography } from "@/components/shared/typography";
import { DashboardCards } from "./components/cards";
import { DashboardBarChart, DashboardDoChart } from "./components/charts";
import { Button } from "@/components/shared/button";

export const DashboardPage = () => {
  type Member = {
    fullname: string;
    email: string;
    status: "active" | "inactive";
    avatar: string;
  };

  const sampleMembers: Member[] = [
    {
      fullname: "Kwame Mensah",
      email: "kwame.mensah@example.com",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kwame%20Mensah",
    },
    {
      fullname: "Akosua Boateng",
      email: "akosua.boateng@example.com",
      status: "inactive",
      avatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Akosua%20Boateng",
    },
    {
      fullname: "Kojo Owusu",
      email: "kojo.owusu@example.com",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kojo%20Owusu",
    },
    {
      fullname: "Abena Asante",
      email: "abena.asante@example.com",
      status: "inactive",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abena%20Asante",
    },
    {
      fullname: "Yaw Ofori",
      email: "yaw.ofori@example.com",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yaw%20Ofori",
    },
    {
      fullname: "Ama Serwaa",
      email: "ama.serwaa@example.com",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ama%20Serwaa",
    },
    {
      fullname: "Michael Addo",
      email: "michael.addo@example.com",
      status: "inactive",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael%20Addo",
    },
    {
      fullname: "Naomi Gyamfi",
      email: "naomi.gyamfi@example.com",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Naomi%20Gyamfi",
    },
    {
      fullname: "Kofi Appiah",
      email: "kofi.appiah@example.com",
      status: "inactive",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kofi%20Appiah",
    },
    {
      fullname: "Esi Nyarko",
      email: "esi.nyarko@example.com",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Esi%20Nyarko",
    },
  ];

  return (
    <div className="h-screen w-full bg-stone-100 dark:bg-stone-800 rounded-lg my-2">
      <div className="p-5 h-screen">
        <div className="col-span-9">
          <div className="mb-4 flex justify-between">
            <div className=" flex gap-1 flex-col">
              <Typography
                text={`Dashboard`}
                size={"xl"}
                className="font-semibold"
              />
              <Typography
                text={`A glance and basic overview of analytics and workflow.`}
                size={"xs"}
                className="text-stone-500"
              />
            </div>

            <div className="flex gap-2">
              <div>
                <Button text={`Add Staff`} variant={"dash-def"} />
              </div>
              <div>
                <Button text={`Import Data`} variant={"dash-sec"} />
              </div>
            </div>
          </div>

          <div className="mb-2">
            <DashboardCards />
          </div>

          <div className="grid grid-cols-12 gap-2 mb-3">
            <div className="col-span-9">
              <div className="h-[15rem] grid grid-cols-12 mb-3 gap-2">
                <div className="bg-white dark:bg-black rounded-xl col-span-9 p-2">
                  <div className="mb-1">
                    <Typography text="Analytics" className="font-semibold" />
                  </div>
                  <DashboardBarChart />
                </div>

                <div className="col-span-3 bg-white dark:bg-black rounded-xl p-2.5">
                  <div className="mb-6">
                    <Typography
                      text="New Members This Month"
                      className="font-semibold"
                    />
                  </div>

                  <div>
                    <div className="flex flex-col gap- mb-5">
                      <Typography
                        text="25 new members joined"
                        className="text-lime-800 font-semibold text-[1.5rem]"
                      />
                      <Typography
                        text="From June to September"
                        className="text-stone-500 font-semibold"
                        size={"xs"}
                      />
                    </div>

                    <div>
                      <Button
                        text="View Members"
                        className="py-3"
                        variant={"dash-def"}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[20rem] grid grid-cols-12 gap-2">
                <div className="bg-white dark:bg-black rounded-xl col-span-7 p-3">
                  <div className="mb-1">
                    <Typography
                      text="Recent transactions"
                      className="font-semibold"
                    />
                  </div>

                  <div>
                    <div>
                      {sampleMembers.map((member, index) => (
                        <div key={index} className="mb-2 py-2 flex justify-between">
                          <div className="flex gap-2">
                            <img
                              className="w-[2rem] h-[2rem] border rounded-full"
                              src={member.avatar}
                            />
                            <div className="flex flex-col">
                              <Typography
                                className="font-semibold"
                                text={member.fullname}
                                size={"xs"}
                              />
                              <Typography
                                className="text-stone-500"
                                text={"24th March 2025"}
                                size={"xs"}
                              />
                            </div>
                          </div>

                          <div>
                            <Typography text="GHS 54.32" size={"xs"}/>
                            </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-span-5 bg-white dark:bg-black rounded-xl p-2.5">
                  <div className="mb-6">
                    <Typography
                      text="Revenue Estimation"
                      className="font-semibold"
                    />
                  </div>

                  <div>
                    <DashboardDoChart />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-3 bg-white dark:bg-black rounded-lg p-3">
              <div className="mb-3">
                <Typography text="Recent Members" className="font-semibold" />
              </div>

              <div>
                {sampleMembers.map((member, index) => (
                  <div key={index} className="mb-2 py-2">
                    <div className="flex gap-2">
                      <img
                        className="w-[2rem] h-[2rem] border rounded-full"
                        src={member.avatar}
                      />
                      <div className="flex flex-col">
                        <Typography
                          className="font-semibold"
                          text={member.fullname}
                          size={"xs"}
                        />
                        <Typography
                          className="text-stone-500"
                          text={member.email}
                          size={"xs"}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
