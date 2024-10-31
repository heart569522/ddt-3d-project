import {
  getAverageElectricityUsage,
  getAverageEnvironment,
  getDashboardData,
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
import { Droplets, FileDown, MapPin, Thermometer, UndoDot } from "lucide-react";
import { IconFaceMask } from "@tabler/icons-react";
import TooltipHover from "@/components/ui/tooltip-hover";
import Link from "next/link";
import EnvironmentInfoChart from "@/components/ui/dashboard/environment-info-chart";
import CanvasScreen from "@/components/ui/canvas-screen/canvas";
import { Metadata } from "next/types";
import { notFound } from "next/navigation";
import React from "react";
import { Color } from "three";
import CardSelectRoom from "@/components/ui/dashboard/card-select-room";
import ModalDownload from "@/components/ui/modal-download";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `${params.slug.toUpperCase()}`,
  };
}

export default async function Floor({ params }: { params: { slug: string } }) {
  const buildingId = params.slug.toLowerCase().substring(0, 5);
  const floorId = params.slug.toLowerCase();

  const renderCanvas = async () => {
    try {
      const FloorComponent = (
        await import(
          `../../../components/models/${buildingId}/floor-room/${floorId}-floor`
        )
      ).default;

      return (
        <CanvasScreen
          model={
            <FloorComponent
              castShadow
              receiveShadow
              isShowLamp={false}
              isShowAir={false}
              isManage={false}
            />
          }
          cameraPosition={[-5, 25, 12]}
          controlSettings={{
            minPolarAngle: 0,
            maxPolarAngle: Math.PI / 4,
            minDistance: 20,
            maxDistance: 65,
            enablePan: true,
          }}
          outlineResolution={0.5}
          outlineStrength={15}
          // planeColor={Color.NAMES.black}
        />
      );
    } catch (error) {
      notFound();
    }
  };

  const avgEnvironment = await getData(
    `gaugeRoom/${params.slug.toUpperCase()}99`
  );
  const avgElectricUsage = await getDashboardData(
    `UseRateRoomPerMonth/${params.slug.toLowerCase()}99`
  );
  const electricUsage = await getData("UseRateToday");
  const electricUsageData = formatFacultyElectricTodayUsage(electricUsage);
  const pmTempHmdData = await getData(
    `RhtpmPerMonth/${params.slug.toLowerCase()}99`
  );

  return (
    <Navigation
      leftDashbaord={
        <>
          <CardInfo
            title="General Information"
            detail={`Building: ${params.slug
              .toUpperCase()
              .substring(0, 5)}, Fl ${params.slug
              .toUpperCase()
              .substring(5, 7)} Information`}
          />
          <EnvironmentAverage
            data={avgEnvironment?.[`${params.slug.toUpperCase()}99`]}
          />
          <EnvironmentInfoChart data={pmTempHmdData} />
        </>
      }
      rightDashbaord={
        <div className="flex flex-col gap-2">
          <div className="hidden xl:block">
            <CardSelectRoom room={params.slug.toUpperCase()} />
          </div>
          <ElectricChart data={electricUsageData} />
          <AverageElectricUsage data={avgElectricUsage} isFloorRoom={true} />
        </div>
      }
      toolbar={
        <>
          <TooltipHover
            content={"Reset"}
            position={"top"}
            isUseMediaQuery={true}
            mediaQuerySize="md"
            positionMediaQuery="right"
          >
            <Button variant="outline" size="icon">
              <UndoDot className="h-5 w-5" />
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
          <ModalDownload>
            <TooltipHover
              content={"File Download"}
              position="top"
              isUseMediaQuery={true}
              mediaQuerySize="md"
              positionMediaQuery="right"
            >
              <Button variant="outline" size="icon">
                <FileDown className="h-5 w-5" />
              </Button>
            </TooltipHover>
          </ModalDownload>
        </>
      }
      useCardSelectFloorRoom={true}
    >
      <div className="w-full h-dvh">{await renderCanvas()}</div>
    </Navigation>
  );
}
