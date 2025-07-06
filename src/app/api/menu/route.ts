// src/app/api/menu/route.ts

import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { MenuItem } from '@/models/MenuItem'

export async function GET() {
  try {
    await connectDB()
    const items = await MenuItem.find()
    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
