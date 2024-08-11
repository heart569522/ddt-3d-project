import { IElectric24Usage, IElectricTodayUsage } from "@/types/model";

export function formatElectricTodayUsage(data: IElectricTodayUsage[]) {
  const buildingUsageMap: { [key: string]: any } = {};

  data?.forEach((item: IElectricTodayUsage) => {
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
      value: parseFloat(item.useToday.toFixed(2)),
      total: parseFloat(item.useTotal.toFixed(2)),
    }));

  return formatData;
}

export function formatElectric24Usage(data: IElectric24Usage[]) {
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
      value: parseFloat(item.useYesterday.toFixed(2)),
      total: parseFloat(item.useTotal.toFixed(2)),
    }));

  return formatData;
}
