import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { MenuItem } from '@/models/MenuItem'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()

    const items = Array.isArray(body) ? body : [body] // support single or multiple

    const validated = items.every(
      (item) => item.name && item.description && typeof item.price === 'number'
    )

    if (!validated) {
      return NextResponse.json(
        { error: 'All fields are required and price must be a number' },
        { status: 400 }
      )
    }

    await MenuItem.insertMany(items)
    return NextResponse.json(
      { message: 'Items added successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error adding menu items:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
