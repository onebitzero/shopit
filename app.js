import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import connectToDatabase from './config/connectToDatabase.js';

// import Routers
import productRouter from './routes/products.js';
import authRouter from './routes/auth.js';
import orderRouter from './routes/order.js';
import paymentRouter from './routes/payment.js';

import errorMiddleware from './middleware/errorMiddleware.js';

// Handle uncaught exceptions
process.on('uncaughtException', (err, origin) => {
  console.log(`Caught exception: ${err}\nException origin: ${origin}`);
  process.exit(1);
});

if (process.env.NODE_ENV !== 'PRODUCTION') {
  dotenv.config({ path: 'config/config.env' });
}

const app = express();

app.use(express.json(
  {
    limit: '10mb',
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  },
));

app.use(cookieParser());

connectToDatabase();

app.use('/api/v1', productRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1', orderRouter);
app.use('/api/v1', paymentRouter);

app.use(errorMiddleware);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, 'client/dist/')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'))
  })
}

const server = app.listen(process.env.PORT, () => {
  console.log(`shopit listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// Handle promise rejection
process.on('unhandledRejection', (reason) => {
  console.log(reason);
  server.close(() => {
    process.exit(1);
  });
});
