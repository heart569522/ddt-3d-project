import {
  IElectric24Usage,
  IElectricTodayUsage,
  IRoomUse24,
  IFloorRoomUseHour,
} from "@/types/model";
import { configs } from "./configs";

export function formatFacultyElectricTodayUsage(data: IElectricTodayUsage[]) {
  const buildingUsageMap: { [key: string]: any } = {};
  // const abnormalThreshold = 100000;

  data?.forEach((item: IElectricTodayUsage) => {
    // if (item.UseRateToday > abnormalThreshold) return;

    const buildingNumber = item.fl_id.substring(0, 5);

    if (buildingUsageMap[buildingNumber]) {
      buildingUsageMap[buildingNumber].useToday += item.UseRateToday;
    } else {
      buildingUsageMap[buildingNumber] = {
        buildingId: buildingNumber,
        meterId: item.meter_id,
        useToday: item.UseRateToday,
        useTotal: item.TotalUseRateToday,
        fill: `var(--color-${buildingNumber})`,
      };
    }
  });

  const formatData = Object.values(buildingUsageMap)
    ?.map((item) => ({
      ...item,
      value: parseFloat(item.useToday.toFixed(configs.numberOfDecimal)),
      total: parseFloat(item.useTotal.toFixed(configs.numberOfDecimal)),
    }))
    ?.sort((a, b) => b.value - a.value);

  return formatData;
}

export function formatBuildingElectricTodayUsage(
  data: IElectricTodayUsage[],
  buildingId: string
) {
  const floorUsageMap: { [key: string]: any } = {};
  // const abnormalThreshold = 100000;

  const filteredData = data?.filter((item) =>
    item.fl_id.toUpperCase().startsWith(buildingId)
  );

  filteredData?.forEach((item: IElectricTodayUsage) => {
    // if (item.UseRateToday > abnormalThreshold) return;

    const floorNumber = `${parseInt(item.fl_id.slice(-2), 10)}-FL`;

    if (floorUsageMap[floorNumber]) {
      floorUsageMap[floorNumber].useToday += item.UseRateToday;
    } else {
      floorUsageMap[floorNumber] = {
        buildingId: floorNumber,
        meterId: item.meter_id,
        useToday: item.UseRateToday,
        useTotal: item.TotalUseRateToday,
        fill: `var(--color-${floorNumber})`,
      };
    }
  });

  const formatData = Object.values(floorUsageMap)
    ?.map((item) => ({
      ...item,
      value: parseFloat(item.useToday.toFixed(configs.numberOfDecimal)),
      total: parseFloat(item.useTotal.toFixed(configs.numberOfDecimal)),
    }))
    ?.sort((a, b) => b.value - a.value);

  return formatData;
}

export function formatFloorElectricTodayUsage(
  data: IFloorRoomUseHour[],
  floorId: string
) {
  const floorData = data?.filter((item) => item.room.startsWith(floorId));

  let totalUseRateRoom = 0;

  const formattedData = floorData
    ?.map((item) => {
      const useRateRoom = Math.abs(item.UseRateRoom);
      const roomName = useRateRoom ? item.room.substring(6, 9) : "";

      // Accumulate the total UseRateRoom
      totalUseRateRoom += useRateRoom;

      const data = {
        name: roomName,
        value: useRateRoom
          ? useRateRoom.toFixed(configs.numberOfDecimal)
          : null,
        total: "0",
        fill: useRateRoom ? `var(--color-${roomName})` : "",
      };

      return useRateRoom ? data : null;
    })
    ?.filter((item): item is NonNullable<typeof item> => item !== null);

  // Update each entry's total field with the accumulated total
  const totalAsString = totalUseRateRoom.toFixed(configs.numberOfDecimal);
  formattedData?.forEach((entry) => {
    entry.total = totalUseRateRoom ? totalAsString : "";
  });

  // console.log(
  //   "🚀 ~ formatRoomElectricTodayUsage ~ formattedData:",
  //   formattedData
  // );
  return formattedData;
}

export function formatRoomElectricTodayUsage(data: IFloorRoomUseHour[]) {
  const roomUsageMap: { [key: string]: any } = {};

  data?.forEach((item: IFloorRoomUseHour) => {
    const roomNumber = item.room;

    if (!roomUsageMap[roomNumber]) {
      roomUsageMap[roomNumber] = [];
    }

    const formattedData = [
      {
        name: "Air",
        value: item?.air_en?.toFixed(configs.numberOfDecimal) || null, // No Math.abs here
        total: "0", // Placeholder for total
        fill: `var(--color-Air)`,
      },
      {
        name: "Rec",
        value: item.rac_en?.toFixed(configs.numberOfDecimal) || null, // No Math.abs here
        total: "0",
        fill: `var(--color-Rec)`,
      },
      {
        name: "Switch",
        value: item.sw_en?.toFixed(configs.numberOfDecimal) || null, // No Math.abs here
        total: "0",
        fill: `var(--color-Switch)`,
      },
      {
        name: "Other",
        value: item.other_en?.toFixed(configs.numberOfDecimal) || null, // No Math.abs here
        total: "0",
        fill: `var(--color-Other)`,
      },
    ];

    // Calculate total using Math.abs to handle negative values
    const total = formattedData
      .reduce((sum, entry) => sum + Math.abs(parseFloat(entry.value || "0")), 0)
      .toFixed(configs.numberOfDecimal);

    // Set the total field for all entries
    formattedData?.forEach((entry) => {
      entry.total = total;
    });

    roomUsageMap[roomNumber] = formattedData;
  });

  // console.log(
  //   "🚀 ~ formatRoomElectricTodayUsage ~ roomUsageMap:",
  //   roomUsageMap
  // );
  return roomUsageMap;
}

export function formatFacultyElectric24Usage(data: IElectric24Usage[]) {
  const buildingUsageMap: { [key: string]: any } = {};
  // const abnormalThreshold = 100000;

  data?.forEach((item: IElectric24Usage) => {
    // if (item.UseRateYesterday > abnormalThreshold) return;

    const buildingNumber = item.fl_id.substring(0, 5);

    if (buildingUsageMap[buildingNumber]) {
      buildingUsageMap[buildingNumber].UseRateYesterday +=
        item.UseRateYesterday;
    } else {
      buildingUsageMap[buildingNumber] = {
        buildingId: buildingNumber,
        meterId: item.meter_id,
        useYesterday: item.UseRateYesterday,
        useTotal: item.TotalUseRateYesterday,
        fill: `var(--color-${buildingNumber})`,
      };
    }
  });

  const formatData = Object.values(buildingUsageMap)
    ?.map((item) => ({
      ...item,
      value: parseFloat(item.useYesterday.toFixed(configs.numberOfDecimal)),
      total: parseFloat(item.useTotal.toFixed(configs.numberOfDecimal)),
    }))
    ?.sort((a, b) => b.value - a.value);

  return formatData;
}

export function formatBuildingElectric24Usage(
  data: IElectric24Usage[],
  buildingId: string
) {
  const floorUsageMap: { [key: string]: any } = {};

  const filteredData = data?.filter((item) =>
    item.fl_id.toUpperCase().startsWith(buildingId)
  );

  filteredData?.forEach((item: IElectric24Usage) => {
    const floorNumber = `${parseInt(item.fl_id.slice(-2), 10)}-FL`;

    if (floorUsageMap[floorNumber]) {
      floorUsageMap[floorNumber].UseRateYesterday += item.UseRateYesterday;
    } else {
      floorUsageMap[floorNumber] = {
        buildingId: floorNumber,
        meterId: item.meter_id,
        useYesterday: item.UseRateYesterday,
        useTotal: item.TotalUseRateYesterday,
        fill: `var(--color-${floorNumber})`,
      };
    }
  });

  const formatData = Object.values(floorUsageMap)
    ?.map((item) => ({
      ...item,
      value: parseFloat(item.useYesterday.toFixed(configs.numberOfDecimal)),
      total: parseFloat(item.useTotal.toFixed(configs.numberOfDecimal)),
    }))
    ?.sort((a, b) => b.value - a.value);

  return formatData;
}

export function formatFloorElectric24Usage(
  data: IRoomUse24[],
  floorId: string
) {
  const floorData = data?.filter((item) => item.room.startsWith(floorId));
  let totalUseRateRoom = 0;

  const formattedData = floorData
    ?.map((item) => {
      const useRateRoom = Math.abs(item.UseRateRoom);
      const roomName = useRateRoom ? item.room.substring(6, 9) : "";

      // Accumulate the total UseRateRoom
      totalUseRateRoom += useRateRoom;

      const data = {
        name: roomName,
        value: useRateRoom
          ? useRateRoom.toFixed(configs.numberOfDecimal)
          : null,
        total: "0",
        fill: useRateRoom ? `var(--color-${roomName})` : "",
      };

      return useRateRoom ? data : null;
    })
    ?.filter((item): item is NonNullable<typeof item> => item !== null);

  // Update each entry's total field with the accumulated total
  const totalAsString = totalUseRateRoom.toFixed(configs.numberOfDecimal);
  formattedData?.forEach((entry) => {
    entry.total = totalUseRateRoom ? totalAsString : "";
  });

  return formattedData;
}

export function formatRoomElectric24Usage(data: IRoomUse24[], roomId: string) {
  const roomData = data.find((item) => item.room === roomId);
  const roomUsageMap: { [key: string]: any } = {};

  if (roomData) {
    const roomNumber = roomData.room;

    const formattedData = [
      {
        name: "Air",
        value: roomData.Air?.toFixed(configs.numberOfDecimal) || null,
        total: "0",
        fill: `var(--color-Air)`,
      },
      {
        name: "Rec",
        value: roomData.Rec?.toFixed(configs.numberOfDecimal) || null,
        total: "0",
        fill: `var(--color-Rec)`,
      },
      {
        name: "Switch",
        value: roomData.Switch?.toFixed(configs.numberOfDecimal) || null,
        total: "0",
        fill: `var(--color-Switch)`,
      },
      {
        name: "Other",
        value: roomData.Other?.toFixed(configs.numberOfDecimal) || null,
        total: "0",
        fill: `var(--color-Other)`,
      },
    ];

    // Calculate the total using absolute values
    const total = formattedData
      .reduce((sum, entry) => sum + Math.abs(parseFloat(entry.value || "0")), 0)
      .toFixed(configs.numberOfDecimal);

    // Set the total field for each entry
    formattedData?.forEach((entry) => {
      entry.total = total;
    });

    roomUsageMap[roomNumber] = formattedData;
  }

  return roomUsageMap[roomId];
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const yearBE = date.getFullYear() + 543;

  return `${day}/${month}/${yearBE}`;
}

export function formatDatetoISOStringWithoutTime(
  date?: Date
): string | undefined {
  return date ? date.toISOString().split("T")[0] : undefined;
}

export function formatMinutesToHours(minutes: number, lang?: "en" | "th") {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (lang == "en") {
    return `${hours} hrs ${remainingMinutes} mins`;
  } else {
    return `${hours} ชม. ${remainingMinutes} น.`;
  }
}
