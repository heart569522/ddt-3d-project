"use client";

import React from "react";
import TooltipHover from "./tooltip-hover";
import { Button } from "../shadcn-ui/button";
import { Droplets, Thermometer, UndoDot } from "lucide-react";
import { IconFaceMask } from "@tabler/icons-react";
import { useContourMenuStore } from "@/stores/use-contour-menu-store";
import { cn } from "@/lib/utils";

export default function ButtonControlContour() {
  const { menuState, setMenuState } = useContourMenuStore();

  return (
    <>
      <TooltipHover
        content={"Temperature"}
        position="top"
        isUseMediaQuery={true}
        mediaQuerySize="md"
        positionMediaQuery="right"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMenuState("temperature")}
          className={cn(
            menuState == "temperature" && "bg-primary hover:bg-primary/80"
          )}
        >
          <Thermometer className="h-5 w-5" />
        </Button>
      </TooltipHover>
      <TooltipHover
        content={"Humidity"}
        position="top"
        isUseMediaQuery={true}
        mediaQuerySize="md"
        positionMediaQuery="right"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMenuState("humidity")}
          className={cn(
            menuState == "humidity" && "bg-primary hover:bg-primary/80"
          )}
        >
          <Droplets className="h-5 w-5" />
        </Button>
      </TooltipHover>
      <TooltipHover
        content={"PM 2.5"}
        position="top"
        isUseMediaQuery={true}
        mediaQuerySize="md"
        positionMediaQuery="right"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMenuState("pm25")}
          className={cn(
            menuState == "pm25" && "bg-primary hover:bg-primary/80"
          )}
        >
          <IconFaceMask className="h-5 w-5" />
        </Button>
      </TooltipHover>
    </>
  );
}
