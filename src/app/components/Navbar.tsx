'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    window.location.href = '/'
  }

  return (
    <nav className='bg-white shadow-md p-4'>
      <div className='max-w-6xl mx-auto flex justify-between items-center'>
        <Link href='/' className='text-xl font-bold'>
          Harold&apos;s Kitchen
        </Link>

        <div className='space-x-4'>
          <Link href='/menu' className='hover:text-blue-600'>
            Menu
          </Link>
          <Link href='/about' className='hover:text-blue-600'>
            About
          </Link>
          <Link href='/contact' className='hover:text-blue-600'>
            Contact
          </Link>
          <Link href='/admin' className='hover:text-blue-600'>
            Admin
          </Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className='text-red-600 ml-2'>
              Sign Out
            </button>
          ) : (
            <Link href='/login' className='text-green-600'>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
