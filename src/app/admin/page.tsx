import { cookies as getCookies } from 'next/headers'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { redirect } from 'next/navigation'

const JWT_SECRET = process.env.JWT_SECRET as string

export default function AdminPage() {
  // Force type for compatibility
  const cookieStore = getCookies() as unknown as {
    get(name: string): { value: string } | undefined
  }

  const token = cookieStore.get('token')?.value

  if (!token) {
    return redirect('/')
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload

    if (!decoded || !decoded.email || !decoded.isAdmin) {
      return redirect('/')
    }

    return (
      <main className='p-8 max-w-3xl mx-auto'>
        <h1 className='text-3xl font-bold mb-4'>Admin Dashboard</h1>
        <p className='text-gray-600'>Welcome, {decoded.email}!</p>
      </main>
    )
  } catch (err) {
    console.error('JWT Error:', err)
    return redirect('/')
  }
}
