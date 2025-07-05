import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });
import mongoose from 'mongoose';

const ApiGateAway: string = process.env.API_GATEAWAY!;
export const connectDB = async () => {
  await mongoose.connect(ApiGateAway);
  console.log('DB is connecting Successfully');
};
