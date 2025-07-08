import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { MenuItem } from '@/models/MenuItem'

// Define the expected shape for a raw menu item
type RawItem = {
  _id: { toString: () => string }
  name: string
  description: string
  price: number
}

export async function GET() {
  try {
    await connectDB()

    const rawItems = await MenuItem.find().lean()

    // ✅ Safe double-cast to silence TS and avoid runtime issues
    const formatted = (rawItems as unknown as RawItem[]).map((item) => ({
      _id: item._id.toString(),
      name: item.name,
      description: item.description,
      price: item.price,
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
