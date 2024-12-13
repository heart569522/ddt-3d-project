import {
  getDashboardData,
  getData,
} from "@/actions/actions";
import CardInfo from "@/components/ui/dashboard/card-info";
import {
  AverageElectricUsage,
  ElectricChart,
} from "@/components/ui/dashboard/electric-chart";
import { EnvironmentAverage } from "@/components/ui/dashboard/environment-chart";
import Navigation from "@/components/ui/navigation";
import {
  formatBuildingElectricTodayUsage,
} from "@/lib/formats";
import EnvironmentInfoChart from "@/components/ui/dashboard/environment-info-chart";
import CanvasScreen from "@/components/ui/canvas-screen/canvas";
import { Metadata } from "next/types";
import { notFound } from "next/navigation";
import React from "react";
import CardSelectFloor from "@/components/ui/dashboard/card-select-floor";
import { configs } from "@/lib/configs";

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
  const isHaveBGMap = configs.building[params.slug.toLowerCase()]?.bgMap ?? false
  const position = configs.building[params.slug.toLowerCase()]?.camera.position
  const minDistance = configs.building[params.slug.toLowerCase()]?.camera.minDistance
  const maxDistance = configs.building[params.slug.toLowerCase()]?.camera.maxDistance
  const isFloorActive = configs.building[params.slug.toLowerCase()]?.floor ?? null

  const renderCanvas = async () => {
    try {
      const BuildingComponent = (
        await import(
          `../../../components/models/${params.slug.toLowerCase()}/building/${params.slug.toLowerCase()}-building`
        )
      ).default;

      return (
        <CanvasScreen
          antialias={true}
          model={
            <BuildingComponent isManage={false} />
          }
          cameraPosition={position || [0, 30, 45]}
          dpr={[0.5, 0.95]}
          controlSettings={{
            minPolarAngle: 0,
            maxPolarAngle: Math.PI / 2.25,
            minDistance: minDistance || 20,
            maxDistance: maxDistance || 50,
            enablePan: true,
          }}
          isUsePlane={!isHaveBGMap}
          // planeColor={Color.NAMES.darkslategray}
        />
      );
    } catch (error) {
      notFound();
    }
  };

  const avgEnvironment = await getData(
    `gaugeBuilding/${params.slug.toUpperCase()}`
  );
  const avgElectricUsage = await getDashboardData(
    `UseRateBuildingPerMonth/${params.slug.toLowerCase()}`
  );
  const electricUsage = await getData("UseRateToday");
  const electricUsageData = formatBuildingElectricTodayUsage(
    electricUsage,
    params.slug.toUpperCase()
  );
  const pmTempHmdData = await getData(
    `BhtpmPerMonth/${params.slug.toLowerCase()}`
  );

  return (
    <Navigation
      leftDashbaord={
        <>
          <CardInfo
            title="General Information"
            detail={`Building: ${params.slug.toUpperCase()} Information`}
          />
          <EnvironmentAverage
            data={avgEnvironment?.[params.slug.toUpperCase()]}
          />
          <EnvironmentInfoChart data={pmTempHmdData} />
        </>
      }
      rightDashbaord={
        <div className="flex flex-col gap-2">
          <div className="hidden xl:block">
            <CardSelectFloor building={params.slug.toUpperCase()} />
          </div>
          <ElectricChart
            data={electricUsageData}
            buildingId={params.slug.toUpperCase()}
          />
          <AverageElectricUsage data={avgElectricUsage} />
        </div>
      }
      useCardSelectBuildingFloor={true}
    >
      <div className="w-full h-dvh">{await renderCanvas()}</div>
    </Navigation>
  );
}
