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
import { monthNames } from "@/lib/utils";
import { IAverageEnvironment, IEnvironmentLineChart } from "@/types/model";
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
}

interface PMProps {
  data: IEnvironmentLineChart[];
}

export function EnvironmentAverage({ data }: AverageProps) {
  const {
    averagePM25 = null,
    averageTemp = null,
    averageHumidity = null,
  } = data || {};

  const calculatePercents = (value: number, total: number) => {
    return Math.round((value / total) * 100);
  };

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="text-base md:text-lg text-left">
          Environment Data
        </CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex flex-col flex-1 pb-8 gap-4">
        <Card className="mt-4 transition bg-secondary/60 hover:bg-secondary/30">
          <CardHeader className="pb-4">
            <CardDescription className="text-base sm:text-lg">
              PM 2.5
            </CardDescription>
            <CardTitle className="text-3xl sm:text-4xl">
              {averagePM25?.toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <Progress
              className="bg-zinc-200 dark:bg-muted"
              value={calculatePercents(averagePM25 as number, 400)}
              aria-label={`${calculatePercents(
                averagePM25 as number,
                400
              )}% increase`}
            />
          </CardFooter>
        </Card>
        <Card className="transition bg-secondary/60 hover:bg-secondary/30">
          <CardHeader className="pb-4">
            <CardDescription className="text-base sm:text-lg">
              Temperature (C)
            </CardDescription>
            <CardTitle className="text-3xl sm:text-4xl">
              {averageTemp && (
                <>
                  {averageTemp.toFixed(2)}&nbsp;
                  <span className="text-base sm:text-lg align-super">°C</span>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <Progress
              className="bg-zinc-200 dark:bg-muted"
              value={calculatePercents(averageTemp as number, 50)}
              aria-label={`${calculatePercents(
                averageTemp as number,
                50
              )}% increase`}
            />
          </CardFooter>
        </Card>
        <Card className="transition bg-secondary/60 hover:bg-secondary/30">
          <CardHeader className="pb-4">
            <CardDescription className="text-base sm:text-lg">
              Humidity
            </CardDescription>
            <CardTitle className="text-3xl sm:text-4xl">
              {averageHumidity?.toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <Progress
              className="bg-zinc-200 dark:bg-muted"
              value={calculatePercents(averageHumidity as number, 100)}
              aria-label={`${calculatePercents(
                averageHumidity as number,
                100
              )}% increase`}
            />
          </CardFooter>
        </Card>
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

export function EnvironmentPMChart({ data }: PMProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base md:text-lg text-left">
          Environment PM2.5
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
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
      </CardContent>
    </Card>
  );
}
