// src/app/admin/page.tsx
import { cookies as getCookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { connectDB } from '@/lib/mongodb'
import { MenuItem } from '@/models/MenuItem'
import { MenuItemType } from '@/types'
import AdminItemCard from '../components/AdminItemCard'

const JWT_SECRET = process.env.JWT_SECRET as string

export default async function AdminPage() {
  const cookieStore = getCookies() as unknown as {
    get(name: string): { value: string } | undefined
  }

  const token = cookieStore.get('token')?.value
  if (!token) return redirect('/')

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    if (!decoded || !decoded.email || !decoded.isAdmin) {
      return redirect('/')
    }

    await connectDB()
    const menuItems: MenuItemType[] = await MenuItem.find()

    return (
      <main className='p-8 max-w-5xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
        <p className='mb-8 text-gray-600'>
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
