// src/app/api/seed/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { MenuItem } from '@/models/MenuItem'

const defaultItems = [
  // --- Original Items ---
  {
    name: 'Beef Burger',
    description: 'Classic beef burger with cheese and pickles.',
    price: 85,
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Vegan Wrap',
    description: 'Plant-based wrap with hummus and roasted veggies.',
    price: 65,
    image:
      'https://images.unsplash.com/photo-1592044903782-9836f74027c0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8VmVnYW4lMjBXcmFwfGVufDB8fDB8fHww',
  },
  {
    name: 'Chicken Tacos',
    description: 'Spicy grilled chicken tacos with salsa.',
    price: 75,
    image:
      'https://images.unsplash.com/photo-1718395012014-61605ae16df3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjAwfHxjaGlja2VuJTIwVGFjb3N8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with Caesar dressing.',
    price: 60,
    image:
      'https://images.unsplash.com/photo-1574926054530-540288c8e678?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q2Flc2FyJTIwU2FsYWR8ZW58MHx8MHx8fDA%3D',
  },

  // --- 20 New Items ---
  {
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato, mozzarella, and basil.',
    price: 95,
    image:
      'https://images.unsplash.com/photo-1573821663912-6df460f9c684?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWFyZ2hlcml0YSUyMFBpenphfGVufDB8fDB8fHww',
  },
  {
    name: 'Fish & Chips',
    description: 'Crispy battered fish with golden fries.',
    price: 110,
    image:
      'https://images.unsplash.com/photo-1611599538235-128e54f1250f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RmlzaCUyMCUyNiUyMENoaXBzfGVufDB8fDB8fHww',
  },
  {
    name: 'Pasta Carbonara',
    description: 'Creamy pasta with bacon, egg, and Parmesan.',
    price: 90,
    image:
      'https://images.unsplash.com/photo-1579631542720-3a87824fff86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UGFzdGElMjBDYXJib25hcmF8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Mushroom Risotto',
    description: 'Arborio rice cooked with wild mushrooms and truffle oil.',
    price: 105,
    image:
      'https://images.unsplash.com/photo-1609770424775-39ec362f2d94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TXVzaHJvb20lMjBSaXNvdHRvfGVufDB8fDB8fHww',
  },
  {
    name: 'Steak Frites',
    description: 'Grilled sirloin steak with French fries and garlic butter.',
    price: 150,
    image:
      'https://images.unsplash.com/photo-1720701247839-9b8433398385?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFN0ZWFrJTIwRnJpdGVzfGVufDB8fDB8fHww',
  },
  {
    name: 'Caprese Skewers',
    description:
      'Cherry tomatoes, mozzarella balls, and basil with balsamic glaze.',
    price: 55,
    image:
      'https://images.unsplash.com/photo-1738612005456-ffd9e91f172a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fENhcHJlc2UlMjBTa2V3ZXJzfGVufDB8fDB8fHww',
  },
  {
    name: 'French Onion Soup',
    description: 'Classic onion soup with croutons and melted Gruyère cheese.',
    price: 45,
    image:
      'https://images.unsplash.com/photo-1646783186826-7146151c8c62?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fEZyZW5jaCUyME9uaW9uJTIwU291cHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Chocolate Lava Cake',
    description:
      'Warm chocolate cake with a molten center, served with ice cream.',
    price: 70,
    image:
      'https://images.unsplash.com/photo-1652561781059-58d5d9ffcb4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Q2hvY29sYXRlJTIwTGF2YSUyMENha2V8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'New York Cheesecake',
    description: 'Rich and creamy cheesecake with a graham cracker crust.',
    price: 65,
    image:
      'https://images.unsplash.com/photo-1716579870046-878e4d3f7c28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE5ldyUyMFlvcmslMjBDaGVlc2VjYWtlfGVufDB8fDB8fHww',
  },
  {
    name: 'Apple Crumble',
    description:
      'Warm baked apples with a crispy oat topping, served with custard.',
    price: 60,
    image:
      'https://images.unsplash.com/photo-1511996946289-f0c071823341?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QXBwbGUlMjBDcnVtYmxlfGVufDB8fDB8fHww',
  },
  {
    name: 'Pancakes with Berries',
    description:
      'Fluffy pancakes topped with fresh mixed berries and maple syrup.',
    price: 70,
    image:
      'https://images.unsplash.com/photo-1522248105696-9625ba87de6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UGFuY2FrZXMlMjB3aXRoJTIwQmVycmllc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Full English Breakfast',
    description: 'Sausages, bacon, eggs, beans, mushrooms, and toast.',
    price: 120,
    image:
      'https://images.unsplash.com/photo-1588625436591-c6d853288b60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEZ1bGwlMjBFbmdsaXNoJTIwQnJlYWtmYXN0fGVufDB8fDB8fHww',
  },
  {
    name: 'Avocado Toast',
    description:
      'Toasted sourdough with mashed avocado, chili flakes, and a poached egg.',
    price: 80,
    image:
      'https://images.unsplash.com/photo-1628556820645-63ba5f90e6a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEF2b2NhZG8lMjBUb2FzdHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Espresso',
    description: 'Strong, concentrated coffee shot.',
    price: 25,
    image:
      'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEVzcHJlc3NvfGVufDB8fDB8fHww',
  },
  {
    name: 'Latte',
    description: 'Espresso with steamed milk and a thin layer of foam.',
    price: 35,
    image:
      'https://images.unsplash.com/photo-1550948309-0d8983dbdcc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TGF0dGV8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice.',
    price: 40,
    image:
      'https://images.unsplash.com/photo-1623123093752-b59353db6a5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEZyZXNoJTIwT3JhbmdlJTIwSnVpY2V8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Sparkling Water',
    description: 'Chilled sparkling mineral water.',
    price: 30,
    image:
      'https://images.unsplash.com/photo-1677694666910-2a2d1fa1f7dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fFNwYXJrbGluZyUyMFdhdGVyfGVufDB8fDB8fHww',
  },
  {
    name: 'Green Smoothie',
    description:
      'Spinach, banana, apple, and ginger blended with coconut water.',
    price: 55,
    image:
      'https://images.unsplash.com/photo-1610622930110-3c076902312a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R3JlZW4lMjBTbW9vdGhpZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Salmon with Asparagus',
    description: 'Baked salmon fillet with roasted asparagus and lemon.',
    price: 130,
    image:
      'https://images.unsplash.com/photo-1560717845-968823efbee1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U2FsbW9uJTIwd2l0aCUyMEFzcGFyYWd1c3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Vegetable Lasagna',
    description: 'Layers of pasta, rich tomato sauce, and seasonal vegetables.',
    price: 90,
    image:
      'https://images.unsplash.com/photo-1517978160212-7dddf0b65934?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFZlZ2V0YWJsZSUyMExhc2FnbmF8ZW58MHx8MHx8fDA%3D',
  },
]

// Seed using GET (predefined data)
export async function GET() {
  try {
    await connectDB()
    await MenuItem.deleteMany({}) // Clears existing items
    await MenuItem.insertMany(defaultItems) // Inserts the new set of items

    return NextResponse.json({ message: '✅ Seeded default menu items (GET)' })
  } catch (error) {
    console.error('GET seed error:', error)
    return NextResponse.json({ error: '❌ GET seed failed' }, { status: 500 })
  }
}

// Seed using POST (custom data from body)
// This remains unchanged, allowing for external POST requests to seed specific data
export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const items = await req.json()

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: '❌ Invalid or empty data' },
        { status: 400 }
      )
    }

    await MenuItem.deleteMany({})
    await MenuItem.insertMany(items)

    return NextResponse.json({ message: '✅ Seeded custom menu items (POST)' })
  } catch (error) {
    console.error('POST seed error:', error)
    return NextResponse.json({ error: '❌ POST seed failed' }, { status: 500 })
  }
}
