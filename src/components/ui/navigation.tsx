"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ArrowLeft, ChartPie, UserRoundCog } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn-ui/sheet";
import { Button } from "@/components/shadcn-ui/button";
import { usePathname, useRouter } from "next/navigation";
import { ThemeSwitcher } from "@/components/themes/theme-switcher";
import { ScrollArea } from "@/components/shadcn-ui/scroll-area";
import { motion } from "framer-motion";
import Toolbar from "./toolbar";
import { avatar } from "@/lib/data";
import AvatarCircles from "./avatar-circle";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  leftDashbaord?: React.ReactNode;
  rightDashbaord?: React.ReactNode;
  toolbar?: React.ReactNode;
  isHideDashbaord?: boolean;
  isHideToolbar?: boolean;
};

export default function Navigation({
  children,
  leftDashbaord,
  rightDashbaord,
  toolbar,
  isHideDashbaord = false,
  isHideToolbar = false,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isShowDashboard, setIsShowDashboard] = useState(true);

  const toggleShowHideDashboard = () => {
    setIsShowDashboard(!isShowDashboard);
  };

  return (
    <div className="grid w-full relative">
      {!isHideDashbaord && (
        <div className="hidden md:block z-50 shadow-lg">
          <motion.div
            initial={{ x: -350 }}
            animate={{ x: isShowDashboard ? 0 : -350 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed h-full max-h-screen flex flex-col gap-2 left-0 top-[60px] pb-16 w-[350px]"
          >
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
          </motion.div>
          <motion.div
            initial={{ x: 350 }}
            animate={{ x: isShowDashboard ? 0 : 350 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed right-0 top-[60px] pb-16 w-[350px] hidden xl:flex h-full max-h-screen flex-col gap-2"
          >
            <ScrollArea className="pr-1">
              <div className="flex-1">
                <div className="grid items-start py-2 px-2 gap-2">
                  {rightDashbaord}
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        </div>
      )}

      {!isHideToolbar && (
        <Toolbar
          isShowDashboard={isShowDashboard}
          toggleShowHideDashboard={toggleShowHideDashboard}
        >
          {toolbar}
        </Toolbar>
      )}

      <div className="flex flex-col">
        <header className="flex h-14 bg-card justify-between items-center gap-2 px-2 sm:px-4 md:h-[60px] w-full fixed md:px-6 z-50 shadow-sm">
          {!isHideDashbaord && (
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
                    <AvatarCircles className="flex md:hidden" avatar={avatar} />
                  </div>
                  <hr className="my-2" />
                  {leftDashbaord}
                  <div className="md:hidden">{rightDashbaord}</div>
                </div>
              </SheetContent>
            </Sheet>
          )}
          <AvatarCircles className={cn("hidden md:flex")} avatar={avatar} />
          {isHideDashbaord && (
            <Button
              variant="ghost"
              size="icon"
              className="flex md:hidden"
              onClick={router.back}
            >
              <ArrowLeft className="h-[1.2rem] w-[1.2rem] transition-all" />
              <span className="sr-only">Toggle Back</span>
            </Button>
          )}
          <Link href={"/overview"}>
            <h2
              className={cn(
                "text-base md:text-lg lg:text-xl font-semibold tracking-wide"
              )}
            >
              Engineering Digital Twin
            </h2>
          </Link>
          <div className="flex justify-end items-center gap-1">
            <ThemeSwitcher />
            <Link href="/admin/login" target="_blank">
              <Button variant="ghost" size="icon">
                <UserRoundCog className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </Link>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
