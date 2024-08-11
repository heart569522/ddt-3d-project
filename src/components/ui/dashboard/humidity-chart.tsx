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
import { IEnvironmentLineChart } from "@/types/model";
import React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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

interface HumidityProps {
  data: IEnvironmentLineChart[];
}

export default function HumidityChart({ data }: HumidityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base md:text-lg text-left">
          Humidity (C)
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
