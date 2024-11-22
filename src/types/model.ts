export interface IAverageEnvironment {
  averagePM25: number;
  averageTemp: number;
  averageHumidity: number;
}

export interface IAverageElectricityUsage {
  Month: string;
  TotalUseRateMonth: number;
}

export interface IFloorRoomUseHour {
  room: string
  MinOpen: any
  MaxClose: any
  TotalMinutes: any
  noPeopleMinutes: number
  UseRateRoom: number
  recordDate: string
  air_en: number
  sw_en: number
  rac_en: number
  other_en: number
}

export interface IRoomUse24 {
  room: string
  UseRateRoom: number
  Air: number
  Switch: number
  Rec: number
  Other: number
}

export interface IPmTempHmd {
  Day: string;
  Week: string;
  Month: string;
  HumidMonth: number;
  PM25Month: number;
  TempMonth: number;
  HumidWeek: number;
  PM25Week: number;
  TempWeek: number;
  HumidDay: number;
  PM25Day: number;
  TempDay: number;
  HumidMin: number;
  PM25Min: number;
  TempMin: number;
  HumidMax: number;
  PM25Max: number;
  TempMax: number;
}

export interface IEnvironmentLineChart {
  title: string;
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

export interface IElectricFloorRoomUsageChart {
  name: string;
  value: string;
  total: string;
  fill: string;
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
  a_code: string
  brand_code: string
  u_srID: string
  a_installer: string
  a_install_date: string
  rm_id: string
  order_id: string
  order_date: string
  buyer: string
  received_date: string
  warranty_period: string
  gen: string
  TotalMinutes: number
}

export interface ILamp {
  rm_id: string
  l_id: string
  l_code: string
  brand_code: string
  u_srID: string
  l_installer: string
  l_install_date: string
  lb_code: string
  brand_code_lb: string
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

export interface IAirBrands {
  brand_code: string
  equipment: string
  brand: string
}

export interface IAirTypes {
  a_code: string
}

export interface ISensorAir {
  u_srID: string
}

export interface ISensorAirTypes {
  a_code: string
  a_type: string
  BTU: number
  invater: number
}

export interface ISensorSwitch {
  u_srID: string
}

export interface ILampTypes {
  l_code: string
}

export interface IBulbTypes {
  lb_code: string
}

export interface IBulbBrands {
  brand_code: string
  equipment: string
  brand: string
}

export interface ILampBrands {
  brand_code: string
  equipment: string
  brand: string
}

export interface IFloorDetails {
  buildingCode: string
  floorNumber: string
  floorMeter: string
  floorPower: string
  averagefloorPM25: string
  averagefloorTemp: string
  averagefloorHumidity: string
}

export interface IModalRoomDetails {
  buildingCode: string
  floorNumber: string
  roomNumber: string
  energyComsumption: string
  roomMeter: string
  roomPower: string
  averagePM25: string
  averageTemp: string
  averageHumidity: string
}

export interface IRoomData {
  lightingStatus: {
    id: string;
    status: string;
  }[];
  airStatus: {
    id: string;
    current: number;
    status: string;
  }[];
  roomPower: number;
  roomMeter: number;
  roomHumidity: number;
  roomPM25: number;
  roomTemp: number;
};

