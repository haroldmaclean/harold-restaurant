// Force dynamic rendering to prevent build-time MongoDB connection errors on Vercel
export const dynamic = 'force-dynamic'

import { connectDB } from '@/lib/mongodb'
import { MenuItem } from '@/models/MenuItem'
import { MenuItemType } from '@/types'

export default async function MenuPage() {
  await connectDB()
  const menuItems: MenuItemType[] = await MenuItem.find()

  return (
    <main className='p-8 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Our Menu</h1>
      <div className='grid gap-6 md:grid-cols-2'>
        {menuItems.map((item: MenuItemType) => (
          <div key={item._id} className='bg-white rounded-lg shadow p-6'>
            <h2 className='text-xl font-semibold mb-2'>{item.name}</h2>
            <p className='text-gray-600 mb-2'>{item.description}</p>
            <span className='font-bold text-green-700'>{item.price}</span>
          </div>
        ))}
      </div>
    </main>
  )
}
