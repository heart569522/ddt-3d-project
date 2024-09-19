"use client";
import React from "react";
import { ToolbarProps } from "./toolbar";
import DataTable from "./data-table";

interface ResponsiveTableProps<TData>
  extends Omit<ToolbarProps<TData>, "searchColumn"> {
  columnHook: () => any;
  data: TData[];
  searchColumn: (keyof TData)[];
}

export default function ResponsiveTable<TData>({
  columnHook,
  data,
  searchColumn,
  addButtonTitle,
  addButtonPath,
  columnEnum
}: ResponsiveTableProps<TData>) {
  const column = columnHook();

  return (
    <DataTable
      columns={column}
      data={data}
      searchColumn={searchColumn}
      addButtonTitle={addButtonTitle}
      addButtonPath={addButtonPath}
      columnEnum={columnEnum}
    />
  );
}
