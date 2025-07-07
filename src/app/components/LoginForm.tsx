// src/app/components/LoginForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation' // Import useRouter for redirection

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter() // Initialize the router hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/auth/login', {
        // Call your login API route
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('✅ Login successful!')
        // On successful login, redirect the user
        // We'll redirect to the admin page, assuming the logged-in user is an admin.
        // Your /api/auth/login route should be setting the 'token' cookie.
        router.push('/admin') // This will navigate the user to the admin dashboard
      } else {
        setMessage(`❌ ${data.error || 'Invalid email or password'}`)
      }
    } catch (err) {
      console.error('Login error:', err)
      setMessage('❌ Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-md mx-auto bg-white p-6 rounded shadow'
    >
      <h2 className='text-2xl font-bold mb-4'>Login</h2>

      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className='w-full mb-3 p-2 border rounded'
      />

      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className='w-full mb-4 p-2 border rounded'
      />

      <button
        type='submit'
        disabled={loading}
        className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {message && (
        <p className='mt-4 text-sm text-center text-red-500'>{message}</p>
      )}
    </form>
  )
}
