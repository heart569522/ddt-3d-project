"use client";
import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { configs } from "@/lib/configs";
import { cn } from "@/lib/utils";
import { getFloorStore } from "@/stores/get-floor-store";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  room: string;
}

export default function CardSelectRoom({ room }: Props) {
  const [rooms, setRooms] = useState<string[]>([]);
  const { select, setSelect } = getFloorStore(room);
  const [disableButton, setDisableButton] = useState<boolean>(true);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const roomModule = await import(
          `@/components/models/${room
            .toLowerCase()
            .substring(0, 5)}/floor-room/${room.toLowerCase()}-floor`
        );
        setRooms(
          roomModule[
            `${room.toLowerCase().substring(0, 5)}Floors${room
              .toLowerCase()
              .substring(5, 7)}`
          ]
        );
      } catch (error) {
        console.error("Error loading floors:", error);
        // notFound();
      }
    };

    loadRooms();
  }, [room]);

  useEffect(() => {
    const handleCheckActiveRoom = () => {
      if (select) {
        const isRoomActive =
          configs.building?.[select?.substring(0, 5).toLowerCase() as string]
            ?.floor?.[select?.substring(0, 7).toLowerCase() as string]?.room?.[
            select?.toLowerCase() as string
          ]?.active ?? false;
        if (isRoomActive) {
          setDisableButton(false);
        } else {
          setDisableButton(true);
        }
      }
    };

    handleCheckActiveRoom();
  }, [select]);

  return (
    <Card className="max-w-80 xl:max-w-full bg-background/60">
      <CardHeader className="flex flex-row justify-between gap-1">
        <CardTitle className="text-base md:text-lg">Select Room</CardTitle>
        {select && (
          <span
            className={cn(
              "text-sm opacity-70 cursor-pointer hover:underline hover:opacity-100"
            )}
            onClick={() => setSelect(null)}
          >
            reset
          </span>
        )}
      </CardHeader>
      <CardContent className="max-h-48 overflow-y-scroll custom-scrollbar">
        <div className="grid grid-cols-3 items-center gap-1">
          {rooms?.map((room) => (
            <Button
              key={room}
              variant={select === room ? "default" : "outline"}
              onClick={() => setSelect(room as any)}
              className={cn(
                "w-full h-8",
                select === room ? "bg-primary/80" : "bg-background/80"
              )}
            >
              <span className="text-sm">{"Room " + room.substring(6, 9)}</span>
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-4">
        <Button
          className="w-full bg-primary/80"
          onClick={() => window.open(`/room/${select}`)}
          disabled={!select || disableButton}
        >
          {select ? `View Room ${select.substring(7, 9)}` : "Select room..."}
        </Button>
      </CardFooter>
    </Card>
  );
}
