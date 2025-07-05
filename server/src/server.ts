import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });
import app from './app';
import { connectDB } from './utils/connectDB';

const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;
process.on('uncaughtException', (err: Error) => {
  console.error(`❌ UNCAUGHT EXCEPTION! ${err.name}: ${err.message}`);
  process.exit(1);
});
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

connectDB();

process.on('SIGTERM', (err: Error) => {
  console.error(`❌ SIGTERM! ${err.name}: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
process.on('unhandledRejection', (err: Error) => {
  console.error(`❌ Unhandled Rejection! ${err.name}: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
