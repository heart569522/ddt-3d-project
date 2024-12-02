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
  ElectricFloorRoomChart,
} from "@/components/ui/dashboard/electric-chart";
import { EnvironmentAverage } from "@/components/ui/dashboard/environment-chart";
import Navigation from "@/components/ui/navigation";
import {
  formatFacultyElectricTodayUsage,
  formatRoomElectricTodayUsage,
} from "@/lib/formats";
import {
  Droplets,
  LayoutDashboard,
  MapPin,
  Thermometer,
  UndoDot,
} from "lucide-react";
import { IconFaceMask } from "@tabler/icons-react";
import TooltipHover from "@/components/ui/tooltip-hover";
import Link from "next/link";
import EnvironmentInfoChart from "@/components/ui/dashboard/environment-info-chart";
import CanvasScreen from "@/components/ui/canvas-screen/canvas";
import { Metadata } from "next";
import EN12408Floor from "@/components/models/en124/floor-room/en12408-floor";
import { notFound } from "next/navigation";
import CardSelectRoom from "@/components/ui/dashboard/card-select-room";
import { configs } from "@/lib/configs";
import CardSelectInRoom from "@/components/ui/dashboard/card-select-in-room";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `${params.slug.toUpperCase()}`,
  };
}

export default async function Room({ params }: { params: { slug: string } }) {
  const buildingId = params.slug.toLowerCase().substring(0, 5);
  const floorId = params.slug.toLowerCase().substring(0, 7);
  const roomId = params.slug.toLowerCase();

  const avgEnvironment = await getData(`gaugeRoom/${roomId.toUpperCase()}`);
  const avgElectricUsage = await getDashboardData(
    `UseRateRoomPerMonth/${roomId}`
  );
  const electricUsage = await getData(`RoomUseHour/${roomId}`);
  const electricUsageData = formatRoomElectricTodayUsage(electricUsage);
  const pmTempHmdData = await getData(`RhtpmPerMonth/${roomId}`);
  const roomDetail = await getData(`floorDetail/${roomId.toUpperCase()}`);

  const getCameraPosition = async () => {
    return (
      configs.building[buildingId]?.floor?.[floorId]?.room?.[roomId]
        ?.cameraPosition || [0, 0, 0]
    );
  };

  const renderCanvas = async () => {
    try {
      const RoomFloorComponent = (
        await import(
          `../../../components/models/${buildingId}/floor-room/${floorId}-floor`
        )
      ).default;

      return (
        <CanvasScreen
          model={
            <RoomFloorComponent
              castShadow
              receiveShadow
              isShowLamp={true}
              isShowAir={true}
              isManage={false}
              isRoomPage={true}
              roomData={roomDetail}
              pathname={floorId}
            />
          }
          cameraPosition={await getCameraPosition()}
          controlSettings={{
            minPolarAngle: 0,
            maxPolarAngle: 0,
            minDistance: 10,
            maxDistance: 12,
            enablePan: false,
          }}
          outlineResolution={0.5}
          outlineStrength={15}
          floorId={floorId}
          isRoomPage={true}
        />
      );
    } catch (error) {
      notFound();
    }
  };

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
            data={avgEnvironment?.[`${params.slug.toUpperCase()}`]}
          />
          <EnvironmentInfoChart data={pmTempHmdData} />
        </>
      }
      rightDashbaord={
        <div className="flex flex-col gap-2">
          <div className="hidden xl:block">
            <CardSelectInRoom room={params.slug.toUpperCase()} />
          </div>
          <ElectricFloorRoomChart
            data={electricUsageData?.[`${params.slug.toUpperCase()}`]}
            roomId={params.slug.toUpperCase()}
          />
          <AverageElectricUsage data={avgElectricUsage} isFloorRoom={true} />
        </div>
      }
      toolbar={
        <>
          <TooltipHover
            content={"Dashboard"}
            position={"top"}
            isUseMediaQuery={true}
            mediaQuerySize="md"
            positionMediaQuery="right"
          >
            <Link href={`/room-dashboard/${roomId.toUpperCase()}`} target="_blank">
              <Button variant="outline" className="bg-background/80" size="icon">
                <LayoutDashboard className="h-5 w-5" />
              </Button>
            </Link>
          </TooltipHover>
        </>
      }
      useCardSelectFloorRoom={false}
    >
      <div className="w-full h-dvh">{await renderCanvas()}</div>
    </Navigation>
  );
}
