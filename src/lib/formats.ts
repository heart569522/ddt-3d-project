import { IElectric24Usage, IElectricTodayUsage } from "@/types/model";
import { configs } from "./configs";

export function formatFacultyElectricTodayUsage(data: IElectricTodayUsage[]) {
  const buildingUsageMap: { [key: string]: any } = {};
  // const abnormalThreshold = 100000;

  data?.forEach((item: IElectricTodayUsage) => {
    // if (item.UseRateToday > abnormalThreshold) return;

    const buildingNumber = item.fl_id.substring(2, 5);

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
    .sort((a, b) => {
      return a.buildingId.localeCompare(b.buildingId);
    })
    .map((item) => ({
      ...item,
      value: parseFloat(item.useToday.toFixed(configs.numberOfDecimal)),
      total: parseFloat(item.useTotal.toFixed(configs.numberOfDecimal)),
    }));

  return formatData;
}

export function formatBuildingElectricTodayUsage(data: IElectricTodayUsage[], buildingId: string) {
  const floorUsageMap: { [key: string]: any } = {};
  // const abnormalThreshold = 100000;

  const filteredData = data.filter((item) =>
    item.fl_id.toUpperCase().startsWith(buildingId)
  );

  filteredData.forEach((item: IElectricTodayUsage) => {
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
    .sort((a, b) => {
      return a.buildingId.localeCompare(b.buildingId);
    })
    .map((item) => ({
      ...item,
      value: parseFloat(item.useToday.toFixed(configs.numberOfDecimal)),
      total: parseFloat(item.useTotal.toFixed(configs.numberOfDecimal)),
    }));

  return formatData;
}

export function formatFacultyElectric24Usage(data: IElectric24Usage[]) {
  const buildingUsageMap: { [key: string]: any } = {};

  data?.forEach((item: IElectric24Usage) => {
    const buildingNumber = item.fl_id.substring(2, 5);

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
    .sort((a, b) => {
      return a.buildingId.localeCompare(b.buildingId);
    })
    .map((item) => ({
      ...item,
      value: parseFloat(item.useYesterday.toFixed(configs.numberOfDecimal)),
      total: parseFloat(item.useTotal.toFixed(configs.numberOfDecimal)),
    }));

  return formatData;
}

export function formatBuildingElectric24Usage(data: IElectric24Usage[], buildingId: string) {
  const floorUsageMap: { [key: string]: any } = {};

  const filteredData = data.filter((item) =>
    item.fl_id.toUpperCase().startsWith(buildingId)
  );

  filteredData.forEach((item: IElectric24Usage) => {
    const floorNumber = `${parseInt(item.fl_id.slice(-2), 10)}-FL`;

    if (floorUsageMap[floorNumber]) {
      floorUsageMap[floorNumber].UseRateYesterday +=
        item.UseRateYesterday;
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
    .sort((a, b) => {
      return a.buildingId.localeCompare(b.buildingId);
    })
    .map((item) => ({
      ...item,
      value: parseFloat(item.useYesterday.toFixed(configs.numberOfDecimal)),
      total: parseFloat(item.useTotal.toFixed(configs.numberOfDecimal)),
    }));

  return formatData;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const yearBE = date.getFullYear() + 543;

  return `${day}/${month}/${yearBE}`;
}

export function formatDatetoISOStringWithoutTime(date?: Date): string | undefined {
  return date ? date.toISOString().split("T")[0] : undefined;
}

export function formatMinutesToHours(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours} ชม. ${remainingMinutes} น.`;
}
