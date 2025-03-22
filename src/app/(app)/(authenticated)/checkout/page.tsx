'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { getUser } from '../../_actions/getUser'

interface ShippingAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export default function CheckoutPage() {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getUser()
      setUser(currentUser)
    }
    fetchUser()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      console.log('User:', user)
      // Assume you have a way to get the logged-in user ID,
      // e.g., from context or localStorage. For this example, we use a placeholder.
      const userId = user.id // adjust accordingly
      if (!userId) throw new Error('User not logged in.')

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, shippingAddress }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Checkout failed.')
      }

      const data = await res.json()
      // Optionally, redirect to an order confirmation page
      router.push(`/order-confirmation?id=${data.order.id}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Street</label>
          <input
            type="text"
            name="street"
            value={shippingAddress.street}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">City</label>
          <input
            type="text"
            name="city"
            value={shippingAddress.city}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">State</label>
          <input
            type="text"
            name="state"
            value={shippingAddress.state}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={shippingAddress.zipCode}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Country</label>
          <input
            type="text"
            name="country"
            value={shippingAddress.country}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <Button type="submit" disabled={loading} className="mt-4 w-full">
          {loading ? 'Processing...' : 'Place Order'}
        </Button>
      </form>
    </div>
  )
}
