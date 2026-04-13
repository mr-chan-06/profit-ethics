import mongoose from 'mongoose';
import Setting from '@/models/Setting';

const MONGODB_URI = "mongodb+srv://chan638356_db_user:chan123@cluster0.u9rbdtj.mongodb.net/?appName=Cluster0";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    await initDB();
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export async function initDB() {
  try {
    const count = await Setting.countDocuments();
    if (count === 0) {
      const defaultSettings = [
        { key: 'course_price', value: '18000' },
        { key: 'course_discounted_price', value: '10500' },
        { key: 'course_duration', value: '30 Days' },
        { key: 'course_classes', value: '15 Days' },
        { key: 'course_schedule', value: 'Once every 2 days' },
        { key: 'course_time', value: '8:00 PM' },
        { key: 'whatsapp_number', value: '9171989911' }
      ];
      await Setting.insertMany(defaultSettings);
    }
  } catch (error) {
    console.error("Error initializing DB:", error);
  }
}

export default connectDB;
