'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { MenuItemType } from '@/types'

export default function AdminItemCard({ item }: { item: MenuItemType }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const deleteMenuItem = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this item?')
    if (!confirmed) return

    try {
      const res = await fetch(`/api/menu/${id}/delete`, {
        method: 'DELETE',
      })

      if (res.ok) {
        startTransition(() => {
          router.refresh()
        })
      }
    } catch (err) {
      console.error('Failed to delete item:', err)
    }
  }

  return (
    <div className='bg-white p-4 rounded-lg shadow border'>
      <h2 className='text-xl font-semibold'>{item.name}</h2>
      <p className='text-gray-600 mb-2'>{item.description}</p>
      <span className='text-green-700 font-bold'>R{item.price}</span>

      <div className='mt-4 flex gap-2'>
        <button className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm'>
          Edit
        </button>
        <button
          className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm'
          onClick={() => deleteMenuItem(item._id)}
          disabled={isPending}
        >
          {isPending ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}
