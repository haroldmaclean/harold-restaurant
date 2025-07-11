// src/app/components/Navbar.tsx
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const { cartItems } = useCart()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  // const { cart } = useCart()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    window.location.href = '/'
  }

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  return (
    <nav className='bg-white shadow-md p-4 sticky top-0 z-50'>
      <div className='max-w-6xl mx-auto flex justify-between items-center'>
        <Link href='/' className='text-xl font-bold'>
          Harold&apos;s Kitchen
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex space-x-6 items-center'>
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

          {/* Cart Icon */}
          <Link href='/cart' className='relative'>
            <ShoppingCart className='text-gray-700 hover:text-blue-600' />
            {cartItems.length > 0 && (
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full'>
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className='md:hidden'>
          <button onClick={toggleMenu} aria-label='Toggle menu'>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className='md:hidden mt-2 space-y-3 px-4 pb-4 border-t'>
          <Link
            href='/menu'
            onClick={toggleMenu}
            className='block hover:text-blue-600'
          >
            Menu
          </Link>
          <Link
            href='/about'
            onClick={toggleMenu}
            className='block hover:text-blue-600'
          >
            About
          </Link>
          <Link
            href='/contact'
            onClick={toggleMenu}
            className='block hover:text-blue-600'
          >
            Contact
          </Link>
          <Link
            href='/admin'
            onClick={toggleMenu}
            className='block hover:text-blue-600'
          >
            Admin
          </Link>
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout()
                setMenuOpen(false)
              }}
              className='text-red-600'
            >
              Sign Out
            </button>
          ) : (
            <Link
              href='/login'
              onClick={toggleMenu}
              className='text-green-600 block'
            >
              Login
            </Link>
          )}

          {/* Cart Icon for Mobile */}
          <Link
            href='/cart'
            onClick={toggleMenu}
            className='flex items-center gap-1'
          >
            <ShoppingCart className='text-gray-700' size={20} />
            <span>Cart ({cartItems.length})</span>
          </Link>
        </div>
      )}
    </nav>
  )
}
