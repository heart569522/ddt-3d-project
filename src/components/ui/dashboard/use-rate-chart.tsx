"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn-ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const averageChartConfig = {
  Usage: {
    label: "Usage",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

interface Props {
  data: any;
}

export function UseRateChart({ data }: Props) {
  return (
    <Card className="transition bg-secondary/60 hover:bg-secondary/30">
      <CardHeader>
        <CardTitle className="text-sm md:text-base text-left">
          Use Rate
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={averageChartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              top: 12,
              left: -20,
              right: 27,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={0}
              tickCount={5}
              // tickFormatter={(value) => suffixesNumber(value)}
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
      </CardContent>
    </Card>
  );
}
