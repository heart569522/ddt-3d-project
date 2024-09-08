"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Header,
  HeaderContext,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn-ui/table";
import { useState } from "react";
import { DataTablePagination } from "./pagination";
import { DataTableToolbar, ToolbarProps } from "./toolbar";
import React from "react";

export interface DataTableProps<TData, TValue> extends ToolbarProps {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | undefined;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  searchColumn,
  searchPlaceholder,
  addButtonTitle,
  addButtonPath,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  if (!data || data == undefined || data == null) {
    data = [] as TData[];
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-2">
      <DataTableToolbar
        table={table}
        searchColumn={searchColumn}
        searchPlaceholder={searchPlaceholder}
        addButtonTitle={addButtonTitle}
        addButtonPath={addButtonPath}
      />

      {/* Desktop */}
      <Table className="bg-background rounded-md h-fit hidden md:table">
        <TableHeader>
          {table?.getHeaderGroups()?.map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className="p-2"
                    style={{ width: `${header.column.getSize()}%` }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table?.getRowModel().rows.length ? (
            table?.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hidden md:table-row"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="p-2"
                    style={{ width: `${cell.column.getSize()}%` }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-20 text-center">
                ไม่มีข้อมูล
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Mobile */}
      <div className="bg-background relative w-full overflow-auto text-sm rounded-md h-fit table divide-y-8 divide-[#F2F2F3] dark:divide-[#232120] md:hidden">
        {table?.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <div key={row.id} className="flex flex-col">
              <div className="flex justify-between gap-4 pt-2">
                <div className="flex flex-col gap-4 w-full">
                  {table?.getHeaderGroups()?.map((headerGroup) => (
                    <div
                      className="flex flex-col w-full font-semibold"
                      key={headerGroup.id}
                    >
                      {headerGroup.headers.map((header) => (
                        <div
                          className="flex justify-between px-3 py-2 h-auto"
                          key={header.id}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <div className="flex flex-col w-full">
                    {row.getVisibleCells().map((cell, index, cells) =>
                      index < cells.length - 1 ? (
                        <div
                          className="flex justify-between px-3 py-2"
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t bg-muted/50 font-medium [&>tr]:last:border-b-0">
                {row.getVisibleCells().length > 0 && (
                  <div className="px-4 py-2 text-center">
                    {flexRender(
                      row.getVisibleCells()[row.getVisibleCells().length - 1]
                        .column.columnDef.cell,
                      row
                        .getVisibleCells()
                        [row.getVisibleCells().length - 1].getContext()
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-20 text-center">
              ไม่มีข้อมูล
            </TableCell>
          </TableRow>
        )}
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
