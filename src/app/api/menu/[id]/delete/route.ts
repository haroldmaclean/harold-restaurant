import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { MenuItem } from '@/models/MenuItem'

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB()

    // ✅ Await the context.params properly
    const { id } = await context.params

    const deletedItem = await MenuItem.findByIdAndDelete(id)

    if (!deletedItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Item deleted successfully' })
  } catch (err) {
    console.error('Delete error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
