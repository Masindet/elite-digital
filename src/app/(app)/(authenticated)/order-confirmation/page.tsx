'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id')
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [paymentOption, setPaymentOption] = useState<string | null>(null)
  const [mpesaNumber] = useState('0712345678')
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) return
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

  const handlePaymentOption = async (option: string) => {
    setPaymentOption(option)
    if (option === 'now') {
      // Update order status to processing via API
      const res = await fetch('/api/order/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: 'processing' }),
      })
      if (res.ok) {
        setMessage(`Order updated to processing. Please pay via MPesa to number: ${mpesaNumber}`)
      } else {
        setMessage('Failed to update order status')
      }
    } else if (option === 'delivery') {
      setMessage('You have chosen to pay on delivery.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Order Confirmation</h1>
      {loading ? (
        <p>Loading order details...</p>
      ) : order ? (
        <div>
          <p>Order ID: {order.id}</p>
          <p>Total: {order.total}</p>
          <p>Status: {order.status}</p>
          <h2 className="text-xl font-semibold mt-4">Choose Payment Option:</h2>
          <div className="flex gap-4 mt-2">
            <Button onClick={() => handlePaymentOption('now')}>Pay Now</Button>
            <Button onClick={() => handlePaymentOption('delivery')}>Pay on Delivery</Button>
          </div>
          {message && <p className="mt-4 text-lg">{message}</p>}
          <Button onClick={() => router.push('/orders')} className="mt-6">
            View Order History
          </Button>
        </div>
      ) : (
        <p>No order found.</p>
      )}
    </div>
  )
}
