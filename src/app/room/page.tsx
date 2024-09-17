import {
  getAverageElectricityUsage,
  getAverageEnvironment,
  getData,
} from "@/actions/actions";
import { Button } from "@/components/shadcn-ui/button";
import CardInfo from "@/components/ui/dashboard/card-info";
import {
  AverageElectricUsage,
  ElectricChart,
} from "@/components/ui/dashboard/electric-chart";
import { EnvironmentAverage } from "@/components/ui/dashboard/environment-chart";
import Navigation from "@/components/ui/navigation";
import { formatElectricTodayUsage } from "@/lib/formats";
import { Droplets, MapPin, Thermometer } from "lucide-react";
import { IconFaceMask } from "@tabler/icons-react";
import TooltipHover from "@/components/ui/tooltip-hover";
import Link from "next/link";
import EnvironmentInfoChart from "@/components/ui/dashboard/environment-info-chart";
import CanvasScreen from "@/components/ui/canvas-screen/canvas";
import { EN117Building } from "@/components/models/en117/building/En117Building";
import RoomFloor8 from "@/components/models/en124/room/Room_floor_8";

export default async function Overview() {
  const avgEnvironment = await getAverageEnvironment();
  const avgElectricUsage = await getAverageElectricityUsage();
  const electricUsage = await getData("UseRateToday");
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
          <EnvironmentInfoChart />
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
          <TooltipHover
            content={"View Map"}
            position={"top"}
            isUseMediaQuery={true}
            mediaQuerySize="md"
            positionMediaQuery="right"
          >
            <Button variant="outline" size="icon">
              <MapPin className="h-5 w-5" />
            </Button>
          </TooltipHover>
          <TooltipHover
            content={"Temperature"}
            position="top"
            isUseMediaQuery={true}
            mediaQuerySize="md"
            positionMediaQuery="right"
          >
            <Link target="_blank" href={"/contour/temperature"}>
              <Button variant="outline" size="icon">
                <Thermometer className="h-5 w-5" />
              </Button>
            </Link>
          </TooltipHover>
          <TooltipHover
            content={"Humidity"}
            position="top"
            isUseMediaQuery={true}
            mediaQuerySize="md"
            positionMediaQuery="right"
          >
            <Link target="_blank" href={"/contour/humidity"}>
              <Button variant="outline" size="icon">
                <Droplets className="h-5 w-5" />
              </Button>
            </Link>
          </TooltipHover>
          <TooltipHover
            content={"PM 2.5"}
            position="top"
            isUseMediaQuery={true}
            mediaQuerySize="md"
            positionMediaQuery="right"
          >
            <Link target="_blank" href={"/contour/pm25"}>
              <Button variant="outline" size="icon">
                <IconFaceMask className="h-5 w-5" />
              </Button>
            </Link>
          </TooltipHover>
        </>
      }
    >
      <div className="w-full h-dvh relative">
        <CanvasScreen
          model={
            <RoomFloor8
              isShowLamp={false}
              isShowAir={false}
              castShadow
              receiveShadow
            />
          }
          cameraPosition={[-5, 6, 12]}
          controlSettings={{
            minPolarAngle: 0,
            maxPolarAngle: Math.PI / 2.25,
            minDistance: 20,
            maxDistance: 65,
          }}
        />
      </div>
    </Navigation>
  );
}
