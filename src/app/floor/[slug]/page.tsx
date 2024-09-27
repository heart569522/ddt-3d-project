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
import { formatElectricTodayUsage } from "@/lib/formats";
import { Droplets, MapPin, Thermometer } from "lucide-react";
import { IconFaceMask } from "@tabler/icons-react";
import TooltipHover from "@/components/ui/tooltip-hover";
import Link from "next/link";
import EnvironmentInfoChart from "@/components/ui/dashboard/environment-info-chart";
import CanvasScreen from "@/components/ui/canvas-screen/canvas";
import { Metadata } from "next/types";
import { notFound } from "next/navigation";

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
            />
          }
          cameraPosition={[-5, 6, 12]}
          controlSettings={{
            minPolarAngle: 0,
            maxPolarAngle: Math.PI / 2.25,
            minDistance: 20,
            maxDistance: 65,
            enablePan: false,
          }}
        />
      );
    } catch (error) {
      notFound();
    }
  };

  const avgEnvironment = await getAverageEnvironment();
  const avgElectricUsage = await getDashboardData(
    `UseRateBuildingPerMonth/${params.slug.toLowerCase()}`
  );
  const electricUsage = await getData("UseRateToday");
  const electricUsageData = formatElectricTodayUsage(electricUsage);

  return (
    <Navigation
      leftDashbaord={
        <>
          <CardInfo
            title="General Information"
            detail={`Building: ${params.slug.toUpperCase()} Information`}
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
    >
      <div className="w-full h-dvh">{await renderCanvas()}</div>
    </Navigation>
  );
}
