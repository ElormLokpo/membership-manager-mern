import { Button } from "./button";
import { Input } from "./input";
import { Typography } from "./typography";
import { IoIosSearch } from "react-icons/io";
import { MdSort } from "react-icons/md";
import { GrFilter } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { useContext } from "react";
import { ModalContext, type IModalContext } from "@/context/ModalContext";

export const Table = () => {
  const { setModal } = useContext(ModalContext) as IModalContext;

  const sampleData = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    fullName: `Member ${i + 1}`,
    email: `member${i + 1}@clubmail.com`,
    status: ["Active", "Suspended", "Cancelled"][i % 3],
    lastVisit: `2025-07-${String((i % 28) + 1).padStart(2, "0")}T08:30:00Z`,
    preferredLocation: [
      "East Legon Gym",
      "Airport Hills Club",
      "Osu Fitness Center",
    ][i % 3],
    notes: `Prefers ${["morning", "afternoon", "evening"][i % 3]} sessions`,
  }));

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center w-[50%] mb-3">
          <Typography text="Members" />
          <div>
            <Input
              name="search"
              inputTpye="search"
              variant={"searchTable"}
              icon={<IoIosSearch />}
              placeholder="Search"
            />
          </div>

          <div className="flex gap-2 items-center">
            <Button
              className="py-1"
              icon={<MdSort />}
              variant={"outline"}
              text="Sort"
            />
            <Button
              className="py-1"
              icon={<GrFilter />}
              variant={"outline"}
              text="Filter"
            />
          </div>
        </div>

        <div className="pr-5">
          <Button
            handler={() => setModal(<>Modalllll</>)}
            text="Add Staff"
            variant={"table-add"}
            icon={<IoIosAdd />}
          />
        </div>
      </div>

      <div>
        <table className="table-auto w-full text-xs">
          <thead>
            <tr className="">
              <th className="border-b border-t px-2 py-2">ID</th>
              <th className="border px-2 py-2 text-left">Full Name</th>
              <th className="border px-2 py-2 text-left">Email</th>
              <th className="border px-2 py-2 text-left">Status</th>
              <th className="border px-2 py-2 text-left">Last Visit</th>
              <th className="border px-2 py-2 text-left">Location</th>
              <th className="border-b border-t px-2 py-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((member) => (
              <tr key={member.id}>
                <td className="border-b px-2 py-4">{member.id}</td>
                <td className="border px-2 py-4">{member.fullName}</td>
                <td className="border px-2 py-4">{member.email}</td>
                <td className="border px-2 py-4">{member.status}</td>
                <td className="border px-2 py-4">
                  {new Date(member.lastVisit).toLocaleDateString()}
                </td>
                <td className="border px-2 py-4">{member.preferredLocation}</td>
                <td className="border-b px-2 py-4">{member.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
