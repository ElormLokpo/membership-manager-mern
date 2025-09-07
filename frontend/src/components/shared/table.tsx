import { Button } from "./button";
import { Input } from "./input";
import { Typography } from "./typography";
import { IoIosSearch } from "react-icons/io";
import { MdSort } from "react-icons/md";
import { GrFilter } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { useContext } from "react";
import { ModalContext, type IModalContext } from "@/context/ModalContext";
import axios from "axios";
import PaystackPop from "@paystack/inline-js";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux";

export const Table = () => {
  const { setModal } = useContext(ModalContext) as IModalContext;
  const token = useSelector((state:RootState)=>state.authReducer.token)

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

  const handlePayments = async () => {
    const apiRes = await axios
      .post(
        "http://localhost:5000/api/payments/initialize",
        {

        },
        {
          headers: {
            Authorization : `Bearer ${token}`
          },
        }
      )
      .then((res) => res.data.data)
      .catch((err) => console.log(err));

    const popup = new PaystackPop();
    popup.newTransaction({
      key: import.meta.env.VITE_PAYSTACK_PK_KEY,
      email: "benedictdev31@gmail.com",
      amount: 20000,
      reference: apiRes.reference,
      onSuccess: async (transaction) => {
        console.log("Payment success:", transaction);
      },
      onCancel: () => {
        console.log("Payment cancelled");
      },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-end">
        <div className="flex gap-5 items-center mb-3">
         
          <div>
            <Input
              name="search"
              inputType="search"
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

        
      </div>

      <div className="rounded-md">
        <table className="table-auto w-full  text-xs">
          <thead>
            <tr className=" ">
              <th className="border-b px-2 py-3">Photo</th>
              <th className="border-b px-2 py-3 text-left">Full Name</th>
              <th className="border-b px-2 py-3 text-left">Email</th>
              <th className="border-b px-2 py-3 text-left">Status</th>
              <th className="border-b px-2 py-3 text-left">Last Visit</th>
              <th className="border-b px-2 py-3 text-left">Location</th>
              <th className="border-b px-2 py-3 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((member) => (
              <tr key={member.id}>
                <td className=" px-2 py-6">{member.id}</td>
                <td className=" px-2 py-6">{member.fullName}</td>
                <td className=" px-2 py-6">{member.email}</td>
                <td className=" px-2 py-6">{member.status}</td>
                <td className=" px-2 py-6">
                  {new Date(member.lastVisit).toLocaleDateString()}
                </td>
                <td className=" px-2 py-6">{member.preferredLocation}</td>
                <td className=" px-2 py-6">{member.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
