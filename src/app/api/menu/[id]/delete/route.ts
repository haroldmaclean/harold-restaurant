// src/app/api/menu/[id]/delete/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { MenuItem } from '@/models/MenuItem'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const { id } = params
    const deletedItem = await MenuItem.findByIdAndDelete(id)

    if (!deletedItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    return NextResponse.json(
      { message: 'Item deleted successfully' },
      { status: 200 }
    )
  } catch (err) {
    console.error('Error deleting item:', err)
    return NextResponse.json(
      { error: 'Failed to delete item' },
      { status: 500 }
    )
  }
}
