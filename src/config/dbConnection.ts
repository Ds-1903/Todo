import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/Todo';

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Failed:', err);
    process.exit(1);
  }
};