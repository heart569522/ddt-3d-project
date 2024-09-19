"use client";

import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../table/column-header";
import { IAir } from "@/types/model";
import { ColumnAirEnum } from "@/lib/enum";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ActionColumn from "./action-column";
import { formatDate } from "@/lib/formats";

export function AirColumn(): ColumnDef<IAir>[] {
  const isMediumScreen = useMediaQuery("md");

  return [
    {
      accessorKey: "rm_id",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={ColumnAirEnum.rm_id}
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
      accessorKey: "a_id",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={ColumnAirEnum.a_id}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {row.getValue("a_id")}
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
          title={ColumnAirEnum.brand_code}
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
      accessorKey: "a_code",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={ColumnAirEnum.a_code}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            {row.getValue("a_code")}
          </div>
        );
      },
      enableSorting: isMediumScreen,
      size: 10,
    },
    {
      accessorKey: "a_install_date",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={ColumnAirEnum.a_install_date}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            {formatDate(row.getValue("a_install_date"))}
          </div>
        );
      },
      enableSorting: isMediumScreen,
      size: 10,
    },
    {
      accessorKey: "warranty_period",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={ColumnAirEnum.warranty_period}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            {formatDate(row.getValue("warranty_period"))}
          </div>
        );
      },
      enableSorting: isMediumScreen,
      size: 10,
    },
    {
      accessorKey: "a_installer",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={ColumnAirEnum.a_installer}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            {row.getValue("a_installer")}
          </div>
        );
      },
      enableSorting: isMediumScreen,
      size: 25,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <ActionColumn
            title="เครื่องปรับอากาศ"
            dataId={data.a_id}
            editPagePath={`/admin/management/air-conditioners/${data.a_id}/edit`}
            apiDeletePath="deleteAir"
          />
        );
      },
      enableSorting: isMediumScreen,
      size: 10,
    },
  ];
}
