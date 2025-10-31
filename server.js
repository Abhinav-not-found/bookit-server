import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDatabase from './config/db.js';
import colors from 'colors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import slowDown from "express-slow-down";

import experienceRoute from './routes/experience.route.js'

const allowedOrigins = [
  'http://localhost:3000',
  'https://bookit-client-five.vercel.app',
  'https://bookit-client-qnr5e8r42-abhinavnotfounds-projects.vercel.app'
];


dotenv.config();
connectToDatabase();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, try again later"
});
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: () => 500
});

const app = express();
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(limiter);
app.use(compression());
app.use(speedLimiter);

app.get('/', (req, res) => {
  res.send('api is running');
})

app.use('/', experienceRoute)

app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).json({
    message: "Internal Server Error"
  })
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan);
});
