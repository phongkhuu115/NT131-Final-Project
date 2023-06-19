interface WaterLevel {
  waterLevel: number;
  humidity: number;
  tempature: number;
  status: number;
  timeStamp: Date;
}

interface User {
  username: string;
  password: string;
  userFullName?: string;
  avatar?: string;
  token: string;
  create_at: Date;
  update_at: Date;
}

interface Status {
  status: number;
  timeStamp: Date;
}

export { WaterLevel, User, Status };
