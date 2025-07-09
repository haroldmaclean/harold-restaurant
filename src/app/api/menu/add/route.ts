// src/app/api/menu/add/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { MenuItem } from '@/models/MenuItem'

type NewItem = {
  name: string
  description: string
  price: number
  image?: string
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()

    const items: NewItem[] = Array.isArray(body) ? body : [body]

    const validated = items.every(
      (item) =>
        item.name?.trim() &&
        item.description?.trim() &&
        typeof item.price === 'number' &&
        !isNaN(item.price) &&
        (!item.image || typeof item.image === 'string')
    )

    if (!validated) {
      return NextResponse.json(
        { error: 'All fields are required and price must be a number' },
        { status: 400 }
      )
    }

    const result = await MenuItem.insertMany(items)

    return NextResponse.json(
      { message: 'Items added successfully', inserted: result.length },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error adding menu items:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
