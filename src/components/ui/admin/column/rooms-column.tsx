"use client";

import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../table/column-header";
import { IRoom } from "@/types/model";
import { ColumnNameEnum } from "@/lib/enum";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ActionColumn from "./action-column";

export function useRoomsColumn(): ColumnDef<IRoom>[] {
  const isMediumScreen = useMediaQuery("md");

  return [
    {
      accessorKey: "bu_name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={ColumnNameEnum.bu_name}
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
      accessorKey: "rm_id",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={ColumnNameEnum.rm_id}
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
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={ColumnNameEnum.type}
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
          title={ColumnNameEnum.rm_name}
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
          title={ColumnNameEnum.air_amount}
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
          title={ColumnNameEnum.lamp_amount}
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
        const room = row.original;

        return <ActionColumn dataId={room.rm_id} />;
      },
      enableSorting: isMediumScreen,
      size: 10,
    },
  ];
}
