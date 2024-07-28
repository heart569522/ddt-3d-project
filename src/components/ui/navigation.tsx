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

  const handleMenuItemClick = () => {
    setIsNavOpen(false);
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[290px_1fr] relative">
      <div className="hidden bg-muted/40 md:block z-50 shadow-lg">
        <div className="flex h-full max-h-screen flex-col gap-2 w-[290px] fixed">
          <ScrollArea>
            <div className="flex h-14 items-center border-b px-4 md:h-[60px] md:px-6">
              {/* <Link
                href="/"
                className="flex items-center gap-2 font-semibold py-10"
              >
                <Building2 className="h-5 w-5" />
                <span className="text-xl uppercase">DDT</span>
              </Link> */}
            </div>
            <div className="flex-1">
              <div className="grid items-start py-2 px-2 text-sm font-medium md:px-4 gap-2">
                {leftDashbaord}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-2 border-b bg-muted/70 px-4 md:h-[60px] w-full md:w-[calc(100%-290px)] fixed md:px-6 z-50 shadow-sm">
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
              className="flex flex-col overflow-y-scroll custom-scrollbar"
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
          <div className="w-full flex-1">
            <form>
              <div className="relative"></div>
            </form>
          </div>
          <ThemeSwitcher />
        </header>
        {children}
      </div>
    </div>
  );
}
