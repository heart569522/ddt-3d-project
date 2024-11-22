"use client";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn-ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/select";
import {
  IAverageElectricityUsage,
  IElectricFloorRoomUsageChart,
  IElectricUsageChart,
} from "@/types/model";
import { monthNames, suffixesNumber } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getData } from "@/actions/actions";
import {
  formatBuildingElectric24Usage,
  formatBuildingElectricTodayUsage,
  formatFacultyElectric24Usage,
  formatFacultyElectricTodayUsage,
  formatFloorElectric24Usage,
  formatFloorElectricTodayUsage,
  formatRoomElectric24Usage,
  formatRoomElectricTodayUsage,
} from "@/lib/formats";
import { configs } from "@/lib/configs";
import React from "react";

interface ElectricProps {
  data: IElectricUsageChart[];
  buildingId?: string;
}

export function ElectricChart({ data, buildingId }: ElectricProps) {
  const [chartData, setChartData] = useState<IElectricUsageChart[]>(data);
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");

  useEffect(() => {
    const fetchData = async () => {
      let newData;

      switch (selectedTimeRange) {
        case "24hr":
          if (buildingId) {
            const response = await getData("UseRate24");
            newData = formatBuildingElectric24Usage(response, buildingId);
          } else {
            const response = await getData("UseRate24");
            newData = formatFacultyElectric24Usage(response);
          }
          break;

        case "today":
        default:
          if (data.length === 0) {
            if (buildingId) {
              const response = await getData("UseRateToday");
              newData = formatBuildingElectricTodayUsage(response, buildingId);
            } else {
              const response = await getData("UseRateToday");
              newData = formatFacultyElectricTodayUsage(response);
            }
          } else {
            newData = data;
          }
          break;
      }
      setChartData(newData as any);
    };

    fetchData();
  }, [selectedTimeRange]);

  const chartConfig = chartData?.reduce((config, item, index) => {
    config[item.buildingId] = {
      label: item.buildingId,
      color: `hsl(var(--chart-${index + 1}))`,
    };
    return config;
  }, {} as ChartConfig);

  const pieChartData = chartData?.map((item) => ({
    ...item,
    percent: parseFloat(
      ((item.value / item.total) * 100).toFixed(configs.numberOfDecimal)
    ),
  }));

  const totalUsageRate = () => {
    if (buildingId) {
      const total = chartData.reduce((sum, item) => sum + item.value, 0);
      return total.toLocaleString();
    } else {
      return chartData[0]?.total.toLocaleString();
    }
  };

  return (
    <Card>
      <CardHeader>
        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <SelectTrigger
            className="w-full rounded-md sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Today" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            <SelectItem value="today" className="rounded-md">
              Today
            </SelectItem>
            <SelectItem value="24hr" className="rounded-md">
              24 hour
            </SelectItem>
            {/* <SelectItem value="month" className="rounded-md">
              This Month
            </SelectItem>
            <SelectItem value="6month" className="rounded-md">
              Last 6 Month
            </SelectItem> */}
          </SelectContent>
        </Select>
        <CardTitle className="text-sm md:text-base text-left pt-4">
          {selectedTimeRange === "today" ? "Today" : "24 Hour"} Electricity
          Usage Rate
        </CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <Card className="transition bg-secondary/60 hover:bg-secondary/30 mb-6">
          <CardHeader className="pb-1">
            <CardTitle className="text-3xl sm:text-4xl text-center">
              {chartData && (
                <>
                  {totalUsageRate()}&nbsp;
                  <span className="text-sm sm:text-base opacity-70">
                    kW/Hour
                  </span>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardFooter></CardFooter>
        </Card>
        {chartData.length !== 0 ? (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                right: 6,
                left: 6,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="buildingId"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="value" radius={4}>
                <LabelList
                  position="top"
                  dataKey="value"
                  offset={12}
                  className="fill-foreground"
                  fontSize={10}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        ) : (
          <p className="text-base text-center font-semibold opacity-60 italic py-6">
            Data Not Available
          </p>
        )}

        {!buildingId && (
          <p className="text-sm text-center italic mt-1">(Building Number)</p>
        )}

        {/* Pie Chart */}
        <h3 className="text-base md:text-lg font-semibold mt-6 text-left">
          {selectedTimeRange === "today" ? "Today" : "24 Hour"} Usage (%)
        </h3>
        {pieChartData.length !== 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie data={pieChartData} dataKey="percent" nameKey="buildingId" />
              <ChartLegend
                content={<ChartLegendContent nameKey="buildingId" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <p className="text-base text-center font-semibold opacity-60 italic py-10">
            Data Not Available
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface ElectricRoomProps {
  data: IElectricFloorRoomUsageChart[];
  roomId?: string;
  floorId?: string;
}

export function ElectricFloorRoomChart({
  data,
  roomId,
  floorId,
}: ElectricRoomProps) {
  const [chartData, setChartData] =
    useState<IElectricFloorRoomUsageChart[]>(data);
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");

  useEffect(() => {
    const fetchData = async () => {
      let newData;

      switch (selectedTimeRange) {
        case "24hr":
          if (roomId) {
            const response = await getData(`RoomUseHourYesterday`);
            newData = formatRoomElectric24Usage(response, roomId as string);
          }

          if (floorId) {
            const response = await getData(`RoomUseHourYesterday`);
            newData = formatFloorElectric24Usage(response, floorId as string);
          }

          break;

        case "today":
        default:
          if (data.length === 0) {
            if (roomId) {
              const response = await getData(`RoomUseHour/${roomId}`);
              newData = formatRoomElectricTodayUsage(response);
            }

            if (floorId) {
              const response = await getData(`RoomUseHour`);
              newData = formatFloorElectricTodayUsage(response, floorId);
            }
          } else {
            newData = data;
          }
          break;
      }

      setChartData(newData as any);
    };

    fetchData();
  }, [selectedTimeRange]);

  const chartConfig = chartData?.reduce((config, item, index) => {
    config[item.name] = {
      label: item.name,
      color: `hsl(var(--chart-${index + 1}))`,
    };
    return config;
  }, {} as ChartConfig);

  const pieChartData = chartData?.map((item) => {
    const value = Math.abs(parseFloat(item.value));
    const total = parseFloat(item.total);

    const percent =
      total !== 0 && !isNaN(total)
        ? parseFloat(((value / total) * 100).toFixed(configs.numberOfDecimal))
        : 0;

    return {
      ...item,
      percent,
    };
  });

  const totalUsageRate = () => {
    return chartData[0]?.total.toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <SelectTrigger
            className="w-full rounded-md sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Today" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            <SelectItem value="today" className="rounded-md">
              Today
            </SelectItem>
            <SelectItem value="24hr" className="rounded-md">
              24 hour
            </SelectItem>
          </SelectContent>
        </Select>
        <CardTitle className="text-sm md:text-base text-left pt-4">
          {selectedTimeRange === "today" ? "Today" : "24 Hour"} Electricity
          Usage Rate
        </CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <Card className="transition bg-secondary/60 hover:bg-secondary/30 mb-6">
          <CardHeader className="pb-1">
            <CardTitle className="text-3xl sm:text-4xl text-center">
              {chartData && (
                <>
                  {totalUsageRate()}&nbsp;
                  <span className="text-sm sm:text-base opacity-70">
                    kW/Hour
                  </span>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardFooter></CardFooter>
        </Card>
        {chartData && (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                right: 6,
                left: 6,
                bottom: 10,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={20}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="value" radius={4}>
                <LabelList
                  position="top"
                  dataKey="value"
                  offset={12}
                  className="fill-foreground"
                  fontSize={10}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}

        {/* Pie Chart */}
        <h3 className="text-base md:text-lg font-semibold mt-6 text-left">
          {selectedTimeRange === "today" ? "Today" : "24 Hour"} Usage (%)
        </h3>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={pieChartData} dataKey="percent" nameKey="name" />
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const averageChartConfig = {
  Usage: {
    label: "Usage",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

interface Props {
  data: IAverageElectricityUsage[];
  isFloorRoom?: boolean;
}

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

export function AverageElectricUsage({ data, isFloorRoom = false }: Props) {
  const chartData = data?.map((item) => {
    const monthString = isFloorRoom
      ? item.Month.replace(/^\d+-/, "")
      : item.Month;

    const [, month] = monthString.split("-").map(Number);

    return {
      Month: isFloorRoom ? monthString : `${monthNames[month - 1]}`, // Format the month
      Usage: item.TotalUseRateMonth.toFixed(0), // Format usage value
    };
  });

  if (isFloorRoom) {
    // Sort only if not isFloorRoom
    chartData.sort((a, b) => {
      // Sort by the month order
      return monthOrder.indexOf(a.Month) - monthOrder.indexOf(b.Month);
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base md:text-lg text-left">
          Average Electricity Usage
        </CardTitle>
        <CardDescription>Last 6 Month</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData?.length !== 0 ? (
          <ChartContainer config={averageChartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 12,
                left: -20,
                right: 6,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="Month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={0}
                tickCount={5}
                tickFormatter={(value) => suffixesNumber(value)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="Usage"
                type="natural"
                fill="var(--color-Usage)"
                fillOpacity={0.4}
                stroke="var(--color-Usage)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <p className="text-base text-center font-semibold opacity-60 italic py-10">
            Data Not Available
          </p>
        )}
      </CardContent>
    </Card>
  );
}
