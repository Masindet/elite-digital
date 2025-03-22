import { NextResponse } from 'next/server'
import { updateCartItemQuantity } from '@/app/(app)/_actions/cart'

export async function PATCH(request: Request) {
  try {
    const { userId, productId, newQuantity } = await request.json()
    if (!userId || !productId || newQuantity === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const updatedCart = await updateCartItemQuantity(
      Number(userId),
      Number(productId),
      Number(newQuantity),
    )
    return NextResponse.json({ cart: updatedCart })
  } catch (error) {
    console.error('Error updating cart:', error)
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
  }
}
