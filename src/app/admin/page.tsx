import { cookies as getCookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { connectDB } from '@/lib/mongodb'
import { MenuItem } from '@/models/MenuItem'
import { MenuItemType } from '@/types'
import AdminItemCard from '@/app/components/AdminItemCard'

const JWT_SECRET = process.env.JWT_SECRET as string

// Ensure environment variable is defined
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set in environment variables')
}

// Helper to get token value from cookies safely
async function getCookieValue(name: string): Promise<string | undefined> {
  const cookieStore = await getCookies()
  return cookieStore.get(name)?.value
}

export default async function AdminPage() {
  const token = await getCookieValue('token')
  if (!token) return redirect('/')

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload

    // Reject if user is not admin
    if (!decoded?.email || !decoded?.isAdmin) {
      return redirect('/')
    }

    // Fetch menu items
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
