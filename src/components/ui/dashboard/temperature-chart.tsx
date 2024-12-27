"use client";
import {
  Card,
  CardContent,
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
import { suffixesNumber } from "@/lib/utils";
import { IEnvironmentLineChart } from "@/types/model";
import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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

interface TempProps {
  data: IEnvironmentLineChart[];
  isDashboardRoom?: boolean;
}

export default function TemperatureChart({ data, isDashboardRoom }: TempProps) {
  return (
    <Card className="transition bg-secondary/80">
      <CardHeader>
        <CardTitle className="text-sm md:text-base text-left">
          Temperature (°C)
        </CardTitle>
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
