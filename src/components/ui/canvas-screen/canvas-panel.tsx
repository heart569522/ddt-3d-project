"use client";
import React, { ComponentType, useEffect, useState } from "react";
import CanvasScreen from "./canvas";

import FacultyAllBuilding from "@/components/models/faculty/all";
import EN12408Floor from "@/components/models/en124/floor-room/en12408-floor";
import EN124Building from "@/components/models/en124/building/en124-building";
import useFacultyStore from "@/stores/use-faculty-store";
import { Button } from "@/components/shadcn-ui/button";
import { X } from "lucide-react";
import { getBuildingStore } from "@/stores/get-building-store";
import FloorArea from "./floor-area";
import RoomArea from "./room-area";
import { configs } from "@/lib/configs";

export default function CanvasPanel() {
  const { select: selectBuilding, setSelect: setSelectBuilding } =
    useFacultyStore((state) => state);
  console.log("🚀 ~ CanvasPanel ~ selectBuilding:", selectBuilding);

  const [BuildingComponent, setBuildingComponent] = useState<ComponentType<{
    isManage: boolean;
  }> | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);

  const isBuidingActive =
    configs.building[selectBuilding?.toLowerCase() as string]?.active;
  console.log("🚀 ~ CanvasPanel ~ isBuidingActive:", isBuidingActive);

  useEffect(() => {
    if (isBuidingActive) {
      const loadBuildingComponent = async () => {
        if (selectBuilding) {
          try {
            const component = (
              await import(
                `../../../components/models/${selectBuilding?.toLowerCase()}/building/${selectBuilding?.toLowerCase()}-building`
              )
            ).default;
            setBuildingComponent(() => component);
          } catch (error) {
            console.error("Failed to load building component:", error);
            setErrorMessage(`Model ${selectBuilding} not avaliable.`);
            setBuildingComponent(null);
          }
        } else {
          setErrorMessage(null);
        }
      };

      loadBuildingComponent();
    }
  }, [selectBuilding, isBuidingActive]);

  return (
    <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-2 h-full w-full gap-4">
      <div className="h-full relative bg-background/50">
        <div className="absolute z-10 px-3 py-2 bg-background/50 rounded-sm m-1 font-semibold bg text-xl">
          คณะ
        </div>
        <CanvasScreen
          model={<FacultyAllBuilding isManage={true} />}
          cameraPosition={[7, 13, 27]}
          dpr={[0.4, 0.75]}
          isUsePlane={false}
          controlSettings={{
            minPolarAngle: 0,
            maxPolarAngle: Math.PI / 2.25,
            maxDistance: 200,
            enablePan: true,
          }}
        />
      </div>
      <div className="h-full relative bg-background/50">
        {isBuidingActive && BuildingComponent ? (
          <>
            <div className="absolute left-0 z-10 px-3 py-2 bg-background/50 rounded-sm m-1 font-semibold bg text-xl">
              อาคาร {selectBuilding}
            </div>
            <Button
              size={"icon"}
              onClick={() => {
                setBuildingComponent(null), setSelectBuilding(null);
              }}
              className="size-7 absolute right-0 z-10 bg-destructive/50 hover:bg-destructive/80 m-1"
            >
              <X className="size-5" />
            </Button>
            <CanvasScreen
              model={
                BuildingComponent ? <BuildingComponent isManage={true} /> : null
              }
              cameraPosition={[0, 30, 45]}
              isUsePlane={false}
              controlSettings={{
                minPolarAngle: 0,
                maxPolarAngle: Math.PI / 2.25,
                minDistance: 30,
                maxDistance: 80,
                enablePan: false,
              }}
            />
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg font-semibold opacity-80">
              {selectBuilding ? errorMessage : null}
            </p>
          </div>
        )}
      </div>
      <div className="h-full relative bg-background/50">
        {selectBuilding && (
          <FloorArea
            buildingId={selectBuilding}
            onSelectFloor={setSelectedFloor}
          />
        )}
      </div>
      <div className="h-full relative bg-background/50">
        {selectBuilding && selectedFloor && (
          <RoomArea
            buildingId={selectBuilding}
            floorId={selectedFloor}
            // onSelectFloor={setSelectedFloor}
          />
        )}
      </div>
    </div>
  );
}
