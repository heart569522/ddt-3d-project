"use client";
import { ISensorUseHour } from "@/app/room-dashboard/[slug]/page";
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
import { configs } from "@/lib/configs";
import { Zap } from "lucide-react";
import React from "react";
import { Pie, PieChart } from "recharts";

interface Props {
  totalUseHour: number | string;
  sensorUseHour: ISensorUseHour[];
}

export default function CardSensorUseHour({
  totalUseHour,
  sensorUseHour,
}: Props) {
  const chartConfig = sensorUseHour.reduce((config, item, index) => {
    config[item.sensor] = {
      label: item.sensor,
      color: `hsl(var(--chart-${index + 1}))`,
    };
    return config;
  }, {} as ChartConfig);
  
  const totalEnergy = sensorUseHour.reduce(
    (sum, item) => sum + parseFloat(item.energy.toString()),
    0
  );
  const pieChartData = sensorUseHour.map((item) => {
    const value = Math.abs(parseFloat(item.energy.toString()));

    const percent =
      totalEnergy !== 0 && !isNaN(totalEnergy)
        ? parseFloat(
            ((value / totalEnergy) * 100).toFixed(configs.numberOfDecimal)
          )
        : 0;

    return {
      ...item,
      fill: `var(--color-${item.sensor})`,
      percent,
    };
  });

  return (
    <Card className="col-span-3 md:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-foreground/70">
          Use Rate Today
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Card className="transition bg-secondary/60 hover:bg-secondary/30">
          <CardHeader className="block">
            <div className="flex flex-row justify-center items-center gap-4">
              <Zap />
              <p className="text-2xl md:text-3xl font-semibold text-center">
                {totalUseHour}&nbsp;
                <span className="text-base text-center text-foreground/90">
                  kM/Hour
                </span>
              </p>
            </div>
          </CardHeader>
        </Card>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={pieChartData} dataKey="percent" nameKey="sensor" />
            <ChartLegend
              content={<ChartLegendContent nameKey="sensor" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
