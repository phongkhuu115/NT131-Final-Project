import { Router } from 'express';
import { AnalyzeController } from '../controller/analyze.controller';
import { DynamicController } from '../controller/dynamic.controller';
import { UserController } from '../controller/user.controller';
import { WaterController } from '../controller/water.controller';

export const routes = Router();

//authentication
routes.post('/register', UserController.Register);
routes.post('/login', UserController.Login)
//water level
routes.post('/sendData', WaterController.PostWaterLevel);
routes.post('/genTestData', WaterController.InsertTestingData);
routes.get('/getData', WaterController.GetAllWaterLevel);
//analyze
routes.get('/predict', AnalyzeController.PredictFlooding);
//dynamic
routes.get('/userCollection', DynamicController.RetrieveByUser);
routes.post('/userCollection', DynamicController.UploadByUser);
