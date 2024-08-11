export interface IAverageEnvironment {
  averagePM25: number;
  averageTemp: number;
  averageHumidity: number;
}

export interface IAverageElectricityUsage {
  Month: string;
  TotalUseRateMonth: number;
}

export interface IPmTempHmd {
  Month: string;
  HumidMonth: number;
  PM25Month: number;
  TempMonth: number;
  HumidMin: number;
  PM25Min: number;
  TempMin: number;
  HumidMax: number;
  PM25Max: number;
  TempMax: number;
}

export interface IEnvironmentLineChart {
  month: string;
  min: number;
  max: number;
  mean: number;
}

export interface IElectricTodayUsage {
  meter_id: string;
  fl_id: string;
  last_consumption: number;
  first_consumption: number;
  UseRateToday: number;
  TotalUseRateToday: number;
}

export interface IElectric24Usage {
  meter_id: string;
  fl_id: string;
  UseRateYesterday: number;
  TotalUseRateYesterday: number;
}

export interface IElectricUsageChart {
  buildingId: string;
  meterId: string;
  value: number;
  total: number;
}
