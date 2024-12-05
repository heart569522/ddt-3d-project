"use client";
import { Button } from "@/components/shadcn-ui/button";
import { getBuildingStore } from "@/stores/get-building-store";
import { X } from "lucide-react";
import React, { ComponentType, useEffect, useState } from "react";
import CanvasScreen from "./canvas";

interface Props {
  buildingId: string | null;
  onSelectFloor: (floor: string | null) => void;
}

export default function FloorArea({ buildingId, onSelectFloor }: Props) {
  const buildingStore = getBuildingStore(buildingId as string);
  const selectFloor = buildingStore?.select || null;
  const setSelectFloor = buildingStore?.setSelect || null;

  const [FloorComponent, setFloorComponent] = useState<ComponentType<{
    isManage: boolean;
  }> | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadFloorComponent = async () => {
      if (selectFloor) {
        try {
          const component = (
            await import(
              `../../../components/models/${buildingId?.toLowerCase()}/floor-room/${selectFloor?.toLowerCase()}-floor`
            )
          ).default;
          setFloorComponent(() => component);
        } catch (error) {
          console.error("Failed to load floor component:", error);
          setErrorMessage(`Model ${selectFloor} not avaliable.`);
          setFloorComponent(null);
        }
      } else {
        setErrorMessage(null);
      }
    };

    loadFloorComponent();
  }, [selectFloor]);

  useEffect(() => {
    onSelectFloor(selectFloor);
  }, [selectFloor]);

  return (
    <>
      {FloorComponent ? (
        <>
          <div className="absolute left-0 z-10 px-3 py-2 bg-background/50 rounded-sm m-1 font-semibold bg text-xl">
            ชั้น {selectFloor?.slice(-1)}
          </div>
          <Button
            size={"icon"}
            onClick={() => {
              setFloorComponent(null), setSelectFloor(null);
            }}
            className="size-7 absolute right-0 z-10 bg-destructive/50 hover:bg-destructive/80 m-1"
          >
            <X className="size-5" />
          </Button>
          <CanvasScreen
            model={FloorComponent ? <FloorComponent isManage={true} /> : null}
            cameraPosition={[-5, 25, 12]}
            controlSettings={{
              minPolarAngle: 0,
              maxPolarAngle: Math.PI / 4,
              minDistance: 20,
              maxDistance: 50,
              enablePan: true,
            }}
          />
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-lg font-semibold opacity-80">
            {selectFloor ? errorMessage : null}
          </p>
        </div>
      )}
    </>
  );
}
