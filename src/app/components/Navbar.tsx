'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
    <nav className='bg-orange-500 text-white shadow-md p-4 sticky top-0 z-50'>
      <div className='max-w-6xl mx-auto flex justify-between items-center'>
        <Link
          href='/'
          className='text-xl font-bold hover:text-yellow-100 transition'
        >
          Harold&apos;s Kitchen
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex space-x-6 items-center'>
          <Link href='/menu' className='hover:text-yellow-100 transition'>
            Menu
          </Link>
          <Link href='/about' className='hover:text-yellow-100 transition'>
            About
          </Link>
          <Link href='/contact' className='hover:text-yellow-100 transition'>
            Contact
          </Link>
          <Link href='/admin' className='hover:text-yellow-100 transition'>
            Admin
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className='text-red-200 hover:text-white transition'
            >
              Sign Out
            </button>
          ) : (
            <Link
              href='/login'
              className='text-green-200 hover:text-white transition'
            >
              Login
            </Link>
          )}
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
        <div className='md:hidden mt-2 space-y-3 px-4 pb-4 border-t border-orange-300'>
          <Link
            href='/menu'
            onClick={toggleMenu}
            className='block hover:text-yellow-100'
          >
            Menu
          </Link>
          <Link
            href='/about'
            onClick={toggleMenu}
            className='block hover:text-yellow-100'
          >
            About
          </Link>
          <Link
            href='/contact'
            onClick={toggleMenu}
            className='block hover:text-yellow-100'
          >
            Contact
          </Link>
          <Link
            href='/admin'
            onClick={toggleMenu}
            className='block hover:text-yellow-100'
          >
            Admin
          </Link>
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout()
                setMenuOpen(false)
              }}
              className='text-red-200 hover:text-white transition'
            >
              Sign Out
            </button>
          ) : (
            <Link
              href='/login'
              onClick={toggleMenu}
              className='text-green-200 hover:text-white transition block'
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
