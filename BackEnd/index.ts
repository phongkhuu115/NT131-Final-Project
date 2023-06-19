import { connectDB } from './src/config/db.config';
import { appOn } from './src/global/express';

appOn();
connectDB();
