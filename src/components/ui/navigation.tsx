"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Building2, ChartPie, MapPin, MapPinned, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn-ui/sheet";
import { Button } from "@/components/shadcn-ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "../themes/theme-switcher";
import { ScrollArea } from "../shadcn-ui/scroll-area";

type Props = {
  children: React.ReactNode;
  leftDashbaord?: React.ReactNode;
  rightDashbaord?: React.ReactNode;
};

export default function Navigation({
  children,
  leftDashbaord,
  rightDashbaord,
}: Props) {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="grid w-full relative">
      <div className="hidden md:block z-50 shadow-lg">
        <div className="flex h-full max-h-screen flex-col gap-2 left-0 translate-y-[60px] pb-16 w-[375px] fixed">
          <ScrollArea className="pr-1">
            <div className="flex-1">
              <div className="grid items-start py-2 px-2 gap-2">
                {leftDashbaord}
              </div>
              <div className="grid xl:hidden items-start pb-2 px-2 gap-2">
                {rightDashbaord}
              </div>
            </div>
          </ScrollArea>
        </div>
        <div className="hidden xl:flex h-full max-h-screen flex-col gap-2 right-0 translate-y-[60px] pb-16 w-[375px] fixed">
          <ScrollArea className="pr-1">
            <div className="flex-1">
              <div className="grid items-start py-2 px-2 gap-2">
                {rightDashbaord}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="flex flex-col">
        <header className="flex h-14 bg-card items-center gap-2 px-4 md:h-[60px] w-full fixed md:px-6 z-50 shadow-sm">
          <Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <ChartPie className="h-5 w-5" />
                <span className="sr-only">Toggle navigation dashboard</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex flex-col overflow-y-scroll custom-scrollbar w-[90%]"
            >
              <div className="grid gap-2 text-base font-medium">
                <div className="flex gap-2 items-center justify-start">
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <MapPinned className="h-5 w-5" />
                  </Button>
                </div>
                <hr className="my-2" />
                {leftDashbaord}
                <div className="md:hidden">{rightDashbaord}</div>
              </div>
            </SheetContent>
          </Sheet>
          <nav className="w-full flex-1 items-center text-center text-base md:text-lg lg:text-xl font-semibold tracking-wide">
            Engineering Digital Twin
          </nav>
          <ThemeSwitcher />
        </header>
        {children}
      </div>
    </div>
  );
}
