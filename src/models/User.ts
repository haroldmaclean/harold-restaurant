import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const User = mongoose.models.User || mongoose.model('User', userSchema)
