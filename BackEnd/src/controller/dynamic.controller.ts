import mongoose from 'mongoose';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { promisify } from 'util';
dotenv.config();

import { io } from '../global/express';
import { WaterLevel } from '../global/types.global';
import { waterSchema } from '../model/water.model';

export const DynamicController = {
  RetrieveByUser: async (req: Request, res: Response) => {
    try {
      const userToken = req.query.userToken;
      let uri: string = process.env.MONGO_URI as string;
      const name = `water_${userToken}`;
      await mongoose.connect(uri);
      const userCollection = mongoose.connection.db.collection(name);
      const data = await userCollection.find().toArray();
      console.log(data);
      res.status(200).json({
        message: 'Retrieve data success',
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: error + '',
      });
    }
  },
  UploadByUser: async (req: Request, res: Response) => {
    let userToken = req.body.userToken
    try {
      const waterLevel = {
        waterLevel: req.body.waterLevel,
        tempature: req.body.tempature,
        humidity: req.body.humidity,
        status: 0,
        timeStamp: Date.now()
      }
      const DynamicCollection = mongoose.model<WaterLevel>(
        `water_${userToken}`,
        waterSchema
      );
      const initialData = new DynamicCollection(waterLevel);
      io.emit('personalData', () => {
        
      })
      await initialData.save();
      res.status(201).json({
        message: 'sucess',
      })
    } catch (error) {
      res.status(500).json({
        message: error + ''
      })
    }
  },
};
