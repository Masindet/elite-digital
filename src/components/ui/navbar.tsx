'use client'

import { ShoppingCart, Menu, X, Search } from 'lucide-react'
import { Button } from './button'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getUser } from '@/app/(app)/_actions/getUser'
import LogoutButton from '@/app/(app)/components/LogoutButton'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { User } from 'lucide-react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    async function fetchUser() {
      const loggedInUser = await getUser()
      setUser(loggedInUser)
    }
    fetchUser()
  }, [])

  // Fetch the cart count whenever the user is loaded or updated
  useEffect(() => {
    async function fetchCartCount() {
      if (user && user.id) {
        try {
          const res = await fetch(`/api/cart/count?userId=${user.id}`)
          if (res.ok) {
            const data = await res.json()
            setCartCount(data.count)
          }
        } catch (error) {
          console.error('Failed to fetch cart count:', error)
        }
      }
    }
    fetchCartCount()
  }, [user])

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
          {/* Logo + Navigation */}
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

          {/* Right buttons */}
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="relative ml-4" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-primary text-primary-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </Link>
            </Button>

            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="ml-4 cursor-pointer">
                    <Avatar className="w-9 h-9 border border-border hover:ring-2 hover:ring-primary transition">
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4 space-y-2 shadow-lg rounded-md">
                  <div className="text-sm font-medium text-foreground truncate">
                    Hello, {user?.email}
                  </div>
                  <LogoutButton />
                </PopoverContent>
              </Popover>
            ) : (
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
