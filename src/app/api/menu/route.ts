import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { MenuItem } from '@/models/MenuItem'

// Extend the raw item type to include image
type RawItem = {
  _id: { toString: () => string }
  name: string
  description: string
  price: number
  image?: string
}

export async function GET() {
  try {
    await connectDB()

    const rawItems = await MenuItem.find().lean()

    const formatted = (rawItems as unknown as RawItem[]).map((item) => ({
      _id: item._id.toString(),
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image || '', // Optional chaining and fallback
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
