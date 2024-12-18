import {
  getDashboardData,
  getData,
} from "@/actions/actions";
import { Button } from "@/components/shadcn-ui/button";
import CardInfo from "@/components/ui/dashboard/card-info";
import {
  AverageElectricUsage,
  ElectricChart,
  ElectricFloorRoomChart,
} from "@/components/ui/dashboard/electric-chart";
import { EnvironmentAverage } from "@/components/ui/dashboard/environment-chart";
import Navigation from "@/components/ui/navigation";
import {
  formatFacultyElectricTodayUsage,
  formatFloorElectricTodayUsage,
} from "@/lib/formats";
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
import ModalPDFDownload from "@/components/ui/modal-download";
import ButtonControlContour from "@/components/ui/button-control-contour";

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
  const floorDetail = await getData(`floorDetail/${floorId.toUpperCase()}`);

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
              isShowLamp={true}
              isShowAir={true}
              isManage={false}
              isFloorPage={true}
              isRoomPage={false}
              roomData={floorDetail}
              pathname={floorId}
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
          floorId={floorId}
          planeColor={Color.NAMES.darkslategray}
        />
      );
    } catch (error) {
      console.error("🚀 ~ renderCanvas ~ error:", error)
      // notFound();
    }
  };

  const avgEnvironment = await getData(
    `gaugeRoom/${params.slug.toUpperCase()}99`
  );
  const avgElectricUsage = await getDashboardData(
    `UseRateRoomPerMonth/${params.slug.toLowerCase()}99`
  );
  const electricUsage = await getData(`RoomUseHour`);
  const electricUsageData = formatFloorElectricTodayUsage(
    electricUsage,
    floorId.toUpperCase()
  );
  const pmTempHmdData = await getData(
    `RhtpmPerMonth/${params.slug.toLowerCase()}99`
  );

  return (
    <Navigation
      leftDashboard={
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
      rightDashboard={
        <div className="flex flex-col gap-2">
          <div className="hidden xl:block">
            <CardSelectRoom room={params.slug.toUpperCase()} />
          </div>
          <ElectricFloorRoomChart
            data={electricUsageData as any}
            floorId={floorId.toUpperCase()}
          />
          <AverageElectricUsage data={avgElectricUsage} isFloorRoom={true} />
        </div>
      }
      toolbar={
        <>
          <ButtonControlContour />
          <ModalPDFDownload floorId={floorId}>
            <TooltipHover
              content={"File Download"}
              position="top"
              isUseMediaQuery={true}
              mediaQuerySize="md"
              positionMediaQuery="right"
            >
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                <FileDown className="h-5 w-5" />
              </div>
            </TooltipHover>
          </ModalPDFDownload>
        </>
      }
      useCardSelectFloorRoom={true}
    >
      <div className="w-full h-dvh">{await renderCanvas()}</div>
    </Navigation>
  );
}
