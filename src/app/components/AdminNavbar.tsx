'use client'

import Link from 'next/link'

export default function AdminNavbar() {
  return (
    <nav className='bg-gray-100 p-4 flex justify-between items-center shadow'>
      <div className='text-xl font-bold text-gray-800'>Admin Panel</div>

      <div className='flex items-center gap-4'>
        <Link href='/admin' className='text-blue-600 hover:underline'>
          Dashboard
        </Link>
        <Link href='/admin/add' className='text-green-600 hover:underline'>
          Add Item
        </Link>

        <Link href='/auth/logout' className='text-red-500 hover:underline'>
          Logout
        </Link>
      </div>
    </nav>
  )
}
