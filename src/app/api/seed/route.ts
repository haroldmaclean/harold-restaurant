import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { MenuItem } from '@/models/MenuItem'

// Default items for GET seeding with image URLs
const defaultItems = [
  {
    name: 'Beef Burger',
    description: 'Classic beef burger with cheese and pickles.',
    price: 85,
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Vegan Wrap',
    description: 'Plant-based wrap with hummus and roasted veggies.',
    price: 65,
    image:
      'https://images.unsplash.com/photo-1592044903782-9836f74027c0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8VmVnYW4lMjBXcmFwfGVufDB8fDB8fHww',
  },
  {
    name: 'Chicken Tacos',
    description: 'Spicy grilled chicken tacos with salsa.',
    price: 75,
    image:
      'https://images.unsplash.com/photo-1718395012014-61605ae16df3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjAwfHxjaGlja2VuJTIwVGFjb3N8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with Caesar dressing.',
    price: 60,
    image:
      'https://images.unsplash.com/photo-1574926054530-540288c8e678?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q2Flc2FyJTIwU2FsYWR8ZW58MHx8MHx8fDA%3D',
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
