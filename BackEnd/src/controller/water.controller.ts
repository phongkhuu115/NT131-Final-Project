import { Request, Response } from 'express';
import { WaterLevelModel } from '../model/water.model';

import { io } from '../global/express';

io.on("connection", () => {
  console.log("user connected")
})


export const WaterController = {
  PostWaterLevel: async (req: Request, res: Response) => {
    try {
      const waterLevel = new WaterLevelModel({
        waterLevel: req.body.waterLevel,
        humidity: req.body.humidity,
        tempature: req.body.tempature,
        status: req.body.status,
        timeStamp: Date.now(),
      });
      await waterLevel.save();
      io.emit("newData", () => {
        
      })
      res.status(200).json({
        message: 'Insert Water Level Successfully',
      });
    } catch (err: any) {
      res.status(500).json({
        message: err + '',
      });
    }
  },
  GetAllWaterLevel: async (req: Request, res: Response) => {
    try {
      const records = await WaterLevelModel.find();
      res.status(200).json({
        message: 'Get Record Successfully',
        data: records,
      });
    } catch (err: any) {
      res.status(500).json({
        message: err + '',
      });
    }
  },
  InsertTestingData: async (req: Request, res: Response) => {
    try {
      let n = req.body.number;
      for (let i = 0; i < n; i++) {
        const waterLevel = new WaterLevelModel({
          waterLevel: Math.floor(Math.random() * (20 - 10) + 10),
          humidity: Math.floor(Math.random() * (20 - 10) + 10),
          tempature: Math.floor(Math.random() * (20 - 10) + 10),
          status: Math.round(Math.random()),
          timeStamp: Date.now(),
        });
        await waterLevel.save();
      }
      res.status(200).json({
        message: 'Insert Water Level Successfully',
      });
    } catch (err: any) {
      res.status(500).json({
        message: err + '',
      });
    }
  },
};
