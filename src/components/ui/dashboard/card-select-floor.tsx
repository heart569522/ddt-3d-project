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
import { getBuildingStore } from "@/stores/get-building-store";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  building: string;
}

export default function CardSelectFloor({ building }: Props) {
  const [floors, setFloors] = useState<string[]>([]);
  const buildingStore  = getBuildingStore(building);

  const select = buildingStore?.select || null;
  const setSelect = buildingStore?.setSelect || null;

  useEffect(() => {
    const loadFloors = async () => {
      try {
        const buildingModule = await import(
          `@/components/models/${building.toLowerCase()}/building/${building.toLowerCase()}-building`
        );
        setFloors(buildingModule[`${building.toLowerCase()}Floors`]);
      } catch (error) {
        console.error("Error loading floors:", error);
        notFound();
      }
    };

    loadFloors();
  }, [building]);

  return (
    <Card className="max-w-80 xl:max-w-full bg-background/60">
      <CardHeader className="flex flex-row justify-between gap-1">
        <CardTitle className="text-base md:text-lg">Select Floor</CardTitle>
        {select && (
          <span
            className={cn(
              "text-sm opacity-70 cursor-pointer hover:underline hover:opacity-100"
            )}
            onClick={() => setSelect?.(null)}
          >
            reset
          </span>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 items-center gap-1">
          {floors.map((floor) => (
            <Button
              key={floor}
              variant={select === floor ? "default" : "outline"}
              onClick={() => setSelect?.(floor as any)}
              className={cn(
                "w-full h-8",
                select === floor ? "bg-primary/80" : "bg-background/80"
              )}
            >
              <span className="text-sm">
                {"Floor " + floor.substring(5, 7)}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-primary/80"
          onClick={() => window.open(`/floor/${select}`, "_blank")}
          disabled={!select}
        >
          {select ? `View Floor ${select.substring(5, 7)}` : "Select floor..."}
        </Button>
      </CardFooter>
    </Card>
  );
}
