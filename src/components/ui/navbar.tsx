'use client'

import { ShoppingCart, Menu, X, Search, User } from 'lucide-react'
import { Button } from './button'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getUser } from '@/app/(app)/_actions/getUser'
import LogoutButton from '@/app/(app)/components/LogoutButton'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchUser() {
      const loggedInUser = await getUser()
      setUser(loggedInUser)
    }
    fetchUser()
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Deals', href: '/deals' },
    { name: 'Support', href: '/support' },
    { name: 'About', href: '/about' },
  ]

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and primary navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold">EliteDigital</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-foreground/60 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-foreground/60" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-background text-foreground placeholder-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Search products..."
              />
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="relative ml-4" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-primary text-primary-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
            </Button>

            {user ? (
              // User logged in: Show Profile + Logout
              <div className="relative ml-4">
                <User className="h-6 w-6 cursor-pointer" />
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md p-2">
                  <LogoutButton />
                </div>
              </div>
            ) : (
              // User not logged in: Show Login & Signup
              <>
                <Button variant="outline" asChild className="ml-4">
                  <Link href="/login">Login</Link>
                </Button>
                <Button variant="default" asChild className="ml-2">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="ml-2 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground/60 hover:text-foreground block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* Mobile search */}
          <div className="px-2 pb-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-foreground/60" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-background text-foreground placeholder-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Search products..."
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
