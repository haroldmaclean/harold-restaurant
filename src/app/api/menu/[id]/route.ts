// src/app/api/menu/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { MenuItem } from '@/models/MenuItem'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } } // Extract the dynamic ID
) {
  try {
    await connectDB()

    const { id } = params // Get the ID from the URL parameters

    // Find a single menu item by its ID
    const item = await MenuItem.findById(id)

    if (!item) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(item) // Return the found item
  } catch (error) {
    console.error('Error fetching single menu item:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
