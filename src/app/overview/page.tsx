import {
  getAverageElectricityUsage,
  getAverageEnvironment,
  getElectricityUsage,
  getPmTempHmdData,
} from "@/actions/data";
import TurtleStuff from "@/components/models/turttle-stuff";
import { Button } from "@/components/shadcn-ui/button";
import CardInfo from "@/components/ui/dashboard/card-info";
import {
  AverageElectricUsage,
  ElectricChart,
} from "@/components/ui/dashboard/electric-chart";
import {
  EnvironmentAverage,
  EnvironmentPMChart,
} from "@/components/ui/dashboard/environment-chart";
import HumidityChart from "@/components/ui/dashboard/humidity-chart";
import TemperatureChart from "@/components/ui/dashboard/temperature-chart";
import Navigation from "@/components/ui/navigation";
import { formatElectricTodayUsage } from "@/lib/formats";
import { monthNames } from "@/lib/utils";
import {
  IElectricTodayUsage,
  IEnvironmentLineChart,
  IPmTempHmd,
} from "@/types/model";
import { Droplets, MapPin, Thermometer } from "lucide-react";
import { IconFaceMask } from "@tabler/icons-react";
import TooltipHover from "@/components/ui/tooltip-hover";

export default async function Overview() {
  const avgEnvironment = await getAverageEnvironment();
  const avgElectricUsage = await getAverageElectricityUsage();
  const pmTempHmdData = await getPmTempHmdData();
  const electricUsage = await getElectricityUsage("UseRateToday");

  let PMData: IEnvironmentLineChart[] = [];
  let TempData: IEnvironmentLineChart[] = [];
  let HumidityData: IEnvironmentLineChart[] = [];

  pmTempHmdData?.forEach((item: IPmTempHmd) => {
    const [, month] = item.Month.split("-").map(Number);
    const monthName = monthNames[month - 1];

    PMData.push({
      month: monthName,
      min: parseFloat(item.PM25Min.toFixed(2)),
      max: parseFloat(item.PM25Max.toFixed(2)),
      mean: parseFloat(item.PM25Month.toFixed(2)),
    });

    TempData.push({
      month: monthName,
      min: parseFloat(item.TempMin.toFixed(2)),
      max: parseFloat(item.TempMax.toFixed(2)),
      mean: parseFloat(item.TempMonth.toFixed(2)),
    });

    HumidityData.push({
      month: monthName,
      min: parseFloat(item.HumidMin.toFixed(2)),
      max: parseFloat(item.HumidMax.toFixed(2)),
      mean: parseFloat(item.HumidMonth.toFixed(2)),
    });
  });

  const electricUsageData = formatElectricTodayUsage(electricUsage);

  return (
    <Navigation
      leftDashbaord={
        <>
          <CardInfo
            title="General Information"
            detail="asd';asl 654q qweqwe adc 1asdasdasd"
          />
          <EnvironmentAverage data={avgEnvironment} />
          <EnvironmentPMChart data={PMData} />
          <TemperatureChart data={TempData} />
          <HumidityChart data={HumidityData} />
        </>
      }
      rightDashbaord={
        <div className="flex flex-col gap-2">
          <ElectricChart data={electricUsageData} />
          <AverageElectricUsage data={avgElectricUsage} />
        </div>
      }
      toolbar={
        <>
          <TooltipHover content={"View Map"} position="right">
            <Button variant="outline" size="icon">
              <MapPin className="h-5 w-5" />
            </Button>
          </TooltipHover>
          <TooltipHover content={"Temperature"} position="right">
            <Button variant="outline" size="icon">
              <Thermometer className="h-5 w-5" />
            </Button>
          </TooltipHover>
          <TooltipHover content={"Humidity"} position="right">
            <Button variant="outline" size="icon">
              <Droplets className="h-5 w-5" />
            </Button>
          </TooltipHover>
          <TooltipHover content={"PM 2.5"} position="right">
            <Button variant="outline" size="icon">
              <IconFaceMask className="h-5 w-5" />
            </Button>
          </TooltipHover>
        </>
      }
    >
      <div className="w-full h-dvh bg-cyan-700"></div>
    </Navigation>
  );
}
