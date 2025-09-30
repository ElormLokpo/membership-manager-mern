import { useGetAllStaff } from "@/hooks/staffHook";
import { useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type Cell,
  type CellContext,
} from "@tanstack/react-table";
import { type IGetAllStaff } from "@/types";
import { Input } from "@/components/shared/input";
import { IoIosSearch } from "react-icons/io";
import { Button } from "@/components/shared/button";
import { MdSort } from "react-icons/md";
import { GrFilter } from "react-icons/gr";
import { Typography } from "@/components/shared/typography";
import { FiTrash, FiEdit2 } from "react-icons/fi";

import { useModal } from "@/hooks/contextHooks";
import { AddStaffForm } from "./form";
import { DeleteModal } from "@/components/shared/modal";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux";
import { useQueryClient } from "@tanstack/react-query";
import type { IModalContext } from "@/context/ModalContext";

const columnHelper = createColumnHelper<IGetAllStaff>();

export const StaffTable = () => {
  const { data: staffResponse } = useGetAllStaff();
  const tableData: IGetAllStaff[] = staffResponse?.data;
  const queryClient = useQueryClient();

  const currentEstablishmentId = useSelector(
    (store: RootState) => store.establishmentReducer.currentEstablishmentId
  );

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["get-all-staff"],
    });
  }, [currentEstablishmentId, queryClient]);

  const columns = [
    columnHelper.accessor("staff.photo", {
      cell: (data) => data.getValue(),
      header: () => <span>Photo</span>,
    }),
    columnHelper.accessor("user.fullname", {
      cell: (data) => data.getValue(),
      header: () => <span>Fullname</span>,
    }),
    columnHelper.accessor("user.email", {
      cell: (data) => data.getValue(),
      header: () => <span>Email Address</span>,
    }),
    columnHelper.accessor("staff.employmentType", {
      cell: (data) => data.getValue(),
      header: () => <span>Employment Type</span>,
    }),
    columnHelper.accessor("staff.shift", {
      cell: (data) => data.getValue(),
      header: () => <span>Shift</span>,
    }),

    columnHelper.accessor("staff.hireDate", {
      cell: (data) => data.getValue(),
      header: () => <span>Hire Date</span>,
    }),
    columnHelper.display({
      id: "actions",

      cell: ({ row }) => (
        <div className="flex justify-center">
          <div className="flex gap-6 items-center">
            <button
              onClick={() => editHandler(row.original?.staff.userId)}
              className="flex gap-1 items-center hover:cursor-pointer"
            >
              <FiEdit2 />
              <Typography text="Edit" size={"xs"} />
            </button>

            <button
              onClick={() =>
                deleteHandler(
                  row.original?.staff.userId,
                  row.original?.user.fullname
                )
              }
              className="flex gap-1 items-center hover:cursor-pointer"
            >
              <FiTrash className="text-red-500 dark:text-red-500" />
              <Typography
                text="Delete"
                className="text-red-500 dark:text-red-500"
                size={"xs"}
              />
            </button>
          </div>
        </div>
      ),
    }),
  ];
  const { setModal, setDirection } = useModal() as IModalContext;

  const editHandler = (userId: unknown) => {
    console.log("idddd", userId);
    setDirection("center");
    setModal(<AddStaffForm staffId={userId as string} />);
  };

  const deleteHandler = (userId: unknown, fullname: unknown) => {
    setDirection("center");
    setModal(
      <DeleteModal
        text={`Are you sure you want to delete ${fullname}`}
        handler={() => {}}
      />
    );
  };

  const renderCell = (cell: Cell<IGetAllStaff, unknown>) => {
    switch (cell.column.id) {
      case "staff_photo":
        return (
          <img
            className="w-[2rem] h-[2rem] border rounded-full"
            src={cell.getValue() as string}
          />
        );
      default:
        return flexRender(cell.column.columnDef.cell, cell.getContext());
    }
  };

  const table = useReactTable({
    data: tableData ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    console.log("Staff data", staffResponse?.data);
  }, [staffResponse]);

  return (
    <div className="bg-white dark:bg-black rounded-xl p-2">
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
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th id={header.id} className="border-b px-2 py-3 text-left">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className=" px-2 py-6 text-left">
                        {renderCell(cell)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
