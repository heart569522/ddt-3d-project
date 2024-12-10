import { motion } from "framer-motion";
import React from "react";
import TooltipHover from "./tooltip-hover";
import { Button } from "../shadcn-ui/button";
import { PanelLeftDashed, PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  isShowDashboard: boolean;
  toggleShowHideDashboard: () => void;
  children: React.ReactNode;
}

export default function Toolbar({
  isShowDashboard,
  toggleShowHideDashboard,
  children,
}: Props) {
  return (
    <>
      {/* Desktop */}
      <motion.div
        className={cn(
          "hidden md:flex flex-col gap-2 items-center absolute bg-background/60 p-2 rounded-lg top-[4.25rem] z-50"
        )}
        animate={{
          x: isShowDashboard ? 350 : 10,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <TooltipHover
          content={isShowDashboard ? "Hide Dashboard" : "Show Dashboard"}
          position="right"
        >
          <Button
            variant="outline"
            className="bg-background/80"
            size="icon"
            onClick={toggleShowHideDashboard}
          >
            {isShowDashboard ? (
              <PanelLeftDashed className="h-5 w-5" />
            ) : (
              <PanelLeftOpen className="h-5 w-5" />
            )}
          </Button>
        </TooltipHover>
        {children}
      </motion.div>

      {/* Mobile
      <motion.div
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
