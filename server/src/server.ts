import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });
import app from './app';
import { GlobalError } from './utils/HandelGlobalError';
import { Features } from './utils/Features';

const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;
export const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const { connectDBContext } = new Features();
const { unHandlerError } = new GlobalError();

connectDBContext();

process.on('uncaughtException', (err) =>
  unHandlerError('UNCAUGHT EXCEPTION', err)
);
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    process.exit(1);
  });
});
process.on('unhandledRejection', (err: Error) =>
  unHandlerError('Unhandled Rejection', err)
);
