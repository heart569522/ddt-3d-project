"use client";

import * as React from "react";
import { Check, ChevronDown, Loader2, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-ui/popover";
import { Button } from "@/components/shadcn-ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/shadcn-ui/command";
import { useEffect, useState } from "react";
import TooltipHover from "./tooltip-hover";

type ComboboxProps = {
  title: string;
  listData: any;
  valueKey: string;
  nameKey: string;
  loading?: boolean;
  showValueWithName?: boolean;
  showResetButton?: boolean;
  isMultiple?: boolean;
  triggerReset?: boolean;
  defaultValue?: string | string[];
  disabled?: boolean;
  onValueChange: (selectedValue: any) => void;
  onValueReset?: () => void;
};

export default function Combobox({
  title,
  listData = [],
  valueKey,
  nameKey,
  loading = false,
  showValueWithName = false,
  showResetButton = false,
  isMultiple = false,
  triggerReset = false,
  defaultValue,
  disabled = false,
  onValueChange,
  onValueReset,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  if (listData === null || listData === undefined) {
    listData = [];
  }

  useEffect(() => {
    // Initialize selected values based on defaultValue
    if (defaultValue) {
      const defaultValuesArray = Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue];
      const defaultValueKeys = defaultValuesArray
        .map((value) => {
          // Check if the value is a name or ID
          const item = listData.find(
            (item: any) => item[nameKey] === value || item[valueKey] === value
          );
          return item ? item[valueKey] : undefined;
        })
        .filter((value: any) => value !== undefined);

      if (isMultiple) {
        setSelectedValues(defaultValueKeys);
      } else {
        setSelectedValues(
          defaultValueKeys.length > 0 ? [defaultValueKeys[0]] : []
        );
      }
    }
  }, [defaultValue, listData, isMultiple]);

  useEffect(() => {
    if (triggerReset) {
      handleReset();
    }
  }, [triggerReset]);

  useEffect(() => {
    if (listData.length === 0 && selectedValues.length > 0) {
      setSelectedValues([]);
    }
  }, [listData, selectedValues]);

  const handleSelect = (selectedValue: string) => {
    if (isMultiple) {
      setSelectedValues((prevValues) => {
        const newValues = prevValues.includes(selectedValue)
          ? prevValues.filter((value) => value !== selectedValue)
          : [...prevValues, selectedValue];

        onValueChange(newValues);
        return newValues;
      });
    } else {
      setSelectedValues([selectedValue]);
      onValueChange(selectedValue);
      setOpen(false);
    }
  };

  const handleReset = () => {
    setSelectedValues([]);
    if (onValueReset) {
      onValueReset();
    }
  };

  const filteredData = listData.filter((item: any) => {
    const nameMatches = item[nameKey]
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const valueMatches = item[valueKey]
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return showValueWithName ? nameMatches || valueMatches : nameMatches;
  });

  const selectedItems = listData.filter((item: any) =>
    selectedValues.includes(item[valueKey].toString())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full px-3">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between overflow-x-hidden"
          disabled={!listData.length || listData.length < 1 || disabled}
        >
          <TooltipHover
            position="bottom"
            content={
              <div className="max-w-[300px] sm:max-w-[400px] whitespace-normal break-words">
                {selectedItems.length > 0
                  ? showValueWithName
                    ? selectedItems
                        .map(
                          (item: { [x: string]: any }) =>
                            `(${item[valueKey]}) - ${item[nameKey]}`
                        )
                        .join(", ")
                    : selectedItems
                        .map((item: { [x: string]: any }) => `${item[nameKey]}`)
                        .join(", ")
                  : `เลือก${title}`}
              </div>
            }
          >
            <p className="font-normal truncate">
              {selectedItems.length > 0
                ? showValueWithName
                  ? selectedItems
                      .map(
                        (item: { [x: string]: any }) =>
                          `(${item[valueKey]}) - ${item[nameKey]}`
                      )
                      .join(", ")
                  : selectedItems
                      .map((item: { [x: string]: any }) => `${item[nameKey]}`)
                      .join(", ")
                : `เลือก${title}`}
            </p>
          </TooltipHover>
          {loading ? (
            <Loader2 className="h-5 w-5 shrink-0 opacity-50 animate-spin" />
          ) : (
            <div className="flex gap-1">
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              {showResetButton && (
                <X
                  onClick={handleReset}
                  className="h-4 w-4 shrink-0 opacity-50 hover:opacity-90 active:scale-110"
                />
              )}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0"
        style={{
          width: "var(--radix-popover-trigger-width)",
          maxHeight: "var(--radix-popover-content-available-height)",
        }}
      >
        <Command>
          <div
            className="flex items-center border-b px-3 overflow-x-hidden"
            cmdk-input-wrapper=""
          >
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              type="text"
              className="flex h-11 w-full rounded-md bg-transparent truncate py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={`ค้นหา${title}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <CommandList>
            {filteredData.length === 0 ? (
              <CommandEmpty>ไม่พบ{title}</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredData.map((item: any) => (
                  <CommandItem
                    key={item[valueKey].toString()}
                    value={item[valueKey].toString()}
                    onSelect={() => handleSelect(item[valueKey].toString())}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValues.includes(item[valueKey].toString())
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {showValueWithName
                      ? `(${item[valueKey]}) - ${item[nameKey]}`
                      : `${item[nameKey]}`}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
