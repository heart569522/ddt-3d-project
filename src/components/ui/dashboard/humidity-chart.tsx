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
import React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const chartData = [
  { month: "January", desktop: 186, mobile: 80, tablet: 134 },
  { month: "February", desktop: 305, mobile: 200, tablet: 172 },
  { month: "March", desktop: 237, mobile: 120, tablet: 192 },
  { month: "April", desktop: 73, mobile: 190, tablet: 245 },
  { month: "May", desktop: 209, mobile: 130, tablet: 265 },
  { month: "June", desktop: 214, mobile: 140, tablet: 130 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  tablet: {
    label: "Tablet",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function HumidityChart() {
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
            data={chartData}
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
              dataKey="desktop"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-mobile)",
              }}
              activeDot={{
                r: 6,
              }}
            />
            <Line
              dataKey="tablet"
              type="monotone"
              stroke="var(--color-tablet)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-tablet)",
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
