import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3333;

const allowOrigins = ['http://127.0.0.1:5173', 'http://demo.fkmdev.site'];

const options: cors.CorsOptions = {
  origin: allowOrigins,
  credentials: true,
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(options));

let http = require('http').Server(app);

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});

function appOn() {
  http.listen(port, () => {
    console.log('Server listenning on port ' + port + ' and say Hello');
  });
}

import { routes } from '../routes/routes';
app.use('/v1/api', routes);

export { appOn, io };
