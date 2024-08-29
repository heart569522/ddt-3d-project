"use client";

import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import { DataTableViewOptions } from "./view-options";
import { Table } from "@tanstack/react-table";
import { CirclePlus, X } from "lucide-react";
import Link from "next/link";

interface DataTableToolbarProps<TData> extends ToolbarProps {
  table: Table<TData>;
}

export interface ToolbarProps {
  searchColumn: string;
  searchPlaceholder?: string | undefined;
  addButtonTitle?: string | undefined;
  addButtonPath: string;
}

export function DataTableToolbar<TData>({
  table,
  searchColumn,
  searchPlaceholder,
  addButtonTitle,
  addButtonPath,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={searchPlaceholder ? searchPlaceholder : "Search..."}
          value={
            (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
          }
          className="w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Link href={addButtonPath}>
          <Button variant="outline" size="sm" className="ml-auto">
            <CirclePlus className="mr-2 h-4 w-4" />
            {addButtonTitle ? addButtonTitle : "New"}
          </Button>
        </Link>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
