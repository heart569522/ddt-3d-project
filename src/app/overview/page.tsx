import {
  getAverageElectricityUsage,
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
import { formatFacultyElectricTodayUsage } from "@/lib/formats";
import { Droplets, LoaderCircle, MapPin, Thermometer } from "lucide-react";
import { IconFaceMask } from "@tabler/icons-react";
import TooltipHover from "@/components/ui/tooltip-hover";
import Link from "next/link";
import EnvironmentInfoChart from "@/components/ui/dashboard/environment-info-chart";
import CanvasScreen from "@/components/ui/canvas-screen/canvas";
import React from "react";
import CardDetail from "@/components/ui/dashboard/card-detail";
import FacultyAllBuilding from "@/components/models/faculty/faculty-all-building";

export default async function Overview() {
  const avgEnvironment = await getData("gaugeOutdoor");
  const avgElectricUsage = await getAverageElectricityUsage();
  const electricUsage = await getData("UseRateToday");
  const electricUsageData = formatFacultyElectricTodayUsage(electricUsage);
  console.log("🚀 ~ Overview ~ electricUsageData:", electricUsageData)
  const pmTempHmdData = await getData("HTPMPerMonth");
  const buildingData = await getData("getBU");

  return (
    <Navigation
      leftDashbaord={
        <>
          <CardInfo
            title="General Information"
            detail={
              <>
                <p className="text-base text-card-foreground">
                  Area: 1,234 Square meters
                </p>
                <p className="text-base text-card-foreground">
                  Number of Buildings: 12 units
                </p>
              </>
            }
          />
          <EnvironmentAverage data={avgEnvironment} />
          <EnvironmentInfoChart data={pmTempHmdData} />
        </>
      }
      rightDashbaord={
        <div className="flex flex-col gap-2">
          <div className="hidden xl:block">
            <CardDetail
              electricUsageData={electricUsage}
              buildingData={buildingData}
            />
          </div>
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
      useCardBuildingDetail={true}
      buildingData={buildingData}
      electricUsageData={electricUsage}
    >
      <div className="w-full h-dvh">
        <CanvasScreen
          model={<FacultyAllBuilding isManage={false} />}
          cameraPosition={[-5, 6, 12]}
          dpr={[0.5, 0.9]}
          planeSize={[2000, 2000]}
          controlSettings={{
            minPolarAngle: 0,
            maxPolarAngle: Math.PI / 2.25,
            // minDistance: 40,
            maxDistance: 250,
            enablePan: false,
          }}
        />
      </div>
    </Navigation>
  );
}
