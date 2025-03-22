import { NextResponse } from 'next/server'
import { createOrder } from '../../_actions/checkout'
export async function POST(request: Request) {
  try {
    const { userId, shippingAddress } = await request.json()
    if (!userId || !shippingAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const { order } = await createOrder(Number(userId), shippingAddress)
    return NextResponse.json({ order })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
