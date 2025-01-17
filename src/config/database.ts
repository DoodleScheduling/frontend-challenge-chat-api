import mongoose from 'mongoose';
import { CONFIG } from './index';
import { MessageModel } from '../models/message.model';
import { INITIAL_MESSAGES } from '../data/messages';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(CONFIG.mongodb.uri);
    console.log('📦 MongoDB connected successfully');

    const count = await MessageModel.countDocuments();

    if (count === 0) {
      console.log('🌱 Seeding database with initial messages');
      await MessageModel.insertMany(INITIAL_MESSAGES);
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};
