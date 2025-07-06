// src/app/api/menu/add/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { MenuItem } from '@/models/MenuItem'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { name, description, price } = await req.json()

    if (!name || !description || !price) {
      return NextResponse.json(
        { error: 'All fields required' },
        { status: 400 }
      )
    }

    const newItem = new MenuItem({ name, description, price })
    await newItem.save()

    return NextResponse.json(
      { message: 'Menu item added successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error adding menu item:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
