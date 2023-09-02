import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { sendPeriodicMessage } from './bot';
const cron = require('node-cron');

const app = express();
app.use(cors());

cron.schedule('*/1 * * * *', sendPeriodicMessage);

app.listen(process.env.PORT, () =>
  console.log('Application listening.....'),
);
