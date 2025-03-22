'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getUser } from '@/app/(app)/_actions/getUser'

interface Order {
  id: number
  total: number
  status: string
  createdAt: string
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function fetchUserAndOrders() {
      const currentUser = await getUser()
      setUser(currentUser)
      if (currentUser) {
        const res = await fetch(`/api/orders?userId=${currentUser.id}`)
        if (res.ok) {
          const data = await res.json()
          setOrders(data.orders)
        }
      }
    }
    fetchUserAndOrders()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded">
              <p>Order ID: {order.id}</p>
              <p>Total: {order.total}</p>
              <p>Status: {order.status}</p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              <Link href={`/order/${order.id}`} className="text-blue-500 underline">
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
