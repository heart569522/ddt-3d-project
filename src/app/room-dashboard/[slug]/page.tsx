import { getData } from "@/actions/actions";
import { Badge } from "@/components/shadcn-ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn-ui/table";
import CardEnvironmentElectric from "@/components/ui/dashboard/card-env-elec";
import CardSensorUseHour from "@/components/ui/dashboard/card-sensor-use-hour";
import Navigation from "@/components/ui/navigation";
import TitleHeader from "@/components/ui/title-header";
import { formatMinutesToHours } from "@/lib/formats";
import { cn } from "@/lib/utils";
import { IFloorRoomUseHour } from "@/types/model";
import { IconFaceMask } from "@tabler/icons-react";
import {
  Cctv,
  Droplets,
  Thermometer,
  ThermometerSun,
  UserRound,
  Users,
  Zap,
} from "lucide-react";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `Dashboard ${params.slug}`,
  };
}

interface IAirStatusLightSwitch {
  Sensor: string;
  Status: string;
}

interface IAirUseHour {
  room: string;
  sensor: string;
  TotalMinutes: number;
}

interface IGaugeRoom {
  [key: string]: {
    averagePM25: number;
    averageTemp: number;
    averageHumidity: number;
    cctv_data: number;
  };
}

export interface ISensorUseHour {
  room: string;
  sensor: string;
  energy: number;
}

export default async function RoomDashboard({
  params,
}: {
  params: { slug: string };
}) {
  const roomId = params.slug;
  const lightSwitch: IAirStatusLightSwitch[] = await getData(
    `switchstatus/${roomId}`
  );
  const airStatus: IAirStatusLightSwitch[] = await getData(
    `airstatus/${roomId}`
  );
  const airUseHour: IAirUseHour[] = await getData(`AirconUseHour/${roomId}`);
  const gaugeRoom: IGaugeRoom = await getData(`gaugeRoom/${roomId}`);
  const roomUseHour: IFloorRoomUseHour = await getData(`RoomUseHour/${roomId}`);
  const sensorUseHour: ISensorUseHour[] = await getData(
    `SensorUseHour/${roomId}`
  );

  const formatAirStatus = airStatus.map((status) => {
    const matchingUseHour = airUseHour.find(
      (hour) => hour.sensor === status.Sensor
    );
    return {
      Sensor: status.Sensor,
      Status: status.Status,
      TotalMinutes: matchingUseHour ? matchingUseHour.TotalMinutes : 0, // ถ้าไม่พบก็ให้ค่าเป็น 0
    };
  });

  return (
    <Navigation isHideToolbar={true} isHideDashbaord={true}>
      <div className="pt-20 mx-6 md:mx-10 md:pt-24">
        <TitleHeader title={`Dashboard`} className="mb-4" type="static" />
        <div className="space-y-2 md:space-y-4">
          <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            <Card className="col-span-4 sm:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl text-foreground/70">
                  Room
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Card className="transition bg-secondary/60 hover:bg-secondary/30">
                  <CardHeader className="flex flex-row justify-center items-end gap-2">
                    <p className="text-2xl md:text-3xl font-semibold">
                      {roomId}
                    </p>
                  </CardHeader>
                </Card>
              </CardContent>
            </Card>
            <Card className="col-span-4 sm:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl text-foreground/70">
                  CCTV
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Card className="transition bg-secondary/60 hover:bg-secondary/30">
                  <CardHeader className="flex flex-row-reverse justify-center items-start gap-4">
                    <p className="text-2xl md:text-3xl font-semibold text-center">
                      {gaugeRoom?.[roomId].cctv_data || "-"}&nbsp;
                      <span className="font-semibold text-sm md:text-base text-foreground/70">
                        People
                      </span>
                    </p>
                    <Users />
                  </CardHeader>
                </Card>
              </CardContent>
            </Card>
            <Card className="col-span-4 sm:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl text-foreground/70">
                  Climate Current
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <Card className="col-span-1 transition bg-secondary/60 hover:bg-secondary/30">
                  <CardHeader className="block">
                    <div className="flex flex-row justify-center items-center gap-4">
                      <ThermometerSun />
                      <p className="text-2xl md:text-3xl font-semibold text-center">
                        {gaugeRoom?.[roomId].averageTemp || "-"}&nbsp;
                        <span className="font-semibold text-sm md:text-base align-super">
                          °C
                        </span>
                      </p>
                    </div>
                    <p className="text-base text-center text-foreground/90">
                      Temperature
                    </p>
                  </CardHeader>
                </Card>
                <Card className="col-span-1 transition bg-secondary/60 hover:bg-secondary/30">
                  <CardHeader className="block">
                    <div className="flex flex-row justify-center items-center gap-4">
                      <Droplets />
                      <p className="text-2xl md:text-3xl font-semibold text-center">
                        {gaugeRoom?.[roomId].averageHumidity || "-"}&nbsp;
                        <span className="font-semibold text-sm md:text-base">
                          %
                        </span>
                      </p>
                    </div>
                    <p className="text-base text-center text-foreground/90">
                      Humidity
                    </p>
                  </CardHeader>
                </Card>
                <Card className="col-span-1 transition bg-secondary/60 hover:bg-secondary/30">
                  <CardHeader className="block">
                    <div className="flex flex-row justify-center items-center gap-4">
                      <IconFaceMask />
                      <p className="text-2xl md:text-3xl font-semibold text-center">
                        {gaugeRoom?.[roomId].averagePM25 || "-"}&nbsp;
                        <span className="font-semibold text-sm md:text-base">
                          ug/m3
                        </span>
                      </p>
                    </div>
                    <p className="text-base text-center text-foreground/90">
                      PM 2.5
                    </p>
                  </CardHeader>
                </Card>
              </CardContent>
            </Card>
            <Card className="col-span-4 sm:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl text-foreground/70">
                  Using Room Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-evenly items-center">
                  <p className="text-lg font-semibold">
                    Open: {roomUseHour?.MinOpen || "-"}
                  </p>
                  <p className="text-lg font-semibold">
                    Close: {roomUseHour?.MaxClose || "-"}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="">
                    Open: {roomUseHour?.TotalMinutes || "0"} minutes
                  </p>
                  <p className="">
                    Open (No People): {roomUseHour?.noPeopleMinutes || "0"}{" "}
                    minutes
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-4 sm:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl text-foreground/70">
                  Light Switch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="h-8">Sensor</TableHead>
                      <TableHead className="h-8">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lightSwitch.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell className="py-2">{item.Sensor}</TableCell>
                        <TableCell className="py-2">
                          <Badge
                            className={cn(
                              "px-4 rounded-sm ",
                              item.Status === "Open"
                                ? "bg-amber-500 hover:bg-amber-600"
                                : "bg-zinc-300 hover:bg-zinc-300 text-zinc-500 dark:text-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-700"
                            )}
                          >
                            {item.Status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {lightSwitch.length === 0 && (
                      <TableRow>
                        <TableCell
                          className="py-2 text-center opacity-50"
                          colSpan={2}
                        >
                          No Data
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="col-span-4 sm:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl text-foreground/70">
                  Air Conditioner Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="h-8">Sensor</TableHead>
                      <TableHead className="h-8">Current Status</TableHead>
                      <TableHead className="h-8">
                        Time since installation (Hrs)
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formatAirStatus.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell className="py-2">{item.Sensor}</TableCell>
                        <TableCell className="py-2">
                          <Badge
                            className={cn(
                              "px-4 rounded-sm bg-blue-500 hover:bg-blue-600",
                              item.Status === "On"
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-zinc-300 hover:bg-zinc-300 text-zinc-500 dark:text-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-700"
                            )}
                          >
                            {item.Status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2">
                          {formatMinutesToHours(item.TotalMinutes, "en")}
                        </TableCell>
                      </TableRow>
                    ))}
                    {formatAirStatus.length === 0 && (
                      <TableRow>
                        <TableCell
                          className="py-2 text-center opacity-50"
                          colSpan={3}
                        >
                          No Data
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <CardSensorUseHour
              totalUseHour={roomUseHour?.UseRateRoom || "0"}
              sensorUseHour={sensorUseHour}
            />
            <CardEnvironmentElectric roomId={roomId} />
          </div>
        </div>
      </div>
    </Navigation>
  );
}
