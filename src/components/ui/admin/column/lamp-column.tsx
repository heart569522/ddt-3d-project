"use client";

import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../table/column-header";
import { ILamp } from "@/types/model";
import { ColumnLampEnum } from "@/lib/enum";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ActionColumn from "./action-column";
import { formatDate } from "@/lib/formats";

export function LampColumn(): ColumnDef<ILamp>[] {
  const isMediumScreen = useMediaQuery("md");

  return [
    {
      accessorKey: "rm_id",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          columnType="textEN"
          title={ColumnLampEnum.rm_id}
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
      size: 10,
    },
    {
      accessorKey: "l_id",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          columnType="textEN"
          title={ColumnLampEnum.l_id}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {row.getValue("l_id")}
        </div>
      ),
      enableSorting: isMediumScreen,
      size: 15,
    },

    {
      accessorKey: "brand_code",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          columnType="textEN"
          title={ColumnLampEnum.brand_code}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            {row.getValue("brand_code")}
          </div>
        );
      },
      enableSorting: isMediumScreen,
      size: 10,
    },
    {
      accessorKey: "l_code",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          columnType="textEN"
          title={ColumnLampEnum.l_code}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            {row.getValue("l_code")}
          </div>
        );
      },
      enableSorting: isMediumScreen,
      size: 10,
    },
    {
      accessorKey: "l_installer",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          columnType="textTH"
          title={ColumnLampEnum.l_installer}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            {row.getValue("l_installer") || "-"}
          </div>
        );
      },
      enableSorting: isMediumScreen,
      size: 25,
    },
    {
      accessorKey: "l_install_date",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          columnType="date"
          title={ColumnLampEnum.l_install_date}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            {formatDate(row.getValue("l_install_date"))}
          </div>
        );
      },
      enableSorting: isMediumScreen,
      size: 15,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <ActionColumn
            title="โคม/สวิตซ์ไฟ"
            dataId={data.l_id}
            editPagePath={`/admin/management/lamp-plug/edit/${data.rm_id}/${data.l_id}`}
            apiDeletePath="deleteLamp"
          />
        );
      },
      enableSorting: isMediumScreen,
      size: 15,
    },
  ];
}
