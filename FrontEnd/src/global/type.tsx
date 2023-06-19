export interface DailyWaterLevel {
  _id: string,
  waterLevel: number,
  humidity: number,
  tempature: number,
  timeStamp: Date
}

export interface SettingData {
  limit: number
}