"use client";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
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
  IElectricUsageChart,
} from "@/types/model";
import { monthNames, suffixesNumber } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getElectricityUsage } from "@/actions/data";
import { formatElectric24Usage } from "@/lib/formats";

interface ElectricProps {
  data: IElectricUsageChart[];
}

export function ElectricChart({ data }: ElectricProps) {
  const [chartData, setChartData] = useState<IElectricUsageChart[]>(data);
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");

  useEffect(() => {
    const fetchData = async () => {
      let newData;

      switch (selectedTimeRange) {
        case "24hr":
          const response = await getElectricityUsage("UseRate24");
          newData = formatElectric24Usage(response);

          break;
        // case "month":
        //   // Fetch last month data
        //   newData = data;
        //   // newData = await fetchDataForLastMonth();
        //   break;
        // case "6month":
        //   // Fetch last 6 months data
        //   newData = data;
        //   // newData = await fetchDataForLast6Months();
        //   break;
        case "today":
        default:
          newData = data;
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
    percent: parseFloat(((item.value / item.total) * 100).toFixed(2)),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div className="custom-tooltip flex bg-primary-foreground text-[10px] rounded-md px-2 py-1">
          <p>{`${name}`}</p> {`${value}%`}
        </div>
      );
    }

    return null;
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
        <CardTitle className="text-base md:text-lg text-left pt-4">
          Total Electricity Usage Rate
        </CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <Card className="transition bg-secondary/60 hover:bg-secondary/30 mb-6">
          <CardHeader className="pb-1">
            <CardTitle className="text-3xl sm:text-4xl text-center">
              {chartData && (
                <>
                  {chartData[0]?.total.toLocaleString()}&nbsp;
                  <span className="text-sm sm:text-base opacity-70">
                    kW/Hour
                  </span>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardFooter>
            {/* <Progress
              className="bg-zinc-200 dark:bg-muted"
              value={calculatePercents(averagePM25 as number, 400)}
              aria-label={`${calculatePercents(
                averagePM25 as number,
                400
              )}% increase`}
            /> */}
          </CardFooter>
        </Card>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
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
            <Bar dataKey="value" fill="var(--color-desktop)" radius={4}>
              <LabelList
                position="top"
                dataKey="value"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
        <h3 className="text-base md:text-lg font-semibold mt-6 text-left">
          Today Usage (%)
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
            <Pie data={pieChartData} dataKey="percent" nameKey="buildingId" />
            <ChartLegend
              content={<ChartLegendContent nameKey="buildingId" />}
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
}

export function AverageElectricUsage({ data }: Props) {
  const chartData = data?.map((item) => {
    const [, month] = item.Month.split("-").map(Number);
    return {
      Month: `${monthNames[month - 1]}`,
      Usage: item.TotalUseRateMonth.toFixed(0),
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base md:text-lg text-left">
          Average Electronicity Usage
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={averageChartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 0,
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
      </CardContent>
    </Card>
  );
}
