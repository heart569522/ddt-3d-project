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

export interface IAvatar {
  name: string;
  image: string;
}

export interface ITemperatureContour {
  temperatureData: number[];
  maxTemp: number;
  minTemp: number;
  contourInterval: number;
}

export interface IHumidityContour {
  humidityData: number[];
  minHumidity: number;
  maxHumidity: number;
  contourInterval: number;
}

export interface IPM25Contour {
  pm25Data: number[];
  maxPM25: number;
  minPM25: number;
  contourInterval: number;
}

export interface IRoom {
  rm_id: string;
  bu_id: string;
  bu_name: string;
  rm_name: string | null;
  type: string;
  air_amount: number;
  lamp_amount: number;
  sensor_air: number;
  sensor_cctv: number;
  sensor_htpm: number;
  sensor_receptacle: number;
  sensor_switch: number;
  sensor_meter: number;
}

export interface IAir {
  a_id: string
  rm_id: string
  a_code: string
  brand_code: string
  gen: string
  u_srID: string
  a_installer: string
  order_id: string
  buyer: string
  a_install_date: string
  order_date: string
  received_date: string
  warranty_period: string
}


export interface IBuilding {
  bu_id: string;
  bu_name: string;
  bu_info: string | null;
  fl_amount: number | null;
  rm_amount: number | null;
}

export interface IRoomTypes {
  rm_type: string;
  type: string;
}
