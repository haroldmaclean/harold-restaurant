// src/app/api/auth/logout/route.ts
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const cookieStore = cookies()
  cookieStore.delete('token') // ✅ delete the auth token

  // ✅ Redirect to login page
  return NextResponse.redirect(
    new URL(
      '/login',
      process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    )
  )
}
