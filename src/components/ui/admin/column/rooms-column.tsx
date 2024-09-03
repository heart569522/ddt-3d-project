"use client";

import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, SquarePen, Trash } from "lucide-react";
import { DataTableColumnHeader } from "../table/column-header";
import { IRoom } from "@/types/model";
import { ColumnNameEnum } from "@/lib/enum";
import Link from "next/link";

export const roomsColumn: ColumnDef<IRoom>[] = [
  {
    accessorKey: "rm_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={ColumnNameEnum.rm_id} />
    ),
    cell: ({ row }) => <div>{row.getValue("rm_id")}</div>,
    enableSorting: false,
    enableHiding: false,
    size: 20,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={ColumnNameEnum.type} />
    ),
    size: 20,
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
    size: 10,
  },
  {
    accessorKey: "sensor_switch",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ColumnNameEnum.sensor_switch}
        className="flex items-center justify-center"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          {row.getValue("sensor_switch")}
        </div>
      );
    },
    size: 10,
  },
  {
    accessorKey: "sensor_receptacle",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ColumnNameEnum.sensor_receptacle}
        className="flex items-center justify-center"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          {row.getValue("sensor_receptacle")}
        </div>
      );
    },
    size: 10,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const room = row.original;

      return (
        <div className="flex gap-1 justify-center items-center">
          <Link href={`/admin/management/rooms/${room.rm_id}/edit`}>
            <Button variant={"ghost"} size={"icon"}>
              <SquarePen className="size-4" />
            </Button>
          </Link>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="opacity-50 hover:opacity-100"
          >
            <Trash className="size-4" />
          </Button>
        </div>
      );
    },
    size: 20,
  },
];
