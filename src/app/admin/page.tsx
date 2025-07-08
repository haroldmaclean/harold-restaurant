// src/app/admin/page.tsx

import { cookies as getCookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { connectDB } from '@/lib/mongodb'
import { MenuItem } from '@/models/MenuItem'
import { MenuItemType } from '@/types'
import AdminItemCard from '@/app/components/AdminItemCard'
import AdminNavbar from '../components/AdminNavbar'

const JWT_SECRET = process.env.JWT_SECRET as string
if (!JWT_SECRET) throw new Error('JWT_SECRET is not set')

async function getCookieValue(name: string) {
  const cookieStore = await getCookies()
  return cookieStore.get(name)?.value
}

export default async function AdminPage() {
  const token = await getCookieValue('token')
  if (!token) return redirect('/')

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    if (!decoded?.email || !decoded?.isAdmin) return redirect('/')

    await connectDB()

    type RawMenuItem = {
      _id: { toString(): string }
      name: string
      description: string
      price: number
    }

    const rawItems = await MenuItem.find().lean<RawMenuItem[]>()

    const menuItems: MenuItemType[] = rawItems.map((item) => ({
      _id: item._id.toString(),
      name: item.name,
      description: item.description,
      price: item.price,
    }))

    return (
      <main className='p-8 max-w-5xl mx-auto'>
        <AdminNavbar />

        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold'>Admin Dashboard</h1>

          {/* ✅ Logout Button using POST */}
          <form method='POST' action='/api/auth/logout'>
            <button
              type='submit'
              className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm'
            >
              Logout
            </button>
          </form>
        </div>

        <p className='mb-6 text-gray-600'>
          Welcome, {decoded.email}! You can manage menu items below.
        </p>

        <div className='grid gap-6 md:grid-cols-2'>
          {menuItems.map((item) => (
            <AdminItemCard key={item._id} item={item} />
          ))}
        </div>
      </main>
    )
  } catch (err) {
    console.error('JWT verify error:', err)
    return redirect('/')
  }
}
