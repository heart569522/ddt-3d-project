"use client";
import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { cn } from "@/lib/utils";
import { getFloorStore } from "@/stores/get-floor-store";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  room: string;
}

type Items = {
  title: string;
  value: string;
};

export default function CardSelectInRoom({ room }: Props) {
  const floorId = room.toLowerCase().substring(0, 7);

  const [airs, setAirs] = useState<string[]>([]);
  const [lights, setLights] = useState<string[]>([]);
  const [items, setItems] = useState<Items[]>([]);
  const { select, setSelect } = getFloorStore(floorId.toUpperCase());

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const roomModule = await import(
          `@/components/models/${floorId.substring(
            0,
            5
          )}/floor-room/${floorId.toLowerCase()}-floor`
        );
        setAirs(roomModule[`${floorId}Air`]);
        setLights(roomModule[`${floorId}Light`]);
      } catch (error) {
        console.error("Error loading floors:", error);
        notFound();
      }
    };

    loadRooms();
  }, [room]);

  useEffect(() => {
    const formatItems = () => {
      const filteredAirs = airs
        .filter((air) => air.startsWith(room))
        .map((air) => ({
          title: `Air ${air.split("-A")[1]}`,
          value: air,
        }));

      const filteredLights = lights
        .filter((light) => light.startsWith(room))
        .map((light) => ({
          title: `Light ${light.split("-L")[1]}`,
          value: light,
        }));

      const baseRoom = {
        title: "Room",
        value: room,
      };

      setItems([baseRoom, ...filteredAirs, ...filteredLights]);
    };

    formatItems();
  }, [airs, lights, room]);

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
      <CardContent className="max-h-56 overflow-y-scroll custom-scrollbar">
        <div className="grid grid-cols-3 items-center gap-1">
          {items.map((item) => (
            <Button
              key={item.value}
              variant={select === item.value ? "default" : "outline"}
              onClick={() => setSelect(item.value as any)}
              className={cn(
                "w-full h-8",
                select === item.value ? "bg-primary/80" : "bg-background/80"
              )}
            >
              <span className="text-sm">{item.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
