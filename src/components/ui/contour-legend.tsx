"use client";
import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";
import { configs } from "@/lib/configs";

interface Props {
  isShowDashboard: boolean;
  contourMenu: "temperature" | "humidity" | "pm25" | null;
}

const temperatureScale: [number, string][] = [
  [20, "#0096e6"],
  [25, "#0ae282"],
  [30, "#ffff00"],
  [40, "#ffa500"],
  [50, "#ff0000"],
];

const pm25Scale: [number, string][] = [
  [50, "#0000FF"],
  [100, "#00FF00"],
  [150, "#FFFF00"],
  [200, "#ffa500"],
  [250, "#FF0000"],
  [300, "#9002a8"],
  [350, "#7002a8"],
  [400, "#600170"],
  [450, "#500072"],
  [500, "#440061"],
  [550, "#390051"],
  [600, "#220030"],
];

export default function ContourLegend({
  isShowDashboard,
  contourMenu = null,
}: Props) {
  const renderLegendItems = (scale: [number, string][]) => {
    if (contourMenu === "temperature") {
      return scale.map(([value, color], index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: color }}
          ></div>
          <span className="text-sm font-medium">
            {value >= 50 ? `= ${value} °C` : `= ${value} °C`}
          </span>
        </div>
      ));
    } else if (contourMenu === "pm25") {
      return scale.map(([value, color], index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: color }}
          ></div>
          <span className="text-sm font-medium">{`= ${value} µg/m³`}</span>
        </div>
      ));
    } else {
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
    }
  };

  const renderLegend = () => {
    if (!contourMenu) return null;

    const scale = configs.colorScale[contourMenu];
    if (!scale) return null;

    const title =
      contourMenu === "pm25"
        ? "PM 2.5"
        : contourMenu === "temperature"
        ? "Temperature"
        : "Humidity";

    return (
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold capitalize">{`${title} Legend`}</h3>
        {renderLegendItems(
          contourMenu === "temperature"
            ? temperatureScale
            : contourMenu === "pm25"
            ? pm25Scale
            : scale
        )}
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
