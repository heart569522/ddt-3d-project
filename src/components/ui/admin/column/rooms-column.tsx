"use client";

import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../table/column-header";
import { IRoom } from "@/types/model";
import { ColumnRoomEnum } from "@/lib/enum";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ActionColumn from "./action-column";

export function RoomsColumn(): ColumnDef<IRoom>[] {
  const isMediumScreen = useMediaQuery("md");

  return [
    {
      accessorKey: "rm_id",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          columnType="textEN"
          title={ColumnRoomEnum.rm_id}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {row.getValue("rm_id")}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
      size: 15,
    },
    {
      accessorKey: "bu_name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          columnType="textTH"
          title={ColumnRoomEnum.bu_name}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {row.getValue("bu_name")}
        </div>
      ),
      enableSorting: isMediumScreen,
      size: 25,
    },

    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          columnType="textTH"
          title={ColumnRoomEnum.type}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            {row.getValue("type")}
          </div>
        );
      },
      enableSorting: isMediumScreen,
      size: 15,
    },
    {
      accessorKey: "rm_name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          columnType="textTH"
          title={ColumnRoomEnum.rm_name}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            {row.getValue("rm_name") ? row.getValue("rm_name") : "-"}
          </div>
        );
      },
      enableSorting: isMediumScreen,
      size: 15,
    },
    {
      accessorKey: "air_amount",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          columnType="number"
          title={ColumnRoomEnum.air_amount}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            {row.getValue("air_amount")}
          </div>
        );
      },
      enableSorting: isMediumScreen,
      size: 10,
    },
    {
      accessorKey: "lamp_amount",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          columnType="number"
          title={ColumnRoomEnum.lamp_amount}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            {row.getValue("lamp_amount")}
          </div>
        );
      },
      enableSorting: isMediumScreen,
      size: 10,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <ActionColumn
            title="ห้อง"
            dataId={data.rm_id}
            editPagePath={`/admin/management/rooms/edit/${data.rm_id}`}
            apiDeletePath="deleteRoom"
          />
        );
      },
      enableSorting: isMediumScreen,
      size: 10,
    },
  ];
}
