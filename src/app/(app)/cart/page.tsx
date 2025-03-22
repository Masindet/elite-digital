'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Trash, Minus, Plus } from 'lucide-react'
import { getUser } from '@/app/(app)/_actions/getUser'

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: {
    id: number
    name: string
    description: string
  }
  brand: string
  images: {
    id: number
    alt: string
    url: string
    // other fields if needed
  }
  updatedAt: string
  createdAt: string
}

interface CartItem {
  product: Product
  quantity: number
  price: number
}

interface CartType {
  id?: number
  items: CartItem[]
  total: number
  updatedAt?: string
  createdAt?: string
}

export default function CartPage() {
  const [cart, setCart] = useState<CartType | null>(null)
  const [user, setUser] = useState<any>(null)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // On mount, check if the user is logged in and fetch cart from API
  useEffect(() => {
    async function fetchUserAndCart() {
      const currentUser = await getUser()
      setUser(currentUser)
      if (currentUser) {
        const res = await fetch(`/api/cart?userId=${currentUser.id}`)
        if (res.ok) {
          const data = await res.json()
          console.log('Fetched cart:', data.cart)
          setCart(data.cart)
        }
      } else {
        // Otherwise, use localStorage
        const localCartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]')
        const localCart: CartType = {
          items: localCartItems,
          total: localCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }
        console.log('Local cart:', localCart)
        setCart(localCart)
      }
    }
    fetchUserAndCart()
  }, [])

  // Update localStorage if guest cart is updated
  useEffect(() => {
    if (!user && cart) {
      localStorage.setItem('cart', JSON.stringify(cart.items))
    }
  }, [cart, user])

  const updateQuantity = async (productId: number, amount: number) => {
    if (user) {
      // For logged in user, call the update endpoint
      const res = await fetch('/api/cart/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          productId,
          newQuantity: getCurrentQuantity(productId) + amount,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        setCart(data.cart)
      }
    } else if (cart) {
      const updatedItems = cart.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item,
      )
      const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      setCart({ ...cart, items: updatedItems, total: updatedTotal })
    }
  }

  const removeItem = async (productId: number) => {
    if (user) {
      const res = await fetch(`/api/cart/remove?userId=${user.id}&productId=${productId}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        const data = await res.json()
        setCart(data.cart)
      }
    } else if (cart) {
      const updatedItems = cart.items.filter((item) => item.product.id !== productId)
      const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      setCart({ ...cart, items: updatedItems, total: updatedTotal })
    }
  }

  const getCurrentQuantity = (productId: number): number => {
    if (!cart) return 0
    const item = cart.items.find((i) => i.product.id === productId)
    return item ? item.quantity : 0
  }

  const totalPrice = cart ? cart.total : 0
  if (!mounted) {
    // Prevent rendering on server (or before hydration)
    return null
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        {!cart || cart.items.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cart.items.map((item, index) => (
              <Card
                key={`cart-item-${item.product.id}-${index}`}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                    {item.product.images?.url ? (
                      <Image
                        src={`http://localhost:3000${item.product.images.url}`}
                        alt={item.product.images.alt || item.product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{item.product.name}</h2>
                    <p className="text-muted-foreground">Ksh.{item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.product.id, -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.product.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}

            <div className="flex justify-between items-center text-lg font-semibold mt-6">
              <span>Total:</span>
              <span>Ksh.{totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-4" asChild>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
