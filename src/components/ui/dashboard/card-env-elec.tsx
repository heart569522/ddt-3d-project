"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/shadcn-ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/select";
import React, { useEffect, useState } from "react";
import { EnvironmentInfoRoomChart } from "./environment-info-chart";
import { getData } from "@/actions/actions";
import { IPmTempHmd } from "@/types/model";
import { configs } from "@/lib/configs";
import { monthNames } from "@/lib/utils";

interface Props {
  roomId: string;
}

export default function CardEnvironmentElectric({ roomId }: Props) {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7day");
  const [environmentChartData, setEnvironmentChartData] = useState<
    IPmTempHmd[]
  >([]);
  const [electricChartData, setElectricChartData] = useState([]);

  useEffect(() => {
    const fetchEnvironmentData = async () => {
      const data: IPmTempHmd[] = await getData(
        `RhtpmPer${
          selectedTimeRange === "6month"
            ? "Month"
            : selectedTimeRange === "1month"
            ? "Week"
            : "Day"
        }/${roomId}`, 
        true
      );

      const formattedData = data?.map((item) => {
        const formattedDay = item.Day
          ? `${item.Day.substring(7, 10)}-${item.Day.substring(3, 6)}`
          : "";
        const formattedWeek = item.Week
          ? `${item.Week.substring(7, 10)}-${item.Week.substring(3, 6)}`
          : "";

        const month = item.Month ? item.Month.split("-")[1] : undefined;
        const formattedMonth = month ? monthNames[parseInt(month) - 1] : "";

        return {
          ...item,
          Day: formattedDay,
          Week: formattedWeek,
          Month: formattedMonth.slice(0, 3),
          PM25Day:
            item.PM25Day &&
            parseFloat(item.PM25Day.toFixed(configs.numberOfDecimal)),
          PM25Week:
            item.PM25Week &&
            parseFloat(item.PM25Week.toFixed(configs.numberOfDecimal)),
          PM25Month:
            item.PM25Month &&
            parseFloat(item.PM25Month.toFixed(configs.numberOfDecimal)),
          TempDay:
            item.TempDay &&
            parseFloat(item.TempDay.toFixed(configs.numberOfDecimal)),
          TempWeek:
            item.TempWeek &&
            parseFloat(item.TempWeek.toFixed(configs.numberOfDecimal)),
          TempMonth:
            item.TempMonth &&
            parseFloat(item.TempMonth.toFixed(configs.numberOfDecimal)),
          HumidDay:
            item.HumidDay &&
            parseFloat(item.HumidDay.toFixed(configs.numberOfDecimal)),
          HumidWeek:
            item.HumidWeek &&
            parseFloat(item.HumidWeek.toFixed(configs.numberOfDecimal)),
          HumidMonth:
            item.HumidMonth &&
            parseFloat(item.HumidMonth.toFixed(configs.numberOfDecimal)),
          // similarly for other fields if needed
        };
      });

      setEnvironmentChartData(formattedData);
    };

    const fetchElectricData = async () => {
      const data = await getData(
        `UseRateRoomPer${
          selectedTimeRange === "6month"
            ? "Month"
            : selectedTimeRange === "1month"
            ? "Week"
            : "Day"
        }/${roomId}`,
        true
      );

      const monthOrder = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const formattedData = data
        .map((item: any) => {
          return {
            Date:
              selectedTimeRange === "6month"
                ? item.Month.split("-")[1]
                : selectedTimeRange === "1month"
                ? `${item.Week.split("-")[2]}-${item.Week.split("-")[1]}`
                : `${item.Day.split("-")[2]}-${item.Day.split("-")[1]}`,
            Usage:
              selectedTimeRange === "6month"
                ? item.TotalUseRateMonth.toFixed(0)
                : selectedTimeRange === "1month"
                ? item.TotalUseRateWeek.toFixed(0)
                : item.TotalUseRateDay.toFixed(0),
          };
        })
        ?.sort((a: any, b: any) => {
          if (selectedTimeRange === "6month") {
            return monthOrder.indexOf(a.Date) - monthOrder.indexOf(b.Date);
          }
          return 0;
        });

      setElectricChartData(formattedData);
    };

    fetchEnvironmentData();
    fetchElectricData();
  }, [roomId, selectedTimeRange]);

  return (
    <Card className="col-span-3 md:col-span-2">
      <CardHeader className="flex flex-row justify-between items-start">
        <CardTitle className="text-lg md:text-xl text-foreground/70">
          Environment & Electricity
        </CardTitle>
        <div className="-translate-y-2.5 md:-translate-y-3">
          <Select
            value={selectedTimeRange}
            onValueChange={setSelectedTimeRange}
          >
            <SelectTrigger
              className="w-28 md:w-40 h-8 md:h-10 rounded-md sm:ml-auto"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Today" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="7day" className="rounded-md">
                7 Day
              </SelectItem>
              <SelectItem value="1month" className="rounded-md">
                1 Month
              </SelectItem>
              <SelectItem value="6month" className="rounded-md">
                6 Month
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <EnvironmentInfoRoomChart
        data={environmentChartData}
        electricData={electricChartData}
        timeRange={selectedTimeRange}
      />
    </Card>
  );
}
