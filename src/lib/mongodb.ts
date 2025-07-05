import mongoose from 'mongoose'

export async function connectDB() {
  if (mongoose.connections[0].readyState) return

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in .env.local')
  }

  await mongoose.connect(process.env.MONGO_URI)
}
