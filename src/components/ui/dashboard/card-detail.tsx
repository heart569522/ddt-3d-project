"use client";
import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/shadcn-ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/shadcn-ui/table";
import { configs } from "@/lib/configs";
import useFacultyStore from "@/stores/use-faculty-store";
import { IBuilding, IElectricTodayUsage } from "@/types/model";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  buildingData: IBuilding[] | undefined;
  electricUsageData: IElectricTodayUsage[] | undefined;
};

export default function CardDetail({ buildingData, electricUsageData }: Props) {
  const { select } = useFacultyStore((state) => state);
  const [data, setData] = useState<any>(null);
  const [disableButton, setDisableButton] = useState<boolean>(true);

  const mapTableDetails = () => {
    const tableDetail = {
      buildingCode: select?.toUpperCase(),
      buildingName: buildingData?.find((building) => building.bu_id === select)
        ?.bu_name,
      meters: [] as { meterID: string; useRateToday: string }[],
      totalEnergyConsumption: "",
    };

    const filteredData =
      electricUsageData?.filter(
        (item) => item.fl_id.substring(0, 5) === select
      ) || [];

    let totalEnergyConsumption = 0;
    filteredData.forEach((meter) => {
      tableDetail.meters.push({
        meterID: `Meter ${meter.meter_id}`,
        useRateToday: `${meter.UseRateToday.toFixed(2).toLocaleString()} kWh`,
      });
      totalEnergyConsumption += meter.UseRateToday;
    });

    tableDetail.totalEnergyConsumption = `${totalEnergyConsumption
      .toFixed(2)
      .toLocaleString()} kWh`;
    setData(tableDetail);
  };

  useEffect(() => {
    if (select) {
      mapTableDetails();
      handleCheckActiveBuilding();
    } else {
      setData(null);
    }
  }, [select]);

  const handleCheckActiveBuilding = () => {
    // console.log(select);

    const isBuidingActive =
      configs.building[select?.toLowerCase() as string]?.active;
    if (isBuidingActive) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  return (
    <Card className="max-w-80 xl:max-w-full bg-background/60">
      <CardHeader>
        <CardTitle className="text-base md:text-lg">
          Building Infomation
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data ? (
          <Table className="rounded-lg border-none bg-secondary/80">
            <TableBody>
              <TableRow>
                <TableCell className="p-2">Building Code</TableCell>
                <TableCell className="p-2">
                  {data.buildingCode || "-"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="p-2">Building Name</TableCell>
                <TableCell className="p-2">
                  {data.buildingName || "-"}
                </TableCell>
              </TableRow>
              {data.meters.map((meter: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="p-2">{meter.meterID}</TableCell>
                  <TableCell className="p-2">
                    {meter.useRateToday || "-"}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>Total Energy Consumption</TableCell>
                <TableCell className="p-2">
                  {data.totalEnergyConsumption || "-"}
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2} className="p-2">
                  <Button
                    className="w-full"
                    onClick={() => window.open(`/building/${select}`)}
                    disabled={disableButton}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <p className="text-center text-gray-500">Select some building.</p>
        )}
      </CardContent>
    </Card>
  );
}
