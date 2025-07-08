import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { MenuItem } from '@/models/MenuItem'

// Default items for GET seeding
const defaultItems = [
  {
    name: 'Beef Burger',
    description: 'Classic beef burger with cheese and pickles.',
    price: 85,
  },
  {
    name: 'Vegan Wrap',
    description: 'Plant-based wrap with hummus and roasted veggies.',
    price: 65,
  },
  {
    name: 'Chicken Tacos',
    description: 'Spicy grilled chicken tacos with salsa.',
    price: 75,
  },
  {
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with Caesar dressing.',
    price: 60,
  },
]

// Seed using GET (predefined data)
export async function GET() {
  try {
    await connectDB()
    await MenuItem.deleteMany({})
    await MenuItem.insertMany(defaultItems)

    return NextResponse.json({ message: '✅ Seeded default menu items (GET)' })
  } catch (error) {
    console.error('GET seed error:', error)
    return NextResponse.json({ error: '❌ GET seed failed' }, { status: 500 })
  }
}

// Seed using POST (custom data from body)
export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const items = await req.json()

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: '❌ Invalid or empty data' },
        { status: 400 }
      )
    }

    await MenuItem.deleteMany({})
    await MenuItem.insertMany(items)

    return NextResponse.json({ message: '✅ Seeded custom menu items (POST)' })
  } catch (error) {
    console.error('POST seed error:', error)
    return NextResponse.json({ error: '❌ POST seed failed' }, { status: 500 })
  }
}
