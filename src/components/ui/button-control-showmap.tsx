"use client";

import React from "react";
import TooltipHover from "./tooltip-hover";
import { Button } from "../shadcn-ui/button";
import { Droplets, MapPin, Thermometer, UndoDot } from "lucide-react";
import { IconFaceMask } from "@tabler/icons-react";
import { useContourMenuStore, useMapMenuStore } from "@/stores/use-menu-store";
import { cn } from "@/lib/utils";

export default function ButtonControlShowMap() {
  const { menuState, setMenuState } = useMapMenuStore();

  return (
    <TooltipHover
      content={"View Map"}
      position={"top"}
      isUseMediaQuery={true}
      mediaQuerySize="md"
      positionMediaQuery="right"
    >
      <Button
        variant="outline"
        onClick={() => setMenuState("map")}
        className={cn(menuState == "map" && "bg-primary hover:bg-primary/80")}
        size="icon"
      >
        <MapPin className="h-5 w-5" />
      </Button>
    </TooltipHover>
  );
}
