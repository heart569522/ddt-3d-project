"use client";
import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";
import { configs } from "@/lib/configs";

interface Props {
  isShowDashboard: boolean;
  contourMenu: "temperature" | "humidity" | "pm25" | null;
}

export default function ContourLegend({
  isShowDashboard,
  contourMenu = null,
}: Props) {
  const renderLegendItems = (scale: [number, string][]) => {
    return scale.map(([value, color], index) => (
      <div key={index} className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded"
          style={{ backgroundColor: color }}
        ></div>
        <span className="text-sm font-medium">
          {`= ${(value * 100).toFixed(0)}%`}
        </span>
      </div>
    ));
  };

  const renderLegend = () => {
    if (!contourMenu) return null;

    const scale = configs.colorScale[contourMenu];
    if (!scale) return null;

    return (
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold capitalize">{`${contourMenu} Legend`}</h3>
        {renderLegendItems(scale)}
      </div>
    );
  };

  return (
    contourMenu && (
      <div
        className={cn(
          "hidden md:flex flex-col gap-2 items-center absolute bg-background/60 py-2 px-3 transition rounded-lg top-[4.25rem] z-50",
          isShowDashboard ? "translate-x-[415px]" : "translate-x-[75px]"
        )}
      >
        {renderLegend()}
      </div>
    )
  );
}
