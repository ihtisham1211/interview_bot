import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { sendPeriodicMessage } from './bot';
const cron = require('node-cron');

const app = express();
app.use(cors());

cron.schedule('*/1 * * * *', sendPeriodicMessage);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Live!' });
});

app.listen(3000, () =>
  console.log('Application listening.....'),
);
