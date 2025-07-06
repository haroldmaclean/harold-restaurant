import { connectDB } from '@/lib/mongodb'
import { MenuItem } from '@/models/MenuItem'

export async function GET() {
  await connectDB()

  await MenuItem.insertMany([
    {
      name: 'Beef Burger',
      description: 'Classic beef burger with cheese and pickles.',
      price: 'R85',
    },
    {
      name: 'Vegan Wrap',
      description: 'Plant-based wrap with hummus and roasted veggies.',
      price: 'R65',
    },
  ])

  return new Response('Seeded menu items!', { status: 200 })
}
