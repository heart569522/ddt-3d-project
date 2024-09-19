"use client";

import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import { DataTableViewOptions } from "./view-options";
import { Table } from "@tanstack/react-table";
import { CirclePlus, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface ToolbarProps<TData> {
  searchColumn: (keyof TData)[];
  searchPlaceholder?: string | undefined;
  addButtonTitle?: string | undefined;
  addButtonPath: string;
  columnEnum: Record<string, string>;
}

interface DataTableToolbarProps<TData> extends ToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
  searchPlaceholder,
  addButtonTitle,
  addButtonPath,
  columnEnum
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().globalFilter !== "";

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={searchPlaceholder || "ค้นหา..."}
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.setGlobalFilter("")}
            className="px-2 lg:px-3"
          >
            <X className="sm:mr-1 h-4 w-4" />
            <span className="hidden sm:block">รีเซ็ท</span>
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Link href={addButtonPath}>
          <Button variant="outline" size="sm" className="ml-auto">
            <CirclePlus className="sm:mr-2 h-4 w-4" />
            <span className="hidden sm:block">
              {addButtonTitle ? addButtonTitle : "New"}
            </span>
          </Button>
        </Link>
        <DataTableViewOptions table={table} columnEnum={columnEnum}/>
      </div>
    </div>
  );
}
