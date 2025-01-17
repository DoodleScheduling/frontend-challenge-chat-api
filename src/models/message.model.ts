import mongoose, { Schema } from 'mongoose';
import { Message } from '../types';

const MessageSchema = new Schema<Message>(
  {
    _id: { type: String },
    message: { type: String, required: true },
    author: { type: String, required: true },
    timestamp: { type: String, required: true },
  },
  { versionKey: false }
);

// Index messages by timestamp in descending order
MessageSchema.index({ timestamp: -1 });

export const MessageModel = mongoose.model<Message>('Message', MessageSchema);
