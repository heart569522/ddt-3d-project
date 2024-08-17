"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { configs } from "@/lib/configs";
import { IPM25Contour, ITemperatureContour } from "@/types/model";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface Props {
  data: IPM25Contour;
}

export default function PM25({ data }: Props) {
  const { pm25Data, maxPM25, minPM25, contourInterval } = data;

  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const dataContour: Partial<Plotly.PlotData>[] = [
    {
      x: [
        98.9525451181852, 98.9519148799211, 98.9510349756718, 98.9503426561075,
        98.9525755729979, 98.9515892184255, 98.952514962419, 98.949744035916,
        98.9505031565045,
      ],
      y: [
        18.7950203419073, 18.7959059539566, 18.7942486997578, 18.7953803238123,
        18.7963083324007, 18.7947614973542, 18.7942869094483, 18.7953325844859,
        18.7964005602317,
      ],
      z: pm25Data,
      type: "contour",
      colorscale: [
        [0, "#0000FF"],
        [0.1, "#00FF00"],
        [0.2, "#FFFF00"],
        [0.3, "#FF0000"],
        [0.4, "#9002a8"],
        [0.5, "#600170"],
        [0.6, "#7002a8"],
        [0.7, "#500072"],
        [0.8, "#440061"],
        [0.9, "#390051"],
        [1, "#220030"],
      ],
      zmin: Math.min(...pm25Data),
      zmax: Math.max(...pm25Data),
      ncontours: 50,
      opacity: 0.7,
      // showscale: true,
    },
  ];

  const layoutContour: Partial<Plotly.Layout> = {
    font: { color: isDarkMode ? "white" : "black" },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    autosize: true,
    width: undefined,
    height: undefined,
    margin: { l: 60, r: 0, b: 50, t: 0, pad: 0 },
    xaxis: {
      showgrid: false,
      title: {
        text: "Longitude",
        standoff: 15,
        font: { color: isDarkMode ? "white" : "black" },
      },
    },
    yaxis: {
      showgrid: false,
      title: {
        text: "Latitude",
        standoff: 15,
        font: { color: isDarkMode ? "white" : "black" },
      },
    },
    images: [
      {
        source: "/assets/DDT_SensorMap1.png",
        xref: "paper",
        yref: "paper",
        x: 0,
        y: 1,
        sizex: 1,
        sizey: 1,
        sizing: "stretch",
        opacity: 1.0,
        layer: "below",
      },
    ],
  };

  return (
    <div
      id="content"
      className="flex flex-col-reverse px-0 lg:px-20 xl:px-28 md:flex-row w-full gap-4 md:items-start justify-center"
    >
      <div id="contour" className="flex-grow">
        <div className="relative aspect-auto">
          <Plot
            data={dataContour}
            layout={layoutContour}
            config={{ displayModeBar: false, responsive: true }}
            useResizeHandler={true}
            className="absolute w-full h-full sm:max-h-[400px] lg:max-h-[680px]"
          />
        </div>
      </div>
      <div
        id="inform"
        className="flex flex-row justify-center md:flex-col gap-2 sm:gap-4"
      >
        <Card className="transition bg-secondary/90 cursor-default">
          <CardHeader className="pb-4">
            <CardDescription className="text-base sm:text-lg">
              Max
            </CardDescription>
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl">
              {maxPM25?.toFixed(configs.numberOfDecimal)}&nbsp;
            </CardTitle>
          </CardHeader>
          <CardFooter></CardFooter>
        </Card>
        <Card className="transition bg-secondary/90 cursor-default">
          <CardHeader className="pb-4">
            <CardDescription className="text-base sm:text-lg">
              Min
            </CardDescription>
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl">
              {minPM25?.toFixed(configs.numberOfDecimal)}&nbsp;
            </CardTitle>
          </CardHeader>
          <CardFooter></CardFooter>
        </Card>
        <Card className="transition bg-secondary/90 cursor-default">
          <CardHeader className="pb-4">
            <CardDescription className="text-base sm:text-lg">
              Interval
            </CardDescription>
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl">
              {contourInterval?.toFixed(configs.numberOfDecimal)}&nbsp;
            </CardTitle>
          </CardHeader>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
}
