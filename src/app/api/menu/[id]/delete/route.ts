// src/app/api/menu/[id]/delete/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { MenuItem } from '@/models/MenuItem'

import { connectDB } from '@/lib/mongodb'

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params

  await connectDB()

  try {
    const deletedItem = await MenuItem.findByIdAndDelete(id)
    if (!deletedItem) {
      return NextResponse.json(
        { message: 'Menu item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Menu item deleted successfully' })
  } catch (err) {
    return NextResponse.json(
      { message: 'Error deleting item', error: err },
      { status: 500 }
    )
  }
}
