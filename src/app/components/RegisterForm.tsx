'use client'

import { useState } from 'react'

export default function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('✅ Registered successfully!')
        setName('')
        setEmail('')
        setPassword('')
      } else {
        setMessage(`❌ ${data.error || 'Something went wrong'}`)
      }
    } catch (err) {
      console.error('Registration error:', err)
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
      <h2 className='text-2xl font-bold mb-4'>Register</h2>

      <input
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className='w-full mb-3 p-2 border rounded'
      />

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
        className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700'
      >
        {loading ? 'Registering...' : 'Register'}
      </button>

      {message && (
        <p className='mt-4 text-sm text-center text-red-500'>{message}</p>
      )}
    </form>
  )
}
