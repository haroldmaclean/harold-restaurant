import mongoose from 'mongoose'

const MenuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }, // ✅ changed to Number
  },
  { timestamps: true }
)

export const MenuItem =
  mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema)
