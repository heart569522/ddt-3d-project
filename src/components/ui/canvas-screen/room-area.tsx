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
    isFloorPage: boolean;
    isRoomPage: boolean;
    isFloorColorChange: boolean;
  }> | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([0, 0, 0]);
  const [airCount, setAirCount] = useState<number>(0);
  const [lampCount, setLampCount] = useState<number>(0);

  const getRoomConfig = (roomKey: string) => {
    const room =
      configs.building[buildingId?.toLowerCase() as string]?.floor?.[
        floorId?.toLowerCase() as string
      ]?.room?.[roomKey] || null;
    return {
      cameraPosition: room?.cameraPosition || [0, 0, 0],
      airCount: room?.airCount || 0,
      lampCount: room?.lampCount || 0,
    };
  };

  useEffect(() => {
    const roomKey =
      selectRoom?.includes("A") || selectRoom?.includes("L")
        ? selectRoom?.substring(0, 9).toLowerCase()
        : selectRoom?.toLowerCase();
    const roomConfig = getRoomConfig(roomKey as string);

    setCameraPosition(roomConfig.cameraPosition);
    setAirCount(roomConfig.airCount);
    setLampCount(roomConfig.lampCount);
  }, [selectRoom]);

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
      window.open(`/admin/management/rooms/add?roomid=${selectRoom}`, "_blank");
    } else if (roomlist[0].rm_id == selectRoom?.toUpperCase()) {
      window.open(
        `/admin/management/rooms/edit/${selectRoom?.toUpperCase()}`,
        "_blank"
      );
    }
  };

  const handleClickManageAir = async (airNumber: number) => {
    const airList = await getData(`getAircon`);

    const airId =
      airNumber < 10
        ? `${selectRoom?.split("-")[0]?.toUpperCase()}-A0${airNumber}`
        : `${selectRoom?.split("-")[0]?.toUpperCase()}-A${airNumber}`;

    const airData = airList.find((item: any) => item.a_id === airId);

    if (airData) {
      window.open(
        `/admin/management/air-conditioners/edit/${selectRoom
          ?.split("-")[0]
          ?.toUpperCase()}/${airData.a_id}`,
        "_blank"
      );
    } else {
      window.open(
        `/admin/management/air-conditioners/add?roomid=${selectRoom}`,
        "_blank"
      );
    }
  };

  const handleClickManageLamp = async (lampNumber: number) => {
    const lampId =
      lampNumber < 10
        ? `${selectRoom?.split("-")[0]?.toUpperCase()}-L0${lampNumber}`
        : `${selectRoom?.split("-")[0]?.toUpperCase()}-L${lampNumber}`;

    const lampData = await getData(`getLampById/${lampId}`);
    if (lampData) {
      window.open(
        `/admin/management/lamp-plug/edit/${selectRoom
          ?.split("-")[0]
          ?.toUpperCase()}/${lampData.l_id}`,
        "_blank"
      );
    } else {
      window.open(
        `/admin/management/lamp-plug/add?roomid=${selectRoom}`,
        "_blank"
      );
    }
  };

  return (
    <>
      {RoomComponent ? (
        <>
          <div className="absolute left-0 z-10 px-3 py-2 bg-background/50 rounded-sm m-1 font-semibold bg text-xl">
            ห้อง {selectRoom?.substring(6, 9)}
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
                  isFloorPage={false}
                  isRoomPage={true}
                  isFloorColorChange={true}
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
                className="rounded-sm bg-background/50 ring-0 outline-none w-40"
              >
                จัดการห้อง
              </Button>
              {airCount > 0 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size={"sm"}
                      className="rounded-sm bg-background/50 ring-0 outline-none w-40"
                    >
                      จัดการเครื่องปรับอากาศ
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
                        onMouseOver={() =>
                          setSelectRoom(
                            `${selectRoom?.split("-")[0]?.toUpperCase()}-A${
                              index + 1 < 10 ? `0${index + 1}` : index + 1
                            }`
                          )
                        }
                        onMouseOut={() =>
                          setSelectRoom(
                            `${selectRoom?.split("-")[0]?.toUpperCase()}`
                          )
                        }
                      >
                        {`หมายเลข ${index + 1}`}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  size={"sm"}
                  onClick={() => handleClickManageAir(0)}
                  className="rounded-sm bg-background/50 ring-0 outline-none w-40"
                >
                  จัดการเครื่องปรับอากาศ
                </Button>
              )}
              {lampCount > 0 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size={"sm"}
                      className="rounded-sm bg-background/50 ring-0 outline-none w-40"
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
                        onMouseOver={() =>
                          setSelectRoom(
                            `${selectRoom?.split("-")[0]?.toUpperCase()}-L${
                              index + 1 < 10 ? `0${index + 1}` : index + 1
                            }`
                          )
                        }
                        onMouseOut={() =>
                          setSelectRoom(
                            `${selectRoom?.split("-")[0]?.toUpperCase()}`
                          )
                        }
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
                  className="rounded-sm bg-background/50 ring-0 outline-none w-40"
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
