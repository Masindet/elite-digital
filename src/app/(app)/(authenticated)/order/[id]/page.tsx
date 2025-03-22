'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  images: { url: string; alt?: string }
}

interface OrderItem {
  product: Product
  quantity: number
  price: number
}

interface Order {
  id: number
  items: OrderItem[]
  total: number
  status: string
  paymentStatus: string
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  createdAt: string
}

export default function OrderDetailsPage() {
  const params = useParams()
  const orderId = params.id
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true)
      try {
        const res = await fetch(`/api/order?id=${orderId}`)
        if (res.ok) {
          const data = await res.json()
          setOrder(data.order)
        }
      } catch (error) {
        console.error('Failed to fetch order details', error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [orderId])

  if (loading) return <p>Loading...</p>
  if (!order) return <p>Order not found.</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Order Details</h1>
      <p>Order ID: {order.id}</p>
      <p>Total: {order.total}</p>
      <p>Status: {order.status}</p>
      <p>Payment Status: {order.paymentStatus}</p>
      <h2 className="text-xl font-semibold mt-4">Shipping Address</h2>
      <p>{order.shippingAddress.street}</p>
      <p>
        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
      </p>
      <p>{order.shippingAddress.country}</p>
      <h2 className="text-xl font-semibold mt-4">Items</h2>
      <ul className="space-y-4">
        {order.items.map((item) => (
          <li key={item.product.id} className="border p-4 rounded flex gap-4 items-center">
            <div className="relative w-16 h-16 rounded overflow-hidden">
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
              <p className="font-bold">{item.product.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {item.price}</p>
            </div>
          </li>
        ))}
      </ul>
      <Link href="/orders" className="text-blue-500 underline mt-4 block">
        Back to Order History
      </Link>
    </div>
  )
}
