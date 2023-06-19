import mongoose from 'mongoose';
import { WaterLevel } from '../global/types.global';

export const waterSchema = new mongoose.Schema<WaterLevel>(
  {
    waterLevel: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    tempature: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    timeStamp: {
      type: Date,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

export const WaterLevelModel = mongoose.model<WaterLevel>(
  'water_level',
  waterSchema
);
