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
import { EN117Building } from "@/components/models/en117/building/En117Building";
import { Metadata } from "next/types";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `${params.slug.toUpperCase()}`,
  };
}

export default async function Building({
  params,
}: {
  params: { slug: string };
}) {
  const renderCanvas = async () => {
    try {
      const BuildingComponent = (
        await import(
          `../../../components/models/${params.slug.toLowerCase()}/building/${params.slug.toLowerCase()}-building`
        )
      ).default;

      return (
        <CanvasScreen
          model={<BuildingComponent castShadow receiveShadow isManage={false}/>}
          cameraPosition={[0, 30, 45]}
          controlSettings={{
            minPolarAngle: 0,
            maxPolarAngle: Math.PI / 2.25,
            minDistance: 30,
            maxDistance: 130,
            enablePan: true,
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
