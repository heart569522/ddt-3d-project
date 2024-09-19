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

export interface DataTableProps<TData, TValue> extends ToolbarProps<TData> {
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
  columnEnum
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

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
      globalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const searchValue = filterValue.toLowerCase();
      return searchColumn.some((column) =>
        String(row.getValue(column as string))
          .toLowerCase()
          .includes(searchValue)
      );
    },
  });

  return (
    <div className="space-y-2">
      <DataTableToolbar
        table={table}
        searchColumn={searchColumn}
        searchPlaceholder={searchPlaceholder}
        addButtonTitle={addButtonTitle}
        addButtonPath={addButtonPath}
        columnEnum={columnEnum}
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
          <Table className="w-full">
            <TableBody className="">
              {table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  {table.getHeaderGroups()?.map((headerGroup) =>
                    headerGroup.headers
                      .slice(0, -1)
                      .map((header, headerIndex) => (
                        <TableRow key={header.id}>
                          <TableCell className="font-semibold px-3 py-2 h-auto w-2/5 text-center">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableCell>

                          <TableCell className="px-3 py-2 w-3/5 text-center">
                            {flexRender(
                              row.getVisibleCells()[headerIndex]?.column
                                .columnDef.cell,
                              row.getVisibleCells()[headerIndex]?.getContext()
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                  )}

                  {row.getVisibleCells().length > 0 && (
                    <TableRow className="border-t bg-muted/50 font-medium">
                      <TableCell colSpan={2} className="px-4 py-2 text-center">
                        {flexRender(
                          row.getVisibleCells()[
                            row.getVisibleCells().length - 1
                          ].column.columnDef.cell,
                          row
                            .getVisibleCells()
                            [row.getVisibleCells().length - 1].getContext()
                        )}
                      </TableCell>
                    </TableRow>
                  )}

                  {/* Last row for mock table space */}
                  <TableRow className="bg-[#F2F2F3] dark:bg-[#232120] border-none last:hidden">
                    <TableCell colSpan={2} />
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        ) : (
          <TableRow>
            <TableCell
              colSpan={table.getHeaderGroups()?.[0]?.headers.length || 2}
              className="h-20 text-center"
            >
              ไม่มีข้อมูล
            </TableCell>
          </TableRow>
        )}
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
