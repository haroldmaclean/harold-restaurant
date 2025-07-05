import mongoose from 'mongoose'

const MenuItemSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: String,
  },
  { timestamps: true }
)

export const MenuItem =
  mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema)
