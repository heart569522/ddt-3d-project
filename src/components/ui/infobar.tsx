"use client"
import { motion } from "framer-motion";
import React from "react";
import TooltipHover from "./tooltip-hover";
import { Button } from "../shadcn-ui/button";
import { PanelLeftDashed, PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  isShowDashboard: boolean;
  children: React.ReactNode;
}

export default function Infobar({
  isShowDashboard,
  children,
}: Props) {
  return (
    <>
      {/* Desktop */}
      <motion.div
        className={cn(
          "hidden md:flex right-0 gap-2 items-center absolute bg-background/60 p-2 rounded-lg top-[4.25rem] z-50"
        )}
        animate={{
          x: isShowDashboard ? -350 : -10,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {children}
      </motion.div>

      {/* Mobile */}
      {/* <motion.div
        className={cn(
          "md:hidden flex gap-2 items-center absolute bg-background/60 p-2 rounded-lg bottom-2 justify-center left-1/2 transform -translate-x-1/2 z-50"
        )}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {children}
      </motion.div> */}
    </>
  );
}
