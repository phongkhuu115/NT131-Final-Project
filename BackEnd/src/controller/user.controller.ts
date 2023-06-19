import { Request, Response } from 'express';
import { UserModel } from '../model/user.model';
import { compare, hash } from 'bcrypt';
import { User, WaterLevel } from '../global/types.global';
import mongoose from 'mongoose';
import { waterSchema } from '../model/water.model';
import { promisify } from 'util';
import { randomBytes } from 'crypto';
import { error } from 'console';

const hashAsync = promisify(hash);
const randomBytesAsync = promisify(randomBytes);

export const UserController = {
  Register: async (req: Request, res: Response) => {
    try {
      const salt = 10;
      let password = req.body.password;
      const randomToken = (await randomBytesAsync(16)).toString('hex');
      const user = new UserModel({
        username: req.body.username,
        password: await hashAsync(password, 10),
        userFullName: '',
        avatar: '',
        token: randomToken,
        create_at: Date.now(),
        update_at: Date.now(),
      });
      try {
        await user.save();
        const DynamicCollection = mongoose.model<WaterLevel>(
          `water_${randomToken}`,
          waterSchema
        );
        const initialData = new DynamicCollection({
          waterLevel: 0,
          tempature: 0,
          humidity: 0,
          status: 0,
          timeStamp: Date.now(),
        });
        await initialData.save();
        res.status(201).json({
          message: 'Create Account Success',
          key: randomToken,
        });
      } catch (err: any) {
        res.status(500).json({
          message: err + '',
        });
      }
    } catch (error) {}
  },
  Login: async (req: Request, res: Response) => {
    try {
      let username = req.body.username;
      let password = req.body.password;
      const user = await UserModel.findOne({ username: username });
      compare(password, user?.password as string, (error, result) => {
        if (result) {
          let userCopy = { ...user?.toObject() };
          delete userCopy?.password;
          delete userCopy?._id;
          delete userCopy?.create_at;
          delete userCopy?.update_at;
          res.status(200).json({
            message: 'success',
            user: userCopy,
          });
        }
        else {
          res.status(400).json({
            message: 'wrong password'
          })
        }
      });
    } catch (error) {
      res.status(500).json({
        message: error + ''
      })
    }
  },
};
