"use client";
import { getPmTempHmdData } from "@/actions/actions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { configs } from "@/lib/configs";
import { monthNames } from "@/lib/utils";
import { IEnvironmentLineChart, IPmTempHmd } from "@/types/model";
import React from "react";
import { EnvironmentPMChart } from "./environment-chart";
import TemperatureChart from "./temperature-chart";
import HumidityChart from "./humidity-chart";
import { UseRateChart } from "./use-rate-chart";

interface Props {
  data: IPmTempHmd[];
  isFaculty?: boolean;
  electricData?: any;
  timeRange?: "7day" | "1month" | "6month" | string;
}

export default function EnvironmentInfoChart({ data, isFaculty = false }: Props) {
  let PMData: IEnvironmentLineChart[] = [];
  let TempData: IEnvironmentLineChart[] = [];
  let HumidityData: IEnvironmentLineChart[] = [];

  data?.forEach((item: IPmTempHmd) => {
    const [, month] = item.Month.split("-").map(Number);
    const monthName = monthNames[month - 1];

    PMData.push({
      title: monthName.slice(0, 3),
      min: parseFloat(item.PM25Min.toFixed(configs.numberOfDecimal)),
      max: parseFloat(item.PM25Max.toFixed(configs.numberOfDecimal)),
      mean: parseFloat(item.PM25Month.toFixed(configs.numberOfDecimal)),
    });

    TempData.push({
      title: monthName.slice(0, 3),
      min: parseFloat(item.TempMin.toFixed(configs.numberOfDecimal)),
      max: parseFloat(item.TempMax.toFixed(configs.numberOfDecimal)),
      mean: parseFloat(item.TempMonth.toFixed(configs.numberOfDecimal)),
    });

    HumidityData.push({
      title: monthName.slice(0, 3),
      min: parseFloat(item.HumidMin.toFixed(configs.numberOfDecimal)),
      max: parseFloat(item.HumidMax.toFixed(configs.numberOfDecimal)),
      mean: parseFloat(item.HumidMonth.toFixed(configs.numberOfDecimal)),
    });
  });

  return (
    <Card className="bg-background/60">
      <CardHeader>
        <CardTitle className="text-base md:text-lg text-left">
          Environment Info. 6 Month
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <EnvironmentPMChart data={PMData} />
        {!isFaculty && (
          <>
            <TemperatureChart data={TempData} />
            <HumidityChart data={HumidityData} />
          </>
        )}
      </CardContent>
    </Card>
  );
}

export function EnvironmentInfoRoomChart({
  data,
  electricData,
  timeRange,
}: Props) {
  const { PMData, TempData, HumidityData } = React.useMemo(() => {
    let PMData: IEnvironmentLineChart[] = [];
    let TempData: IEnvironmentLineChart[] = [];
    let HumidityData: IEnvironmentLineChart[] = [];

    data?.forEach((item: IPmTempHmd) => {
      switch (timeRange) {
        case "6month":
          PMData.push({
            title: item.Month,
            min: parseFloat(item.PM25Min.toFixed(configs.numberOfDecimal)),
            max: parseFloat(item.PM25Max.toFixed(configs.numberOfDecimal)),
            mean: item.PM25Month,
          });
          TempData.push({
            title: item.Month,
            min: parseFloat(item.TempMin.toFixed(configs.numberOfDecimal)),
            max: parseFloat(item.TempMax.toFixed(configs.numberOfDecimal)),
            mean: item.TempMonth,
          });
          HumidityData.push({
            title: item.Month,
            min: parseFloat(item.HumidMin.toFixed(configs.numberOfDecimal)),
            max: parseFloat(item.HumidMax.toFixed(configs.numberOfDecimal)),
            mean: item.HumidMonth,
          });
          break;
        case "1month":
          PMData.push({
            title: item.Week,
            min: parseFloat(item.PM25Min.toFixed(configs.numberOfDecimal)),
            max: parseFloat(item.PM25Max.toFixed(configs.numberOfDecimal)),
            mean: item.PM25Week,
          });
          TempData.push({
            title: item.Week,
            min: parseFloat(item.TempMin.toFixed(configs.numberOfDecimal)),
            max: parseFloat(item.TempMax.toFixed(configs.numberOfDecimal)),
            mean: item.TempWeek,
          });
          HumidityData.push({
            title: item.Week,
            min: parseFloat(item.HumidMin.toFixed(configs.numberOfDecimal)),
            max: parseFloat(item.HumidMax.toFixed(configs.numberOfDecimal)),
            mean: item.HumidWeek,
          });
          break;
        default:
          PMData.push({
            title: item.Day,
            min: parseFloat(item.PM25Min.toFixed(configs.numberOfDecimal)),
            max: parseFloat(item.PM25Max.toFixed(configs.numberOfDecimal)),
            mean: item.PM25Day,
          });
          TempData.push({
            title: item.Day,
            min: parseFloat(item.TempMin.toFixed(configs.numberOfDecimal)),
            max: parseFloat(item.TempMax.toFixed(configs.numberOfDecimal)),
            mean: item.TempDay,
          });
          HumidityData.push({
            title: item.Day,
            min: parseFloat(item.HumidMin.toFixed(configs.numberOfDecimal)),
            max: parseFloat(item.HumidMax.toFixed(configs.numberOfDecimal)),
            mean: item.HumidDay,
          });
          break;
      }
    });

    return { PMData, TempData, HumidityData };
  }, [data, timeRange]);

  return (
    <CardContent className="grid grid-cols-1 md:grid-cols-2 -mt-6">
      <div className="transition bg-secondary/60 hover:bg-secondary/30 m-2">
        <TemperatureChart data={TempData} isDashboardRoom={true} />
      </div>
      <div className="transition bg-secondary/60 hover:bg-secondary/30 m-2">
        <EnvironmentPMChart data={PMData} isDashboardRoom={true} />
      </div>
      <div className="transition bg-secondary/60 hover:bg-secondary/30 m-2">
        <HumidityChart data={HumidityData} isDashboardRoom={true} />
      </div>
      <div className="transition bg-secondary/60 hover:bg-secondary/30 m-2">
        <UseRateChart data={electricData} />
      </div>
    </CardContent>
  );
}
