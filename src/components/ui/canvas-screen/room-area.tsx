"use client";
import { Button } from "@/components/shadcn-ui/button";
import { getBuildingStore } from "@/stores/get-building-store";
import { X } from "lucide-react";
import React, { ComponentType, useEffect, useState } from "react";
import CanvasScreen from "./canvas";
import { configs } from "@/lib/configs";
import { getFloorStore } from "@/stores/get-floor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu";
import { getData } from "@/actions/actions";
import { useRouter } from "next/navigation";

interface Props {
  buildingId: string | null;
  floorId: string | null;
  // onSelectFloor: (floor: string | null) => void;
}

export default function RoomArea({ buildingId, floorId }: Props) {
  const floorStore = getFloorStore(floorId as string);
  const selectRoom = floorStore?.select || null;
  const setSelectRoom = floorStore?.setSelect || null;

  const [RoomComponent, setRoomComponent] = useState<ComponentType<{
    isManage: boolean;
    isShowLamp: boolean;
    isShowAir: boolean;
  }> | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const cameraPosition = configs.building[buildingId?.toLowerCase() as string]
    ?.floor?.[floorId?.toLowerCase() as string]?.room?.[
    selectRoom?.toLowerCase() as string
  ]?.cameraPosition || [0, 0, 0];

  const airCount =
    configs.building[buildingId?.toLowerCase() as string]?.floor?.[
      floorId?.toLowerCase() as string
    ]?.room?.[selectRoom?.toLowerCase() as string]?.airCount || 0;

  const lampCount =
    configs.building[buildingId?.toLowerCase() as string]?.floor?.[
      floorId?.toLowerCase() as string
    ]?.room?.[selectRoom?.toLowerCase() as string]?.lampCount || 0;

  useEffect(() => {
    const loadRoomComponent = async () => {
      if (selectRoom) {
        try {
          const component = (
            await import(
              `../../../components/models/${buildingId?.toLowerCase()}/floor-room/${floorId?.toLowerCase()}-floor`
            )
          ).default;
          setRoomComponent(() => component);
        } catch (error) {
          console.error("Failed to load room component:", error);
          setErrorMessage(`Model ${selectRoom} not avaliable.`);
          setRoomComponent(null);
        }
      } else {
        setErrorMessage(null);
      }
    };

    loadRoomComponent();
  }, [selectRoom]);

  const handleClickManageRoom = async () => {
    const roomlist = await getData(`getRoomById/${selectRoom}`);

    if (roomlist[0].rm_id === null) {
      window.location.href = `/admin/management/rooms/add?roomid=${selectRoom}`;
    } else if (roomlist[0].rm_id == selectRoom?.toUpperCase()) {
      window.location.href = `/admin/management/rooms/edit/${selectRoom?.toUpperCase()}`;
    }
  };

  const handleClickManageAir = async (airNumber: number) => {
    const airList = await getData(`getAircon`);

    const airData = airList.find(
      (item: any) => (item.a_id = `${selectRoom?.toUpperCase()}A0${airNumber}`)
    );

    if (airData) {
      window.location.href = `/admin/management/air-conditioners/edit/${selectRoom?.toUpperCase()}/${
        airData.a_id
      }`;
    } else {
      window.location.href = `/admin/management/air-conditioners/add?roomid=${selectRoom}`;
    }
  };

  const handleClickManageLamp = async (lampNumber: number) => {
    const lampData = await getData(
      `getLampById/${selectRoom?.toUpperCase()}L0${lampNumber}`
    );

    if (lampData) {
      window.location.href = `/admin/management/lamp-plug/edit/${selectRoom?.toUpperCase()}/${
        lampData.l_id
      }`;
    } else {
      window.location.href = `/admin/management/lamp-plug/add?roomid=${selectRoom}`;
    }
  };

  return (
    <>
      {RoomComponent ? (
        <>
          <div className="absolute left-0 z-10 px-3 py-2 bg-background/50 rounded-sm m-1 font-semibold bg text-xl">
            ห้อง {selectRoom?.slice(-3)}
          </div>
          <Button
            size={"icon"}
            onClick={() => {
              setRoomComponent(null), setSelectRoom(null);
            }}
            className="size-7 absolute right-0 z-10 bg-destructive/50 hover:bg-destructive/80 m-1"
          >
            <X className="size-5" />
          </Button>
          <CanvasScreen
            model={
              RoomComponent ? (
                <RoomComponent
                  isManage={true}
                  isShowLamp={true}
                  isShowAir={true}
                />
              ) : null
            }
            cameraPosition={cameraPosition}
            controlSettings={{
              minPolarAngle: 0,
              maxPolarAngle: 0,
              minDistance: 10,
              maxDistance: 13,
              enablePan: false,
            }}
            outlineResolution={0.5}
            outlineStrength={15}
            floorId={floorId as string}
            isRoomPage={true}
          />
          <div className="absolute left-0 bottom-0 z-10 m-1">
            <div className="flex flex-col items-start gap-1">
              <Button
                size={"sm"}
                onClick={handleClickManageRoom}
                className="rounded-sm bg-background/50 ring-0 outline-none w-28"
              >
                จัดการห้อง
              </Button>
              {airCount > 0 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size={"sm"}
                      className="rounded-sm bg-background/50 ring-0 outline-none w-28"
                    >
                      จัดการแอร์
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="right"
                    className="bg-background/50 outline-none min-w-20"
                  >
                    {Array.from({ length: airCount }, (_, index) => (
                      <DropdownMenuItem
                        key={index + 1}
                        onClick={() => handleClickManageAir(index + 1)}
                      >
                        {`แอร์ ${index + 1}`}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  size={"sm"}
                  onClick={() => handleClickManageAir(0)}
                  className="rounded-sm bg-background/50 ring-0 outline-none w-28"
                >
                  จัดการแอร์
                </Button>
              )}
              {lampCount > 0 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size={"sm"}
                      className="rounded-sm bg-background/50 ring-0 outline-none w-28"
                    >
                      จัดการโคมไฟ
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="right"
                    className="bg-background/50 outline-none min-w-20"
                  >
                    {Array.from({ length: lampCount }, (_, index) => (
                      <DropdownMenuItem
                        key={index + 1}
                        onClick={() => handleClickManageLamp(index + 1)}
                      >
                        {`โคมไฟ ${index + 1}`}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  size={"sm"}
                  onClick={() => handleClickManageLamp(0)}
                  className="rounded-sm bg-background/50 ring-0 outline-none w-28"
                >
                  จัดการโคมไฟ
                </Button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-lg font-semibold opacity-80">
            {selectRoom ? errorMessage : null}
          </p>
        </div>
      )}
    </>
  );
}
