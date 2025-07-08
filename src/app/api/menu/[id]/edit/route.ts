// src/app/api/menu/[id]/edit/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { MenuItem } from '@/models/MenuItem'

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // 👈 Make `params` a Promise
) {
  try {
    const { id } = await context.params // ✅ Await the params properly
    await connectDB()

    const { name, description, price } = await req.json()

    // Validate fields
    if (!name || !description || typeof price !== 'number') {
      return NextResponse.json(
        { error: 'All fields are required and price must be a number' },
        { status: 400 }
      )
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true, runValidators: true }
    )

    if (!updatedItem) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Menu item updated successfully', updatedItem },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
