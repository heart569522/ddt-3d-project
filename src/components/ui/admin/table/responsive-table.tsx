"use client";
import React from "react";
import { ToolbarProps } from "./toolbar";
import dynamic from "next/dynamic";
import DataTable from "./data-table";

// const DataTable = dynamic(() => import('./data-table'), { ssr: false })

interface ResponsiveTableProps extends ToolbarProps {
  columnHook: () => any;
  data: any;
}

export default function ResponsiveTable({
  columnHook,
  data,
  searchColumn,
  addButtonTitle,
  addButtonPath,
}: ResponsiveTableProps) {
  const column = columnHook();

  return (
    <DataTable
      columns={column}
      data={data}
      searchColumn={searchColumn}
      addButtonTitle={addButtonTitle}
      addButtonPath={addButtonPath}
    />
  );
}
