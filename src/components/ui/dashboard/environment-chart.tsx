"use client";
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
import { Progress } from "@/components/shadcn-ui/progress";
import { configs } from "@/lib/configs";
import { monthNames, suffixesNumber } from "@/lib/utils";
import { IAverageEnvironment, IEnvironmentLineChart } from "@/types/model";
import { Minus } from "lucide-react";
import React, { useMemo } from "react";
import {
  Label,
  PieChart,
  Pie,
  LineChart,
  CartesianGrid,
  XAxis,
  Line,
  YAxis,
} from "recharts";

interface AverageProps {
  data: IAverageEnvironment;
  isFaculty?: boolean;
}

interface PMProps {
  data: IEnvironmentLineChart[];
  isDashboardRoom?: boolean;
}

export function EnvironmentAverage({ data, isFaculty = false }: AverageProps) {
  console.log("🚀 ~ EnvironmentAverage ~ data:", data)
  const {
    averagePM25 = null,
    averageTemp = null,
    averageHumidity = null,
  } = data || {};

  const calculatePercents = (value: number, total: number) => {
    return Math.round((value / total) * 100);
  };

  const getTempColorProgress = (value: number): string => {
    if (value <= 25) return "bg-blue-500";
    if (value <= 50) return "bg-green-500";
    if (value <= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getHumidityColorProgress = (value: number): string => {
    if (value <= 25) return "bg-red-500";
    if (value <= 50) return "bg-yellow-500";
    if (value <= 75) return "bg-green-500";
    return "bg-blue-500";
  };

  const getPM25ColorProgress = (value: number): string => {
    if (value < 10) return "bg-[#0000FF]";
    if (value < 20) return "bg-green-500";
    if (value < 30) return "bg-yellow-500";
    if (value < 40) return "bg-red-500";
    if (value < 55) return "bg-[#9002a8]";
    if (value < 60) return "bg-[#7002a8]";
    if (value < 70) return "bg-[#600170]";
    if (value < 80) return "bg-[#500072]";
    if (value < 90) return "bg-[#440061]";
    if (value < 100) return "bg-[#390051]";
    return "bg-[#220030]";
  };

  return (
    <Card className="bg-background/60">
      <CardHeader className="pb-0">
        <CardTitle className="text-base md:text-lg text-left">
          Realtime Environment Data
        </CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex flex-col flex-1 pb-8 gap-4">
        <Card className="mt-4 transition bg-secondary/80">
          <CardContent className="mt-4 flex flex-col gap-2 sm:gap-3">
            <div className="flex gap-2 items-end justify-start ">
              <h4 className="text-sm sm:text-base opacity-90">PM 2.5 :</h4>
              <p className="text-xl sm:text-2xl font-semibold">
                {averagePM25?.toFixed(configs.numberOfDecimal)}
              </p>
            </div>
            {averagePM25 ? (
              <div className="flex justify-between items-center gap-2">
                <span className="">0</span>
                <Progress
                  className="bg-zinc-200 dark:bg-zinc-700"
                  indicatorColor={getPM25ColorProgress(
                    calculatePercents(averagePM25 as number, 600)
                  )}
                  value={calculatePercents(averagePM25 as number, 600)}
                  aria-label={`${calculatePercents(
                    averagePM25 as number,
                    600
                  )}% increase`}
                />
                <span className="">600</span>
              </div>
            ) : (
              <p className="text-base text-center font-semibold opacity-60 italic">
                Data Not Available
              </p>
            )}
          </CardContent>
        </Card>
        {!isFaculty && (
          <>
            <Card className="transition bg-secondary/80">
              <CardContent className="mt-4 flex flex-col gap-2 sm:gap-3">
                <div className="flex gap-2 items-end justify-start ">
                  <h4 className="text-sm sm:text-base opacity-90">
                    Temperature :
                  </h4>
                  <p className="text-xl sm:text-2xl font-semibold">
                    {averageTemp && (
                      <>
                        {averageTemp.toFixed(configs.numberOfDecimal)}&nbsp;
                        <span className="text-base sm:text-lg align-super">
                          °C
                        </span>
                      </>
                    )}
                  </p>
                </div>
                {averageTemp ? (
                  <div className="flex justify-between items-center gap-2">
                    <span className="">0</span>
                    <Progress
                      className="bg-zinc-200 dark:bg-zinc-700"
                      indicatorColor={getTempColorProgress(
                        calculatePercents(averageTemp as number, 50)
                      )}
                      value={calculatePercents(averageTemp as number, 50)}
                      aria-label={`${calculatePercents(
                        averageTemp as number,
                        50
                      )}% increase`}
                    />
                    <span className="">50</span>
                  </div>
                ) : (
                  <p className="text-base text-center font-semibold opacity-60 italic">
                    Data Not Available
                  </p>
                )}
              </CardContent>
            </Card>
            <Card className="transition bg-secondary/80">
              <CardContent className="mt-4 flex flex-col gap-2 sm:gap-3">
                <div className="flex gap-2 items-end justify-start ">
                  <h4 className="text-sm sm:text-base opacity-90">
                    Humidity :
                  </h4>
                  <p className="text-xl sm:text-2xl font-semibold">
                    {averageHumidity?.toFixed(configs.numberOfDecimal)}&nbsp;
                    {averageHumidity && (
                      <span className="text-base sm:text-lg">%</span>
                    )}
                  </p>
                </div>
                {averageHumidity ? (
                  <div className="flex justify-between items-center gap-2">
                    <span className="">0</span>
                    <Progress
                      className="bg-zinc-200 dark:bg-zinc-700"
                      indicatorColor={getHumidityColorProgress(
                        calculatePercents(averageHumidity as number, 100)
                      )}
                      value={calculatePercents(averageHumidity as number, 100)}
                      aria-label={`${calculatePercents(
                        averageHumidity as number,
                        100
                      )}% increase`}
                    />
                    <span className="">100</span>
                  </div>
                ) : (
                  <p className="text-base text-center font-semibold opacity-60 italic">
                    Data Not Available
                  </p>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </CardContent>
    </Card>
  );
}

const chartConfig = {
  min: {
    label: "Min",
    color: "hsl(var(--chart-1))",
  },
  max: {
    label: "Max",
    color: "hsl(var(--chart-2))",
  },
  mean: {
    label: "Mean",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function EnvironmentPMChart({ data, isDashboardRoom }: PMProps) {
  return (
    <Card className="transition bg-secondary/80">
      <CardHeader>
        <CardTitle className="text-sm md:text-base text-left">PM 2.5</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length !== 0 ? (
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={data}
              margin={{
                top: 12,
                right: isDashboardRoom ? 27 : 6,
                left: isDashboardRoom ? 27 : -25,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="title"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={5}
                tickCount={5}
                tickFormatter={(value) => suffixesNumber(value)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="min"
                type="monotone"
                stroke="var(--color-min)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-min)",
                }}
                activeDot={{
                  r: 6,
                }}
              />
              <Line
                dataKey="max"
                type="monotone"
                stroke="var(--color-max)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-max)",
                }}
                activeDot={{
                  r: 6,
                }}
              />
              <Line
                dataKey="mean"
                type="monotone"
                stroke="var(--color-mean)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-mean)",
                }}
                activeDot={{
                  r: 6,
                }}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
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
