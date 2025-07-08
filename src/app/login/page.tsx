// src/app/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        router.push('/admin')
      } else {
        const data = await res.json()
        setError(data?.error || 'Login failed')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Server error. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='min-h-screen flex items-center justify-center bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md'
      >
        <h1 className='text-2xl font-bold mb-6 text-center'>Admin Login</h1>

        {error && (
          <p className='text-red-600 mb-4 text-center text-sm'>{error}</p>
        )}

        <div className='mb-4'>
          <label className='block mb-2 text-sm font-medium'>Email</label>
          <input
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400'
          />
        </div>

        <div className='mb-6'>
          <label className='block mb-2 text-sm font-medium'>Password</label>
          <input
            type='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400'
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:opacity-50'
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </main>
  )
}
