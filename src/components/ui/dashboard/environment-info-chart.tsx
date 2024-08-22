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

export default async function EnvironmentInfoChart() {
  const pmTempHmdData = await getPmTempHmdData();

  let PMData: IEnvironmentLineChart[] = [];
  let TempData: IEnvironmentLineChart[] = [];
  let HumidityData: IEnvironmentLineChart[] = [];

  pmTempHmdData?.forEach((item: IPmTempHmd) => {
    const [, month] = item.Month.split("-").map(Number);
    const monthName = monthNames[month - 1];

    PMData.push({
      month: monthName,
      min: parseFloat(item.PM25Min.toFixed(configs.numberOfDecimal)),
      max: parseFloat(item.PM25Max.toFixed(configs.numberOfDecimal)),
      mean: parseFloat(item.PM25Month.toFixed(configs.numberOfDecimal)),
    });

    TempData.push({
      month: monthName,
      min: parseFloat(item.TempMin.toFixed(configs.numberOfDecimal)),
      max: parseFloat(item.TempMax.toFixed(configs.numberOfDecimal)),
      mean: parseFloat(item.TempMonth.toFixed(configs.numberOfDecimal)),
    });

    HumidityData.push({
      month: monthName,
      min: parseFloat(item.HumidMin.toFixed(configs.numberOfDecimal)),
      max: parseFloat(item.HumidMax.toFixed(configs.numberOfDecimal)),
      mean: parseFloat(item.HumidMonth.toFixed(configs.numberOfDecimal)),
    });
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base md:text-lg text-left">
          Environment Info. 6 Month
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <EnvironmentPMChart data={PMData} />
        <TemperatureChart data={TempData} />
        <HumidityChart data={HumidityData} />
      </CardContent>
    </Card>
  );
}
